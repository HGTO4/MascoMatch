import { AppColors, Spacing } from "@/constants/theme";
import { StyleSheet, Text, TextInput, View } from "react-native";

interface FormFieldProps {
  label: string;
  value: string;
  onChangeText: (texto: string) => void;
  error?: string;
  multiline?: boolean;
  keyboardType?: "default" | "email-address" | "phone-pad";
  testID?: string;
}

export function FormField({
  label,
  value,
  onChangeText,
  error,
  multiline,
  keyboardType = "default",
  testID,
}: FormFieldProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[
          styles.input,
          multiline && styles.inputMultiline,
          error && styles.inputError,
        ]}
        value={value}
        onChangeText={onChangeText}
        multiline={multiline}
        keyboardType={keyboardType}
        autoCapitalize={keyboardType === "email-address" ? "none" : "sentences"}
        testID={testID}
      />
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.three,
  },
  label: {
    marginBottom: Spacing.one,
    fontSize: 14,
    fontWeight: "700",
    color: AppColors.text,
  },
  input: {
    minHeight: 45,
    borderWidth: 1,
    borderColor: AppColors.border,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: AppColors.surface,
    color: AppColors.text,
  },
  inputMultiline: {
    minHeight: 110,
    textAlignVertical: "top",
  },
  inputError: {
    borderColor: AppColors.favorite,
  },
  error: {
    marginTop: Spacing.one,
    fontSize: 13,
    color: AppColors.favorite,
  },
});
