import { Pet, pets as mascotasIniciales } from "@/data/pets";
import { create } from "zustand";

interface PetsState {
  pets: Pet[];
  addPet: (pet: Pet) => void;
}

export const usePetsStore = create<PetsState>((set) => ({
  pets: mascotasIniciales,
  addPet: (pet) => set((state) => ({ pets: [pet, ...state.pets] })),
}));
