import { CameraCapture } from "@/components/camera-capture";
import { FormField } from "@/components/form-field";
import { Header } from "@/components/header";
import { LocationButton } from "@/components/location-button";
import { OptionPicker } from "@/components/option-picker";
import { PhotoPicker } from "@/components/photo-picker";
import { AppPalette, Spacing } from "@/constants/theme";
import { useAppColors } from "@/hooks/use-app-colors";
import { usePetsStore } from "@/store/pets-store";
import { useSessionStore } from "@/store/session-store";
import {
  armarMascota,
  DESCRIPCION_MAXIMA,
  ErroresPublicacion,
  esPublicacionValida,
  SEXOS_MASCOTA,
  TAMANOS_MASCOTA,
  TIPOS_MASCOTA,
  validarPublicacion,
} from "@/utils/publish";
import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export function PublishScreen() {
  const colors = useAppColors();
  const styles = createStyles(colors);
  const router = useRouter();
  const usuario = useSessionStore((state) => state.usuario);
  const addPet = usePetsStore((state) => state.addPet);
  const [nombre, setNombre] = useState("");
  const [tipo, setTipo] = useState("");
  const [tamano, setTamano] = useState("");
  const [sexo, setSexo] = useState("");
  const [edad, setEdad] = useState("");
  const [raza, setRaza] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [errores, setErrores] = useState<ErroresPublicacion>({});
  const [foto, setFoto] = useState("");
  const [camaraAbierta, setCamaraAbierta] = useState(false);
  const scrollRef = useRef<ScrollView>(null);

  function publicar() {
    const datos = {
      imagen: foto,
      nombre,
      tipo,
      tamano,
      sexo,
      edad,
      raza,
      ciudad,
      descripcion,
    };
    const nuevosErrores = validarPublicacion(datos);
    setErrores(nuevosErrores);

    if (esPublicacionValida(nuevosErrores) && usuario) {
      addPet(armarMascota(datos, usuario, Date.now().toString()));
      router.navigate("/");
    }
  }

  function irAlFinal() {
    setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 300);
  }

  const header = (
    <Header
      title="Publicar mascota"
      subtitle="Compartí su historia y encontrémosle un hogar"
    />
  );

  if (!usuario) {
    return (
      <View style={styles.container}>
        {header}
        <View style={styles.centrado}>
          <Text style={styles.avisoTitulo}>Ingresá para publicar</Text>
          <Text style={styles.avisoTexto}>
            Para poder publicar una mascota es necesario tener una cuenta.
          </Text>
          <TouchableOpacity
            style={styles.botonPrincipal}
            onPress={() => router.navigate("/profile")}
            activeOpacity={0.85}
            testID="boton-ir-perfil"
          >
            <Text style={styles.publicarButtonText}>Ingresar</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  if (camaraAbierta) {
    return (
      <CameraCapture
        onTaken={(uri) => {
          setFoto(uri);
          setCamaraAbierta(false);
        }}
        onClose={() => setCamaraAbierta(false)}
      />
    );
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      {header}
      <ScrollView
        ref={scrollRef}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps={"handled"}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          <PhotoPicker
            uri={foto}
            onChange={setFoto}
            onCamera={() => setCamaraAbierta(true)}
            error={errores.imagen}
          />
          <FormField
            label="Nombre"
            value={nombre}
            onChangeText={setNombre}
            error={errores.nombre}
            testID="input-nombre"
          />
          <OptionPicker
            label="Tipo"
            options={TIPOS_MASCOTA}
            value={tipo}
            onChange={setTipo}
            error={errores.tipo}
          />
          <OptionPicker
            label="Tamaño"
            options={TAMANOS_MASCOTA}
            value={tamano}
            onChange={setTamano}
            error={errores.tamano}
          />
          <OptionPicker
            label="Sexo"
            options={SEXOS_MASCOTA}
            value={sexo}
            onChange={setSexo}
            error={errores.sexo}
          />
          <FormField
            label="Edad"
            value={edad}
            onChangeText={setEdad}
            error={errores.edad}
            testID="input-edad"
          />
          <FormField
            label="Raza"
            value={raza}
            onChangeText={setRaza}
            testID="input-raza"
          />
          <FormField
            label="Ciudad"
            value={ciudad}
            onChangeText={setCiudad}
            error={errores.ciudad}
            testID="input-ciudad"
          />

          <LocationButton onFound={setCiudad} />

          <FormField
            label="Descripción"
            value={descripcion}
            onChangeText={setDescripcion}
            error={errores.descripcion}
            multiline={true}
            maxLength={DESCRIPCION_MAXIMA}
            onFocus={irAlFinal}
            testID="input-descripcion"
          />
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.publicarButton}
            onPress={publicar}
            activeOpacity={0.85}
            testID="boton-publicar"
          >
            <Text style={styles.publicarButtonText}>Publicar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.cancelarButton}
            onPress={() => router.back()}
            activeOpacity={0.85}
            testID="boton-volver"
          >
            <Text style={styles.cancelarButtonText}>Cancelar</Text>
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
    scrollContent: {
      paddingBottom: Spacing.six,
    },
    content: {
      width: "100%",
      maxWidth: 600,
      alignSelf: "center",
      padding: Spacing.four,
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
    publicarButton: {
      flex: 2,
      paddingVertical: 14,
      borderRadius: 14,
      backgroundColor: colors.primary,
      alignItems: "center",
      justifyContent: "center",
    },
    publicarButtonText: {
      fontSize: 16,
      fontWeight: "700",
      color: colors.onPrimary,
    },
    cancelarButton: {
      flex: 1,
      paddingVertical: 14,
      borderRadius: 14,
      borderWidth: 1,
      borderColor: colors.primary,
      backgroundColor: colors.surface,
      alignItems: "center",
      justifyContent: "center",
    },
    cancelarButtonText: {
      fontSize: 16,
      fontWeight: "700",
      color: colors.primary,
    },
    centrado: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      padding: Spacing.four,
    },
    avisoTitulo: {
      fontSize: 22,
      fontWeight: "800",
      color: colors.text,
      textAlign: "center",
    },
    avisoTexto: {
      marginTop: Spacing.two,
      fontSize: 15,
      lineHeight: 22,
      color: colors.textSecondary,
      textAlign: "center",
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
