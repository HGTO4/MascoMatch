/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import "@/global.css";

import { Platform } from "react-native";

export interface AppPalette {
  primary: string;
  primaryDark: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  surfaceMuted: string;
  text: string;
  textSecondary: string;
  textMuted: string;
  border: string;
  favorite: string;
  onPrimary: string;
  selected: string;
}

const lightPalette: AppPalette = {
  primary: "#4A9FE0",
  primaryDark: "#347FBC",
  secondary: "#73C991",
  accent: "#FF946B",
  background: "#F6F8FB",
  surface: "#FFFFFF",
  surfaceMuted: "#E9EEF3",
  text: "#1F2937",
  textSecondary: "#6B7280",
  textMuted: "#9CA3AF",
  border: "#E8EDF2",
  favorite: "#FF6B6B",
  onPrimary: "#FFFFFF",
  selected: "#E8F2FC",
};

const darkPalette: AppPalette = {
  primary: "#4A9FE0",
  primaryDark: "#7DBBF0",
  secondary: "#73C991",
  accent: "#FF946B",
  background: "#111827",
  surface: "#1F2937",
  surfaceMuted: "#374151",
  text: "#F9FAFB",
  textSecondary: "#9CA3AF",
  textMuted: "#6B7280",
  border: "#374151",
  favorite: "#FF6B6B",
  onPrimary: "#FFFFFF",
  selected: "#26384A",
};

export const AppPalettes = { light: lightPalette, dark: darkPalette };

export type ThemeColor = keyof AppPalette;

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
