module.exports = {
  extends: [
    //...
  ],
  plugins: ["lodash-template"],
  overrides: [
    {
      files: ["*.html"],
      processor: "lodash-template/html",
    },
  ],
  rules: {
    //...
  },
};
