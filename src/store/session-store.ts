import { create } from "zustand";

export interface Usuario {
  nombre: string;
  email: string;
}

interface SessionState {
  usuario: Usuario | null;
  ingresar: (usuario: Usuario) => void;
  salir: () => void;
}

export const useSessionStore = create<SessionState>((set) => ({
  usuario: null,
  ingresar: (usuario) => set({ usuario }),
  salir: () => set({ usuario: null }),
}));
