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
import { EAVDeparturesResults } from "./EAVDeparturesResults";
import { ArrowUpDown, MapPin, Search, Clock } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  useEAVStationsForStationAutocomplete,
  useEAVSearchTrainsMutation,
  useEAVDeparturesMutation,
  useEAVDestinations,
  useDestinationStationsForAutocomplete,
  validateStationName,
  type EAVSearchResponse,
  type EAVDeparturesResponse,
} from "@/hooks/useEAVTrains";
import { findStationByName } from "@/lib/eav-stations";

export function NewFindTrains() {
  const { t, isLoaded } = useLanguage();

  // Tab state
  const [activeTab, setActiveTab] = useState("search");

  // Form state for search tab
  const [departureStation, setDepartureStation] = useState("");
  const [arrivalStation, setArrivalStation] = useState("");
  const [departureTime, setDepartureTime] = useState<Date | undefined>(new Date());
  const [searchResults, setSearchResults] = useState<EAVSearchResponse | null>(null);

  // Form state for departures tab
  const [fromStation, setFromStation] = useState("");
  const [fromDepartureTime, setFromDepartureTime] = useState<Date | undefined>(new Date());
  const [departuresResults, setDeparturesResults] = useState<EAVDeparturesResponse | null>(null);

  // Error state for search tab
  const [errors, setErrors] = useState({
    departure: "",
    arrival: "",
    time: "",
  });

  // Error state for departures tab
  const [fromErrors, setFromErrors] = useState({
    station: "",
    time: "",
  });

  // Hooks
  const { data: stations = [], isLoading: stationsLoading } =
    useEAVStationsForStationAutocomplete();
  const searchMutation = useEAVSearchTrainsMutation();
  const departuresMutation = useEAVDeparturesMutation();

  // Get departure station ID for destinations lookup
  const departureStationObj = findStationByName(departureStation);
  const departureStationId = departureStationObj?.id;

  // Destinations hook - only fetch when we have a valid departure station
  const { data: destinationsData, isLoading: destinationsLoading } = useEAVDestinations(
    departureStationId,
    !!departureStationId
  );

  // Convert destinations to autocomplete format for arrival station
  const destinations = destinationsData?.destinations || [];
  const { data: arrivalStations = [] } = useDestinationStationsForAutocomplete(destinations);

  // Use all stations for departure, filtered destinations for arrival
  const availableArrivalStations =
    departureStationId && destinations.length > 0 ? arrivalStations : stations;

  // Validation for search tab
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

  // Validation for departures tab
  const validateFromForm = () => {
    const newErrors = { station: "", time: "" };

    if (!fromStation.trim()) {
      newErrors.station = t("departureRequired");
    } else if (!validateStationName(fromStation)) {
      newErrors.station = t("invalidStationError");
    }

    if (!fromDepartureTime) {
      newErrors.time = t("timeRequired");
    }

    setFromErrors(newErrors);
    return !Object.values(newErrors).some((error) => error !== "");
  };

  // Handle tab change
  const handleTabChange = (value: string) => {
    setActiveTab(value);

    // Reset forms when changing tabs
    if (value === "search") {
      // Reset departures tab
      setFromStation("");
      setFromDepartureTime(new Date());
      setDeparturesResults(null);
      setFromErrors({ station: "", time: "" });
    } else if (value === "departures") {
      // Reset search tab
      setDepartureStation("");
      setArrivalStation("");
      setDepartureTime(new Date());
      setSearchResults(null);
      setErrors({ departure: "", arrival: "", time: "" });
    }
  };

  // Handle station swap (search tab only)
  const handleSwapStations = () => {
    // Only allow swap if both stations are selected
    if (!departureStation || !arrivalStation) return;

    setDepartureStation(arrivalStation);
    setArrivalStation(""); // Clear arrival and let it be populated by destinations
    setErrors({ departure: "", arrival: "", time: "" });
  };

  // Handle search (search tab)
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
      setSearchResults({
        success: false,
        trains: [],
        error: error instanceof Error ? error.message : "Unknown error",
        message: "searchError",
      });
    }
  };

  // Handle departures search (departures tab)
  const handleDeparturesSearch = async () => {
    if (!validateFromForm()) return;

    try {
      console.log("Starting departures search for:", fromStation);
      const result = await departuresMutation.mutateAsync({
        stationName: fromStation,
        type: "departures",
      });

      console.log("Departures search result:", result);
      setDeparturesResults(result);
    } catch (error) {
      console.error("Departures search error:", error);
      setDeparturesResults({
        success: false,
        trains: [],
        error: error instanceof Error ? error.message : "Unknown error",
        station: fromStation,
        type: "departures",
      });
    }
  };

  // Handle departure station change - clear arrival station when departure changes
  const handleDepartureStationChange = (newDepartureStation: string) => {
    setDepartureStation(newDepartureStation);
    // Clear arrival station when departure changes to force user to select from valid destinations
    if (arrivalStation) {
      setArrivalStation("");
      setErrors((prev) => ({ ...prev, arrival: "" }));
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
      <Tabs value={activeTab} onValueChange={handleTabChange}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="search">{t("departureDepartureTab")}</TabsTrigger>
          <TabsTrigger value="departures">{t("departureOnlyTab")}</TabsTrigger>
        </TabsList>

        <TabsContent value="search">
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
                  onChange={handleDepartureStationChange}
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
                  {destinationsLoading && (
                    <span className="text-xs text-gray-500 ml-2">
                      (Caricamento destinazioni...)
                    </span>
                  )}
                </Label>
                <StationAutocomplete
                  stations={availableArrivalStations}
                  value={arrivalStation}
                  onChange={setArrivalStation}
                  placeholder={
                    departureStationId
                      ? t("arrivalStation")
                      : "Seleziona prima la stazione di partenza"
                  }
                  error={errors.arrival}
                  className="w-full"
                />
                {departureStationId && destinations.length > 0 && (
                  <p className="text-xs text-gray-500 mt-1">
                    {destinations.length} destinazioni disponibili da {departureStation}
                  </p>
                )}
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
        </TabsContent>

        <TabsContent value="departures">
          {/* Departures Form */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
            <div className="space-y-6">
              {/* Station Selection */}
              <div>
                <Label
                  htmlFor="fromStation"
                  className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2"
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
                  className="w-full"
                />
              </div>

              {/* Date and Time Selection */}
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <Clock className="h-4 w-4 text-purple-500" />
                    {t("departureTimeLabel")}
                  </Label>
                  <DateTimePicker date={fromDepartureTime} setDate={setFromDepartureTime} />
                  {fromErrors.time && (
                    <p className="mt-1 text-sm text-red-600">{fromErrors.time}</p>
                  )}
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
                      onClick={() => setFromDepartureTime(new Date())}
                      className="text-xs"
                    >
                      {t("now")}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        const now = new Date();
                        now.setHours(now.getHours() + 1);
                        setFromDepartureTime(now);
                      }}
                      className="text-xs"
                    >
                      {t("oneHour")}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        const now = new Date();
                        now.setHours(now.getHours() + 2);
                        setFromDepartureTime(now);
                      }}
                      className="text-xs"
                    >
                      {t("twoHours")}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        const tomorrow = new Date();
                        tomorrow.setDate(tomorrow.getDate() + 1);
                        tomorrow.setHours(9, 0, 0, 0);
                        setFromDepartureTime(tomorrow);
                      }}
                      className="text-xs"
                    >
                      {t("tomorrow")}
                    </Button>
                  </div>
                </div>
              </div>

              {/* Search Button */}
              <div>
                <Button
                  onClick={handleDeparturesSearch}
                  disabled={departuresMutation.isPending || stationsLoading}
                  className="w-full h-12 text-base font-medium bg-red-500 hover:bg-red-600"
                >
                  {departuresMutation.isPending ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      {t("searchingNextDepartures")}
                    </>
                  ) : (
                    <>
                      <Search className="h-4 w-4 mr-2" />
                      {t("searchNextDepartures")}
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Search Results */}
      {activeTab === "search" && searchResults && (
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

      {/* Departures Results */}
      {activeTab === "departures" && departuresResults && (
        <EAVDeparturesResults
          trains={departuresResults.trains}
          isLoading={departuresMutation.isPending}
          error={departuresResults.error}
          station={departuresResults.station}
          type="departures"
        />
      )}
    </div>
  );
}
