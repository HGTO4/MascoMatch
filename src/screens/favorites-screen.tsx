import { Header } from "@/components/header";
import { PetCard } from "@/components/pet-card";
import { Spacing } from "@/constants/theme";
import { pets } from "@/data/pets";
import { useRouter } from "expo-router";
import { ScrollView, StyleSheet, View } from "react-native";

export function FavoritesScreen() {
  const favoritePets = pets.filter((pet) => pet.isFavorite);
  const router = useRouter();

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
          {favoritePets.map((pet) => (
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
          ))}
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
});
