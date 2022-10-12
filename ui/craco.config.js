const path = require("path");
const CracoLessPlugin = require("craco-less");
const getCSSModuleLocalIdent = require("react-dev-utils/getCSSModuleLocalIdent");

const resolve = (dir) => path.resolve(__dirname, dir);

module.exports = {
  babel: {
    plugins: [
      [
        "import",
        {
          libraryName: "antd",
          libraryDirectory: "es",
          style: true,
        },
      ],
    ],
  },
  webpack: {
    alias: {
      "@": resolve("src"),
    },
  },
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        // cssLoaderOptions: {
        //   modules: {
        //     getLocalIdent: (context, localIdentName, localName, options) => {
        //       if (context.resourcePath.includes("node_modules")) {
        //         return localName;
        //       }
        //       // const ident = getCSSModuleLocalIdent(
        //       //   context,
        //       //   localIdentName,
        //       //   localName,
        //       //   options
        //       // );
        //       // console.log("getLocalIdent", ident, localIdentName, localName);
        //       return "[local]_[hash:base64:5]";
        //     },
        //     // localIdentName: "[local]_[hash:base64:5]" },
        //   },
        // },
        lessLoaderOptions: {
          lessOptions: {
            javascriptEnabled: true,
          },
        },
        // modifyLessRule: (lessRule) => {
        //   lessRule.test = /\.module\.less$/;
        //   lessRule.exclude = /node_modules/;
        //   return lessRule;
        // },
        // babelPluginImportOptions: {
        //   libraryName: "antd",
        //   libraryDirectory: "es",
        //   style: true,
        // },
      },
    },
  ],
};
