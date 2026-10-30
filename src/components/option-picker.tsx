import { Chip } from "@/components/chip";
import { AppPalette, Spacing } from "@/constants/theme";
import { useAppColors } from "@/hooks/use-app-colors";
import { StyleSheet, Text, View } from "react-native";

interface OptionPickerProps {
  label: string;
  options: string[];
  value: string;
  onChange: (valor: string) => void;
  error?: string;
}

export function OptionPicker({
  label,
  options,
  value,
  onChange,
  error,
}: OptionPickerProps) {
  const colors = useAppColors();
  const styles = createStyles(colors);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.chipsRow}>
        {options.map((option) => (
          <Chip
            key={option}
            label={option}
            selected={value === option}
            onPress={() => onChange(option)}
          />
        ))}
      </View>
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

function createStyles(colors: AppPalette) {
  return StyleSheet.create({
    container: { marginBottom: Spacing.three },
    label: {
      marginBottom: Spacing.two,
      fontSize: 14,
      fontWeight: "700",
      color: colors.text,
    },
    chipsRow: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: Spacing.two,
    },
    error: {
      marginTop: Spacing.one,
      fontSize: 13,
      color: colors.favorite,
    },
  });
}
