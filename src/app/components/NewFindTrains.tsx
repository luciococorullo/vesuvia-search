/**
 * @fileoverview New Find Trains Component with EAV API Integration
 *
 * This component provides train search functionality using the official EAV API.
 * It replaces the database-based approach with real-time data from the
 * Circumvesuviana service.
 *
 * @author VesuviaSearch Team
 * @version 2.0.0
 */

"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { DateTimePicker } from "./DateTimePicker";
import { StationAutocomplete } from "./StationAutocomplete";
import { EAVTrainResults } from "./EAVTrainResults";
import { ArrowUpDown, MapPin, Search } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  useEAVStationsForStationAutocomplete,
  useEAVSearchTrainsMutation,
  validateStationName,
  type EAVSearchResponse,
} from "@/hooks/useEAVTrains";

export function NewFindTrains() {
  const { t, isLoaded } = useLanguage();

  // Form state
  const [departureStation, setDepartureStation] = useState("");
  const [arrivalStation, setArrivalStation] = useState("");
  const [departureTime, setDepartureTime] = useState<Date | undefined>(new Date());
  const [searchResults, setSearchResults] = useState<EAVSearchResponse | null>(null);

  // Error state
  const [errors, setErrors] = useState({
    departure: "",
    arrival: "",
    time: "",
  });

  // Hooks
  const { data: stations = [], isLoading: stationsLoading } =
    useEAVStationsForStationAutocomplete();
  const searchMutation = useEAVSearchTrainsMutation();

  // Validation
  const validateForm = () => {
    const newErrors = { departure: "", arrival: "", time: "" };

    if (!departureStation.trim()) {
      newErrors.departure = t("departureRequired");
    } else if (!validateStationName(departureStation)) {
      newErrors.departure = t("invalidStationError");
    }

    if (!arrivalStation.trim()) {
      newErrors.arrival = t("arrivalRequired");
    } else if (!validateStationName(arrivalStation)) {
      newErrors.arrival = t("invalidStationError");
    }

    if (departureStation === arrivalStation) {
      newErrors.arrival = t("stationsDifferent");
    }

    if (!departureTime) {
      newErrors.time = t("timeRequired");
    }

    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error !== "");
  };

  // Handle station swap
  const handleSwapStations = () => {
    const temp = departureStation;
    setDepartureStation(arrivalStation);
    setArrivalStation(temp);
    setErrors({ departure: "", arrival: "", time: "" });
  };

  // Handle search
  const handleSearch = async () => {
    if (!validateForm() || !departureTime) return;

    try {
      const result = await searchMutation.mutateAsync({
        fromStation: departureStation,
        toStation: arrivalStation,
        date: departureTime,
        time: departureTime,
      });

      setSearchResults(result);
    } catch (error) {
      console.error("Search error:", error);
      // Error is handled by the mutation and displayed in results
      setSearchResults({
        success: false,
        trains: [],
        error: error instanceof Error ? error.message : "Unknown error",
        message: "searchError",
      });
    }
  };

  // Quick time setters
  const setQuickTime = (offsetHours: number) => {
    const now = new Date();
    now.setHours(now.getHours() + offsetHours);
    setDepartureTime(now);
  };

  const setTomorrow = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(9, 0, 0, 0); // Set to 9:00 AM
    setDepartureTime(tomorrow);
  };

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-3 text-blue-800">{t("loading")}</span>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Search Form */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">
          {/* Departure Station */}
          <div className="lg:col-span-2">
            <Label htmlFor="departure" className="text-sm font-medium text-gray-700 mb-2 block">
              <MapPin className="h-4 w-4 inline mr-1" />
              {t("from")}
            </Label>
            <StationAutocomplete
              stations={stations}
              value={departureStation}
              onChange={setDepartureStation}
              placeholder={t("departureStation")}
              error={errors.departure}
              className="w-full"
            />
          </div>

          {/* Swap Button */}
          <div className="flex items-end justify-center">
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={handleSwapStations}
              className="h-12 w-12 rounded-full border-gray-300"
              title={t("swapStations")}
            >
              <ArrowUpDown className="h-4 w-4" />
            </Button>
          </div>

          {/* Arrival Station */}
          <div className="lg:col-span-2">
            <Label htmlFor="arrival" className="text-sm font-medium text-gray-700 mb-2 block">
              <MapPin className="h-4 w-4 inline mr-1" />
              {t("to")}
            </Label>
            <StationAutocomplete
              stations={stations}
              value={arrivalStation}
              onChange={setArrivalStation}
              placeholder={t("arrivalStation")}
              error={errors.arrival}
              className="w-full"
            />
          </div>
        </div>

        {/* Date Time and Quick Actions */}
        <div className="grid gap-6 md:grid-cols-2 mt-6">
          {/* Date Time Picker */}
          <div>
            <Label className="text-sm font-medium text-gray-700 mb-2 block">
              {t("departureTime")}
            </Label>
            <DateTimePicker date={departureTime} setDate={setDepartureTime} />
            {errors.time && <p className="mt-1 text-sm text-red-600">{errors.time}</p>}
          </div>

          {/* Quick Time Buttons */}
          <div>
            <Label className="text-sm font-medium text-gray-700 mb-2 block">
              {t("quickSelection")}
            </Label>
            <div className="flex flex-wrap gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setDepartureTime(new Date())}
                className="text-xs"
              >
                {t("now")}
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setQuickTime(1)}
                className="text-xs"
              >
                {t("oneHour")}
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setQuickTime(2)}
                className="text-xs"
              >
                {t("twoHours")}
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={setTomorrow}
                className="text-xs"
              >
                {t("tomorrow")}
              </Button>
            </div>
          </div>
        </div>

        {/* Search Button */}
        <div className="mt-6">
          <Button
            onClick={handleSearch}
            disabled={searchMutation.isPending || stationsLoading}
            className="w-full h-12 text-base font-medium bg-blue-600 hover:bg-blue-700"
          >
            {searchMutation.isPending ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                {t("searchingTrains")}
              </>
            ) : (
              <>
                <Search className="h-4 w-4 mr-2" />
                {t("searchTrains")}
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Search Results */}
      {searchResults && (
        <EAVTrainResults
          trains={searchResults.trains}
          isLoading={searchMutation.isPending}
          error={searchResults.error}
          originStation={searchResults.originStation}
          destinationStation={searchResults.destinationStation}
          searchDate={searchResults.searchDate}
          searchTime={searchResults.searchTime}
        />
      )}
    </div>
  );
}
