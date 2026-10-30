import { pets as mascotasIniciales } from "@/data/pets";
import { PublishScreen } from "@/screens/publish-screen";
import { usePetsStore } from "@/store/pets-store";
import { useSessionStore } from "@/store/session-store";
import { fireEvent, render } from "@testing-library/react-native";
import * as ImagePicker from "expo-image-picker";
import { Alert } from "react-native";

const mockNavigate = jest.fn();
const mockBack = jest.fn();

jest.mock("expo-router", () => ({
  useRouter: () => ({ navigate: mockNavigate, back: mockBack }),
}));

jest.mock("expo-image-picker", () => ({
  requestMediaLibraryPermissionsAsync: jest.fn(),
  launchImageLibraryAsync: jest.fn(),
}));

jest.mock("expo-location", () => ({
  requestForegroundPermissionsAsync: jest.fn(),
  hasServicesEnabledAsync: jest.fn(),
  getCurrentPositionAsync: jest.fn(),
  reverseGeocodeAsync: jest.fn(),
  Accuracy: { Balanced: 3 },
}));

const usuario = { nombre: "Ana", email: "ana@mail.com" };

describe("PublishScreen", () => {
  beforeEach(() => {
    useSessionStore.setState({ usuario: null });
    usePetsStore.setState({ pets: mascotasIniciales });
    mockNavigate.mockClear();
    mockBack.mockClear();
    jest
      .mocked(ImagePicker.requestMediaLibraryPermissionsAsync)
      .mockResolvedValue({ granted: true } as any);
    jest.mocked(ImagePicker.launchImageLibraryAsync).mockResolvedValue({
      canceled: false,
      assets: [{ uri: "file:///foto.jpg" }],
    } as any);
  });

  it("sin sesión muestra el aviso y no el formulario", async () => {
    const { getByText, queryByTestId } = await render(<PublishScreen />);
    expect(getByText("Ingresá para publicar")).toBeTruthy();
    expect(queryByTestId("boton-publicar")).toBeNull();
  });

  it("sin sesión, el botón lleva al perfil", async () => {
    const { getByTestId } = await render(<PublishScreen />);
    await fireEvent.press(getByTestId("boton-ir-perfil"));
    expect(mockNavigate).toHaveBeenCalledWith("/profile");
  });

  it("con el formulario vacío muestra los errores, también el de la foto, y no publica", async () => {
    useSessionStore.setState({ usuario });
    const { getByTestId, getByText } = await render(<PublishScreen />);
    await fireEvent.press(getByTestId("boton-publicar"));
    expect(getByText("Elegí una foto de la mascota")).toBeTruthy();
    expect(getByText("Ingresá el nombre de la mascota")).toBeTruthy();
    expect(usePetsStore.getState().pets).toHaveLength(mascotasIniciales.length);
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it("al elegir una foto de la galería muestra la vista previa", async () => {
    useSessionStore.setState({ usuario });
    const { getByTestId } = await render(<PublishScreen />);
    await fireEvent.press(getByTestId("boton-galeria"));
    expect(getByTestId("foto-vista-previa")).toBeTruthy();
  });

  it("si rechaza el permiso de fotos avisa y no elige ninguna", async () => {
    jest
      .mocked(ImagePicker.requestMediaLibraryPermissionsAsync)
      .mockResolvedValue({ granted: false } as any);
    const alerta = jest.spyOn(Alert, "alert").mockImplementation(() => {});
    useSessionStore.setState({ usuario });
    const { getByTestId, queryByTestId } = await render(<PublishScreen />);
    await fireEvent.press(getByTestId("boton-galeria"));
    expect(alerta).toHaveBeenCalledTimes(1);
    expect(queryByTestId("foto-vista-previa")).toBeNull();
    alerta.mockRestore();
  });

  it("con datos válidos y foto publica la mascota y vuelve al inicio", async () => {
    useSessionStore.setState({ usuario });
    const { getByTestId, getByText } = await render(<PublishScreen />);
    await fireEvent.press(getByTestId("boton-galeria"));
    await fireEvent.changeText(getByTestId("input-nombre"), "Titan");
    await fireEvent.press(getByText("Perro"));
    await fireEvent.press(getByText("Pequeño"));
    await fireEvent.press(getByText("Macho"));
    await fireEvent.changeText(getByTestId("input-edad"), "2 años");
    await fireEvent.changeText(getByTestId("input-ciudad"), "Córdoba");
    await fireEvent.changeText(
      getByTestId("input-descripcion"),
      "Titan es un perro muy juguetón y cariñoso.",
    );
    await fireEvent.press(getByTestId("boton-publicar"));

    const lista = usePetsStore.getState().pets;
    expect(lista).toHaveLength(mascotasIniciales.length + 1);
    expect(lista[0].name).toBe("Titan");
    expect(lista[0].image).toBe("file:///foto.jpg");
    expect(mockNavigate).toHaveBeenCalledWith("/");
  });

  it("cancelar vuelve a la pantalla anterior", async () => {
    useSessionStore.setState({ usuario });
    const { getByTestId } = await render(<PublishScreen />);
    await fireEvent.press(getByTestId("boton-volver"));
    expect(mockBack).toHaveBeenCalledTimes(1);
  });
});
