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
            "w-full justify-start text-left font-normal min-h-[44px] group",
            !date && "text-muted-foreground"
          )}
          style={{
            backgroundImage: "linear-gradient(to bottom, #f0f8ff, #ffffff)",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
            border: "2px solid rgba(64, 64, 192, 0.3)",
            borderRadius: "0.5rem",
            transition: "all 0.3s ease",
            height: "3rem",
            color: "var(--foreground)",
            fontSize: "1rem",
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.borderColor = "rgba(64, 64, 192, 0.6)";
            e.currentTarget.style.boxShadow = "0 5px 12px rgba(0, 0, 0, 0.15)";
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.backgroundImage = "linear-gradient(to bottom, #e0f0ff, #f5faff)";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.borderColor = "rgba(64, 64, 192, 0.3)";
            e.currentTarget.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.08)";
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.backgroundImage = "linear-gradient(to bottom, #f0f8ff, #ffffff)";
          }}
        >
          <CalendarIcon className="h-5 w-5 mr-3 text-primary group-hover:scale-125 group-hover:rotate-12 transition-all duration-300" />
          <span className="truncate text-gray-800">
            {date ? format(date, "PPP, HH:mm", { locale }) : t("selectDateTime")}
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-auto p-0 shadow-2xl border-2 border-primary/20 bg-white/95 backdrop-blur-sm animate-scale-in"
        style={{
          borderRadius: "0.75rem",
          overflow: "hidden",
          boxShadow: "0 10px 25px rgba(0, 0, 100, 0.15), 0 5px 10px rgba(0, 0, 0, 0.05)",
          background: "linear-gradient(180deg, #ffffff, #f9fcff)",
        }}
      >
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleDateChange}
          locale={locale}
          className="rounded-lg"
        />
        <div
          className="p-4 border-t-2 border-primary/10"
          style={{ background: "linear-gradient(to bottom, #f5f9ff, #ffffff)" }}
        >
          <Input
            type="time"
            value={time}
            onChange={handleTimeChange}
            className="unified-input [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-100 [&::-webkit-datetime-edit-fields-wrapper]:border-0 [&::-webkit-datetime-edit]:border-0 [&::-webkit-datetime-edit]:outline-0 [&::-webkit-datetime-edit-text]:text-gray-700 [&::-webkit-datetime-edit-hour-field]:text-gray-700 [&::-webkit-datetime-edit-minute-field]:text-gray-700 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            placeholder="Seleziona orario"
            style={{
              backgroundImage: "linear-gradient(to bottom right, #f0f8ff, #ffffff)",
            }}
          />
        </div>
      </PopoverContent>
    </Popover>
  );
}
