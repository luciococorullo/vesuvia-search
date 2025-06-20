# EAV Destinations API

## Overview

The EAV Destinations API allows you to retrieve all destination stations reachable from a given departure station using the official EAV (Ente Autonomo Volturno) API.

## Endpoint

```http
POST /api/eav-destinations
```

## Request Parameters

| Parameter | Type   | Required | Description                                    |
|-----------|--------|----------|------------------------------------------------|
| `id`      | string | Yes      | The ID of the departure station (EAV station ID) |

## Request Example

```bash
curl -X POST http://localhost:3000/api/eav-destinations \
  -H "Content-Type: application/json" \
  -d '{"id": "62"}'
```

## Response Format

### Success Response

```json
{
  "success": true,
  "destinations": [
    {
      "Id": 1,
      "Nome": "Napoli Porta Nolana",
      "Lat": 40.849223,
      "Long": 14.269264,
      "Chilometrica": 0.0
    },
    {
      "Id": 3,
      "Nome": "Napoli P. Garibaldi",
      "Lat": 40.851017,
      "Long": 14.272976,
      "Chilometrica": 0.545
    }
    // ... more destinations
  ]
}
```

### Error Response

```json
{
  "success": false,
  "error": "Invalid station ID: 999999"
}
```

## Response Fields

### Destination Object

| Field          | Type   | Description                                        |
|----------------|--------|----------------------------------------------------|
| `Id`           | number | Unique destination station ID                      |
| `Nome`         | string | Full station name in Italian                       |
| `Lat`          | number | Latitude coordinate of the station                 |
| `Long`         | number | Longitude coordinate of the station                |
| `Chilometrica` | number | Kilometric distance from the starting point       |

## Error Codes

| Status Code | Description                                         |
|-------------|-----------------------------------------------------|
| 400         | Bad Request - Missing or invalid station ID        |
| 500         | Internal Server Error - Server processing error    |
| 502         | Bad Gateway - EAV API unavailable or error         |

## Usage Examples

### JavaScript/TypeScript

```typescript
import { EAVDestinationsResponse } from '@/lib/types';

async function getDestinations(stationId: string): Promise<EAVDestinationsResponse> {
  const response = await fetch('/api/eav-destinations', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id: stationId }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
}

// Usage
try {
  const result = await getDestinations('62'); // Sorrento
  if (result.success) {
    console.log(`Found ${result.destinations.length} destinations`);
    result.destinations.forEach(dest => {
      console.log(`${dest.Nome} (${dest.Chilometrica} km)`);
    });
  }
} catch (error) {
  console.error('Failed to get destinations:', error);
}
```

### React Hook

```typescript
import { useEAVDestinations } from '@/hooks/useEAVDestinations';

function MyComponent() {
  const { data, isLoading, error } = useEAVDestinations('62'); // Sorrento

  if (isLoading) return <div>Loading destinations...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!data?.success) return <div>No destinations found</div>;

  return (
    <ul>
      {data.destinations.map(dest => (
        <li key={dest.Id}>
          {dest.Nome} ({dest.Chilometrica} km)
        </li>
      ))}
    </ul>
  );
}
```

## Common Station IDs

Here are some commonly used station IDs for testing:

| Station ID | Station Name                      | Description                    |
|------------|-----------------------------------|--------------------------------|
| 1          | Napoli Porta Nolana               | Main Naples terminal           |
| 3          | Napoli P. Garibaldi               | Central Naples station         |
| 49         | Pompei Scavi Villa dei Misteri    | Pompeii archaeological site    |
| 62         | Sorrento                          | Main Sorrento terminal         |

## Testing

You can test the API using the provided test script:

```bash
npm run test:destinations
```

This will test various scenarios including:

- Valid station IDs
- Invalid station IDs
- Missing parameters
- Error handling

## Rate Limiting

The API calls the official EAV service, so please be mindful of rate limiting. The React hook includes built-in caching (5 minutes stale time) to minimize API calls.

## Notes

- This API requires an active internet connection to reach the EAV service
- Destination data is fetched in real-time from the official EAV API
- The API respects the official EAV service headers and User-Agent strings
- Results are cached client-side for performance
