import { AppPalette, Spacing } from "@/constants/theme";
import { useAppColors } from "@/hooks/use-app-colors";
import * as ImagePicker from "expo-image-picker";
import {
  Alert,
  Image,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface PhotoPickerProps {
  uri: string;
  onChange: (uri: string) => void;
  onCamera: () => void;
  error?: string;
}

export function PhotoPicker({
  uri,
  onChange,
  onCamera,
  error,
}: PhotoPickerProps) {
  const colors = useAppColors();
  const styles = createStyles(colors);

  async function elegirDeGaleria() {
    const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!granted) {
      Alert.alert(
        "Sin acceso a fotos",
        "Activá el permiso de fotos en tus ajustes para elegir una imagen.",
        [
          { text: "Ahora no", style: "cancel" },
          { text: "Abrir ajustes", onPress: () => Linking.openSettings() },
        ],
      );
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      quality: 0.7,
    });

    if (!result.canceled) onChange(result.assets[0].uri);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Foto</Text>
      <View style={[styles.preview, error && styles.previewError]}>
        {uri !== "" ? (
          <Image
            source={{ uri }}
            style={styles.image}
            resizeMode="cover"
            testID="foto-vista-previa"
          />
        ) : (
          <Text style={styles.placeholder}>Sin foto todavía</Text>
        )}
      </View>

      <View style={styles.botones}>
        <TouchableOpacity
          style={styles.boton}
          onPress={onCamera}
          activeOpacity={0.85}
          testID="boton-camara"
        >
          <Text style={styles.botonTexto}>📷 Sacar foto</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.boton}
          onPress={elegirDeGaleria}
          activeOpacity={0.85}
          testID="boton-galeria"
        >
          <Text style={styles.botonTexto}>
            {uri !== "" ? "Cambiar foto" : "🖼️ Galería"}
          </Text>
        </TouchableOpacity>
      </View>
      {error && <Text style={styles.error}>{error}</Text>}
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
    preview: {
      height: 200,
      borderRadius: 14,
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.surfaceMuted,
      overflow: "hidden",
      alignItems: "center",
      justifyContent: "center",
    },
    previewError: {
      borderColor: colors.favorite,
    },
    image: {
      width: "100%",
      height: "100%",
    },
    placeholder: {
      fontSize: 14,
      color: colors.textSecondary,
    },
    botones: {
      flexDirection: "row",
      gap: Spacing.two,
      marginTop: Spacing.two,
    },
    boton: {
      flex: 1,
      paddingVertical: 12,
      borderRadius: 14,
      borderWidth: 1,
      borderColor: colors.primary,
      backgroundColor: colors.surface,
      alignItems: "center",
    },
    botonTexto: {
      fontSize: 15,
      fontWeight: "700",
      color: colors.primary,
    },
    error: {
      marginTop: Spacing.one,
      fontSize: 13,
      color: colors.favorite,
    },
  });
}
