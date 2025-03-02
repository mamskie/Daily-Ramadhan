import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu, Moon } from "lucide-react";
import { useTranslation } from "react-i18next";
import { LanguageSwitcher } from "./language-switcher";
import { ThemeToggle } from "./theme-toggle";

export function Navbar() {
  const { t } = useTranslation();

  return (
    <header className="px-4 fixed top-0 left-0 right-0 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="mx-auto flex h-16 items-center justify-between">
        {/* App Title/Logo */}
        <div className="flex gap-2 items-center">
          <Moon className="h-6 w-6 text-emerald-600" />
          <h1 className="text-xl font-bold text-emerald-800 dark:text-emerald-200">
            {t("appTitle")}
          </h1>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-4">
          <LanguageSwitcher />
          <ThemeToggle />
        </nav>

        {/* Mobile Navigation */}
        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="outline" size="icon" aria-label="Menu">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <div className="flex flex-row gap-6 mt-8 p-6">
              <div className="flex justify-start">
                <SheetClose asChild>
                  <LanguageSwitcher />
                </SheetClose>
              </div>
              <div className="flex justify-start">
                <SheetClose asChild>
                  <ThemeToggle />
                </SheetClose>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
