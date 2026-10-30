import { esIngresoValido, validarIngreso } from "@/utils/auth";

const datosValidos = {
  nombre: "Ana",
  email: "ana@mail.com",
};

describe("validarIngreso", () => {
  it("con datos válidos no devuelve error", () => {
    const errores = validarIngreso(datosValidos);
    expect(Object.keys(errores)).toEqual([]);
  });

  it("con el nombre vacío falla nombre", () => {
    const errores = validarIngreso({ ...datosValidos, nombre: "" });
    expect(Object.keys(errores)).toEqual(["nombre"]);
  });

  it("con el nombre solo de espacios falla nombre", () => {
    const errores = validarIngreso({ ...datosValidos, nombre: "     " });
    expect(Object.keys(errores)).toEqual(["nombre"]);
  });

  it("con un email sin @ falla email", () => {
    const errores = validarIngreso({ ...datosValidos, email: "ana.mail.com" });
    expect(Object.keys(errores)).toEqual(["email"]);
  });

  it("con un mail sin punto después de la @ falla mail", () => {
    const errores = validarIngreso({ ...datosValidos, email: "ana@mail" });
    expect(Object.keys(errores)).toEqual(["email"]);
  });

  it("con un mail con espacios alrededor es válido", () => {
    const errores = validarIngreso({
      ...datosValidos,
      email: " ana@mail.com ",
    });
    expect(Object.keys(errores)).toEqual([]);
  });

  it("con todo vacío fallan ambos campos en orden", () => {
    const errores = validarIngreso({ ...datosValidos, nombre: "", email: "" });
    expect(Object.keys(errores)).toEqual(["nombre", "email"]);
  });
});

describe("esIngresoValido", () => {
  it("con un objeto vacío devuelve true", () => {
    expect(esIngresoValido({})).toBe(true);
  });

  it("con algún error devuelve false", () => {
    expect(esIngresoValido({ nombre: "Ingresá tu nombre" })).toBe(false);
  });
});
