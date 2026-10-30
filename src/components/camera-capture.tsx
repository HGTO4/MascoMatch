import { AppPalette, Spacing } from "@/constants/theme";
import { useAppColors } from "@/hooks/use-app-colors";
import { CameraType, CameraView, useCameraPermissions } from "expo-camera";
import { useRef, useState } from "react";
import {
  Alert,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface CameraCaptureProps {
  onTaken: (uri: string) => void;
  onClose: () => void;
}

export function CameraCapture({ onTaken, onClose }: CameraCaptureProps) {
  const colors = useAppColors();
  const styles = createStyles(colors);
  const insets = useSafeAreaInsets();
  const [permission, requestPermission] = useCameraPermissions();
  const [facing, setFacing] = useState<CameraType>("back");
  const [lista, setLista] = useState(false);
  const cameraRef = useRef<CameraView>(null);

  if (!permission) return <View style={styles.pantalla} />;

  if (!permission.granted) {
    return (
      <View style={styles.centro}>
        <Text style={styles.texto}>
          Necesitamos permiso para usar la cámara
        </Text>
        {permission.canAskAgain ? (
          <TouchableOpacity
            style={styles.boton}
            onPress={requestPermission}
            testID="boton-conceder-permiso"
          >
            <Text style={styles.botonTexto}>Conceder permiso</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.boton}
            onPress={() => Linking.openSettings()}
            testID="boton-abrir-ajustes"
          >
            <Text style={styles.botonTexto}>Abrir ajustes</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={styles.botonSecundario}
          onPress={onClose}
          testID="boton-cerrar-camara"
        >
          <Text style={styles.botonTexto}>Volver</Text>
        </TouchableOpacity>
      </View>
    );
  }

  async function sacarFoto() {
    if (!cameraRef.current || !lista) return;

    try {
      const photo = await cameraRef.current.takePictureAsync({ quality: 0.7 });
      if (photo) onTaken(photo.uri);
    } catch {
      Alert.alert("No se pudo sacar la foto", "Probá de nuevo");
    }
  }

  return (
    <View style={styles.pantalla}>
      <CameraView
        ref={cameraRef}
        style={styles.camara}
        facing={facing}
        onCameraReady={() => setLista(true)}
      />
      <View style={[styles.barra, { paddingBottom: insets.bottom + 20 }]}>
        <TouchableOpacity onPress={onClose} testID="boton-cancelar-camara">
          <Text style={styles.barraTexto}>Cancelar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.disparador}
          onPress={sacarFoto}
          testID="boton-disparador"
        >
          <Text style={styles.disparadorTexto}>{lista ? "📸" : "..."}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setFacing((f) => (f === "back" ? "front" : "back"))}
          testID="boton-girar-camara"
        >
          <Text style={styles.barraTexto}>Girar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function createStyles(colors: AppPalette) {
  return StyleSheet.create({
    pantalla: {
      flex: 1,
      backgroundColor: "#000000",
    },
    camara: {
      flex: 1,
    },
    barra: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-around",
      paddingTop: Spacing.four,
      backgroundColor: "#000000",
    },
    barraTexto: {
      fontSize: 16,
      fontWeight: "600",
      color: colors.onPrimary,
    },
    disparador: {
      width: 72,
      height: 72,
      borderRadius: 36,
      backgroundColor: colors.onPrimary,
      alignItems: "center",
      justifyContent: "center",
    },
    disparadorTexto: {
      fontSize: 28,
    },
    centro: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      padding: Spacing.five,
      gap: Spacing.three,
      backgroundColor: "#000000",
    },
    texto: {
      fontSize: 16,
      color: colors.onPrimary,
      textAlign: "center",
    },
    boton: {
      paddingVertical: 12,
      paddingHorizontal: Spacing.five,
      borderRadius: 14,
      backgroundColor: "#4A9FE0",
    },
    botonSecundario: {
      paddingVertical: 12,
      paddingHorizontal: Spacing.five,
      borderRadius: 14,
      borderWidth: 1,
      borderColor: colors.onPrimary,
    },
    botonTexto: {
      fontSize: 16,
      fontWeight: "700",
      color: colors.onPrimary,
    },
  });
}
