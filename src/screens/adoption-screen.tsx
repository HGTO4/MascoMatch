import { FormField } from "@/components/form-field";
import { Header } from "@/components/header";
import { AppColors, Spacing } from "@/constants/theme";
import { pets } from "@/data/pets";
import {
  ErroresSolicitud,
  esSolicitudValida,
  validarSolicitud,
} from "@/utils/adoption";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export function AdoptionScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const pet = pets.find((p) => p.id === id);
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [errores, setErrores] = useState<ErroresSolicitud>({});
  const [enviada, setEnviada] = useState(false);

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

  if (!pet) {
    return (
      <View style={styles.container}>
        <Header title="Solicitar adopción" subtitle="Completá tus datos" />
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
    <View style={styles.container}>
      <Header title="Solicitar adopción" subtitle="Completá tus datos" />
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
            testID="input-mensaje"
          />
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
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.background,
  },
  centrado: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: Spacing.four,
  },
  texto: {
    fontSize: 16,
    color: AppColors.textSecondary,
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
    color: AppColors.textSecondary,
  },
  enviarButton: {
    flex: 2,
    paddingVertical: 14,
    borderRadius: 14,
    backgroundColor: AppColors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  enviarButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: AppColors.surface,
  },
  exitoTitulo: {
    fontSize: 24,
    fontWeight: "800",
    color: AppColors.text,
    textAlign: "center",
  },
  exitoTexto: {
    marginTop: Spacing.two,
    fontSize: 15,
    lineHeight: 22,
    color: AppColors.textSecondary,
    textAlign: "center",
  },
  backButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: AppColors.primary,
    backgroundColor: AppColors.surface,
    alignItems: "center",
    justifyContent: "center",
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: AppColors.primary,
  },
  actions: {
    flexDirection: "row",
    gap: Spacing.two,
    marginTop: Spacing.four,
  },
  botonPrincipal: {
    marginTop: Spacing.four,
    paddingVertical: 14,
    paddingHorizontal: Spacing.five,
    borderRadius: 14,
    backgroundColor: AppColors.primary,
    alignItems: "center",
  },
});
