import { useLocalSearchParams, useRouter } from "expo-router";
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import { Header } from "@/components/header";
import { Tag } from "@/components/tag";
import { AppColors, Spacing } from "@/constants/theme";
import { pets } from "@/data/pets";

export function PetDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const pet = pets.find((p) => p.id === id);

  if (!pet) {
    return (
      <View style={styles.container}>
        <Header title="Más detalle" subtitle="Todo lo que necesitas saber" />

        <View style={styles.notFound}>
          <Text style={styles.notFoundText}>Mascota no encontrada</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header title="Más detalle" subtitle="Todo lo que necesitas saber" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.content}>
          <View style={styles.cardShadow}>
            <View style={styles.card}>
              <Image
                source={{ uri: pet.image }}
                style={styles.image}
                resizeMode="cover"
              />

              <View style={styles.info}>
                <Text style={styles.name}>{pet.name}</Text>
                <Text style={styles.subtitle}>
                  {pet.shelter} • {pet.location}
                </Text>

                <View style={styles.tagsRow}>
                  <Tag label={pet.age} />
                  <Tag label={pet.size} color={AppColors.primary} />
                  <Tag label={pet.type} color={AppColors.secondary} />
                  <Tag label={pet.breed} />
                  <Tag label={pet.sex} />
                </View>

                <View style={styles.divider} />

                <Text style={styles.descriptionTitle}>Sobre {pet.name}</Text>

                <Text style={styles.description}>{pet.description}</Text>

                <TouchableOpacity
                  style={styles.backButton}
                  onPress={() => router.back()}
                  activeOpacity={0.85}
                >
                  <Text style={styles.backButtonText}>Volver a Mascotas</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
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
  scrollContent: {
    paddingBottom: Spacing.six,
  },
  content: {
    width: "100%",
    maxWidth: 900,
    alignSelf: "center",
    paddingHorizontal: Spacing.three,
    paddingTop: Spacing.three,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    overflow: "hidden",
  },
  cardShadow: {
    marginBottom: Spacing.three,
    marginVertical: Spacing.three,
    shadowColor: "#000",
    borderRadius: 22,
    boxShadow: "0px 5px 14px rgba(31, 41, 55, 0.08)",
    elevation: 3,
  },
  info: {
    padding: Spacing.four,
  },
  name: {
    fontSize: 30,
    lineHeight: 36,
    fontWeight: "800",
    color: AppColors.text,
  },
  subtitle: {
    marginTop: Spacing.one,
    fontSize: 14,
    lineHeight: Spacing.four,
    color: AppColors.textSecondary,
  },
  image: {
    width: "100%",
    height: 380,
  },
  tagsRow: {
    marginTop: Spacing.three,
    flexDirection: "row",
    flexWrap: "wrap",
    rowGap: 7,
  },
  divider: {
    height: 1,
    backgroundColor: "#E8EDF2",
    marginVertical: 7,
  },
  descriptionTitle: {
    fontSize: 17,
    fontWeight: "800",
    color: AppColors.text,
    marginBottom: 7,
  },
  description: {
    fontSize: 15,
    lineHeight: 24,
    color: AppColors.textSecondary,
  },
  backButton: {
    backgroundColor: AppColors.primary,
    paddingVertical: 15,
    borderRadius: Spacing.three,
    alignItems: "center",
    marginTop: Spacing.five,
  },
  backButtonText: {
    color: "#FFFFFF",
    fontWeight: "800",
    fontSize: 15,
  },
  notFound: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    padding: Spacing.four,
  },
  notFoundText: {
    fontSize: Spacing.three,
    color: AppColors.textSecondary,
  },
});
