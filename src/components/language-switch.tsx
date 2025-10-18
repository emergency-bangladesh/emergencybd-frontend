import type { ComponentProps } from "react";
import { useLanguage } from "@/integrations/language/use-language";
import { SelectSwitch } from "@/components/ui/select-switch";

type LanguageSwitchProps = {
  variant?: ComponentProps<typeof SelectSwitch>["variant"];
};

export function LanguageSwitch({ variant }: LanguageSwitchProps) {
  const { language, setLanguage } = useLanguage();

  const isBn = language === "bn";

  const handleCheckedChange = (checked: boolean) => {
    setLanguage(checked ? "bn" : "en");
  };

  return (
    <SelectSwitch
      variant={variant}
      checked={isBn}
      onCheckedChange={handleCheckedChange}
      options={isBn ? ["ইং", "বাং"] : ["En", "Bn"]}
    />
  );
}
