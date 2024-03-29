const { access, symlink, cp } = require("fs/promises");
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
              // console.log('path:', compiler.options.output.path)
              if (isServer) {
                const from = join(compiler.options.output.path, "../static");
                const to = join(compiler.options.output.path, "static");
                // console.log("from", from);
                // console.log("to", to);

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

                // await symlink(to, from, "junction");
                await cp(to, from, {
                  recursive: true
                });
                console.log(`created cp ${from} -> ${to}`);
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
