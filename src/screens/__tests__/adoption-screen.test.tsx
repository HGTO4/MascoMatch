import { AdoptionScreen } from "@/screens/adoption-screen";
import { fireEvent, render } from "@testing-library/react-native";

const mockNavigate = jest.fn();
const mockBack = jest.fn();

jest.mock("expo-router", () => ({
  useLocalSearchParams: () => ({ id: "1" }),
  useRouter: () => ({ navigate: mockNavigate, back: mockBack }),
}));

describe("AdoptionScreen", () => {
  beforeEach(() => {
    mockNavigate.mockClear();
    mockBack.mockClear();
  });

  it("muestra a qué mascota se le solicita la adopción", async () => {
    const { getByText } = await render(<AdoptionScreen />);
    expect(getByText(/Rocky/)).toBeTruthy();
  });

  it("con el formulario vacio muestra los errores", async () => {
    const { getByTestId, getByText } = await render(<AdoptionScreen />);
    await fireEvent.press(getByTestId("boton-enviar"));
    expect(getByText("Ingresá tu nombre")).toBeTruthy();
    expect(getByText("Ingresá un email válido")).toBeTruthy();
    expect(getByText("Escribí al menos 10 caracteres")).toBeTruthy();
  });

  it("con datos válidos aparece la confirmación", async () => {
    const { getByTestId, getByText } = await render(<AdoptionScreen />);
    await fireEvent.changeText(getByTestId("input-nombre"), "Ana");
    await fireEvent.changeText(getByTestId("input-email"), "Ana@mail.com");
    await fireEvent.changeText(
      getByTestId("input-mensaje"),
      "Quiero adoptar porque tengo un buen patio",
    );
    await fireEvent.press(getByTestId("boton-enviar"));
    expect(getByText("¡Solicitud enviada! 🐾")).toBeTruthy();
  });

  it("al volver al inicio navega a la ruta raíz", async () => {
    const { getByTestId, getByText } = await render(<AdoptionScreen />);
    await fireEvent.changeText(getByTestId("input-nombre"), "Ana");
    await fireEvent.changeText(getByTestId("input-email"), "Ana@mail.com");
    await fireEvent.changeText(
      getByTestId("input-mensaje"),
      "Quiero adoptar porque tengo un buen patio",
    );
    await fireEvent.press(getByTestId("boton-enviar"));
    await fireEvent.press(getByText("Volver al inicio"));
    expect(mockNavigate).toHaveBeenCalledWith("/");
  });

  it("el botón volver del formulario vuelve a la pantalla anterior", async () => {
    const { getByTestId, queryByText } = await render(<AdoptionScreen />);
    await fireEvent.press(getByTestId("boton-volver"));
    expect(mockBack).toHaveBeenCalledTimes(1);
    expect(mockNavigate).not.toHaveBeenCalled();
    expect(queryByText("¡Solicitud enviada! 🐾")).toBeNull();
  });
});
