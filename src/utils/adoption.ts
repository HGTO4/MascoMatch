export interface SolicitudAdopcion {
  nombre: string;
  email: string;
  telefono: string;
  mensaje: string;
}

export interface ErroresSolicitud {
  nombre?: string;
  email?: string;
  mensaje?: string;
}

const MENSAJE_MINIMO = 10;
const EMAIL_VALIDO = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validarSolicitud(datos: SolicitudAdopcion): ErroresSolicitud {
  const errores: ErroresSolicitud = {};

  if (datos.nombre.trim() === "") {
    errores.nombre = "Ingresá tu nombre";
  }

  if (!EMAIL_VALIDO.test(datos.email.trim())) {
    errores.email = "Ingresá un email válido";
  }

  if (datos.mensaje.trim().length < MENSAJE_MINIMO) {
    errores.mensaje = `Escribí al menos ${MENSAJE_MINIMO} caracteres`;
  }

  return errores;
}

export function esSolicitudValida(errores: ErroresSolicitud): boolean {
  return Object.keys(errores).length === 0;
}
