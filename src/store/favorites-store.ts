import { create } from "zustand";

interface FavoriteStore {
  favoriteIds: string[];
  toggleFavorite: (id: string) => void;
}

export const useFavoritesStore = create<FavoriteStore>((set) => ({
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
}));
