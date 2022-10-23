module.exports = {
  // ... your existing config
  settings: {
    "import/resolver": {
      alias: {
        map: [
          // And all your import aliases
          ["@components", "./src/components"],
          ["@page", "./src/page"],
          ["@redux", "./src/redux"],
          ["@assets", "./src/assets"],
          ["@images", "./src/assets/images"],
          ["@icons", "./src/assets/icons"],
        ],
        extensions: [".ts", ".js", ".jsx", ".json"],
      },
    },
  },
};
