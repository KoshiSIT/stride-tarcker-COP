module.exports = {
  presets: [
    "babel-preset-expo",
    [
      "@babel/preset-react",
      {
        runtime: "automatic",
        // importSource: "myCustomJsxRuntime", // エイリアスを使用
      },
    ],
  ],
  // resolve: {
  //   alias: {
  //     myCustomJsxRuntime: "./node_modules/react",
  //   },
  // },
};
