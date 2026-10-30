import { FormField } from "@/components/form-field";
import { fireEvent, render } from "@testing-library/react-native";

describe("FormField", () => {
  it("muestra la etiqueta y el valor", async () => {
    const { getByText, getByTestId } = await render(
      <FormField
        label="Nombre"
        value="Ana"
        onChangeText={jest.fn()}
        testID="campo"
      />,
    );

    expect(getByText("Nombre")).toBeTruthy();
    expect(getByTestId("campo").props.value).toBe("Ana");
  });

  it("avisa lo que escribe el usuario", async () => {
    const onChangeText = jest.fn();
    const { getByTestId } = await render(
      <FormField
        label="Nombre"
        value=""
        onChangeText={onChangeText}
        testID="campo"
      />,
    );

    fireEvent.changeText(getByTestId("campo"), "Ana");
    expect(onChangeText).toHaveBeenCalledWith("Ana");
  });

  it("muestra el mensaje de error cuando hay", async () => {
    const { getByText } = await render(
      <FormField
        label="Nombre"
        value=""
        onChangeText={jest.fn()}
        error="Ingresá tu nombre"
      />,
    );

    expect(getByText("Ingresá tu nombre")).toBeTruthy();
  });
});
