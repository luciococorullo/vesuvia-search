"use client";

import React, { useState, useRef, useEffect, useCallback, useMemo } from "react";
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
  const [isUserTyping, setIsUserTyping] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Memoized filtered stations to avoid unnecessary re-computations
  const filteredStations = useMemo(() => {
    if (!isUserTyping || value.length === 0) {
      return [];
    }

    return stations.filter(
      (station) =>
        station.name.toLowerCase().includes(value.toLowerCase()) ||
        station.code.toLowerCase().includes(value.toLowerCase())
    );
  }, [value, stations, isUserTyping]);

  // Check if the current value is an exact match for a station
  const isExactMatch = useMemo(() => {
    return stations.some((station) => station.name === value);
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
        setIsUserTyping(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close dropdown if the value exactly matches a station
  useEffect(() => {
    if (isExactMatch && isOpen) {
      setIsOpen(false);
      setIsUserTyping(false);
    }
  }, [isExactMatch, isOpen]);

  const handleStationSelect = useCallback(
    (station: Station) => {
      setIsUserTyping(false);
      setIsOpen(false);
      onChange(station.name);
      inputRef.current?.blur();
    },
    [onChange]
  );

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setIsUserTyping(true);
      onChange(newValue);

      // Show dropdown only if user is typing and there are potential matches
      if (newValue.length > 0) {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    },
    [onChange]
  );

  const handleInputFocus = useCallback(() => {
    // Only show dropdown if the user is actively typing and doesn't have an exact match
    if (isUserTyping && filteredStations.length > 0 && !isExactMatch) {
      setIsOpen(true);
    }
  }, [isUserTyping, filteredStations.length, isExactMatch]);

  const handleInputBlur = useCallback(() => {
    // Don't immediately close on blur to allow click on dropdown items
    setTimeout(() => {
      setIsUserTyping(false);
    }, 150);
  }, []);

  const handleClearInput = useCallback(() => {
    setIsUserTyping(false);
    setIsOpen(false);
    onChange("");
    inputRef.current?.focus();
  }, [onChange]);

  return (
    <div className={`relative ${className}`}>
      <div className="relative">
        <Input
          ref={inputRef}
          type="text"
          value={value}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          placeholder={placeholder}
          className={cn(
            "unified-input w-full pr-10",
            error ? "error" : "",
            isUserTyping && "shadow-lg"
          )}
          style={{
            transition: "all 0.3s ease",
            backgroundImage: "linear-gradient(to bottom right, #f0f8ff, #ffffff)",
          }}
        />
        {value && (
          <button
            type="button"
            onClick={handleClearInput}
            onMouseDown={(e) => e.preventDefault()} // Prevent input blur
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-primary/60 hover:text-primary hover:bg-primary/10 rounded-full hover:scale-125 hover:rotate-90 transition-all focus:outline-none flex items-center justify-center w-6 h-6"
            aria-label="Clear input"
          >
            <span className="text-xl leading-none">×</span>
          </button>
        )}
      </div>

      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}

      {isOpen && filteredStations.length > 0 && isUserTyping && (
        <div
          ref={dropdownRef}
          className="absolute z-50 w-full mt-2 bg-white border-2 border-primary/40 rounded-xl shadow-2xl max-h-60 overflow-auto animate-in fade-in-0 zoom-in-95"
          style={{
            background: "linear-gradient(180deg, #ffffff, #f9fcff)",
            boxShadow: "0 10px 25px rgba(0, 0, 100, 0.15), 0 5px 10px rgba(0, 0, 0, 0.05)",
          }}
        >
          {filteredStations.map((station: Station, index) => (
            <button
              key={station.id}
              type="button"
              className="w-full px-5 py-3 text-left hover:bg-primary/10 transition-all duration-150 ease-in-out hover:scale-[1.02] focus:bg-primary/15 focus:outline-none flex items-center gap-3 border-b border-primary/10 last:border-b-0"
              style={{
                borderBottom:
                  index < filteredStations.length - 1 ? "1px solid rgba(0, 0, 150, 0.08)" : "none",
                position: "relative",
                overflow: "hidden",
              }}
              onClick={() => handleStationSelect(station)}
              onMouseDown={(e) => e.preventDefault()} // Prevent blur on mousedown
            >
              <MapPin
                className="h-6 w-6 text-primary"
                style={{ filter: "drop-shadow(0 1px 2px rgba(0, 0, 0, 0.1))" }}
              />
              <div className="flex-1">
                <div
                  className="font-medium text-gray-900"
                  style={{ textShadow: "0 0.5px 0 rgba(255, 255, 255, 1)" }}
                >
                  {station.name}
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
