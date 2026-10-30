import { EMAIL_VALIDO } from "@/utils/adoption";

export interface DatosIngreso {
  nombre: string;
  email: string;
}

export interface ErroresIngreso {
  nombre?: string;
  email?: string;
}

export function validarIngreso(datos: DatosIngreso): ErroresIngreso {
  const errores: ErroresIngreso = {};
  if (datos.nombre.trim() === "") {
    errores.nombre = "Ingresá tu nombre";
  }

  if (!EMAIL_VALIDO.test(datos.email.trim())) {
    errores.email = "Ingresá un email válido";
  }

  return errores;
}

export function esIngresoValido(errores: ErroresIngreso): boolean {
  return Object.keys(errores).length === 0;
}
