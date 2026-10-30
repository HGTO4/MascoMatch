export interface Direccion {
  city?: string | null;
  subregion?: string | null;
}

export function nombreCiudad(direccion?: Direccion): string {
  return (direccion?.city || direccion?.subregion || "").trim();
}
