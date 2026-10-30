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
import { AppPalette, Spacing } from "@/constants/theme";
import { useAppColors } from "@/hooks/use-app-colors";
import { useFavoritesStore } from "@/store/favorites-store";
import { usePetsStore } from "@/store/pets-store";

export function PetDetailScreen() {
  const colors = useAppColors();
  const styles = createStyles(colors);
  const pets = usePetsStore((state) => state.pets);
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const isFav = useFavoritesStore((state) =>
    state.favoriteIds.includes(id as string),
  );
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);

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

              <TouchableOpacity
                style={styles.favoriteButton}
                onPress={() => toggleFavorite(pet.id)}
                activeOpacity={0.8}
              >
                <Text style={styles.favoriteIcon}>{isFav ? "❤️" : "🤍"}</Text>
              </TouchableOpacity>

              <View style={styles.info}>
                <Text style={styles.name}>{pet.name}</Text>
                <Text style={styles.subtitle}>
                  {pet.shelter} • {pet.location}
                </Text>

                <View style={styles.tagsRow}>
                  <Tag label={pet.age} />
                  <Tag label={pet.size} color={colors.primary} />
                  <Tag label={pet.type} color={colors.secondary} />
                  <Tag label={pet.breed} />
                  <Tag label={pet.sex} />
                </View>

                <View style={styles.divider} />

                <Text style={styles.descriptionTitle}>Sobre {pet.name}</Text>

                <Text style={styles.description}>{pet.description}</Text>

                <View style={styles.actions}>
                  <TouchableOpacity
                    style={styles.adoptButton}
                    onPress={() =>
                      router.navigate({
                        pathname: "/adopt/[id]",
                        params: { id: pet.id },
                      })
                    }
                    activeOpacity={0.85}
                  >
                    <Text style={styles.adoptButtonText}>
                      Solicitar adopción
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => router.back()}
                    activeOpacity={0.85}
                  >
                    <Text style={styles.backButtonText}>Volver</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

function createStyles(colors: AppPalette) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
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
      backgroundColor: colors.surface,
      borderRadius: 22,
      overflow: "hidden",
    },
    cardShadow: {
      marginBottom: Spacing.three,
      marginVertical: Spacing.three,
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
      color: colors.text,
    },
    subtitle: {
      marginTop: Spacing.one,
      fontSize: 14,
      lineHeight: Spacing.four,
      color: colors.textSecondary,
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
      backgroundColor: colors.border,
      marginVertical: 7,
    },
    descriptionTitle: {
      fontSize: 17,
      fontWeight: "800",
      color: colors.text,
      marginBottom: 7,
    },
    description: {
      fontSize: 15,
      lineHeight: 24,
      color: colors.textSecondary,
    },
    backButton: {
      flex: 1,
      paddingVertical: 14,
      borderRadius: 14,
      borderWidth: 1,
      borderColor: colors.primary,
      backgroundColor: colors.surface,
      alignItems: "center",
    },
    backButtonText: {
      fontSize: 16,
      fontWeight: "700",
      color: colors.primary,
    },
    notFound: {
      flex: 1,
      justifyContent: "center",
      alignContent: "center",
      padding: Spacing.four,
    },
    notFoundText: {
      fontSize: Spacing.three,
      color: colors.textSecondary,
    },
    favoriteButton: {
      position: "absolute",
      top: 14,
      right: 14,
      width: 40,
      height: 40,
      borderRadius: Spacing.four,
      backgroundColor: "rgba(255,255,255,0.9)",
      justifyContent: "center",
      alignItems: "center",
    },
    favoriteIcon: {
      fontSize: 20,
    },
    adoptButton: {
      flex: 2,
      paddingVertical: 14,
      borderRadius: 14,
      backgroundColor: colors.primary,
      alignItems: "center",
    },
    adoptButtonText: {
      fontSize: 16,
      fontWeight: "700",
      color: colors.onPrimary,
    },
    actions: {
      flexDirection: "row",
      gap: Spacing.two,
      marginTop: Spacing.four,
    },
  });
}
