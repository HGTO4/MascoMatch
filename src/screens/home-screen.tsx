import { FiltersPanel } from "@/components/filters-panel";
import { Header } from "@/components/header";
import { PetCard } from "@/components/pet-card";
import { AppPalette, Spacing } from "@/constants/theme";
import { useAppColors } from "@/hooks/use-app-colors";
import { useLayout } from "@/hooks/use-layout";
import { usePetsStore } from "@/store/pets-store";
import { filtrarMascotas } from "@/utils/pet-search";
import { useRouter } from "expo-router";
import { useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

export function HomeScreen() {
  const colors = useAppColors();
  const styles = createStyles(colors);
  const router = useRouter();
  const pets = usePetsStore((state) => state.pets);
  const [busqueda, setBusqueda] = useState("");
  const [tipo, setTipo] = useState("Todos");
  const [tamano, setTamano] = useState("Todos");
  const mascotasFiltradas = filtrarMascotas(pets, {
    texto: busqueda,
    tipo,
    tamano,
  });
  const hayFiltros = busqueda !== "" || tipo !== "Todos" || tamano !== "Todos";
  const { esAncho, margenX, columnas } = useLayout();

  function limpiarFiltros() {
    setBusqueda("");
    setTipo("Todos");
    setTamano("Todos");
  }

  return (
    <View style={styles.container}>
      <Header title="MascoMatch" subtitle="Encontrá a tu próximo compañero" />
      <View
        style={[
          styles.body,
          esAncho && styles.bodyAncho,
          { paddingHorizontal: margenX },
        ]}
      >
        <View style={esAncho ? styles.sidebar : styles.filtrosArriba}>
          <FiltersPanel
            busqueda={busqueda}
            onBusquedaChange={setBusqueda}
            tipo={tipo}
            onTipoChange={setTipo}
            tamano={tamano}
            onTamanoChange={setTamano}
            onLimpiar={limpiarFiltros}
            hayFiltros={hayFiltros}
            compacto={!esAncho}
            resultados={mascotasFiltradas.length}
          />
        </View>

        <FlatList
          style={styles.scroll}
          key={columnas}
          data={mascotasFiltradas}
          keyExtractor={(pet) => pet.id}
          ListEmptyComponent={
            <View style={styles.vacio}>
              <Text style={styles.vacioTitulo}>
                No hay match con la búsqueda
              </Text>
              <Text style={styles.vacioTexto}>
                Probá con otra búsqueda o cambiá los filtros
              </Text>
            </View>
          }
          renderItem={({ item }) => (
            <View style={[styles.celda, { maxWidth: `${100 / columnas}%` }]}>
              <PetCard
                pet={item}
                onPress={() =>
                  router.navigate({
                    pathname: "/pet/[id]",
                    params: { id: item.id },
                  })
                }
              />
            </View>
          )}
          numColumns={columnas}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
        />
      </View>
    </View>
  );
}

function createStyles(colors: AppPalette) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    scroll: {
      flex: 1,
    },
    scrollContent: {
      paddingBottom: Spacing.six,
      paddingTop: Spacing.three,
    },
    body: {
      flex: 1,
      width: "100%",
    },
    bodyAncho: {
      flexDirection: "row",
    },
    sidebar: {
      width: 260,
    },
    filtrosArriba: {
      paddingBottom: Spacing.two,
    },
    celda: {
      flex: 1,
      paddingHorizontal: Spacing.two,
    },
    vacio: {
      alignItems: "center",
      paddingVertical: Spacing.seven,
      paddingHorizontal: Spacing.four,
    },
    vacioTitulo: {
      fontSize: 18,
      fontWeight: "700",
      color: colors.text,
      textAlign: "center",
    },
    vacioTexto: {
      marginTop: Spacing.two,
      fontSize: 14,
      color: colors.textSecondary,
      textAlign: "center",
    },
  });
}
