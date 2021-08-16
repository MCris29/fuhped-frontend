const withStyles = require("@webdeb/next-styles");

module.exports = withStyles({
  sass: true,
  modules: true,
  images: {
    domains: ["localhost", "via.placeholder.com"],
  },
});
