import { AppPalettes } from "@/constants/theme";
import { useResolvedScheme } from "./use-resolved-scheme";

export function useAppColors() {
  const scheme = useResolvedScheme();
  return AppPalettes[scheme];
}
