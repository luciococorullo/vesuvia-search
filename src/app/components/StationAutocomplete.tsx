"use client";

import React, { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { MapPin } from "lucide-react";
import { Station } from "@/lib/types";
import { cn } from "@/lib/utils";

interface StationAutocompleteProps {
  stations: Station[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
  className?: string;
}

export function StationAutocomplete({
  stations,
  value,
  onChange,
  placeholder,
  error,
  className,
}: StationAutocompleteProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [filteredStations, setFilteredStations] = useState<Station[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (value.length === 0) {
      setFilteredStations([]);
      setIsOpen(false);
      return;
    }

    const filtered = stations.filter(
      (station) =>
        station.name.toLowerCase().includes(value.toLowerCase()) ||
        station.code.toLowerCase().includes(value.toLowerCase())
    );

    setFilteredStations(filtered);
    setIsOpen(filtered.length > 0);
  }, [value, stations]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleStationSelect = (station: Station) => {
    onChange(station.name);
    setIsOpen(false);
    inputRef.current?.blur();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const handleInputFocus = () => {
    if (filteredStations.length > 0) {
      setIsOpen(true);
    }
  };

  return (
    <div className={`relative ${className}`}>
      <Input
        ref={inputRef}
        type="text"
        value={value}
        onChange={handleInputChange}
        onFocus={handleInputFocus}
        placeholder={placeholder}
        className={cn(
          "w-full justify-start text-left h-12 text-sm font-normal border-blue-200 rounded-md",
          error ? "border-red-500" : ""
        )}
      />

      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}

      {isOpen && filteredStations.length > 0 && (
        <div
          ref={dropdownRef}
          className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto"
        >
          {filteredStations.map((station) => (
            <button
              key={station.id}
              type="button"
              className="w-full px-4 py-3 text-left hover:bg-gray-50 focus:bg-gray-50 focus:outline-none flex items-center gap-3"
              onClick={() => handleStationSelect(station)}
            >
              <MapPin className="h-4 w-4 text-gray-400" />
              <div>
                <div className="font-medium text-gray-900">{station.name}</div>
                <div className="text-sm text-gray-500">{station.code}</div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
