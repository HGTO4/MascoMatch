import { Tag } from "@/components/tag";
import { AppColors, Spacing } from "@/constants/theme";
import { Pet } from "@/data/pets";
import { useFavoritesStore } from "@/store/favorites-store";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface PetCardProps {
  pet: Pet;
  onPress?: () => void;
}

export function PetCard({ pet, onPress }: PetCardProps) {
  const isFav = useFavoritesStore((state) =>
    state.favoriteIds.includes(pet.id),
  );
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);

  return (
    <TouchableOpacity
      style={styles.cardShadow}
      onPress={onPress}
      activeOpacity={0.9}
    >
      <View style={styles.card}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: pet.image }}
            style={styles.image}
            resizeMode="cover"
          />

          <View style={styles.typeBadge}>
            <Text style={styles.typeBadgeText}>{pet.type}</Text>
          </View>

          <TouchableOpacity
            style={styles.favoriteButton}
            onPress={(e) => {
              e.stopPropagation();
              toggleFavorite(pet.id);
            }}
            activeOpacity={0.8}
          >
            <Text style={styles.favoriteIcon}>{isFav ? "❤️" : "🤍"}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.info}>
          <Text style={styles.name}>{pet.name}</Text>

          <Text style={styles.subtitle} numberOfLines={1}>
            {pet.shelter} • {pet.location}
          </Text>

          <View style={styles.tagsRow}>
            <Tag label={pet.age} />
            <Tag label={pet.size} color={AppColors.primary} />
          </View>

          <Text style={styles.description} numberOfLines={2}>
            {pet.description}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cardShadow: {
    marginBottom: 18,
    borderRadius: 22,
    boxShadow: "0px 5px 14px rgba(31, 41, 55, 0.08)",
    elevation: 3,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    overflow: "hidden",
  },
  imageContainer: {
    position: "relative",
    backgroundColor: "#E9EEF3",
  },
  image: {
    width: "100%",
    height: 280,
  },
  typeBadge: {
    position: "absolute",
    bottom: 14,
    left: 14,

    paddingHorizontal: 22,
    paddingVertical: 7,

    borderRadius: 999,

    backgroundColor: "rgba(31, 41, 55, 0.82)",
  },
  typeBadgeText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "700",
  },
  info: {
    padding: 18,
  },
  name: {
    fontSize: 23,
    lineHeight: 28,
    fontWeight: "800",
    color: AppColors.textSecondary,
  },
  subtitle: {
    marginTop: 3,
    fontSize: 13,
    lineHeight: 18,
    color: AppColors.textSecondary,
  },
  tagsRow: {
    flexDirection: "row",
    marginTop: 13,
  },
  description: {
    marginTop: 12,
    fontSize: 14,
    lineHeight: 21,
    color: AppColors.textSecondary,
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
});
