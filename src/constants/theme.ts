/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import "@/global.css";

import { Platform } from "react-native";

export const Colors = {
  light: {
    text: "#1F2937",
    background: "#F6F8FB",
    backgroundElement: "#FFFFFF",
    backgroundSelected: "#E8F2FC",
    textSecondary: "#6B7280",
  },
  dark: {
    text: "#F9FAFB",
    background: "#111827",
    backgroundElement: "#1F2937",
    backgroundSelected: "#26384A",
    textSecondary: "#9CA3AF",
  },
} as const;

export const AppColors = {
  primary: "#4A9FE0",
  primaryDark: "#347FBC",

  secondary: "#73C991",
  accent: "#FF946B",

  background: "#F6F8FB",
  surface: "#FFFFFF",

  text: "#1F2937",
  textSecondary: "#6B7280",
  textMuted: "#9CA3AF",

  border: "#E8EDF2",

  favorite: "#FF6B6B",
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: "system-ui",
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: "ui-serif",
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: "ui-rounded",
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: "ui-monospace",
  },
  default: {
    sans: "normal",
    serif: "serif",
    rounded: "normal",
    mono: "monospace",
  },
  web: {
    sans: "var(--font-display)",
    serif: "var(--font-serif)",
    rounded: "var(--font-rounded)",
    mono: "var(--font-mono)",
  },
});

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 20,
  five: 24,
  six: 32,
  seven: 48,
  eight: 64,
} as const;

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 1100;
