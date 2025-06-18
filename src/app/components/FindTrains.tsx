"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { DateTimePicker } from "./DateTimePicker";
import { StationAutocomplete } from "./StationAutocomplete";
import { TrainResults } from "./TrainResults";
import { ArrowUpDown, Clock, MapPin, Search, AlertCircle, Filter } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useStations, useSearchTrainsMutation } from "@/hooks/useTrains";
import { SearchResult } from "@/lib/types";

export function FindTrains() {
  const { t, isLoaded } = useLanguage();
  const [departureStation, setDepartureStation] = useState("");
  const [arrivalStation, setArrivalStation] = useState("");
  const [departureTime, setDepartureTime] = useState<Date | undefined>(new Date());
  const [campaniaExpressOnly, setCampaniaExpressOnly] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResult | null>(null);
  const [errors, setErrors] = useState({
    departure: "",
    arrival: "",
    time: "",
  });

  // Hooks
  const { data: stations = [], isLoading: stationsLoading } = useStations();
  const searchMutation = useSearchTrainsMutation();

  const validateForm = () => {
    const newErrors = { departure: "", arrival: "", time: "" };

    if (!departureStation.trim()) {
      newErrors.departure = t("departureRequired");
    }
    if (!arrivalStation.trim()) {
      newErrors.arrival = t("arrivalRequired");
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

  const handleSwapStations = () => {
    const temp = departureStation;
    setDepartureStation(arrivalStation);
    setArrivalStation(temp);
    setErrors({ departure: "", arrival: "", time: "" });
  };

  const formatTimeForAPI = (date: Date): string => {
    return `${date.getHours().toString().padStart(2, "0")}:${date
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;
  };

  const formatDateForAPI = (date: Date): string => {
    return date.toISOString().split("T")[0];
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const searchParams = {
        from: departureStation,
        to: arrivalStation,
        time: departureTime ? formatTimeForAPI(departureTime) : undefined,
        date: departureTime ? formatDateForAPI(departureTime) : undefined,
        ...(campaniaExpressOnly && { isCampaniaExpress: true }),
      };

      const result = await searchMutation.mutateAsync(searchParams);
      setSearchResults(result);
    } catch (error) {
      console.error("Errore nella ricerca:", error);
    }
  };

  if (stationsLoading || !isLoaded) {
    return (
      <div className="container mx-auto p-4 max-w-4xl">
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-3 text-gray-600">{t("loading")}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <div className="rounded-2xl shadow-xl border-2 border-blue-200 p-6 md:p-8 mb-8 backdrop-blur-sm bg-white/95">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Station Selection */}
          <div className="relative">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div className="space-y-2">
                <Label
                  htmlFor="departureStation"
                  className="text-sm font-medium text-blue-800 flex items-center gap-2"
                >
                  <MapPin className="h-4 w-4 text-green-500" />
                  {t("from")}
                </Label>
                <StationAutocomplete
                  stations={stations}
                  value={departureStation}
                  onChange={setDepartureStation}
                  placeholder={t("departureStation")}
                  error={errors.departure}
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="arrivalStation"
                  className="text-sm font-medium text-blue-800 flex items-center gap-2"
                >
                  <MapPin className="h-4 w-4 text-red-500" />
                  {t("to")}
                </Label>
                <StationAutocomplete
                  stations={stations}
                  value={arrivalStation}
                  onChange={setArrivalStation}
                  placeholder={t("arrivalStation")}
                  error={errors.arrival}
                />
              </div>
            </div>

            {/* Swap Button */}
            <div className="absolute left-1/2 top-8 -translate-x-1/2 z-10 hidden md:block">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleSwapStations}
                className="bg-white shadow-md hover:shadow-lg transition-shadow border-2 border-gray-200 hover:border-blue-300 p-2"
              >
                <ArrowUpDown className="h-4 w-4" />
              </Button>
            </div>

            {/* Mobile Swap Button */}
            <div className="md:hidden mt-4 flex justify-center">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleSwapStations}
                className="flex items-center gap-2"
              >
                <ArrowUpDown className="h-4 w-4" />
                {t("swapStations")}
              </Button>
            </div>
          </div>

          {/* Date and Time Selection */}
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <Clock className="h-4 w-4 text-purple-500" />
                  {t("departureTime")}
                </Label>
                <DateTimePicker date={departureTime} setDate={setDepartureTime} />
                {errors.time && (
                  <p className="text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.time}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="space-y-4">
            <Label className="text-sm font-medium text-blue-800 flex items-center gap-2">
              <Filter className="h-4 w-4 text-red-500" />
              {t("filters")}
            </Label>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="campaniaExpress"
                checked={campaniaExpressOnly}
                onChange={(e) => setCampaniaExpressOnly(e.target.checked)}
                className="rounded border-blue-300 text-red-600 focus:ring-red-500"
              />
              <Label htmlFor="campaniaExpress" className="text-sm text-blue-800">
                {t("campaniaExpressOnly")}
              </Label>
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-lg"
            disabled={searchMutation.isPending}
          >
            {searchMutation.isPending ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                {t("searchingTrains")}
              </>
            ) : (
              <>
                <Search className="h-4 w-4" />
                {t("searchTrains")}
              </>
            )}
          </Button>
        </form>
      </div>

      {/* Results */}
      {searchResults && (
        <TrainResults
          trains={searchResults.trains}
          isLoading={searchMutation.isPending}
          error={searchMutation.error?.message}
          searchFrom={departureStation}
          searchTo={arrivalStation}
          fromStations={searchResults.fromStations}
          toStations={searchResults.toStations}
        />
      )}
    </div>
  );
}
