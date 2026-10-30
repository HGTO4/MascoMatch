import { ProfileScreen } from "@/screens/profile-screen";
import { useSessionStore } from "@/store/session-store";
import { fireEvent, render } from "@testing-library/react-native";

const mockNavigate = jest.fn();

jest.mock("expo-router", () => ({
  useRouter: () => ({ navigate: mockNavigate }),
}));

describe("ProfileScreen", () => {
  beforeEach(() => {
    useSessionStore.setState({ usuario: null });
    mockNavigate.mockClear();
  });

  it("sin sesión muestra el formulario de ingreso", async () => {
    const { getByTestId } = await render(<ProfileScreen />);
    expect(getByTestId("boton-ingresar")).toBeTruthy();
  });

  it("al ingresar con el formulario vacío muestra los errores", async () => {
    const { getByTestId, getByText } = await render(<ProfileScreen />);
    await fireEvent.press(getByTestId("boton-ingresar"));
    expect(getByText("Ingresá tu nombre")).toBeTruthy();
    expect(getByText("Ingresá un email válido")).toBeTruthy();
  });

  it("con datos válidos saluda al usuario", async () => {
    const { getByTestId, getByText } = await render(<ProfileScreen />);
    await fireEvent.changeText(getByTestId("input-nombre"), "Ana");
    await fireEvent.changeText(getByTestId("input-email"), "ana@mail.com");
    await fireEvent.press(getByTestId("boton-ingresar"));
    expect(getByText(/Hola, Ana/)).toBeTruthy();
  });

  it("con sesión, el botón publicar navega a la pantalla de publicar", async () => {
    useSessionStore.setState({
      usuario: { nombre: "Ana", email: "ana@mail.com" },
    });
    const { getByTestId } = await render(<ProfileScreen />);
    await fireEvent.press(getByTestId("boton-publicar-mascota"));
    expect(mockNavigate).toHaveBeenCalledWith("/publish");
  });

  it("al salir vuelve al formulario", async () => {
    useSessionStore.setState({
      usuario: { nombre: "Ana", email: "ana@mail.com" },
    });
    const { getByTestId } = await render(<ProfileScreen />);
    await fireEvent.press(getByTestId("boton-salir"));
    expect(getByTestId("boton-ingresar")).toBeTruthy();
    expect(useSessionStore.getState().usuario).toBeNull();
  });
});
