import { FormField } from "@/components/form-field";
import { Header } from "@/components/header";
import { AppPalette, Spacing } from "@/constants/theme";
import { useAppColors } from "@/hooks/use-app-colors";
import { usePetsStore } from "@/store/pets-store";
import {
  ErroresSolicitud,
  esSolicitudValida,
  MENSAJE_MAXIMO,
  validarSolicitud,
} from "@/utils/adoption";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useRef, useState } from "react";
import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export function AdoptionScreen() {
  const colors = useAppColors();
  const styles = createStyles(colors);
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const pets = usePetsStore((state) => state.pets);
  const pet = pets.find((p) => p.id === id);
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [errores, setErrores] = useState<ErroresSolicitud>({});
  const [enviada, setEnviada] = useState(false);
  const scrollRef = useRef<ScrollView>(null);

  function enviar() {
    const nuevosErrores = validarSolicitud({
      nombre,
      email,
      telefono,
      mensaje,
    });
    setErrores(nuevosErrores);
    if (esSolicitudValida(nuevosErrores)) {
      setEnviada(true);
    }
  }

  function irAlFinal() {
    setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 300);
  }

  const header = (
    <Header title="Solicitar adopción" subtitle="Completá tus datos" />
  );

  if (!pet) {
    return (
      <View style={styles.container}>
        {header}
        <View style={styles.centrado}>
          <Text style={styles.texto}>Mascota no encontrada</Text>
        </View>
      </View>
    );
  }

  if (enviada) {
    return (
      <View style={styles.container}>
        <Header title="Solicitar adopción" subtitle="¡Gracias!" />
        <View style={styles.centrado}>
          <Text style={styles.exitoTitulo}>¡Solicitud enviada! 🐾</Text>
          <Text style={styles.exitoTexto}>
            El refugio {pet.shelter} se va a comunicar con vos al email {email}.
          </Text>
          <TouchableOpacity
            style={styles.botonPrincipal}
            onPress={() => router.navigate("/")}
          >
            <Text style={styles.enviarButtonText}>Volver al inicio</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      {header}
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          <Text style={styles.intro}>
            Estás solicitando adoptar a {pet.name} ({pet.shelter})
          </Text>

          <FormField
            label="Nombre completo"
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

          <FormField
            label="Teléfono"
            value={telefono}
            onChangeText={setTelefono}
            keyboardType="phone-pad"
            testID="input-telefono"
          />

          <FormField
            label="¿Por qué querés adoptar?"
            value={mensaje}
            onChangeText={setMensaje}
            error={errores.mensaje}
            multiline={true}
            maxLength={MENSAJE_MAXIMO}
            onFocus={irAlFinal}
            testID="input-mensaje"
          />
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.enviarButton}
            onPress={enviar}
            activeOpacity={0.85}
            testID="boton-enviar"
          >
            <Text style={styles.enviarButtonText}>Enviar solicitud</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
            activeOpacity={0.85}
            testID="boton-volver"
          >
            <Text style={styles.backButtonText}>Volver</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

function createStyles(colors: AppPalette) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    centrado: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      padding: Spacing.four,
    },
    texto: {
      fontSize: 16,
      color: colors.textSecondary,
    },
    scrollContent: {
      paddingBottom: Spacing.six,
    },
    content: {
      width: "100%",
      maxWidth: 600,
      alignSelf: "center",
      padding: Spacing.four,
    },
    intro: {
      marginBottom: Spacing.four,
      fontSize: 15,
      lineHeight: 22,
      color: colors.textSecondary,
    },
    enviarButton: {
      flex: 2,
      paddingVertical: 14,
      borderRadius: 14,
      backgroundColor: colors.primary,
      alignItems: "center",
      justifyContent: "center",
    },
    enviarButtonText: {
      fontSize: 16,
      fontWeight: "700",
      color: colors.onPrimary,
    },
    exitoTitulo: {
      fontSize: 24,
      fontWeight: "800",
      color: colors.text,
      textAlign: "center",
    },
    exitoTexto: {
      marginTop: Spacing.two,
      fontSize: 15,
      lineHeight: 22,
      color: colors.textSecondary,
      textAlign: "center",
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
    footer: {
      borderTopWidth: 1,
      borderTopColor: colors.border,
      backgroundColor: colors.surface,
      paddingVertical: Spacing.three,
      paddingHorizontal: Spacing.four,
    },
    actions: {
      width: "100%",
      maxWidth: 600,
      alignSelf: "center",
      flexDirection: "row",
      gap: Spacing.two,
    },
    botonPrincipal: {
      marginTop: Spacing.four,
      paddingVertical: 14,
      paddingHorizontal: Spacing.five,
      borderRadius: 14,
      backgroundColor: colors.primary,
      alignItems: "center",
    },
  });
}
