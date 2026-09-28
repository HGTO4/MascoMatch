import { AppColors } from "@/constants/theme";
import { StyleSheet, Text, View } from "react-native";

interface TagProps {
  label: string;
  color?: string;
}

export function Tag({ label, color = AppColors.accent }: TagProps) {
  return (
    <View style={[styles.tag, { backgroundColor: `${color}22` }]}>
      <View style={[styles.dot, { backgroundColor: color }]} />
      <Text style={[styles.tagText, { color: color }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  tag: {
    flexDirection: "row",
    alignItems: "center",

    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    marginRight: 7,
    marginTop: 4,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 6,
  },

  tagText: {
    fontSize: 12,
    fontWeight: "700",
  },
});
