/**
 * @fileoverview EAV Departures Results Component
 *
 * This component displays departure/arrival results from the EAV API
 * in a clean, mobile-friendly format.
 *
 * @author VesuviaSearch Team
 * @version 1.0.0
 */

"use client";

import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { EAVDepartureResult } from "@/hooks/useEAVTrains";
import {
  Clock,
  MapPin,
  AlertCircle,
  Train,
  Calendar,
  CheckCircle,
  AlertTriangle,
  XCircle,
} from "lucide-react";

interface EAVDeparturesResultsProps {
  /** Array of departure/arrival results */
  trains: EAVDepartureResult[];
  /** Whether the search is currently loading */
  isLoading: boolean;
  /** Error message if the search failed */
  error?: string;
  /** Station name for display */
  station?: string;
  /** Type of results (departures or arrivals) */
  type?: "departures" | "arrivals";
  /** Search date for context */
  searchDate?: string;
  /** Search time for context */
  searchTime?: string;
}

export function EAVDeparturesResults({
  trains,
  isLoading,
  error,
  station,
  type = "departures",
  searchDate,
  searchTime,
}: EAVDeparturesResultsProps) {
  const { t, isLoaded } = useLanguage();

  if (!isLoaded) {
    return null;
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-3 text-blue-800">
            {type === "departures" ? t("searchingNextDepartures") : t("searchingArrivals")}
          </span>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="bg-white rounded-xl shadow-lg border border-red-200 p-6">
        <div className="flex items-center gap-3 text-red-600 mb-4">
          <AlertCircle className="h-5 w-5" />
          <h3 className="font-semibold">{t("error")}</h3>
        </div>
        <p className="text-red-700 mb-4">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="text-blue-600 hover:text-blue-800 underline"
        >
          {t("retry")}
        </button>
      </div>
    );
  }

  // No results state
  if (!trains || trains.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
        <div className="text-center py-8">
          <Train className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            {type === "departures" ? t("noDeparturesFound") : t("noArrivalsFound")}
          </h3>
          <p className="text-gray-500">
            {station && (
              <>
                {type === "departures" ? t("noDeparturesFromStation") : t("noArrivalsToStation")}{" "}
                <strong>{station}</strong>
              </>
            )}
          </p>
        </div>
      </div>
    );
  }

  // Results header with blue card style

  return (
    <div className="space-y-4">
      {/* Departures Header - Blue Card Style */}
      {station && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-center justify-center gap-3">
            <Clock className="h-5 w-5 text-blue-600" />
            <span className="font-semibold text-blue-900">
              {type === "departures" ? t("nextDeparturesFrom") : t("nextArrivalsTo")}
            </span>
            <MapPin className="h-4 w-4 text-blue-600" />
            <div className="h-px bg-blue-300 flex-1 max-w-16"></div>
            <Train className="h-5 w-5 text-blue-600" />
            <div className="h-px bg-blue-300 flex-1 max-w-16"></div>
            <span className="font-semibold text-blue-900">{station}</span>
          </div>

          {(searchDate || searchTime) && (
            <div className="flex items-center justify-center gap-2 text-blue-700 text-sm mt-2">
              <Calendar className="h-4 w-4" />
              {searchDate && <span>{searchDate}</span>}
              {searchTime && <span>{searchTime}</span>}
            </div>
          )}
        </div>
      )}

      {/* Results Summary */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">
          {trains.length} {type === "departures" ? t("departuresFound") : t("arrivalsFound")}
        </h2>
      </div>

      {/* Results List */}
      <div className="space-y-3">
        {trains.map((train, index) => (
          <DepartureCard key={train.id || index} train={train} type={type} />
        ))}
      </div>
    </div>
  );
}

interface DepartureCardProps {
  train: EAVDepartureResult;
  type: "departures" | "arrivals";
}

function DepartureCard({ train, type }: DepartureCardProps) {
  const { t } = useLanguage();

  const hasDelay = train.delay && train.delay !== "0" && train.delay !== "";
  const delayMinutes = hasDelay ? parseInt(train.delay || "0") : 0;
  const isDelayed = delayMinutes > 0;

  // Get status display similar to EAVTrainCard
  const getStatusDisplay = () => {
    // Check if train is cancelled based on status
    if (
      train.status &&
      (train.status.toLowerCase().includes("cancell") ||
        train.status.toLowerCase().includes("soppresso"))
    ) {
      return {
        icon: <XCircle className="h-4 w-4" />,
        text: t("cancelled"),
        color: "text-red-600 bg-red-50",
      };
    }

    // Check if delayed
    if (isDelayed) {
      return {
        icon: <AlertTriangle className="h-4 w-4" />,
        text: `+${delayMinutes} min`,
        color: "text-orange-600 bg-orange-50",
      };
    }

    // Check for "on time" status
    if (
      train.status &&
      (train.status.toLowerCase().includes("orario") || train.status.toLowerCase().includes("time"))
    ) {
      return {
        icon: <CheckCircle className="h-4 w-4" />,
        text: t("onTime"),
        color: "text-green-600 bg-green-50",
      };
    }

    // Default to on time if no delay
    return {
      icon: <CheckCircle className="h-4 w-4" />,
      text: t("onTime"),
      color: "text-green-600 bg-green-50",
    };
  };

  const status = getStatusDisplay();

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between">
        {/* Train Info */}
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <div className="flex items-center gap-2">
              <Train className="h-4 w-4 text-blue-600" />
              <span className="font-semibold text-gray-800">{train.trainNumber}</span>
            </div>

            {train.trainType && (
              <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                {train.trainType}
              </span>
            )}

            {/* Status Badge - Prominent Display */}
            <div
              className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${status.color}`}
            >
              {status.icon}
              {status.text}
            </div>
          </div>

          <div className="flex items-center gap-2 text-gray-600">
            <MapPin className="h-4 w-4" />
            <span>
              {type === "departures" ? t("to") : t("from")} <strong>{train.destination}</strong>
            </span>
          </div>

          {train.platform && (
            <div className="mt-1 text-sm text-gray-500">
              {t("platform")} {train.platform}
            </div>
          )}
        </div>

        {/* Time Display */}
        <div className="text-right">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-gray-500" />
            <span className="text-lg font-bold text-gray-800">{train.time}</span>
          </div>

          {/* Additional status info if needed */}
          {train.status && !status.text.includes(train.status) && (
            <div className="mt-1 text-xs text-gray-500">{train.status}</div>
          )}
        </div>
      </div>
    </div>
  );
}
