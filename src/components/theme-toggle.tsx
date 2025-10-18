import { IconMoon, IconSun } from "@tabler/icons-react";
import { SelectSwitch } from "./ui/select-switch";
import type { ComponentProps } from "react";
import { useTheme } from "@/integrations/theme/use-theme";

type ThemeSwitchProps = {
  variant?: ComponentProps<typeof SelectSwitch>["variant"];
};

export function ThemeSwitch({ variant }: ThemeSwitchProps) {
  const { theme, setTheme } = useTheme();

  const isDarkMode = theme === "dark";

  const handleCheckedChange = (checked: boolean) => {
    setTheme(checked ? "dark" : "light");
  };

  return (
    <SelectSwitch
      variant={variant}
      checked={isDarkMode}
      onCheckedChange={handleCheckedChange}
      options={[<IconSun key="sun" />, <IconMoon key="moon" />]}
    />
  );
}
