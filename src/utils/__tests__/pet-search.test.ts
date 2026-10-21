import { pets } from "@/data/pets";
import { filtrarMascotas } from "@/utils/pet-search";

describe("filtrarMascotas", () => {
  it("sin filtros devuelve todas las mascotas", () => {
    // Arrange: preparar los datos
    const filtros = { texto: "", tipo: "Todos", tamano: "Todos" };

    // Act: ejecutar la funcion
    const resultado = filtrarMascotas(pets, filtros);

    // Assert: verificar el resultado
    expect(resultado).toHaveLength(6);
  });

  it("filtra solo gatos", () => {
    // Arrange: preparar los datos
    const filtros = { texto: "", tipo: "Gato", tamano: "Todos" };

    // Act: ejecutar la funcion
    const resultado = filtrarMascotas(pets, filtros);

    // Assert: verificar el resultado
    expect(resultado).toHaveLength(3);
  });

  it("combina tipo y tamaño", () => {
    // Arrange: preparar los datos
    const filtros = { texto: "", tipo: "Perro", tamano: "Pequeño" };

    // Act: ejecutar la funcion
    const resultado = filtrarMascotas(pets, filtros);

    // Assert: verifica el resultado
    expect(resultado).toHaveLength(1);
  });

  it("combina nombre, tipo, tamaño", () => {
    // Arrange: preparar los datos
    const filtros = { texto: "a", tipo: "Gato", tamano: "Mediano" };

    // Act: ejecutar la funcion
    const resultado = filtrarMascotas(pets, filtros);
    const nombres = resultado.map((pet) => pet.name);

    // Assert: verifica el resultado
    expect(resultado).toHaveLength(2);
    expect(nombres).toEqual(["Mia", "Nala"]);
  });

  it("todo en mayúscula", () => {
    // Arrange: preparar los datos
    const filtros = { texto: "ROCKY", tipo: "Todos", tamano: "Todos" };

    // Act: ejecutar la funcion
    const resultado = filtrarMascotas(pets, filtros);
    const nombres = resultado.map((pet) => pet.name);

    // Assert: verificar el resultado
    expect(resultado).toHaveLength(1);
    expect(nombres).toEqual(["Rocky"]);
  });

  it("todo en minúscula", () => {
    // Arrange: preparar los datos:
    const filtros = { texto: "rocky", tipo: "Todos", tamano: "Todos" };

    // Act: ejecutar la funcion
    const resultado = filtrarMascotas(pets, filtros);
    const nombres = resultado.map((pet) => pet.name);

    // Assert: verificar el resultado
    expect(resultado).toHaveLength(1);
    expect(nombres).toEqual(["Rocky"]);
  });

  it("con un espacio al final", () => {
    // Arrange: preparar los datos
    const filtros = { texto: "rocky ", tipo: "Todos", tamano: "Todos" };

    // Act: ejecutar la funcion
    const resultado = filtrarMascotas(pets, filtros);
    const nombres = resultado.map((pet) => pet.name);

    // Assert: verificar el resultado
    expect(resultado).toHaveLength(1);
    expect(nombres).toEqual(["Rocky"]);
  });

  it("devolver una lista vacía con busqueda zzz", () => {
    // Arrange: preprar los datos
    const filtros = { texto: "zzz", tipo: "Todos", tamano: "Todos" };

    // Act: ejecutar la funcion
    const resultado = filtrarMascotas(pets, filtros);

    // Assert: verificar el resultado
    expect(resultado).toHaveLength(0);
  });
});
