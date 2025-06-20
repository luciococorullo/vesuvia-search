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
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-3 text-blue-800">{t("searchingTrainsInProgress")}</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-3 p-6 bg-red-50 border-2 border-red-200 rounded-xl">
          <AlertCircle className="h-6 w-6 text-red-600 flex-shrink-0" />
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
      <div className="text-center py-12">
        <TrainIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
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
    <div className="space-y-6">
      {/* Header with route info */}
      {originStation && destinationStation && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-center justify-center gap-3">
            <span className="font-semibold text-blue-900">{originStation}</span>
            <MapPin className="h-4 w-4 text-blue-600" />
            <div className="h-px bg-blue-300 flex-1 max-w-16"></div>
            <TrainIcon className="h-5 w-5 text-blue-600" />
            <div className="h-px bg-blue-300 flex-1 max-w-16"></div>
            <MapPin className="h-4 w-4 text-blue-600" />
            <span className="font-semibold text-blue-900">{destinationStation}</span>
          </div>
        </div>
      )}

      {/* Results header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">
          {t("searchResults")} ({trains.length} {trains.length === 1 ? t("train") : t("trains")})
        </h2>
      </div>

      {/* Train cards */}
      <div className="space-y-3">
        {trains.map((train) => (
          <EAVTrainCard key={train.id} train={train} />
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
      <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-semibold">
              {t("connectionJourney")}
            </div>
            {train.transferStations && (
              <div className="text-sm text-gray-600">
                {t("changeAt")}: {train.transferStations.join(", ")}
              </div>
            )}
          </div>

          <button
            onClick={() => setShowDetails(!showDetails)}
            className="flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            {showDetails ? t("hideDetails") : t("showDetails")}
            {showDetails ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </button>
        </div>

        {/* Summary view */}
        <div className="flex items-center justify-between">
          {/* Total journey info */}
          <div className="flex-1">
            <div className="flex items-center gap-4 mb-3">
              {/* Status badge */}
              <div
                className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${status.color}`}
              >
                {status.icon}
                {status.text}
              </div>
            </div>

            {/* Time and route info */}
            <div className="flex items-center gap-6">
              {/* Departure */}
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">
                  {formatTime(train.departureTime)}
                </div>
                <div className="text-sm text-gray-500 font-medium">{t("departure")}</div>
              </div>

              {/* Duration and connection info */}
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <div className="flex items-center gap-2 text-gray-400 mb-1">
                    <div className="h-px bg-gray-300 w-8"></div>
                    <RotateCcw className="h-4 w-4" />
                    <div className="h-px bg-gray-300 w-8"></div>
                  </div>
                  <div className="text-sm text-gray-600 font-medium">
                    {getDuration()} • {train.segments.length}{" "}
                    {train.segments.length === 1 ? t("segment") : t("segment")}
                  </div>
                </div>
              </div>

              {/* Arrival */}
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">
                  {formatTime(train.arrivalTime)}
                </div>
                <div className="text-sm text-gray-500 font-medium">{t("arrival")}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed segments view */}
        {showDetails && train.segments && (
          <div className="mt-6 border-t pt-4">
            <h4 className="text-sm font-semibold text-gray-700 mb-3">{t("journeyDetails")}</h4>
            <div className="space-y-4">
              {train.segments.map((segment, index) => (
                <div key={index}>
                  {/* Segment */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-semibold">
                          {t("trainCode").replace("{{code}}", segment.trainCode.toString())}
                        </div>
                        <span className="text-xs text-gray-600">{segment.trainType}</span>
                        <span className="text-xs text-gray-500">{segment.line}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="text-center">
                        <div className="text-lg font-bold text-gray-900">
                          {formatTime(segment.departureTime)}
                        </div>
                        <div className="text-xs text-gray-500">{segment.departureStation}</div>
                      </div>

                      <div className="flex-1 flex items-center justify-center">
                        <div className="flex items-center gap-2 text-gray-400">
                          <div className="h-px bg-gray-300 w-8"></div>
                          <TrainIcon className="h-3 w-3" />
                          <div className="h-px bg-gray-300 w-8"></div>
                        </div>
                      </div>

                      <div className="text-center">
                        <div className="text-lg font-bold text-gray-900">
                          {formatTime(segment.arrivalTime)}
                        </div>
                        <div className="text-xs text-gray-500">{segment.arrivalStation}</div>
                      </div>
                    </div>
                  </div>

                  {/* Transfer time (if not last segment) */}
                  {train.segments &&
                    index < train.segments.length - 1 &&
                    train.segments[index + 1] && (
                      <div className="flex items-center justify-center my-2">
                        <div className="bg-orange-50 border border-orange-200 rounded-lg px-3 py-2 text-center">
                          <div className="flex items-center gap-2 text-orange-700">
                            <Clock className="h-3 w-3" />
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

  // Direct journey (original design)
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        {/* Train info and times */}
        <div className="flex-1">
          <div className="flex items-center gap-4 mb-3">
            {/* Train code and type */}
            <div className="flex items-center gap-2">
              <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                {t("trainCode").replace("{{code}}", train.trainCode.toString())}
              </div>
              <span className="text-gray-600 text-sm font-medium">{train.trainType}</span>
              <div className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-semibold">
                {t("directJourney")}
              </div>
            </div>

            {/* Status badge */}
            <div
              className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${status.color}`}
            >
              {status.icon}
              {status.text}
            </div>
          </div>

          {/* Time and route info */}
          <div className="flex items-center gap-6">
            {/* Departure */}
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">
                {formatTime(train.departureTime)}
              </div>
              <div className="text-sm text-gray-500 font-medium">{t("departure")}</div>
            </div>

            {/* Duration and arrow */}
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <div className="flex items-center gap-2 text-gray-400 mb-1">
                  <div className="h-px bg-gray-300 w-12"></div>
                  <TrainIcon className="h-4 w-4" />
                  <div className="h-px bg-gray-300 w-12"></div>
                </div>
                <div className="text-sm text-gray-600 font-medium">{getDuration()}</div>
              </div>
            </div>

            {/* Arrival */}
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">
                {formatTime(train.arrivalTime)}
              </div>
              <div className="text-sm text-gray-500 font-medium">{t("arrival")}</div>
            </div>
          </div>

          {/* Line info */}
          {train.line && (
            <div className="mt-3 text-sm text-gray-600">
              <span className="font-medium">{train.line}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
