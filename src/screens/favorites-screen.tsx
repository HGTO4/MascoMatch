import { Header } from "@/components/header";
import { PetCard } from "@/components/pet-card";
import { AppColors, Spacing } from "@/constants/theme";
import { pets } from "@/data/pets";
import { useFavoritesStore } from "@/store/favorites-store";
import { useRouter } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export function FavoritesScreen() {
  const router = useRouter();
  const favoriteIds = useFavoritesStore((state) => state.favoriteIds);
  const favoritePets = pets.filter((pet) => favoriteIds.includes(pet.id));

  return (
    <View style={styles.container}>
      <Header
        title="Mis Mascotas Favoritas"
        subtitle="De este color no tengo"
      />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          {favoritePets.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyEmoji}>💙</Text>
              <Text style={styles.emptyTitle}>
                Todavía no tenes Mascotas Favoritas
              </Text>
              <Text style={styles.emptyText}>
                Tocá en el corazón de una mascota para guardarla como tu
                favorita
              </Text>
            </View>
          ) : (
            favoritePets.map((pet) => (
              <PetCard
                key={pet.id}
                pet={pet}
                onPress={() =>
                  router.navigate({
                    pathname: "/pet/[id]",
                    params: { id: pet.id },
                  })
                }
              />
            ))
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6F8FB",
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: Spacing.five,
  },
  content: {
    width: "100%",
    maxWidth: 900,
    alignSelf: "center",
    paddingHorizontal: Spacing.three,
    paddingTop: Spacing.three,
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
    color: AppColors.text,
    marginBottom: 6,
  },
  emptyText: {
    fontSize: 14,
    color: AppColors.textSecondary,
    textAlign: "center",
  },
});
