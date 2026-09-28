import { AppColors, Spacing } from "@/constants/theme";
import { StyleSheet, Text, View } from "react-native";

interface HeaderProps {
  title: string;
  subtitle?: string;
}

export function Header({ title, subtitle }: HeaderProps) {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.brandRow}>
          <View style={styles.logo}>
            <Text style={styles.logoText}>🐾</Text>
          </View>
          <View style={styles.brandTextContainer}>
            <Text style={styles.title}>{title}</Text>

            {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: AppColors.primary,
    borderBottomLeftRadius: Spacing.four,
    borderBottomRightRadius: Spacing.four,
    overflow: "hidden",
  },
  content: {
    width: "100%",
    maxWidth: 1100,
    alignSelf: "center",
    paddingHorizontal: Spacing.four,
    paddingTop: Spacing.seven,
    paddingBottom: 28,
  },

  brandRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  logo: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: "rgba(255,255,255,0.18)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },

  logoText: {
    fontSize: 24,
  },

  brandTextContainer: {
    flex: 1,
  },

  title: {
    fontSize: 26,
    lineHeight: 32,
    fontWeight: "700",
    color: "#FFFFFF",
    letterSpacing: -0.5,
  },
  subtitle: {
    marginTop: 3,
    fontSize: 14,
    fontWeight: "500",
    color: "rgba(255,255,255,0.82)",
  },
});
