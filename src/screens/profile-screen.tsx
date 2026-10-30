import { FormField } from "@/components/form-field";
import { Header } from "@/components/header";
import { AppPalette, Spacing } from "@/constants/theme";
import { useAppColors } from "@/hooks/use-app-colors";
import { useSessionStore } from "@/store/session-store";
import { ErroresIngreso, esIngresoValido, validarIngreso } from "@/utils/auth";
import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export function ProfileScreen() {
  const colors = useAppColors();
  const styles = createStyles(colors);
  const router = useRouter();
  const usuario = useSessionStore((state) => state.usuario);
  const ingresar = useSessionStore((state) => state.ingresar);
  const salir = useSessionStore((state) => state.salir);
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [errores, setErrores] = useState<ErroresIngreso>({});

  function enviar() {
    const nuevosErrores = validarIngreso({ nombre, email });
    setErrores(nuevosErrores);
    if (esIngresoValido(nuevosErrores)) {
      ingresar({ nombre: nombre.trim(), email: email.trim() });
      setNombre("");
      setEmail("");
    }
  }

  if (usuario) {
    return (
      <View style={styles.container}>
        <Header title="Mi Perfil" subtitle="Tu cuenta en MascoMatch" />
        <View style={styles.content}>
          <Text style={styles.saludo}>Hola, {usuario.nombre} 👋</Text>
          <Text style={styles.email}>{usuario.email}</Text>
          <View style={styles.actions}>
            <TouchableOpacity
              style={styles.boton}
              onPress={() => router.navigate("/publish")}
              activeOpacity={0.85}
              testID="boton-publicar-mascota"
            >
              <Text style={styles.botonTexto}>Publicar mascota</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.backButton}
              onPress={salir}
              activeOpacity={0.85}
              testID="boton-salir"
            >
              <Text style={styles.backButtonText}>Salir</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header title="Ingresá" subtitle="Para publicar en adopción" />
      <View style={styles.content}>
        <FormField
          label="Nombre"
          value={nombre}
          onChangeText={setNombre}
          error={errores.nombre}
          testID="input-nombre"
        />
        <FormField
          label="Email"
          value={email}
          onChangeText={setEmail}
          error={errores.email}
          keyboardType="email-address"
          testID="input-email"
        />
        <TouchableOpacity
          style={styles.botonIngreso}
          onPress={enviar}
          activeOpacity={0.85}
          testID="boton-ingresar"
        >
          <Text style={styles.botonIngresoTexto}>Ingresar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function createStyles(colors: AppPalette) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    content: {
      width: "100%",
      maxWidth: 600,
      alignSelf: "center",
      padding: Spacing.four,
    },
    saludo: {
      fontSize: 24,
      fontWeight: "800",
      color: colors.text,
    },
    email: {
      marginTop: Spacing.one,
      fontSize: 15,
      color: colors.textSecondary,
    },
    actions: {
      flexDirection: "row",
      gap: Spacing.two,
      marginTop: Spacing.four,
    },
    boton: {
      flex: 2,
      paddingVertical: 14,
      borderRadius: 14,
      backgroundColor: colors.primary,
      alignItems: "center",
      justifyContent: "center",
    },
    botonTexto: {
      fontSize: 16,
      fontWeight: "700",
      color: colors.onPrimary,
    },
    botonIngreso: {
      marginTop: Spacing.four,
      paddingVertical: 14,
      borderRadius: 14,
      backgroundColor: colors.primary,
      alignItems: "center",
    },
    botonIngresoTexto: {
      fontSize: 16,
      fontWeight: "700",
      color: colors.onPrimary,
    },
    backButton: {
      flex: 1,
      paddingVertical: 14,
      borderRadius: 14,
      borderWidth: 1,
      borderColor: colors.primary,
      backgroundColor: colors.surface,
      alignItems: "center",
      justifyContent: "center",
    },
    backButtonText: {
      fontSize: 16,
      fontWeight: "700",
      color: colors.primary,
    },
  });
}
