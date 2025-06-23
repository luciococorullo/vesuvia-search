/**
 * @fileoverview EAV Departures Results Component
 *
 * This component displays live departure/arrival results from the official EAV API
 * in a clean, modern, mobile-friendly format with real-time updates and 
 * status indicators for delays and cancellations.
 *
 * @author VesuviaSearch Team
 * @version 2.0.0
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
      <div className="glass-effect rounded-xl shadow-lg border border-gray-200 p-6 animate-pulse-gentle">
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-3 text-blue-800 animate-fade-in">
            {type === "departures" ? t("searchingNextDepartures") : t("searchingArrivals")}
          </span>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="glass-effect rounded-xl shadow-lg border border-red-200 p-6 animate-slide-up card-interactive">
        <div className="flex items-center gap-3 text-red-600 mb-4">
          <AlertCircle className="h-5 w-5 animate-bounce-in" />
          <h3 className="font-semibold">{t("error")}</h3>
        </div>
        <p className="text-red-700 mb-4">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="text-blue-600 hover:text-blue-800 underline button-interactive px-3 py-2 rounded-lg mobile-touch-target"
        >
          {t("retry")}
        </button>
      </div>
    );
  }

  // No results state
  if (!trains || trains.length === 0) {
    return (
      <div className="glass-effect rounded-xl shadow-lg border border-gray-200 p-6 animate-fade-in">
        <div className="text-center py-8">
          <Train className="h-12 w-12 text-gray-400 mx-auto mb-4 animate-bounce-in" />
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
    <div className="space-y-4 animate-slide-up">
      {/* Departures Header - Blue Card Style */}
      {station && (
        <div className="glass-effect border border-blue-200 rounded-xl p-4 card-interactive animate-fade-in">
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <Clock className="h-5 w-5 text-blue-600 interactive-bounce" />
            <span className="font-semibold text-blue-900 text-sm md:text-base">
              {type === "departures" ? t("nextDeparturesFrom") : t("nextArrivalsTo")}
            </span>
            <MapPin className="h-4 w-4 text-blue-600 interactive-bounce" />
            <div className="h-px bg-blue-300 flex-1 max-w-16"></div>
            <Train className="h-5 w-5 text-blue-600 interactive-bounce" />
            <div className="h-px bg-blue-300 flex-1 max-w-16"></div>
            <span className="font-semibold text-blue-900 text-sm md:text-base">{station}</span>
          </div>

          {(searchDate || searchTime) && (
            <div className="flex items-center justify-center gap-2 text-blue-700 text-sm mt-2 animate-slide-in-left">
              <Calendar className="h-4 w-4 interactive-bounce" />
              {searchDate && <span>{searchDate}</span>}
              {searchTime && <span>{searchTime}</span>}
            </div>
          )}
        </div>
      )}

      {/* Results Summary */}
      <div className="flex items-center justify-between animate-slide-in-left">
        <h2 className="text-xl md:text-2xl font-semibold text-gray-900 text-with-shadow">
          {trains.length} {type === "departures" ? t("departuresFound") : t("arrivalsFound")}
        </h2>
      </div>

      {/* Results List */}
      <div className="space-y-4">
        {trains.map((train, index) => (
          <div
            key={train.id || index}
            style={{ animationDelay: `${index * 0.1}s` }}
            className="animate-slide-in-left"
          >
            <DepartureCard train={train} type={type} />
          </div>
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
        text: t("delayedByMinutes").replace("{{minutes}}", delayMinutes.toString()),
        color: "text-orange-600 bg-orange-50",
        mobileText: `+${delayMinutes} min`,
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
    <div className="glass-effect rounded-lg shadow-md border border-gray-200 p-4 card-interactive ripple-effect">
      {/* Header Row with Status */}
      <div className="flex items-center justify-between mb-2">
        {/* Train number and type */}
        <div className="flex items-center gap-2 md:gap-3 flex-wrap">
          <div className="flex items-center gap-2">
            <Train className="h-4 w-4 text-blue-600 flex-shrink-0 interactive-bounce" />
            <span className="font-semibold text-gray-800">{train.trainNumber}</span>
          </div>

          {train.trainType && (
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-sm">
              {train.trainType}
            </div>
          )}
        </div>

        {/* Status Badge - Moved to top right */}
        <div
          className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${status.color} shadow-sm`}
        >
          {status.icon}
          <span className="sm:hidden">{status.mobileText || status.text}</span>
          <span className="hidden sm:inline">{status.text}</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="mt-2">
        {/* Main row with destination and time */}
        <div className="flex items-center justify-between gap-3">
          {/* Destination */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 text-gray-600">
              <MapPin className="h-4 w-4 flex-shrink-0 interactive-bounce" />
              <span className="text-sm md:text-base overflow-hidden">
                {type === "departures" ? t("to") : t("from")} <strong>{train.destination}</strong>
              </span>
            </div>

            {/* Platform */}
            {train.platform && (
              <div className="text-sm text-gray-500 mt-2">
                <span className="bg-gray-100 px-2 py-1 rounded-full font-medium">
                  {t("platform")} {train.platform}
                </span>
              </div>
            )}
          </div>

          {/* Time Display */}
          <div className="flex-shrink-0 flex items-center gap-2 justify-end">
            <Clock className="h-4 w-4 text-gray-500 interactive-bounce" />
            <span className="text-lg md:text-xl font-bold text-gray-800">{train.time}</span>
          </div>
        </div>

        {/* Additional status info if needed */}
        {train.status && !status.text.includes(train.status) && (
          <div className="text-xs text-gray-500 mt-1">{train.status}</div>
        )}
      </div>
    </div>
  );
}
