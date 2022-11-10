const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/.netlify/functions",
    createProxyMiddleware({
      target: "http://localhost:9000/",
      changeOrigin: true,
    })
  );
};

// createProxyMiddleware({
//   target: "http://localhost:9000/.netilfy/functions/",
//   changeOrigin: true,
// })
