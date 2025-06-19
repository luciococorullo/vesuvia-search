# API Documentation

This document provides comprehensive information about the VesuviaSearch REST API endpoints.

## Base URL

```
Development: http://localhost:3000/api
Production: https://your-domain.com/api
```

## Content Type

All API endpoints accept and return JSON data unless otherwise specified.

```
Content-Type: application/json
```

## Endpoints

### 1. Stations

#### Get All Stations

Retrieve a list of all railway stations in the Circumvesuviana network.

**Endpoint:** `GET /api/stations`

**Response:**
```json
{
  "stations": [
    {
      "id": 1,
      "name": "Napoli Centrale",
      "code": "NAP"
    },
    {
      "id": 2,
      "name": "Sorrento",
      "code": "SOR"
    }
  ]
}
```

**Status Codes:**
- `200` - Success
- `500` - Internal Server Error

---

### 2. Train Search

#### Search Trains Between Stations

Search for trains between two stations with optional filters.

**Endpoint:** `GET /api/search`

**Query Parameters:**
- `from` (required) - Source station name or code
- `to` (required) - Destination station name or code
- `date` (optional) - Travel date in YYYY-MM-DD format
- `time` (optional) - Departure time in HH:MM format
- `isCampaniaExpress` (optional) - Filter for Campania Express only (true/false)

**Example Request:**
```
GET /api/search?from=napoli&to=sorrento&time=14:30&isCampaniaExpress=true
```

**Response:**
```json
{
  "trains": [
    {
      "id": 123,
      "trainNumber": "CE001",
      "direction": "SORRENTO",
      "departureTime": "14:30",
      "operatingDays": "DAILY",
      "isCampaniaExpress": true,
      "category": "CAMPANIA_EXPRESS",
      "startStationId": 1,
      "endStationId": 2,
      "startStation": {
        "id": 1,
        "name": "Napoli Centrale",
        "code": "NAP"
      },
      "endStation": {
        "id": 2,
        "name": "Sorrento",
        "code": "SOR"
      },
      "stops": [
        {
          "id": 456,
          "trainId": 123,
          "stationId": 3,
          "arrivalTime": "14:45",
          "departureTime": "14:47",
          "stopOrder": 1,
          "station": {
            "id": 3,
            "name": "Pompei",
            "code": "POM"
          }
        }
      ]
    }
  ],
  "totalResults": 1,
  "searchCriteria": {
    "from": "napoli",
    "to": "sorrento",
    "time": "14:30",
    "isCampaniaExpress": true
  },
  "fromStations": [
    {
      "id": 1,
      "name": "Napoli Centrale",
      "code": "NAP"
    }
  ],
  "toStations": [
    {
      "id": 2,
      "name": "Sorrento", 
      "code": "SOR"
    }
  ]
}
```

**Status Codes:**
- `200` - Success
- `400` - Bad Request (invalid parameters)
- `422` - Validation Error
- `500` - Internal Server Error

---

### 3. Departures

#### Get Departures from Station

Retrieve upcoming departures from a specific station.

**Endpoint:** `GET /api/departures`

**Query Parameters:**
- `from` (required) - Station name or code
- `time` (optional) - Start time in HH:MM format (defaults to current time)
- `date` (optional) - Date in YYYY-MM-DD format (defaults to current date)
- `isCampaniaExpress` (optional) - Filter for Campania Express only (true/false)

**Example Request:**
```
GET /api/departures?from=napoli&time=15:00
```

**Response:**
```json
{
  "trains": [
    {
      "id": 124,
      "trainNumber": "R002",
      "direction": "SORRENTO",
      "departureTime": "15:15",
      "operatingDays": "DAILY",
      "isCampaniaExpress": false,
      "category": "REGIONALE",
      "startStationId": 1,
      "endStationId": 2,
      "startStation": {
        "id": 1,
        "name": "Napoli Centrale",
        "code": "NAP"
      },
      "endStation": {
        "id": 2,
        "name": "Sorrento",
        "code": "SOR"
      },
      "stops": []
    }
  ],
  "totalResults": 1,
  "searchCriteria": {
    "from": "napoli",
    "time": "15:00"
  }
}
```

**Status Codes:**
- `200` - Success
- `400` - Bad Request (invalid parameters)
- `422` - Validation Error
- `500` - Internal Server Error

---

### 4. All Trains

#### Get All Trains

Retrieve all train schedules in the system.

**Endpoint:** `GET /api/trains`

**Query Parameters:**
- `direction` (optional) - Filter by direction (NAPOLI or SORRENTO)
- `isCampaniaExpress` (optional) - Filter for Campania Express only (true/false)

**Example Request:**
```
GET /api/trains?direction=SORRENTO&isCampaniaExpress=true
```

**Response:**
```json
{
  "trains": [
    {
      "id": 123,
      "trainNumber": "CE001",
      "direction": "SORRENTO",
      "departureTime": "14:30",
      "operatingDays": "DAILY",
      "isCampaniaExpress": true,
      "category": "CAMPANIA_EXPRESS",
      "startStationId": 1,
      "endStationId": 2,
      "startStation": {
        "id": 1,
        "name": "Napoli Centrale",
        "code": "NAP"
      },
      "endStation": {
        "id": 2,
        "name": "Sorrento",
        "code": "SOR"
      }
    }
  ],
  "totalResults": 1
}
```

**Status Codes:**
- `200` - Success
- `500` - Internal Server Error

## Data Models

### Station
```typescript
{
  id: number;
  name: string;
  code: string;
}
```

### Train
```typescript
{
  id: number;
  trainNumber: string | null;
  direction: "NAPOLI" | "SORRENTO";
  departureTime: string; // HH:MM format
  operatingDays: "WEEKDAYS_ONLY" | "WEEKENDS_ONLY" | "DAILY" | "WEEKDAYS_AND_SATURDAY";
  isCampaniaExpress: boolean;
  category: "REGIONALE" | "INTERCITY" | "CAMPANIA_EXPRESS";
  startStationId: number;
  endStationId: number;
}
```

### TrainStop
```typescript
{
  id: number;
  trainId: number;
  stationId: number;
  arrivalTime: string | null; // HH:MM format
  departureTime: string | null; // HH:MM format
  stopOrder: number;
  station: Station;
}
```

### TrainWithDetails
```typescript
Train & {
  startStation: Station;
  endStation: Station;
  stops: (TrainStop & { station: Station })[];
}
```

## Error Responses

All error responses follow this format:

```json
{
  "error": "Error message description",
  "details": "Additional error details (optional)",
  "code": "ERROR_CODE (optional)"
}
```

### Common Error Codes

- `VALIDATION_ERROR` - Request validation failed
- `STATION_NOT_FOUND` - Specified station(s) not found
- `NO_TRAINS_FOUND` - No trains match the search criteria
- `INTERNAL_ERROR` - Server-side error

## Rate Limiting

Currently, no rate limiting is implemented. In production, consider implementing rate limiting to prevent abuse.

## Authentication

The API currently does not require authentication. All endpoints are publicly accessible.

## Examples

### JavaScript/TypeScript

```typescript
// Search for trains
const searchTrains = async (from: string, to: string, time?: string) => {
  const params = new URLSearchParams({
    from,
    to,
    ...(time && { time })
  });
  
  const response = await fetch(`/api/search?${params}`);
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.error || 'Failed to search trains');
  }
  
  return data;
};

// Get station departures
const getDepartures = async (stationCode: string) => {
  const response = await fetch(`/api/departures?from=${stationCode}`);
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.error || 'Failed to get departures');
  }
  
  return data;
};
```

### cURL

```bash
# Search trains
curl -X GET "https://your-domain.com/api/search?from=napoli&to=sorrento&time=14:30" \
  -H "Accept: application/json"

# Get departures
curl -X GET "https://your-domain.com/api/departures?from=napoli" \
  -H "Accept: application/json"

# Get all stations
curl -X GET "https://your-domain.com/api/stations" \
  -H "Accept: application/json"
```

## Notes

- All times are in 24-hour format (HH:MM)
- Dates are in ISO format (YYYY-MM-DD)
- Station matching is case-insensitive and supports partial matches
- The API returns trains sorted by departure time
- Empty results are returned as valid responses with empty arrays
