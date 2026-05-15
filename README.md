# App Tree

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

## App description

- Print a list of 20 trees from the Paris Open Data API
- Get tree details on a new page (species, height, circumference, address, map)

## Error handling

The app includes a mock system to simulate errors without touching the real API.

To enable it, open `config/mock.ts` and set `USE_MOCK = true`, then select the scenario:

```typescript
export const USE_MOCK = true;    // enable mock mode
export const MOCK_ERROR = false; // simulate a network error
export const MOCK_TIMEOUT = false; // simulate a timeout error
```

| `MOCK_ERROR` | `MOCK_TIMEOUT` | Result |
|---|---|---|
| `false` | `false` | Mock data returned |
| `true` | `false` | Network error displayed |
| `false` | `true` | Timeout error displayed |