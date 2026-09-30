import { create } from "zustand";

interface FavoriteStore {
  favoriteIds: string[];
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
}

export const useFavoritesStore = create<FavoriteStore>((set, get) => ({
  favoriteIds: [],

  toggleFavorite: (id) =>
    set((state) => {
      const yaEsFavorito = state.favoriteIds.includes(id);
      return {
        favoriteIds: yaEsFavorito
          ? state.favoriteIds.filter((favId) => favId !== id)
          : [...state.favoriteIds, id],
      };
    }),

  isFavorite: (id) => get().favoriteIds.includes(id),
}));
