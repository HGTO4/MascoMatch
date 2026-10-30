import { AppPalette, Spacing } from "@/constants/theme";
import { useAppColors } from "@/hooks/use-app-colors";
import { nombreCiudad } from "@/utils/location";
import * as Location from "expo-location";
import { useState } from "react";
import {
  Alert,
  Linking,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";

interface LocationButtonProps {
  onFound: (ciudad: string) => void;
}

function abrirAjustesUbicacion() {
  if (Platform.OS === "android") {
    Linking.sendIntent("android.settings.LOCATION_SOURCE_SETTINGS").catch(() =>
      Linking.openSettings(),
    );
  } else {
    Linking.openSettings();
  }
}

export function LocationButton({ onFound }: LocationButtonProps) {
  const colors = useAppColors();
  const styles = createStyles(colors);
  const [buscando, setBuscando] = useState(false);

  async function usarMiUbicacion() {
    try {
      const { granted } = await Location.requestForegroundPermissionsAsync();

      if (!granted) {
        Alert.alert(
          "Sin permiso de ubicación",
          "Activá la ubicación para esta app en Ajustes.",
          [
            { text: "Ahora no", style: "cancel" },
            { text: "Abrir ajustes", onPress: () => Linking.openSettings() },
          ],
        );
        return;
      }
      if (!(await Location.hasServicesEnabledAsync())) {
        Alert.alert(
          "GPS apagado",
          "Encendé la ubicación del celular para usar esta opción.",
          [
            { text: "Ahora no", style: "cancel" },
            { text: "Abrir ajustes", onPress: abrirAjustesUbicacion },
          ],
        );
        return;
      }
      setBuscando(true);

      const pos = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });
      const { latitude, longitude } = pos.coords;
      const [direccion] = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });
      const ciudad = nombreCiudad(direccion);
      if (ciudad === "") {
        Alert.alert(
          "No pudimos detectar la ciudad",
          "Escribila a mano en el campo Ciudad.",
        );
        return;
      }
      onFound(ciudad);
    } catch {
      Alert.alert(
        "No se pudo obtener la ubicación",
        "Probá de nuevo al aire libre o cerca de una ventana, o escribí la ciudad a mano.",
      );
    } finally {
      setBuscando(false);
    }
  }

  return (
    <TouchableOpacity
      style={[styles.boton, buscando && styles.botonOcupado]}
      onPress={usarMiUbicacion}
      disabled={buscando}
      activeOpacity={0.85}
      testID="boton-ubicacion"
    >
      <Text style={styles.botonTexto}>
        {buscando ? "Buscando tu ubicación..." : "📍 Usar mi ubicación"}
      </Text>
    </TouchableOpacity>
  );
}

function createStyles(colors: AppPalette) {
  return StyleSheet.create({
    boton: {
      alignSelf: "flex-start",
      marginTop: -Spacing.two,
      marginBottom: Spacing.three,
    },
    botonOcupado: {
      opacity: 0.6,
    },
    botonTexto: {
      fontSize: 14,
      fontWeight: "600",
      color: colors.primaryDark,
    },
  });
}
