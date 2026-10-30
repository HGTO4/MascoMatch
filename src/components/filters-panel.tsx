import { Chip } from "@/components/chip";
import { ThemeToggle } from "@/components/theme-toggle";
import { AppPalette, Spacing } from "@/constants/theme";
import { useAppColors } from "@/hooks/use-app-colors";
import { useState } from "react";
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
  compacto?: boolean;
  resultados?: number;
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
  compacto = false,
  resultados,
}: FiltersPanelProp) {
  const colors = useAppColors();
  const styles = createStyles(colors);
  const [abierto, setAbierto] = useState(false);
  const filtrosActivos =
    (tipo !== "Todos" ? 1 : 0) + (tamano !== "Todos" ? 1 : 0);
  const mostrarChips = !compacto || abierto;
  const textoFiltros =
    "Filtros " +
    (filtrosActivos > 0 ? `(${filtrosActivos})` : "") +
    (abierto ? " ▲" : " ▼");
  const botonLimpiar = (
    <TouchableOpacity onPress={onLimpiar} testID="boton-limpiar">
      <Text style={styles.limpiarTexto}>Limpiar filtros</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchRow}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar por nombre..."
          placeholderTextColor={colors.textSecondary}
          value={busqueda}
          onChangeText={onBusquedaChange}
        />
        <ThemeToggle />
      </View>

      {compacto && (
        <View style={styles.barraFiltros}>
          <TouchableOpacity
            onPress={() => setAbierto(!abierto)}
            testID="boton-filtros"
          >
            <Text style={styles.botonFiltrosTexto}>{textoFiltros}</Text>
          </TouchableOpacity>

          {resultados !== undefined && (
            <Text style={styles.resultados}>
              {resultados === 1 ? "1 resultado" : `${resultados} resultados`}
            </Text>
          )}
          {hayFiltros && botonLimpiar}
        </View>
      )}

      {mostrarChips && (
        <>
          <Text style={styles.label}>Tipo</Text>
          <View style={styles.chipsRow}>
            {TIPOS.map((opcion) => (
              <Chip
                key={opcion}
                label={opcion}
                selected={tipo === opcion}
                onPress={() => onTipoChange(opcion)}
                testID={`chip-tipo-${opcion}`}
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
                testID={`chip-tamano-${opcion}`}
              />
            ))}
          </View>
        </>
      )}

      {!compacto && hayFiltros && (
        <View style={styles.limpiarAbajo}>{botonLimpiar}</View>
      )}
    </View>
  );
}

function createStyles(colors: AppPalette) {
  return StyleSheet.create({
    container: {
      paddingTop: Spacing.three,
    },
    searchRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: Spacing.two,
    },
    searchInput: {
      flex: 1,
      height: 45,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 12,
      paddingHorizontal: 12,
      backgroundColor: colors.surface,
      color: colors.text,
    },
    barraFiltros: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      gap: Spacing.two,
      marginTop: Spacing.three,
    },
    botonFiltrosTexto: {
      fontSize: 14,
      fontWeight: "700",
      color: colors.text,
    },
    resultados: {
      fontSize: 13,
      color: colors.textSecondary,
    },
    label: {
      marginTop: Spacing.three,
      marginBottom: Spacing.two,
      fontSize: 13,
      fontWeight: "700",
      color: colors.textSecondary,
    },
    chipsRow: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: Spacing.two,
    },
    limpiarAbajo: {
      marginTop: Spacing.three,
      alignSelf: "flex-start",
    },
    limpiarTexto: {
      fontSize: 14,
      fontWeight: "600",
      color: colors.primaryDark,
    },
  });
}
