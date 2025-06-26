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
import { MapPin, Search, Clock } from "lucide-react";
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

// Styles per le animazioni dei tab
const tabAnimationStyles = {
  enter: "transform transition-all duration-300 ease-out",
  enterFrom: "opacity-0 translate-y-4 scale-95",
  enterTo: "opacity-100 translate-y-0 scale-100",
  leave: "transform transition-all duration-200 ease-in",
  leaveFrom: "opacity-100 translate-y-0 scale-100",
  leaveTo: "opacity-0 translate-y-4 scale-95",
};

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

  // Handle tab change con animazione fluida
  const handleTabChange = (value: string) => {
    // Prima di cambiare il tab attivo, aggiungiamo una piccola transizione
    document.querySelectorAll(".card-interactive").forEach((el) => {
      (el as HTMLElement).style.opacity = "0";
      (el as HTMLElement).style.transform = "translateY(10px)";
    });

    // Cambiamo il tab dopo un breve delay per consentire l'animazione di fadeout
    setTimeout(() => {
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

      // Riattiviamo l'elemento dopo che il tab è cambiato
      setTimeout(() => {
        document.querySelectorAll(".card-interactive").forEach((el) => {
          (el as HTMLElement).style.opacity = "1";
          (el as HTMLElement).style.transform = "translateY(0)";
        });
      }, 50);
    }, 150);
  };

  /*  // Handle station swap (search tab only)
  const handleSwapStations = () => {
    // Only allow swap if both stations are selected
    if (!departureStation || !arrivalStation) return;

    setDepartureStation(arrivalStation);
    setArrivalStation(""); // Clear arrival and let it be populated by destinations
    setErrors({ departure: "", arrival: "", time: "" });
  }; */

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
    // Only update if the value actually changed to prevent unnecessary re-renders
    if (newDepartureStation !== departureStation) {
      setDepartureStation(newDepartureStation);
      // Clear arrival station when departure changes to force user to select from valid destinations
      if (arrivalStation) {
        setArrivalStation("");
        setErrors((prev) => ({ ...prev, arrival: "" }));
      }
    }
  };

  // Handle arrival station change
  const handleArrivalStationChange = (newArrivalStation: string) => {
    // Only update if the value actually changed to prevent unnecessary re-renders
    if (newArrivalStation !== arrivalStation) {
      setArrivalStation(newArrivalStation);
      // Clear errors when user selects a station
      if (errors.arrival) {
        setErrors((prev) => ({ ...prev, arrival: "" }));
      }
    }
  };

  // Handle from station change (departures tab)
  const handleFromStationChange = (newFromStation: string) => {
    // Only update if the value actually changed to prevent unnecessary re-renders
    if (newFromStation !== fromStation) {
      setFromStation(newFromStation);
      // Clear errors when user selects a station
      if (fromErrors.station) {
        setFromErrors((prev) => ({ ...prev, station: "" }));
      }
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
      <div className="flex items-center justify-center py-8 animate-pulse-gentle">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-3 text-blue-800">{t("loading")}</span>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
        <TabsList className="grid w-full grid-cols-2 h-16 p-1 bg-transparent shadow-none border-0 gap-3">
          <TabsTrigger
            value="search"
            className="h-10 mx-1 rounded-lg font-medium transition-all duration-300 ease-in-out transform data-[state=active]:bg-blue-500 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:scale-105 hover:text-blue-700 hover:border-blue-300 hover:shadow-md border border-gray-200"
          >
            {t("departureDepartureTab")}
          </TabsTrigger>
          <TabsTrigger
            value="departures"
            className="h-10 mx-1 rounded-lg font-medium transition-all duration-300 ease-in-out transform data-[state=active]:bg-red-500 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:scale-105 hover:text-red-700 hover:border-red-300 hover:shadow-md border border-gray-200"
          >
            {t("departureOnlyTab")}
          </TabsTrigger>
        </TabsList>

        <TabsContent
          value="search"
          className={`${tabAnimationStyles.enter} ${tabAnimationStyles.enterFrom} ${tabAnimationStyles.enterTo} origin-top`}
        >
          {/* Search Form */}
          <div className="glass-effect rounded-xl shadow-xl border border-gray-200/50 p-6 card-interactive transition-all duration-500 ease-in-out transform">
            {/* Station Selection Row */}
            <div className="grid gap-6 md:grid-cols-2 mb-6">
              {/* Departure Station */}
              <div className="space-y-3 animate-slide-in-left">
                <Label
                  htmlFor="fromStation"
                  className="text-sm font-medium text-gray-700 flex items-center gap-2"
                >
                  <MapPin className="h-4 w-4 text-green-500 interactive-bounce" />
                  {t("departureStationLabel")}
                </Label>
                <StationAutocomplete
                  stations={stations}
                  value={departureStation}
                  onChange={handleDepartureStationChange}
                  placeholder={t("selectDepartureStation")}
                  error={errors.departure}
                  className="w-full"
                />
              </div>

              {/* Arrival Station */}
              <div className="space-y-3 animate-slide-in-left" style={{ animationDelay: "0.1s" }}>
                <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-red-500 interactive-bounce" />
                  {t("arrivalStation")}
                  {destinationsLoading && (
                    <span className="text-xs text-gray-500 ml-2 animate-pulse-gentle">
                      (Caricamento destinazioni...)
                    </span>
                  )}
                </Label>
                <StationAutocomplete
                  stations={availableArrivalStations}
                  value={arrivalStation}
                  onChange={handleArrivalStationChange}
                  placeholder={
                    departureStationId
                      ? t("arrivalStation")
                      : "Seleziona prima la stazione di partenza"
                  }
                  error={errors.arrival}
                  className="w-full"
                />
                {departureStationId && destinations.length > 0 && (
                  <p className="text-xs text-gray-500 animate-fade-in">
                    {destinations.length} destinazioni disponibili da {departureStation}
                  </p>
                )}
              </div>
            </div>

            {/* Date Time and Quick Actions */}
            <div className="grid gap-6 md:grid-cols-2">
              {/* Date Time Picker */}
              <div className="space-y-3 animate-slide-in-left" style={{ animationDelay: "0.2s" }}>
                <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <Clock className="h-4 w-4 text-purple-500 interactive-bounce" />
                  {t("departureTimeLabel")}
                </Label>
                <DateTimePicker date={departureTime} setDate={setDepartureTime} />
                {errors.time && (
                  <p className="text-sm text-red-600 animate-wiggle">{errors.time}</p>
                )}
              </div>

              {/* Quick Time Buttons */}
              <div className="space-y-2 animate-slide-in-left" style={{ animationDelay: "0.3s" }}>
                <Label className="text-sm font-medium text-gray-700">{t("quickSelection")}</Label>
                <div className="flex flex-wrap gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setDepartureTime(new Date())}
                    className="unified-quick-button"
                  >
                    {t("now")}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setQuickTime(1)}
                    className="unified-quick-button"
                  >
                    {t("oneHour")}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setQuickTime(2)}
                    className="unified-quick-button"
                  >
                    {t("twoHours")}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={setTomorrow}
                    className="unified-quick-button"
                  >
                    {t("tomorrow")}
                  </Button>
                </div>
              </div>
            </div>

            {/* Search Button */}
            <div className="mt-8 animate-slide-up" style={{ animationDelay: "0.4s" }}>
              <Button
                onClick={handleSearch}
                disabled={searchMutation.isPending || stationsLoading}
                className="unified-search-button"
              >
                {searchMutation.isPending ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                    {t("searchingTrains")}
                  </>
                ) : (
                  <>
                    <Search className="h-5 w-5 mr-3 interactive-bounce" />
                    {t("searchTrains")}
                  </>
                )}
              </Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent
          value="departures"
          className={`${tabAnimationStyles.enter} ${tabAnimationStyles.enterFrom} ${tabAnimationStyles.enterTo} origin-top`}
        >
          {/* Departures Form */}
          <div className="glass-effect rounded-xl shadow-xl border border-gray-200/50 p-6 card-interactive transition-all duration-500 ease-in-out transform">
            <div className="space-y-6">
              {/* Station Selection */}
              <div className="space-y-3 animate-slide-in-left">
                <Label
                  htmlFor="fromStation"
                  className="text-sm font-medium text-gray-700 flex items-center gap-2"
                >
                  <MapPin className="h-4 w-4 text-green-500 interactive-bounce" />
                  {t("departureStationLabel")}
                </Label>
                <StationAutocomplete
                  stations={stations}
                  value={fromStation}
                  onChange={handleFromStationChange}
                  placeholder={t("selectDepartureStation")}
                  error={fromErrors.station}
                  className="w-full"
                />
              </div>

              {/* Search Button */}
              <div className="animate-slide-up" style={{ animationDelay: "0.3s" }}>
                <Button
                  onClick={handleDeparturesSearch}
                  disabled={departuresMutation.isPending || stationsLoading}
                  className="unified-search-button secondary"
                >
                  {departuresMutation.isPending ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                      {t("searchingNextDepartures")}
                    </>
                  ) : (
                    <>
                      <Search className="h-5 w-5 mr-3 interactive-bounce" />
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
        <div className="transition-all duration-500 ease-in-out transform animate-slide-up">
          <EAVTrainResults
            trains={searchResults.trains}
            isLoading={searchMutation.isPending}
            error={searchResults.error}
            originStation={searchResults.originStation}
            destinationStation={searchResults.destinationStation}
            searchDate={searchResults.searchDate}
            searchTime={searchResults.searchTime}
          />
        </div>
      )}

      {/* Departures Results */}
      {activeTab === "departures" && departuresResults && (
        <div className="transition-all duration-500 ease-in-out transform animate-slide-up">
          <EAVDeparturesResults
            trains={departuresResults.trains}
            isLoading={departuresMutation.isPending}
            error={departuresResults.error}
            station={departuresResults.station}
            type="departures"
          />
        </div>
      )}
    </div>
  );
}
