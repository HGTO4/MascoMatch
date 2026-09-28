import { Header } from "@/components/header";
import { PetCard } from "@/components/pet-card";
import { Spacing } from "@/constants/theme";
import { pets } from "@/data/pets";
import { useRouter } from "expo-router";
import { ScrollView, StyleSheet, View } from "react-native";

export function HomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Header title="MascoMatch" subtitle="Encontrá a tu próximo compañero" />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          {pets.map((pet) => (
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
  content: {
    width: "100%",
    maxWidth: 900,
    alignSelf: "center",
    paddingHorizontal: Spacing.three,
    paddingTop: Spacing.five,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: Spacing.six,
  },
});
