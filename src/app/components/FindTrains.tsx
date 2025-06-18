"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { DateTimePicker } from "./DateTimePicker";
import { StationAutocomplete } from "./StationAutocomplete";
import { TrainResults } from "./TrainResults";
import { ArrowUpDown, Clock, MapPin, Search, AlertCircle, Filter } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  useStations,
  useSearchTrainsMutation,
  useSearchDeparturesMutation,
} from "@/hooks/useTrains";
import { SearchResult } from "@/lib/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function FindTrains() {
  const { t, isLoaded } = useLanguage();
  const [departureStation, setDepartureStation] = useState("");
  const [arrivalStation, setArrivalStation] = useState("");
  const [departureTime, setDepartureTime] = useState<Date | undefined>(new Date());
  const [campaniaExpressOnly, setCampaniaExpressOnly] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResult | null>(null);

  // State for "Partenza" tab
  const [fromStation, setFromStation] = useState("");
  const [fromDepartureTime, setFromDepartureTime] = useState<Date | undefined>(new Date());
  const [fromCampaniaExpressOnly, setFromCampaniaExpressOnly] = useState(false);
  const [fromSearchResults, setFromSearchResults] = useState<SearchResult | null>(null);

  // Current active tab
  const [activeTab, setActiveTab] = useState("track");

  const [errors, setErrors] = useState({
    departure: "",
    arrival: "",
    time: "",
  });

  const [fromErrors, setFromErrors] = useState({
    station: "",
    time: "",
  });

  // Hooks
  const { data: stations = [], isLoading: stationsLoading } = useStations();
  const searchMutation = useSearchTrainsMutation();
  const departuresMutation = useSearchDeparturesMutation();

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

  const validateFromForm = () => {
    const newErrors = { station: "", time: "" };

    if (!fromStation.trim()) {
      newErrors.station = t("departureRequired");
    }
    if (!fromDepartureTime) {
      newErrors.time = t("timeRequired");
    }

    setFromErrors(newErrors);
    return !Object.values(newErrors).some((error) => error !== "");
  };

  const handleSwapStations = () => {
    const temp = departureStation;
    setDepartureStation(arrivalStation);
    setArrivalStation(temp);
    setErrors({ departure: "", arrival: "", time: "" });
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);

    // Reset all form fields and results when changing tabs
    if (value === "track") {
      // Reset "Partenza - Arrivo" tab
      setDepartureStation("");
      setArrivalStation("");
      setDepartureTime(new Date());
      setCampaniaExpressOnly(false);
      setSearchResults(null);
      setErrors({ departure: "", arrival: "", time: "" });
    } else if (value === "from") {
      // Reset "Partenza" tab
      setFromStation("");
      setFromDepartureTime(new Date());
      setFromCampaniaExpressOnly(false);
      setFromSearchResults(null);
      setFromErrors({ station: "", time: "" });
    }
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

  const handleFromSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validateFromForm()) {
      return;
    }

    try {
      const searchParams = {
        from: fromStation,
        time: fromDepartureTime ? formatTimeForAPI(fromDepartureTime) : undefined,
        date: fromDepartureTime ? formatDateForAPI(fromDepartureTime) : undefined,
        ...(fromCampaniaExpressOnly && { isCampaniaExpress: true }),
      };

      const result = await departuresMutation.mutateAsync(searchParams);
      setFromSearchResults(result);
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
      <Tabs value={activeTab} onValueChange={handleTabChange}>
        <TabsList>
          <TabsTrigger value="track">{t("departureDepartureTab")}</TabsTrigger>
          <TabsTrigger value="from">{t("departureOnlyTab")}</TabsTrigger>
        </TabsList>
        <TabsContent value="track">
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
        </TabsContent>
        <TabsContent value="from">
          <div className="rounded-2xl shadow-xl border-2 border-blue-200 p-6 md:p-8 mb-8 backdrop-blur-sm bg-white/95">
            <form onSubmit={handleFromSubmit} className="space-y-6">
              {/* Station Selection */}
              <div className="space-y-2">
                <Label
                  htmlFor="fromStation"
                  className="text-sm font-medium text-blue-800 flex items-center gap-2"
                >
                  <MapPin className="h-4 w-4 text-green-500" />
                  {t("departureStationLabel")}
                </Label>
                <StationAutocomplete
                  stations={stations}
                  value={fromStation}
                  onChange={setFromStation}
                  placeholder={t("selectDepartureStation")}
                  error={fromErrors.station}
                />
              </div>

              {/* Date and Time Selection */}
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <Clock className="h-4 w-4 text-purple-500" />
                      {t("departureTimeLabel")}
                    </Label>
                    <DateTimePicker date={fromDepartureTime} setDate={setFromDepartureTime} />
                    {fromErrors.time && (
                      <p className="text-sm text-red-600 flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        {fromErrors.time}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Filters */}
              <div className="space-y-4">
                <Label className="text-sm font-medium text-blue-800 flex items-center gap-2">
                  <Filter className="h-4 w-4 text-red-500" />
                  {t("filtersLabel")}
                </Label>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="fromCampaniaExpress"
                    checked={fromCampaniaExpressOnly}
                    onChange={(e) => setFromCampaniaExpressOnly(e.target.checked)}
                    className="rounded border-blue-300 text-red-600 focus:ring-red-500"
                  />
                  <Label htmlFor="fromCampaniaExpress" className="text-sm text-blue-800">
                    {t("campaniaExpressOnly")}
                  </Label>
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-lg"
                disabled={departuresMutation.isPending}
              >
                {departuresMutation.isPending ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    {t("searchingNextDepartures")}
                  </>
                ) : (
                  <>
                    <Search className="h-4 w-4" />
                    {t("searchNextDepartures")}
                  </>
                )}
              </Button>
            </form>
          </div>
        </TabsContent>

        {/* Results */}
        {activeTab === "track" && searchResults && (
          <TrainResults
            trains={searchResults.trains}
            isLoading={searchMutation.isPending}
            error={searchMutation.error?.message}
            fromStations={searchResults.fromStations}
            toStations={searchResults.toStations}
          />
        )}

        {/* Results for "Partenza" tab */}
        {activeTab === "from" && fromSearchResults && (
          <TrainResults
            trains={fromSearchResults.trains}
            isLoading={departuresMutation.isPending}
            error={departuresMutation.error?.message}
            fromStations={fromSearchResults.fromStations}
            toStations={fromSearchResults.toStations}
          />
        )}
      </Tabs>
    </div>
  );
}
