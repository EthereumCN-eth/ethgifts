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
  webpack: function (config, options) {
    const experiments = config.experiments || {}
    config.experiments = { ...experiments, asyncWebAssembly: true }
    config.output.assetModuleFilename = 'static/[hash][ext]'
    config.output.publicPath = '/_next/'
    config.module.rules.push({
      test: /\.wasm/,
      type: 'webassembly/async'
    })
    return config
  },
  eslint: {
    dirs: ["src"],
  }
});
