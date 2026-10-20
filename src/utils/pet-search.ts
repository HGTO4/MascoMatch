import { Pet } from "@/data/pets";

export interface Filtros {
  texto: string;
  tipo: string;
  tamano: string;
}

export function filtrarMascotas(pets: Pet[], filtros: Filtros): Pet[] {
  const buscando = filtros.texto.trim().toLowerCase();

  return pets.filter((pet) => {
    const coincideNombre = pet.name.toLowerCase().includes(buscando);
    const coincideTipo = filtros.tipo === "Todos" || pet.type === filtros.tipo;
    const coincideTamano =
      filtros.tamano === "Todos" || pet.size === filtros.tamano;

    return coincideNombre && coincideTipo && coincideTamano;
  });
}

export function buscarPorNombre(pets: Pet[], texto: string): Pet[] {
  const buscando = texto.trim().toLowerCase();
  return pets.filter((pet) => pet.name.toLowerCase().includes(buscando));
}
