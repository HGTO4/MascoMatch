import { Chip } from "@/components/chip";
import { AppColors, Spacing } from "@/constants/theme";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const TIPOS = ["Todos", "Perro", "Gato"];
const TAMANOS = ["Todos", "Pequeño", "Mediano", "Grande"];

interface FiltersPanelProp {
  busqueda: string;
  onBusquedaChange: (texto: string) => void;
  tipo: string;
  onTipoChange: (tipo: string) => void;
  tamano: string;
  onTamanoChange: (tamano: string) => void;
  onLimpiar: () => void;
  hayFiltros: boolean;
}

export function FiltersPanel({
  busqueda,
  onBusquedaChange,
  tipo,
  onTipoChange,
  tamano,
  onTamanoChange,
  onLimpiar,
  hayFiltros,
}: FiltersPanelProp) {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Buscar por nombre..."
        value={busqueda}
        onChangeText={onBusquedaChange}
      />
      <Text style={styles.label}>Tipo</Text>
      <View style={styles.chipsRow}>
        {TIPOS.map((opcion) => (
          <Chip
            key={opcion}
            label={opcion}
            selected={tipo === opcion}
            onPress={() => onTipoChange(opcion)}
          />
        ))}
      </View>

      <Text style={styles.label}>Tamaño</Text>
      <View style={styles.chipsRow}>
        {TAMANOS.map((opcion) => (
          <Chip
            key={opcion}
            label={opcion}
            selected={tamano === opcion}
            onPress={() => onTamanoChange(opcion)}
          />
        ))}
      </View>
      {hayFiltros && (
        <TouchableOpacity onPress={onLimpiar} style={styles.limpiar}>
          <Text style={styles.limpiarTexto}>Limpiar filtros</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Spacing.three,
  },
  searchInput: {
    height: 45,
    borderWidth: 1,
    borderColor: AppColors.border,
    borderRadius: 12,
    paddingHorizontal: 12,
    backgroundColor: AppColors.surface,
    color: AppColors.text,
  },
  label: {
    marginTop: Spacing.three,
    marginBottom: Spacing.two,
    fontSize: 13,
    fontWeight: "700",
    color: AppColors.textSecondary,
  },
  chipsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: Spacing.two,
  },
  limpiar: {
    marginTop: Spacing.three,
    alignSelf: "flex-start",
  },
  limpiarTexto: {
    fontSize: 14,
    fontWeight: "600",
    color: AppColors.primaryDark,
  },
});
