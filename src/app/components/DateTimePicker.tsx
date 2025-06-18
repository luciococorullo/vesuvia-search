"use client";

import * as React from "react";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { it, es, ptBR, fr, de, enUS } from "date-fns/locale";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";

interface DateTimePickerProps {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
}

// Map language codes to date-fns locales
const getDateFnsLocale = (language: string) => {
  switch (language) {
    case "it":
      return it;
    case "es":
      return es;
    case "pt":
      return ptBR;
    case "fr":
      return fr;
    case "de":
      return de;
    default:
      return enUS;
  }
};

export function DateTimePicker({ date, setDate }: DateTimePickerProps) {
  const { t, language } = useLanguage();
  const locale = getDateFnsLocale(language);
  const [time, setTime] = React.useState(date ? format(date, "HH:mm") : "");

  const handleDateChange = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      const [hours, minutes] = time.split(":").map(Number);
      const newDate = new Date(selectedDate);
      if (!isNaN(hours) && !isNaN(minutes)) {
        newDate.setHours(hours);
        newDate.setMinutes(minutes);
      }
      setDate(newDate);
    } else {
      setDate(undefined);
    }
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = e.target.value;
    setTime(newTime);
    if (date) {
      const [hours, minutes] = newTime.split(":").map(Number);
      const newDate = new Date(date);
      if (!isNaN(hours) && !isNaN(minutes)) {
        newDate.setHours(hours);
        newDate.setMinutes(minutes);
        setDate(newDate);
      }
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal h-12 text-sm",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="h-4 w-4" />
          {date ? format(date, "PPP, HH:mm", { locale }) : <span>{t("selectDateTime")}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar mode="single" selected={date} onSelect={handleDateChange} locale={locale} />
        <div className="p-4 border-t">
          <Input type="time" value={time} onChange={handleTimeChange} className="w-full" />
        </div>
      </PopoverContent>
    </Popover>
  );
}
