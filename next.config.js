const path = require("path");

module.exports = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [
      path.join(__dirname, "styles"),
      path.join(__dirname, "styles/*/"),
      path.join(__dirname, "Layout/*/"),
    ],
  },
  images: {
    domains: ["storage.sg.content-cdn.io", "res.cloudinary.com"],
  },
};
