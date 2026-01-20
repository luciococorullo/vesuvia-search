/**
 * @fileoverview EAV Train Results Component
 *
 * This component displays train search results from the official EAV API.
 * It shows real-time train information including delays, cancellations,
 * and provides a clean, modern interface for viewing train schedules.
 *
 * @author VesuviaSearch Team
 * @version 2.0.0
 */

"use client";

import React, { useState } from "react";
import {
  MapPin,
  Train as TrainIcon,
  AlertCircle,
  AlertTriangle,
  XCircle,
  CheckCircle,
  Clock,
  RotateCcw,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { EAVTrainResult } from "@/lib/types";
import { useLanguage } from "@/contexts/LanguageContext";

interface EAVTrainResultsProps {
  trains: EAVTrainResult[];
  isLoading?: boolean;
  error?: string;
  originStation?: string;
  destinationStation?: string;
  searchDate?: string;
  searchTime?: string;
}

export function EAVTrainResults({
  trains,
  isLoading,
  error,
  originStation,
  destinationStation,
}: EAVTrainResultsProps) {
  const { t } = useLanguage();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8 animate-pulse-gentle">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-3 text-blue-800 animate-fade-in">{t("searchingTrainsInProgress")}</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-4 animate-slide-up">
        <div className="flex items-center gap-3 p-6 glass-effect rounded-xl border-2 border-red-200 card-interactive">
          <AlertCircle className="h-6 w-6 text-red-600 flex-shrink-0 animate-bounce-in" />
          <div>
            <h3 className="text-red-800 font-semibold mb-1">{t("apiError")}</h3>
            <p className="text-red-700 text-sm">{t("apiErrorDescription")}</p>
            {error && (
              <p className="text-red-600 text-xs mt-2 font-mono bg-red-100 p-2 rounded">{error}</p>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (trains.length === 0) {
    return (
      <div className="text-center py-12 animate-fade-in">
        <TrainIcon className="h-16 w-16 text-gray-300 mx-auto mb-4 animate-bounce-in" />
        <h3 className="text-xl font-medium text-gray-700 mb-2">{t("noTrainsFound")}</h3>
        <p className="text-gray-500 max-w-md mx-auto">{t("noTrainsFoundDescription")}</p>
        {originStation && destinationStation && (
          <div className="mt-4 text-sm text-gray-400">
            {originStation} → {destinationStation}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-slide-up">
      {/* Header with route info */}
      {originStation && destinationStation && (
        <div className="glass-effect border border-blue-200 rounded-xl p-4 card-interactive animate-fade-in">
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <span className="font-semibold text-blue-900 text-sm md:text-base">
              {originStation}
            </span>
            <MapPin className="h-4 w-4 text-blue-600 interactive-bounce" />
            <div className="h-px bg-blue-300 flex-1 max-w-16"></div>
            <TrainIcon className="h-5 w-5 text-blue-600 interactive-bounce" />
            <div className="h-px bg-blue-300 flex-1 max-w-16"></div>
            <MapPin className="h-4 w-4 text-blue-600 interactive-bounce" />
            <span className="font-semibold text-blue-900 text-sm md:text-base">
              {destinationStation}
            </span>
          </div>
        </div>
      )}

      {/* Results header */}
      <div className="flex items-center justify-between animate-slide-in-left">
        <h2 className="text-xl md:text-2xl font-semibold text-gray-900 text-with-shadow">
          {t("searchResults")} ({trains.length} {trains.length === 1 ? t("train") : t("trains")})
        </h2>
      </div>

      {/* Train cards */}
      <div className="space-y-4">
        {trains.map((train, index) => (
          <div
            key={train.id}
            style={{ animationDelay: `${index * 0.1}s` }}
            className="animate-slide-in-left"
          >
            <EAVTrainCard train={train} />
          </div>
        ))}
      </div>
    </div>
  );
}

interface EAVTrainCardProps {
  train: EAVTrainResult;
}

function EAVTrainCard({ train }: EAVTrainCardProps) {
  const { t } = useLanguage();
  const [showDetails, setShowDetails] = useState(false);

  // Format time for display
  const formatTime = (date: Date | string) => {
    // Ensure we have a valid Date object
    const dateObj = date instanceof Date ? date : new Date(date);

    // Check if date is valid
    if (isNaN(dateObj.getTime())) {
      return "--:--";
    }

    return dateObj.toLocaleTimeString("it-IT", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Calculate journey duration
  const getDuration = () => {
    const departureDate = new Date(train.departureTime);
    const arrivalDate = new Date(train.arrivalTime);

    // Check if dates are valid
    if (isNaN(departureDate.getTime()) || isNaN(arrivalDate.getTime())) {
      return "--";
    }

    const durationMs = arrivalDate.getTime() - departureDate.getTime();
    const durationMinutes = Math.round(durationMs / (1000 * 60));
    const hours = Math.floor(durationMinutes / 60);
    const minutes = durationMinutes % 60;

    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };

  // Calculate transfer time between segments
  const getTransferTime = (segment1EndTime: string, segment2StartTime: string) => {
    const end = new Date(segment1EndTime);
    const start = new Date(segment2StartTime);

    if (isNaN(end.getTime()) || isNaN(start.getTime())) {
      return "--";
    }

    const transferMs = start.getTime() - end.getTime();
    const transferMinutes = Math.round(transferMs / (1000 * 60));

    return `${transferMinutes}m`;
  };

  // Get status icon and color
  const getStatusDisplay = () => {
    if (train.isCancelled) {
      return {
        icon: <XCircle className="h-4 w-4" />,
        text: t("cancelled"),
        color: "text-red-600 bg-red-50",
      };
    }

    if (train.isDelayed) {
      return {
        icon: <AlertTriangle className="h-4 w-4" />,
        text: t("delayedByMinutes").replace("{{minutes}}", train.delaMinutes.toString()),
        color: "text-orange-600 bg-orange-50",
        mobileText: `+${train.delaMinutes} min`,
      };
    }

    return {
      icon: <CheckCircle className="h-4 w-4" />,
      text: t("onTime"),
      color: "text-green-600 bg-green-50",
    };
  };

  const status = getStatusDisplay();

  if (train.isConnection && train.segments) {
    // Multi-segment journey with transfers
    return (
      <div className="glass-effect border border-gray-200 rounded-xl p-4 md:p-6 card-interactive ripple-effect">
        {/* Header Row with Connection Tag, Transfer Info and Status */}
        <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
          <div className="flex items-center gap-3 flex-wrap">
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
              {t("connectionJourney")}
            </div>
            {train.transferStations && (
              <div className="text-sm text-gray-600 hidden md:block">
                {t("changeAt")}:{" "}
                <span className="line-clamp-1">{train.transferStations.join(", ")}</span>
              </div>
            )}
          </div>

          {/* Status badge - top right */}
          <div
            className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${status.color} shadow-sm`}
          >
            {status.icon}
            <span className="sm:hidden">{status.mobileText || status.text}</span>
            <span className="hidden sm:inline">{status.text}</span>
          </div>
        </div>

        {/* Mobile transfer stations info */}
        {train.transferStations && (
          <div className="text-sm text-gray-600 mb-3 md:hidden">
            {t("changeAt")}:{" "}
            <span className="line-clamp-2">{train.transferStations.join(", ")}</span>
          </div>
        )}

        {/* Details toggle button */}
        <div className="flex justify-end mb-3">
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="flex items-center gap-1 text-blue-600 hover:text-blue-800 button-interactive px-3 py-2 rounded-lg text-sm font-medium mobile-touch-target"
          >
            {showDetails ? t("hideDetails") : t("showDetails")}
            {showDetails ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </button>
        </div>

        {/* Summary view */}
        <div className="flex items-center justify-between">
          {/* Total journey info */}
          <div className="flex-1">
            {/* Time and route info */}
            <div className="flex items-center gap-3 md:gap-6">
              {/* Departure */}
              <div className="text-center">
                <div className="text-xl md:text-2xl font-bold text-gray-900">
                  {formatTime(train.departureTime)}
                </div>
                <div className="text-xs md:text-sm text-gray-500 font-medium">{t("departure")}</div>
              </div>

              {/* Duration and connection info */}
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <div className="flex items-center gap-1 md:gap-2 text-gray-400 mb-1">
                    <div className="h-px bg-gray-300 w-4 md:w-8"></div>
                    <RotateCcw className="h-3 w-3 md:h-4 md:w-4 interactive-bounce" />
                    <div className="h-px bg-gray-300 w-4 md:w-8"></div>
                  </div>
                  <div className="text-xs md:text-sm text-gray-600 font-medium">
                    {getDuration()} • {train.segments.length}{" "}
                    {train.segments.length === 1 ? t("segment") : t("segment")}
                  </div>
                </div>
              </div>

              {/* Arrival */}
              <div className="text-center">
                <div className="text-xl md:text-2xl font-bold text-gray-900">
                  {formatTime(train.arrivalTime)}
                </div>
                <div className="text-xs md:text-sm text-gray-500 font-medium">{t("arrival")}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed segments view */}
        {showDetails && train.segments && (
          <div className="mt-6 border-t pt-4 animate-slide-up">
            <h4 className="text-sm font-semibold text-gray-700 mb-4">{t("journeyDetails")}</h4>
            <div className="space-y-4">
              {train.segments.map((segment, index) => (
                <div
                  key={index}
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Segment */}
                  <div className="glass-effect rounded-lg p-4 card-interactive">
                    <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <div className="flex items-center gap-2">
                          <TrainIcon className="h-3 w-3 text-blue-600 flex-shrink-0 interactive-bounce" />
                          <span className="text-xs font-semibold text-gray-800">
                            {segment.trainCode}
                          </span>
                        </div>
                        {segment.trainType && (
                          <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-2 py-0.5 rounded-full text-xs font-semibold shadow-sm">
                            {segment.trainType}
                          </div>
                        )}
                        {segment.line && (
                          <span className="text-xs text-gray-500">Linea: {segment.line}</span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 md:gap-4">
                      <div className="text-center flex-1">
                        <div className="text-base md:text-lg font-bold text-gray-900">
                          {formatTime(segment.departureTime)}
                        </div>
                        <div className="text-xs text-gray-500 truncate max-w-[110px] md:max-w-full mx-auto">
                          {segment.departureStation}
                        </div>
                      </div>

                      <div className="flex items-center justify-center px-2">
                        <div className="flex items-center gap-1 text-gray-400">
                          <div className="h-px bg-gray-300 w-4 md:w-8"></div>
                          <TrainIcon className="h-3 w-3 interactive-bounce" />
                          <div className="h-px bg-gray-300 w-4 md:w-8"></div>
                        </div>
                      </div>

                      <div className="text-center flex-1">
                        <div className="text-base md:text-lg font-bold text-gray-900">
                          {formatTime(segment.arrivalTime)}
                        </div>
                        <div className="text-xs text-gray-500 truncate max-w-[110px] md:max-w-full mx-auto">
                          {segment.arrivalStation}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Transfer time (if not last segment) */}
                  {train.segments &&
                    index < train.segments.length - 1 &&
                    train.segments[index + 1] && (
                      <div className="flex items-center justify-center my-3">
                        <div className="glass-effect border-orange-200 rounded-lg px-4 py-2 text-center card-interactive">
                          <div className="flex items-center gap-2 text-orange-700">
                            <Clock className="h-3 w-3 interactive-bounce" />
                            <span className="text-xs font-medium">
                              {t("transferTime")}:{" "}
                              {getTransferTime(
                                segment.arrivalTime,
                                train.segments[index + 1].departureTime
                              )}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  // Direct journey (updated design for consistency)
  return (
    <div className="glass-effect border border-gray-200 rounded-xl p-4 md:p-6 card-interactive ripple-effect">
      {/* Header Row with Train ID and Status */}
      <div className="flex items-center justify-between mb-2">
        {/* Train code and type */}
        <div className="flex items-center gap-2 md:gap-3 flex-wrap">
          <div className="flex items-center gap-2">
            <TrainIcon className="h-4 w-4 text-blue-600 flex-shrink-0 interactive-bounce" />
            <span className="font-semibold text-gray-800">{train.trainCode}</span>
          </div>

          {train.trainType && (
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-sm">
              {train.trainType}
            </div>
          )}
        </div>

        {/* Status badge - top right */}
        <div
          className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${status.color} shadow-sm`}
        >
          {status.icon}
          <span className="sm:hidden">{status.mobileText || status.text}</span>
          <span className="hidden sm:inline">{status.text}</span>
        </div>
      </div>

      {/* Main content */}
      <div className="mt-2">
        {/* Time and route info */}
        <div className="flex items-center gap-3 md:gap-6">
          {/* Departure */}
          <div className="text-center flex-1">
            <div className="text-xl md:text-2xl font-bold text-gray-900">
              {formatTime(train.departureTime)}
            </div>
            <div className="text-xs md:text-sm text-gray-500 font-medium">{t("departure")}</div>
          </div>

          {/* Duration and arrow */}
          <div className="flex items-center justify-center px-2">
            <div className="text-center">
              <div className="flex items-center gap-1 md:gap-2 text-gray-400 mb-1">
                <div className="h-px bg-gray-300 w-6 md:w-12"></div>
                <TrainIcon className="h-4 w-4 interactive-bounce" />
                <div className="h-px bg-gray-300 w-6 md:w-12"></div>
              </div>
              <div className="text-xs md:text-sm text-gray-600 font-medium whitespace-nowrap">
                {getDuration()}
              </div>
            </div>
          </div>

          {/* Arrival */}
          <div className="text-center flex-1">
            <div className="text-xl md:text-2xl font-bold text-gray-900">
              {formatTime(train.arrivalTime)}
            </div>
            <div className="text-xs md:text-sm text-gray-500 font-medium">{t("arrival")}</div>
          </div>
        </div>

        {/* Trip and Line info */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-sm text-gray-600">
          {train.departureStation && train.arrivalStation && (
            <span className="font-medium bg-gray-100 px-3 py-1 rounded-full">
              {train.departureStation} - {train.arrivalStation}
            </span>
          )}

          {train.line && (
            <span className="font-medium bg-gray-50 px-3 py-1 rounded-full">
              {t("line")}: {train.line}
            </span>
          )}
        </div>
      </div>

    </div>
  );
}
