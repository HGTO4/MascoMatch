import { Spacing } from "@/constants/theme";
import { useWindowDimensions } from "react-native";

export function useLayout() {
  const { width } = useWindowDimensions();
  const esAncho = width >= 768;
  const columnas = width >= 1200 ? 3 : esAncho ? 2 : 1;
  const margenX = esAncho ? Spacing.seven : Spacing.four;

  return { esAncho, columnas, margenX };
}
