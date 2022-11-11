const { access, symlink } = require("fs/promises");
const { join } = require("path");

const withPWA = require("next-pwa")({
  dest: "public",
  disable:
    process.env.NODE_ENV === "development" ||
    process.env.NODE_ENV === "preview" ||
    process.env.NODE_ENV === "production",
  // delete two lines above to enable PWA in production deployment
  // add your own icons to public/manifest.json
  // to re-generate manifest.json, you can visit https://tomitm.github.io/appmanifest/
});

/** @type {import('next').NextConfig} */
module.exports = withPWA({
  swcMinify: true,
  reactStrictMode: true,
  experimental: {
    scrollRestoration: true,
  },
  webpack: function (
    config,
    { buildId, dev, isServer, defaultLoaders, webpack }
  ) {
    config.experiments = Object.assign(config.experiments || {}, {
      asyncWebAssembly: true,
    });

    config.module.rules.push({
      test: /\.wasm$/,
      type: "webassembly/async",
    });

    //  https://github.com/vercel/next.js/issues/25852
    config.plugins.push(
      new (class {
        apply(compiler) {
          compiler.hooks.afterEmit.tapPromise(
            "SymlinkWebpackPlugin",
            async (compiler) => {
              if (isServer) {
                const from = join(compiler.options.output.path, "../static");
                const to = join(compiler.options.output.path, "static");

                try {
                  await access(from);
                  console.log(`${from} already exists`);
                  return;
                } catch (error) {
                  if (error.code === "ENOENT") {
                    // No link exists
                  } else {
                    throw error;
                  }
                }

                await symlink(to, from, "junction");
                console.log(`created symlink ${from} -> ${to}`);
              }
            }
          );
        }
      })()
    );

    return config;
  },
  eslint: {
    dirs: ["src"],
  },
});
