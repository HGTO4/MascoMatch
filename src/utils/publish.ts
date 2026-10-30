import { Pet } from "@/data/pets";

export interface DatosPublicacion {
  imagen: string;
  nombre: string;
  tipo: string;
  tamano: string;
  sexo: string;
  edad: string;
  raza: string;
  ciudad: string;
  descripcion: string;
}

export interface ErroresPublicacion {
  imagen?: string;
  nombre?: string;
  tipo?: string;
  tamano?: string;
  sexo?: string;
  edad?: string;
  ciudad?: string;
  descripcion?: string;
}

export const TIPOS_MASCOTA: string[] = ["Perro", "Gato"];
export const TAMANOS_MASCOTA: string[] = ["Pequeño", "Mediano", "Grande"];
export const SEXOS_MASCOTA: string[] = ["Macho", "Hembra"];
const DESCRIPCION_MINIMA = 20;
export const DESCRIPCION_MAXIMA = 300;

export function validarPublicacion(
  datos: DatosPublicacion,
): ErroresPublicacion {
  const errores: ErroresPublicacion = {};
  const largoDescripcion = datos.descripcion.trim().length;

  if (datos.imagen === "") {
    errores.imagen = "Elegí una foto de la mascota";
  }

  if (datos.nombre.trim() === "") {
    errores.nombre = "Ingresá el nombre de la mascota";
  }

  if (!TIPOS_MASCOTA.includes(datos.tipo)) {
    errores.tipo = "Elegí un tipo";
  }

  if (!TAMANOS_MASCOTA.includes(datos.tamano)) {
    errores.tamano = "Elegí el tamaño";
  }

  if (!SEXOS_MASCOTA.includes(datos.sexo)) {
    errores.sexo = "Elegí el sexo";
  }

  if (datos.edad.trim() === "") {
    errores.edad = "Ingresá la edad de la mascota";
  }

  if (datos.ciudad.trim() === "") {
    errores.ciudad = "Ingresá la ciudad";
  }

  if (largoDescripcion < DESCRIPCION_MINIMA) {
    errores.descripcion = `Escribí al menos ${DESCRIPCION_MINIMA} caracteres`;
  } else if (largoDescripcion > DESCRIPCION_MAXIMA) {
    errores.descripcion = `Escribí como máximo ${DESCRIPCION_MAXIMA} caracteres`;
  }

  return errores;
}

export function esPublicacionValida(errores: ErroresPublicacion): boolean {
  return Object.keys(errores).length === 0;
}

export function armarMascota(
  datos: DatosPublicacion,
  usuario: { nombre: string; email: string },
  id: string,
): Pet {
  return {
    id,
    image: datos.imagen,
    name: datos.nombre.trim(),
    age: datos.edad.trim(),
    size: datos.tamano,
    type: datos.tipo,
    breed: datos.raza.trim() === "" ? "Mestizo" : datos.raza.trim(),
    sex: datos.sexo,
    shelter: usuario.nombre,
    location: datos.ciudad.trim(),
    description: datos.descripcion.trim(),
    ownerEmail: usuario.email,
  };
}
