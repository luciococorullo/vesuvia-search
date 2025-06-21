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
            "w-full justify-start text-left h-12 text-sm font-normal border-blue-200 rounded-md pr-10 focus:border-blue-400 focus:ring-1 focus:ring-blue-400",
            error ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""
          )}
        />
        {value && (
          <button
            type="button"
            onClick={handleClearInput}
            onMouseDown={(e) => e.preventDefault()} // Prevent input blur
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:text-gray-600 focus:outline-none transition-colors flex items-center justify-center w-4 h-4"
            aria-label="Clear input"
          >
            <span className="text-lg leading-none">×</span>
          </button>
        )}
      </div>

      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}

      {isOpen && filteredStations.length > 0 && isUserTyping && (
        <div
          ref={dropdownRef}
          className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto"
        >
          {filteredStations.map((station: Station) => (
            <button
              key={station.id}
              type="button"
              className="w-full px-4 py-3 text-left hover:bg-gray-50 focus:bg-gray-50 focus:outline-none flex items-center gap-3"
              onClick={() => handleStationSelect(station)}
              onMouseDown={(e) => e.preventDefault()} // Prevent blur on mousedown
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
