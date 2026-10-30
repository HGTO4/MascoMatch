import { LocationButton } from "@/components/location-button";
import { fireEvent, render } from "@testing-library/react-native";
import * as Location from "expo-location";
import { Alert } from "react-native";

jest.mock("expo-location", () => ({
  requestForegroundPermissionsAsync: jest.fn(),
  hasServicesEnabledAsync: jest.fn(),
  getCurrentPositionAsync: jest.fn(),
  reverseGeocodeAsync: jest.fn(),
  Accuracy: { Balanced: 3 },
}));

describe("LocationButton", () => {
  let alerta: jest.SpyInstance;

  beforeEach(() => {
    jest.clearAllMocks();
    alerta = jest.spyOn(Alert, "alert").mockImplementation(() => {});
    jest
      .mocked(Location.requestForegroundPermissionsAsync)
      .mockResolvedValue({ granted: true } as any);
    jest.mocked(Location.hasServicesEnabledAsync).mockResolvedValue(true);
    jest.mocked(Location.getCurrentPositionAsync).mockResolvedValue({
      coords: { latitude: -31.4, longitude: -64.18 },
    } as any);
    jest
      .mocked(Location.reverseGeocodeAsync)
      .mockResolvedValue([{ city: "Córdoba", subregion: "Capital" }] as any);
  });

  afterEach(() => {
    alerta.mockRestore();
  });

  it("con permiso y ciudad detectada avisa la ciudad", async () => {
    const onFound = jest.fn();
    const { getByTestId } = await render(<LocationButton onFound={onFound} />);
    await fireEvent.press(getByTestId("boton-ubicacion"));
    expect(onFound).toHaveBeenCalledWith("Córdoba");
    expect(alerta).not.toHaveBeenCalled();
  });

  it("si rechaza el permiso avisa y no devuelve ciudad", async () => {
    jest
      .mocked(Location.requestForegroundPermissionsAsync)
      .mockResolvedValue({ granted: false } as any);
    const onFound = jest.fn();
    const { getByTestId } = await render(<LocationButton onFound={onFound} />);
    await fireEvent.press(getByTestId("boton-ubicacion"));
    expect(alerta).toHaveBeenCalledTimes(1);
    expect(onFound).not.toHaveBeenCalled();
  });

  it("con el GPS apagado avisa y no busca la posición", async () => {
    jest.mocked(Location.hasServicesEnabledAsync).mockResolvedValue(false);
    const onFound = jest.fn();
    const { getByTestId } = await render(<LocationButton onFound={onFound} />);
    await fireEvent.press(getByTestId("boton-ubicacion"));
    expect(alerta).toHaveBeenCalledTimes(1);
    expect(Location.getCurrentPositionAsync).not.toHaveBeenCalled();
    expect(onFound).not.toHaveBeenCalled();
  });

  it("si no se puede detectar la ciudad avisa y no devuelve nada", async () => {
    jest
      .mocked(Location.reverseGeocodeAsync)
      .mockResolvedValue([{ city: null, subregion: null }] as any);
    const onFound = jest.fn();
    const { getByTestId } = await render(<LocationButton onFound={onFound} />);
    await fireEvent.press(getByTestId("boton-ubicacion"));
    expect(alerta).toHaveBeenCalledTimes(1);
    expect(onFound).not.toHaveBeenCalled();
  });

  it("si falla la geocodificación avisa en vez de romper", async () => {
    jest
      .mocked(Location.reverseGeocodeAsync)
      .mockRejectedValue(new Error("sin internet"));
    const onFound = jest.fn();
    const { getByTestId } = await render(<LocationButton onFound={onFound} />);
    await fireEvent.press(getByTestId("boton-ubicacion"));
    expect(alerta).toHaveBeenCalledTimes(1);
    expect(onFound).not.toHaveBeenCalled();
  });
});
