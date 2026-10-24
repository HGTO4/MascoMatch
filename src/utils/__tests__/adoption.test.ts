import { esSolicitudValida, validarSolicitud } from "@/utils/adoption";

const datosValidos = {
  nombre: "Ana",
  email: "ana@mail.com",
  telefono: "",
  mensaje: "Quiero adoptar porque tengo un buen patio",
};

describe("validarSolicitud", () => {
  it("con datos válidos no devuelve errores", () => {
    const errores = validarSolicitud(datosValidos);
    expect(Object.keys(errores)).toEqual([]);
  });

  it("con el nombre vacio falla nombre", () => {
    const errores = validarSolicitud({ ...datosValidos, nombre: "" });
    expect(Object.keys(errores)).toEqual(["nombre"]);
  });

  it("con el nombre solo de espacios falla el nombre", () => {
    const errores = validarSolicitud({ ...datosValidos, nombre: "   " });
    expect(Object.keys(errores)).toEqual(["nombre"]);
  });

  it("con un email sin @ falla mail", () => {
    const errores = validarSolicitud({
      ...datosValidos,
      email: "ana.mail.com",
    });
    expect(Object.keys(errores)).toEqual(["email"]);
  });

  it("con un mail sin punto después de la @ falla email", () => {
    const errores = validarSolicitud({ ...datosValidos, email: "ana@mail" });
    expect(Object.keys(errores)).toEqual(["email"]);
  });

  it("con un email con espacios alrededor es válido", () => {
    const errores = validarSolicitud({
      ...datosValidos,
      email: " ana@mail.com ",
    });
    expect(Object.keys(errores)).toEqual([]);
  });

  it("con un mensaje corto falla mensaje", () => {
    const errores = validarSolicitud({ ...datosValidos, mensaje: "Hola" });
    expect(Object.keys(errores)).toEqual(["mensaje"]);
  });

  it("con todo vacío fallan los tres campos", () => {
    const errores = validarSolicitud({
      ...datosValidos,
      nombre: "",
      email: "",
      mensaje: "",
    });
    expect(Object.keys(errores)).toEqual(["nombre", "email", "mensaje"]);
  });

  it("con el teléfono vacío no devuelve errores", () => {
    const errores = validarSolicitud({ ...datosValidos, telefono: "" });
    expect(Object.keys(errores)).toEqual([]);
  });
});

describe("esSolicitudValida", () => {
  it("con un objeto vacio devuelve true", () => {
    expect(esSolicitudValida({})).toBe(true);
  });

  it("con algún error devuelve false", () => {
    expect(esSolicitudValida({ nombre: "Ingresá tu nombre" })).toBe(false);
  });
});
