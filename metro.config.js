const { getDefaultConfig } = require("expo/metro-config");
const { mergeConfig } = require("metro-config");

const customConfig = {
  transformer: {
    babelTransformerPath: require.resolve("react-native-svg-transformer"),
    assetPlugins: ["expo-asset/tools/hashAssetFiles"],
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: false,
      }
    })
  },
  resolver: {
    assetExts: ["png", "jpg", "jpeg", "svg", "gif", "bmp", "webp","ttf"].filter(ext => ext !== "svg"),
    sourceExts: ["js", "jsx", "ts", "tsx", "json", "svg"],
    extraNodeModules: {
      "missing-asset-registry-path": require.resolve("react-native/Libraries/Image/AssetRegistry") // Map missing-asset-registry-path to AssetRegistry
    }
  }
};

module.exports = mergeConfig(getDefaultConfig(__dirname), customConfig);
