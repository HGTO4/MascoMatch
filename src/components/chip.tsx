import { AppPalette } from "@/constants/theme";
import { useAppColors } from "@/hooks/use-app-colors";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

interface ChipProps {
  label: string;
  selected: boolean;
  onPress: () => void;
  testID?: string;
}

export function Chip({ label, selected, onPress, testID }: ChipProps) {
  const colors = useAppColors();
  const styles = createStyles(colors);
  return (
    <TouchableOpacity
      onPress={onPress}
      testID={testID}
      style={[styles.chip, selected && styles.chipSelected]}
    >
      <Text style={[styles.text, selected && styles.textSelected]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

function createStyles(colors: AppPalette) {
  return StyleSheet.create({
    chip: {
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 999,
      backgroundColor: colors.surface,
      paddingHorizontal: 16,
      paddingVertical: 8,
    },
    chipSelected: {
      backgroundColor: colors.primary,
      borderColor: colors.primary,
    },
    text: {
      color: colors.textSecondary,
      fontSize: 14,
      fontWeight: "600",
    },
    textSelected: {
      color: colors.onPrimary,
    },
  });
}
