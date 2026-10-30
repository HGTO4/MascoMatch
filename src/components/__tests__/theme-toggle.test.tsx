import { ThemeToggle } from "@/components/theme-toggle";
import { useThemeStore } from "@/store/theme-store";
import { fireEvent, render } from "@testing-library/react-native";

describe("ThemeToggle", () => {
  beforeEach(() => {
    useThemeStore.setState({ mode: "system" });
  });

  it("en modo claro muestra el sol", async () => {
    const { getByText } = await render(<ThemeToggle />);
    expect(getByText("☀️")).toBeTruthy();
  });

  it("al tocarlo, de claro pasa a oscuro y muestra la luna", async () => {
    const { getByText, getByTestId } = await render(<ThemeToggle />);
    await fireEvent.press(getByTestId("theme-toggle"));

    expect(useThemeStore.getState().mode).toBe("dark");
    expect(getByText("🌙")).toBeTruthy();
  });

  it("al tener en modo oscuro pasa a claro y muestra el sol", async () => {
    useThemeStore.setState({ mode: "dark" });
    const { getByText, getByTestId } = await render(<ThemeToggle />);
    await fireEvent.press(getByTestId("theme-toggle"));
    expect(useThemeStore.getState().mode).toBe("light");
    expect(getByText("☀️")).toBeTruthy();
  });
});
