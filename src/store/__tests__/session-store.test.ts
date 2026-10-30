import { useSessionStore } from "@/store/session-store";

describe("useSessionStore", () => {
  beforeEach(() => {
    useSessionStore.setState({ usuario: null });
  });

  it("arranca sin usuario", () => {
    expect(useSessionStore.getState().usuario).toBeNull();
  });

  it("ingresar guarda el usuario", () => {
    useSessionStore
      .getState()
      .ingresar({ nombre: "Ana", email: "ana@mail.com" });
    expect(useSessionStore.getState().usuario).toEqual({
      nombre: "Ana",
      email: "ana@mail.com",
    });
  });

  it("salir borra el usuario", () => {
    useSessionStore
      .getState()
      .ingresar({ nombre: "Ana", email: "ana@mail.com" });
    useSessionStore.getState().salir();
    expect(useSessionStore.getState().usuario).toBeNull();
  });
});
