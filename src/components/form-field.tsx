import { AppPalette, Spacing } from "@/constants/theme";
import { useAppColors } from "@/hooks/use-app-colors";
import { StyleSheet, Text, TextInput, View } from "react-native";

interface FormFieldProps {
  label: string;
  value: string;
  onChangeText: (texto: string) => void;
  error?: string;
  multiline?: boolean;
  keyboardType?: "default" | "email-address" | "phone-pad";
  maxLength?: number;
  onFocus?: () => void;
  testID?: string;
}

export function FormField({
  label,
  value,
  onChangeText,
  error,
  multiline,
  keyboardType = "default",
  maxLength,
  onFocus,
  testID,
}: FormFieldProps) {
  const colors = useAppColors();
  const styles = createStyles(colors);
  const conContador = maxLength !== undefined;
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
        maxLength={maxLength}
        onFocus={onFocus}
        testID={testID}
      />
      {(error || conContador) && (
        <View style={styles.infoRow}>
          {error ? (
            <Text style={styles.error}>{error}</Text>
          ) : (
            <View style={styles.espacio} />
          )}
          {conContador && (
            <Text
              style={[
                styles.contador,
                value.length >= maxLength && styles.contadorLleno,
              ]}
              testID={testID ? `${testID}-contador` : undefined}
            >
              {`${value.length}/${maxLength}`}
            </Text>
          )}
        </View>
      )}
    </View>
  );
}

function createStyles(colors: AppPalette) {
  return StyleSheet.create({
    container: {
      marginBottom: Spacing.three,
    },
    label: {
      marginBottom: Spacing.one,
      fontSize: 14,
      fontWeight: "700",
      color: colors.text,
    },
    input: {
      minHeight: 45,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 12,
      paddingHorizontal: 12,
      paddingVertical: 10,
      backgroundColor: colors.surface,
      color: colors.text,
    },
    inputMultiline: {
      height: 110,
      textAlignVertical: "top",
    },
    inputError: {
      borderColor: colors.favorite,
    },
    infoRow: {
      flexDirection: "row",
      alignItems: "flex-start",
      justifyContent: "space-between",
      gap: Spacing.two,
      marginTop: Spacing.one,
    },
    espacio: {
      flex: 1,
    },
    error: {
      flex: 1,
      fontSize: 13,
      color: colors.favorite,
    },
    contador: {
      fontSize: 13,
      color: colors.textSecondary,
    },
    contadorLleno: {
      color: colors.favorite,
    },
  });
}
