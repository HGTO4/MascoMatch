import { useColorScheme } from "@/hooks/use-color-scheme";
import { useThemeStore } from "@/store/theme-store";

export function useResolvedScheme(): "light" | "dark" {
  const mode = useThemeStore((state) => state.mode);
  const systemScheme = useColorScheme();

  if (mode === "system") {
    return systemScheme === "dark" ? "dark" : "light";
  }

  return mode;
}
