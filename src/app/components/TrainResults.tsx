"use client";

import React from "react";
import { Clock, MapPin, Train as TrainIcon, AlertCircle } from "lucide-react";
import { TrainWithDetails, Station } from "@/lib/types";
import { getCategoryLabel, getDirectionLabel, getOperatingDaysLabel } from "@/lib/types";
import { useLanguage } from "@/contexts/LanguageContext";

interface TrainResultsProps {
  trains: TrainWithDetails[];
  isLoading?: boolean;
  error?: string;
  searchFrom?: string;
  searchTo?: string;
  fromStations?: Station[];
  toStations?: Station[];
}

export function TrainResults({
  trains,
  isLoading,
  error,
  searchFrom,
  searchTo,
  fromStations,
  toStations,
}: TrainResultsProps) {
  const { t } = useLanguage();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-3 text-blue-800">{t("searchingTrainsInProgress")}</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center gap-3 p-4 bg-red-50 border-2 border-red-300 rounded-lg">
        <AlertCircle className="h-5 w-5 text-red-600" />
        <span className="text-red-800 font-medium">{error}</span>
      </div>
    );
  }

  if (trains.length === 0) {
    return (
      <div className="text-center py-8">
        <TrainIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">{t("noTrainsFound")}</h3>
        <p className="text-gray-500">{t("noTrainsFoundDescription")}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">
          {t("searchResults")} ({trains.length} {trains.length === 1 ? t("train") : t("trains")})
        </h2>
      </div>

      <div className="space-y-3">
        {trains.map((train) => (
          <TrainCard
            key={train.id}
            train={train}
            searchFrom={searchFrom}
            searchTo={searchTo}
            fromStations={fromStations}
            toStations={toStations}
          />
        ))}
      </div>
    </div>
  );
}

interface TrainCardProps {
  train: TrainWithDetails;
  searchFrom?: string;
  searchTo?: string;
  fromStations?: Station[];
  toStations?: Station[];
}

function TrainCard({ train, fromStations, toStations }: TrainCardProps) {
  const { t } = useLanguage();

  // Helper function to find departure and arrival stops based on search criteria
  const getSearchStops = () => {
    if (!fromStations || !toStations) {
      // Fallback to original behavior if search data is not available
      return {
        departureStop: { station: train.startStation, departureTime: train.departureTime },
        arrivalStop: {
          station: train.endStation,
          arrivalTime: train.stops[train.stops.length - 1]?.arrivalTime || "N/A",
        },
      };
    }

    const fromStationIds = fromStations.map((s) => s.id);
    const toStationIds = toStations.map((s) => s.id);

    // Find the departure stop (first matching station from search)
    let departureStop = null;
    if (fromStationIds.includes(train.startStationId)) {
      departureStop = { station: train.startStation, departureTime: train.departureTime };
    } else {
      const foundStop = train.stops.find((stop) => fromStationIds.includes(stop.stationId));
      if (foundStop) {
        departureStop = {
          station: foundStop.station,
          departureTime: foundStop.departureTime || foundStop.arrivalTime || train.departureTime,
        };
      }
    }

    // Find the arrival stop (matching station from search)
    let arrivalStop = null;
    if (toStationIds.includes(train.endStationId)) {
      const lastStop = train.stops[train.stops.length - 1];
      arrivalStop = { station: train.endStation, arrivalTime: lastStop?.arrivalTime || "N/A" };
    } else {
      const foundStop = train.stops.find((stop) => toStationIds.includes(stop.stationId));
      if (foundStop) {
        arrivalStop = {
          station: foundStop.station,
          arrivalTime: foundStop.arrivalTime || foundStop.departureTime || "N/A",
        };
      }
    }

    return {
      departureStop: departureStop || {
        station: train.startStation,
        departureTime: train.departureTime,
      },
      arrivalStop: arrivalStop || {
        station: train.endStation,
        arrivalTime: train.stops[train.stops.length - 1]?.arrivalTime || "N/A",
      },
    };
  };

  const { departureStop, arrivalStop } = getSearchStops();

  // Calculate duration between the searched stations
  const calculateDuration = (departure: string, arrival: string) => {
    if (!arrival || arrival === "N/A") return "N/A";

    const [depHours, depMins] = departure.split(":").map(Number);
    const [arrHours, arrMins] = arrival.split(":").map(Number);

    const depTotal = depHours * 60 + depMins;
    const arrTotal = arrHours * 60 + arrMins;

    let duration = arrTotal - depTotal;
    if (duration < 0) duration += 24 * 60; // Handle next day

    const hours = Math.floor(duration / 60);
    const mins = duration % 60;

    return `${hours}h ${mins}m`;
  };

  const duration = calculateDuration(departureStop.departureTime, arrivalStop.arrivalTime);

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-3">
            <div className="flex items-center gap-2">
              <TrainIcon className="h-5 w-5 text-blue-600" />
              <span className="font-semibold text-gray-900">{train.trainNumber || "N/A"}</span>
            </div>

            {train.isCampaniaExpress && (
              <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full">
                {t("campaniaExpressLabel")}
              </span>
            )}

            {
              <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                {getCategoryLabel(train.category)}
              </span>
            }
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-green-600" />
              <div>
                <div className="font-medium text-gray-900">{departureStop.station.name}</div>
                <div className="text-sm text-gray-500">{departureStop.departureTime}</div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-gray-400" />
              <div>
                <div className="font-medium text-gray-900">{t("duration")}</div>
                <div className="text-sm text-gray-500">{duration}</div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-red-600" />
              <div>
                <div className="font-medium text-gray-900">{arrivalStop.station.name}</div>
                <div className="text-sm text-gray-500">{arrivalStop.arrivalTime}</div>
              </div>
            </div>
          </div>

          <div className="mt-4 flex items-center gap-4 text-sm text-gray-500">
            <span>
              {t("direction")}: {getDirectionLabel(train.direction)}
            </span>
            <span>•</span>
            <span>{getOperatingDaysLabel(train.operatingDays)}</span>
            {train.stops.length > 2 && (
              <>
                <span>•</span>
                <span>
                  {train.stops.length - 2} {t("intermediateStops")}
                </span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Fermate intermedie (espandibili) */}
      {train.stops.length > 2 && (
        <details className="mt-4">
          <summary className="cursor-pointer text-blue-600 hover:text-blue-800 font-medium">
            {t("showAllStops")}
          </summary>
          <div className="mt-3 space-y-2">
            {train.stops.map((stop) => (
              <div
                key={stop.id}
                className="flex items-center justify-between py-1 px-3 bg-gray-50 rounded text-sm"
              >
                <span className="font-medium">{stop.station.name}</span>
                <div className="flex gap-4 text-gray-600">
                  {stop.arrivalTime && <span>{stop.arrivalTime}</span>}
                </div>
              </div>
            ))}
          </div>
        </details>
      )}
    </div>
  );
}
