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
export const MENSAJE_MAXIMO = 300;
export const EMAIL_VALIDO = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validarSolicitud(datos: SolicitudAdopcion): ErroresSolicitud {
  const errores: ErroresSolicitud = {};
  const largoMensaje = datos.mensaje.trim().length;

  if (datos.nombre.trim() === "") {
    errores.nombre = "Ingresá tu nombre";
  }

  if (!EMAIL_VALIDO.test(datos.email.trim())) {
    errores.email = "Ingresá un email válido";
  }

  if (largoMensaje < MENSAJE_MINIMO) {
    errores.mensaje = `Escribí al menos ${MENSAJE_MINIMO} caracteres`;
  } else if (largoMensaje > MENSAJE_MAXIMO) {
    errores.mensaje = `Escribí como máximo ${MENSAJE_MAXIMO} caracteres`;
  }

  return errores;
}

export function esSolicitudValida(errores: ErroresSolicitud): boolean {
  return Object.keys(errores).length === 0;
}
