import { AppPalette } from "@/constants/theme";
import { useAppColors } from "@/hooks/use-app-colors";
import { useResolvedScheme } from "@/hooks/use-resolved-scheme";
import { useThemeStore } from "@/store/theme-store";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

export function ThemeToggle() {
  const colors = useAppColors();
  const styles = createStyles(colors);
  const scheme = useResolvedScheme();
  const setMode = useThemeStore((state) => state.setMode);

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => setMode(scheme === "dark" ? "light" : "dark")}
      activeOpacity={0.8}
      accessibilityLabel="Modo claro y oscuro"
      testID="theme-toggle"
    >
      <Text style={styles.icon}>{scheme === "dark" ? "🌙" : "☀️"}</Text>
    </TouchableOpacity>
  );
}

function createStyles(colors: AppPalette) {
  return StyleSheet.create({
    button: {
      width: 45,
      height: 45,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.surface,
      alignItems: "center",
      justifyContent: "center",
    },
    icon: {
      fontSize: 20,
    },
  });
}
