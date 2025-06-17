"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useLanguage } from "@/contexts/LanguageContext";
import { languages, Language } from "@/lib/i18n";
import { Check } from "lucide-react";

export function LanguageSelector() {
  const { language, setLanguage, isLoaded } = useLanguage();
  const [open, setOpen] = React.useState(false);

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    setOpen(false);
  };

  // Don't render anything until the language is loaded from localStorage
  if (!isLoaded) {
    return (
      <Button variant="outline" className="flex items-center gap-2 h-10">
        <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-sm">
          🇬🇧
        </div>
        <span className="hidden sm:inline">English</span>
      </Button>
    );
  }

  return (
    <div suppressHydrationWarning>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="flex items-center gap-2 h-10">
            <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-sm">
              {languages[language].flag}
            </div>
            <span className="hidden sm:inline">{languages[language].name}</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-56 p-2">
          <div className="space-y-1">
            {Object.entries(languages).map(([code, { name, flag }]) => (
              <Button
                key={code}
                variant="ghost"
                className={`w-full justify-start text-left h-10 ${
                  language === code ? "bg-blue-50 text-blue-700" : ""
                }`}
                onClick={() => handleLanguageChange(code as Language)}
              >
                <div className="flex items-center gap-3 w-full">
                  <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-sm flex-shrink-0">
                    {flag}
                  </div>
                  <span className="flex-1">{name}</span>
                  {language === code && <Check className="h-4 w-4 flex-shrink-0" />}
                </div>
              </Button>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
