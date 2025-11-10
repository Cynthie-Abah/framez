import { Platform } from "react-native";

const instagramGradientStart = "#f58529"; 
const instagramGradientMiddle = "#dd2a7b"; 
const instagramGradientEnd = "#8134af"; 
const instagramBlue = "#3897f0"; 
const instagramDarkBackground = "#142127";
const instagramLightBackground = "#ffffff";
// const feedDarkBackground = 'p';
const feedDarkBackground = 'rgb(12, 16, 20)';
const feedLightBackground = "#ffffff";

export const Colors = {
  light: {
    text: "#262626", 
    background: instagramLightBackground,
    tint: instagramBlue,
    icon: "#8e8e8e",
    tabIconDefault: "#8e8e8e",
    tabIconSelected: instagramBlue,
    gradientStart: instagramGradientStart,
    gradientMiddle: instagramGradientMiddle,
    gradientEnd: instagramGradientEnd,
    placeholder: "#c7c7cd",
    border: "#dbdbdb", 
    feedBackground: feedLightBackground, 
    ashButton: '#f0f0f0',
  },
  dark: {
    text: "#ffffff",
    background: instagramDarkBackground,
    tint: instagramBlue,
    icon: "#b3b3b3",
    tabIconDefault: "#b3b3b3",
    tabIconSelected: instagramBlue,
    gradientStart: instagramGradientStart,
    gradientMiddle: instagramGradientMiddle,
    gradientEnd: instagramGradientEnd,
    placeholder: "#8e8e8e",
    border: "rgb(50, 62, 72)",
    feedBackground: feedDarkBackground,
    ashButton: 'rgb(44, 48, 53)',
  },
};

export const Fonts = Platform.select({
  ios: {
    sans: "system-ui",
    serif: "ui-serif",
    rounded: "ui-rounded",
    mono: "ui-monospace",
  },
  default: {
    sans: "normal",
    serif: "serif",
    rounded: "normal",
    mono: "monospace",
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
