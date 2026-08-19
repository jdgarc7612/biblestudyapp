const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);

// zustand's ESM build references `import.meta.env` (for Redux DevTools) which
// Metro serves as a classic script, causing a hard SyntaxError that breaks the
// entire web bundle. Force its CJS build, which has no import.meta usage.
const { resolveRequest } = config.resolver;
config.resolver.resolveRequest = (context, moduleName, platform) => {
  if (moduleName === "zustand/middleware" || moduleName.startsWith("zustand/middleware/")) {
    return (resolveRequest ?? context.resolveRequest)(
      { ...context, unstable_conditionNames: ["require", "react-native"] },
      moduleName,
      platform
    );
  }
  return (resolveRequest ?? context.resolveRequest)(context, moduleName, platform);
};

module.exports = withNativeWind(config, { input: "./global.css" });