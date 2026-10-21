import { FiltersPanel } from "@/components/filters-panel";
import { fireEvent, render } from "@testing-library/react-native";

const propsBase = {
  busqueda: "",
  onBusquedaChange: jest.fn(),
  tipo: "Todos",
  onTipoChange: jest.fn(),
  tamano: "Todos",
  onTamanoChange: jest.fn(),
  onLimpiar: jest.fn(),
  hayFiltros: false,
};

describe("FiltersPanel", () => {
  it("muestra las opciones de tipo y tamaño", async () => {
    const { getByText, getAllByText } = await render(
      <FiltersPanel {...propsBase} />,
    );

    expect(getByText("Perro")).toBeTruthy();
    expect(getByText("Gato")).toBeTruthy();
    expect(getAllByText("Todos")).toHaveLength(2);
  });

  it("al tocar un chip de tipo avisa cuál", async () => {
    const onTipoChange = jest.fn();
    const { getByText } = await render(
      <FiltersPanel {...propsBase} onTipoChange={onTipoChange} />,
    );
    await fireEvent.press(getByText("Gato"));
    expect(onTipoChange).toHaveBeenCalledWith("Gato");
  });

  it("sin filtros activos no muestra el botón limpiar", async () => {
    const { queryByText } = await render(<FiltersPanel {...propsBase} />);
    expect(queryByText("Limpiar filtros")).toBeNull();
  });

  it("con filtros activos muestra el botón limpiar", async () => {
    const { getByText } = await render(
      <FiltersPanel {...propsBase} hayFiltros={true} />,
    );
    expect(getByText("Limpiar filtros")).toBeTruthy();
  });

  it("al tocar limpiar se llama a onLimpiar", async () => {
    const onLimpiar = jest.fn();
    const { getByText } = await render(
      <FiltersPanel {...propsBase} hayFiltros={true} onLimpiar={onLimpiar} />,
    );
    await fireEvent.press(getByText("Limpiar filtros"));
    expect(onLimpiar).toHaveBeenCalledTimes(1);
  });
});
