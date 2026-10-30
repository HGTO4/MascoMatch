import {
  armarMascota,
  esPublicacionValida,
  validarPublicacion,
} from "@/utils/publish";

const datosValidos = {
  imagen: "file:///foto.jpg",
  nombre: "Titan",
  tipo: "Perro",
  tamano: "Pequeño",
  sexo: "Macho",
  edad: "2 años",
  raza: "Mestizo",
  ciudad: "Córdoba",
  descripcion:
    "Titan es un perro muy juguetón y cariñoso. Le encanta correr en espacios abiertos y se lleva bien con otros perros.",
};

describe("validarPublicacion", () => {
  it("con datos válidos no devuelve error", () => {
    const errores = validarPublicacion(datosValidos);
    expect(Object.keys(errores)).toEqual([]);
  });

  it("con el nombre vacío falla nombre", () => {
    const errores = validarPublicacion({ ...datosValidos, nombre: "" });
    expect(Object.keys(errores)).toEqual(["nombre"]);
  });

  it("con el nombre solo de espacios falla nombre", () => {
    const errores = validarPublicacion({ ...datosValidos, nombre: "   " });
    expect(Object.keys(errores)).toEqual(["nombre"]);
  });

  it("con el tipo vacío falla tipo", () => {
    const errores = validarPublicacion({ ...datosValidos, tipo: "" });
    expect(Object.keys(errores)).toEqual(["tipo"]);
  });

  it("con el tipo inexistente falla tipo", () => {
    const errores = validarPublicacion({ ...datosValidos, tipo: "Conejo" });
    expect(Object.keys(errores)).toEqual(["tipo"]);
  });

  it("con el tamaño vacío falla tamaño", () => {
    const errores = validarPublicacion({ ...datosValidos, tamano: "" });
    expect(Object.keys(errores)).toEqual(["tamano"]);
  });

  it("con el sexo vacío falla sexo", () => {
    const errores = validarPublicacion({ ...datosValidos, sexo: "" });
    expect(Object.keys(errores)).toEqual(["sexo"]);
  });

  it("con la edad vacía falla edad", () => {
    const errores = validarPublicacion({ ...datosValidos, edad: "" });
    expect(Object.keys(errores)).toEqual(["edad"]);
  });

  it("con la raza vacía no devuelve errores", () => {
    const errores = validarPublicacion({ ...datosValidos, raza: "" });
    expect(Object.keys(errores)).toEqual([]);
  });

  it("con la ciudad vacía falla ciudad", () => {
    const errores = validarPublicacion({ ...datosValidos, ciudad: "" });
    expect(Object.keys(errores)).toEqual(["ciudad"]);
  });

  it("con una descripción corta falla descripción", () => {
    const errores = validarPublicacion({
      ...datosValidos,
      descripcion: "Hola",
    });
    expect(Object.keys(errores)).toEqual(["descripcion"]);
  });

  it("con una descripción con 19 caracteres falla descripción", () => {
    const errores = validarPublicacion({
      ...datosValidos,
      descripcion: "Titan es un perrito",
    });
    expect(Object.keys(errores)).toEqual(["descripcion"]);
  });

  it("con una descripción con 20 caracteres no falla", () => {
    const errores = validarPublicacion({
      ...datosValidos,
      descripcion: "Titan es un perrito!",
    });
    expect(Object.keys(errores)).toEqual([]);
  });

  it("con todo vacío fallan los siete campos", () => {
    const errores = validarPublicacion({
      ...datosValidos,
      imagen: "",
      nombre: "",
      tipo: "",
      tamano: "",
      sexo: "",
      edad: "",
      ciudad: "",
      descripcion: "",
    });
    expect(Object.keys(errores)).toEqual([
      "imagen",
      "nombre",
      "tipo",
      "tamano",
      "sexo",
      "edad",
      "ciudad",
      "descripcion",
    ]);
  });

  it("sin foto falla imagen", () => {
    const errores = validarPublicacion({ ...datosValidos, imagen: "" });

    expect(Object.keys(errores)).toEqual(["imagen"]);
  });
});

describe("esPublicacionValida", () => {
  it("con un objeto vacío devuelve true", () => {
    expect(esPublicacionValida({})).toBe(true);
  });

  it("con algún error devuelve false", () => {
    expect(esPublicacionValida({ nombre: "Ingresá tu nombre" })).toBe(false);
  });
});

describe("armarMascota", () => {
  const usuario = { nombre: "Ana", email: "ana@mail.com" };

  it("arma una mascota completa con los datos del formulario", () => {
    const mascota = armarMascota(datosValidos, usuario, "100");

    expect(mascota.id).toBe("100");
    expect(mascota.name).toBe(datosValidos.nombre);
    expect(mascota.shelter).toBe("Ana");
    expect(mascota.ownerEmail).toBe("ana@mail.com");
  });

  it("usa la raza por defecto cuando la raza está vacía", () => {
    const datos = { ...datosValidos, raza: "" };
    const mascota = armarMascota(datos, usuario, "101");

    expect(mascota.breed).toBe("Mestizo");
  });

  it("elimina los espacios sobrantes del nombre, edad, ciudad y descripción", () => {
    const datos = {
      ...datosValidos,
      nombre: " Titan ",
      edad: " 2 año ",
      ciudad: " Córdoba ",
      descripcion: " Titan es buen perro lindo ",
    };

    const mascota = armarMascota(datos, usuario, "102");

    expect(mascota.name).toBe("Titan");
    expect(mascota.age).toBe("2 año");
    expect(mascota.location).toBe("Córdoba");
    expect(mascota.description).toBe("Titan es buen perro lindo");
  });

  it("mantiene el tipo, tamaño y sexo originales", () => {
    const datos = {
      ...datosValidos,
      tipo: "Perro",
      tamano: "Grande",
      sexo: "Macho",
    };

    const mascota = armarMascota(datos, usuario, "103");

    expect(mascota.type).toBe("Perro");
    expect(mascota.size).toBe("Grande");
    expect(mascota.sex).toBe("Macho");
  });

  it("guarda la foto elegida como imagen de la mascota", () => {
    const mascota = armarMascota(datosValidos, usuario, "104");

    expect(mascota.image).toBe(datosValidos.imagen);
  });
});
