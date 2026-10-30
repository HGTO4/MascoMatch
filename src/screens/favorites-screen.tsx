import { Header } from "@/components/header";
import { PetCard } from "@/components/pet-card";
import { AppPalette, Spacing } from "@/constants/theme";
import { useAppColors } from "@/hooks/use-app-colors";
import { useLayout } from "@/hooks/use-layout";
import { useFavoritesStore } from "@/store/favorites-store";
import { usePetsStore } from "@/store/pets-store";
import { useRouter } from "expo-router";
import { FlatList, StyleSheet, Text, View } from "react-native";

export function FavoritesScreen() {
  const colors = useAppColors();
  const styles = createStyles(colors);
  const router = useRouter();
  const pets = usePetsStore((state) => state.pets);
  const favoriteIds = useFavoritesStore((state) => state.favoriteIds);
  const favoritePets = pets.filter((pet) => favoriteIds.includes(pet.id));
  const { margenX, columnas } = useLayout();

  return (
    <View style={styles.container}>
      <Header
        title="Mis Mascotas Favoritas"
        subtitle="De este color no tengo"
      />
      <View style={[styles.body, { paddingHorizontal: margenX }]}>
        <FlatList
          style={styles.scroll}
          key={columnas}
          data={favoritePets}
          keyExtractor={(pet) => pet.id}
          numColumns={columnas}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <Text style={styles.emptyEmoji}>💙</Text>
              <Text style={styles.emptyTitle}>
                Todavía no tenés Mascotas Favoritas
              </Text>
              <Text style={styles.emptyText}>
                Tocá en el corazón de una mascota para guardarla como tu
                favorita
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
    body: {
      flex: 1,
      width: "100%",
    },
    scroll: {
      flex: 1,
    },
    scrollContent: {
      paddingBottom: Spacing.six,
      paddingTop: Spacing.three,
    },
    celda: {
      flex: 1,
      paddingHorizontal: Spacing.two,
    },
    emptyState: {
      alignItems: "center",
      paddingVertical: 60,
      paddingHorizontal: 20,
    },
    emptyEmoji: {
      fontSize: 48,
      marginBottom: 12,
    },
    emptyTitle: {
      fontSize: 18,
      fontWeight: "700",
      color: colors.text,
      marginBottom: 6,
      textAlign: "center",
    },
    emptyText: {
      fontSize: 14,
      color: colors.textSecondary,
      textAlign: "center",
    },
  });
}
