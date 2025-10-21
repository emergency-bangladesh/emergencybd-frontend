import type { ComponentProps } from "react";
import { SelectSwitch } from "@/components/ui/select-switch";
import { useLanguage } from "@/integrations/language/use-language";

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
