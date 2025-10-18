import { Link } from "@tanstack/react-router";
import { IconLogin2, IconMenu2, IconUserPlus } from "@tabler/icons-react";
import Logo from "./logo";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "./ui/navigation-menu";
import { ThemeSwitch } from "./theme-toggle";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { UserNav } from "./user-nav";
import { LanguageSwitch } from "./language-switch";
import type { LinkProps } from "@tanstack/react-router";
import type { Language } from "@/integrations/language/language-provider";
import { useAuth } from "@/features/auth/use-auth";
import { useLanguage } from "@/integrations/language/use-language";

const navMenuLinks: Array<{
  to: LinkProps["to"];
  text: Record<Language, string>;
}> = [
  {
    to: "/issues",
    text: { en: "Reported Issues", bn: "রিপোর্ট করা সমস্যাবলী" },
  },
  { to: "/faq", text: { en: "FAQ", bn: "এফ এ কিউ" } },
  { to: "/about-us", text: { en: "About Us", bn: "আমাদের সম্পর্কে জানুন" } },
  { to: "/contact-us", text: { en: "Contact Us", bn: "যোগাযোগ" } },
];

const LoginButton = () => {
  const { language } = useLanguage();
  return (
    <Button variant="ghost" asChild>
      <Link to="/login">
        <IconLogin2 className="mr-1" />
        {language === "en" ? "Login" : "লগ ইন"}
      </Link>
    </Button>
  );
};

const RegisterButton = () => {
  const { language } = useLanguage();
  return (
    <Button asChild>
      <Link to="/registration">
        <IconUserPlus className="mr-1" />
        {language === "en" ? "Register" : "নিবন্ধন করুন"}
      </Link>
    </Button>
  );
};

const DesktopNavMenu = () => {
  const { user } = useAuth();
  const { language } = useLanguage();

  return (
    <div className="hidden md:flex w-full items-center justify-between">
      {/* Left side */}
      <div className="flex items-center gap-6">
        <Link to="/">
          <Logo className="size-8" />
        </Link>
        <NavigationMenu viewport={false}>
          <NavigationMenuList className="flex gap-4">
            {navMenuLinks.map((navLink, index) => (
              <NavigationMenuItem key={index}>
                <NavigationMenuLink asChild className="font-medium">
                  <Link to={navLink.to}>{navLink.text[language]}</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4">
        <ThemeSwitch variant="accent" />
        <LanguageSwitch variant={"accent"} />
        {user ? (
          <UserNav />
        ) : (
          <>
            <LoginButton />
            <RegisterButton />
          </>
        )}
      </div>
    </div>
  );
};

const MobileNavMenu = () => {
  const { user } = useAuth();
  const { language } = useLanguage();

  return (
    <div className="flex md:hidden w-full items-center justify-between">
      <Link to="/">
        <Logo className="size-8" />
      </Link>

      <div className="flex items-center gap-2">
        <ThemeSwitch variant="accent" />
        <LanguageSwitch variant={"accent"} />
        {user ? <UserNav /> : null}

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon">
              <IconMenu2 />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="flex flex-col gap-4 w-48">
            <NavigationMenu viewport={false}>
              <NavigationMenuList className="flex flex-col gap-2">
                {navMenuLinks.map((navLink, index) => (
                  <NavigationMenuItem key={index}>
                    <NavigationMenuLink asChild>
                      <Link to={navLink.to}>{navLink.text[language]}</Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>

            {!user && (
              <div className="flex flex-col gap-2">
                <LoginButton />
                <RegisterButton />
              </div>
            )}
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export const Navbar = () => {
  return (
    <nav className="w-full px-6 py-2 flex items-center bg-background sticky top-0 z-25 h-14">
      <DesktopNavMenu />
      <MobileNavMenu />
    </nav>
  );
};
