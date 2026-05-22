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

Mobile application built with Expo and React Native using the Paris Open Data API.

### Features
- Display a paginated list of trees from the Paris Open Data API
- Infinite scroll loading
- Tree detail screen:
   - species
   - height
   - circumference
   - address
   - coordinates
- Sort trees alphabetically (ASC / DESC)
- Search trees by name
- Local persistent cache using AsyncStorage
- Mock mode for development and testing

## Error handling

The app includes a mock system to simulate errors and loading states without touching the real API.

Mock configuration is handled in `app/_layout.tsx`.

To enable it, import and use `MockTreeDatasource` instead of `TreeApiDatasource`:

```typescript
export const MOCK_NETWORK_ERROR = false;
export const MOCK_TIMEOUT = false;
export const MOCK_API_ERROR = false;
export const MOCK_TREE_NOT_FOUND_ERROR = false;

export const MOCK_DELAY = 2000;
```