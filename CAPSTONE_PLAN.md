# Complete Capstone Implementation Plan

## Problem Definition

Air pollution is a serious urban issue, especially in Delhi NCR. Most users cannot interpret pollutant-heavy dashboards, so this project turns real-time AQI data into simple visual insights, city comparison, favorites, and health recommendations.

## Architecture

React components render the UI. Redux Toolkit manages AQI data, favorites, user preferences, and UI filters. Service files call the OpenWeather Geocoding and Air Pollution APIs when an API key is configured. If no key is available, demo mode provides realistic Delhi NCR sample data so the project can still be demonstrated professionally.

## Component Structure

- `Navbar`: routing and theme toggle
- `Dashboard`: current city AQI, search, refresh, health advice
- `AQICard`: selected city AQI summary
- `StatStrip`: AQI category, risk score, dominant pollutant, PM2.5
- `RiskGauge`: exposure score visualization
- `TrendChart`: short-term PM2.5 and PM10 movement
- `PollutantMix`: pollutant share chart
- `NcrOverview`: Delhi NCR monitoring grid
- `ActionPlan`: AQI-specific recommended actions
- `PollutantGrid`: pollutant concentration cards
- `AQIChart`: pollutant bar chart
- `Compare`: multi-city AQI comparison, radar analysis, regional insights
- `Favorites`: saved city CRUD view
- `Settings`: update preferences
- `ErrorBoundary`: crash-safe fallback UI

## State Management

- `airQualitySlice`: selected city, current AQI, comparison cities, loading, error
- `favoritesSlice`: saved favorite cities with localStorage persistence
- `preferencesSlice`: theme, default city, user group, refresh interval
- `uiSlice`: sort, filter, search, pagination

## API Flow

1. User searches city.
2. OpenWeather Geocoding API returns latitude and longitude.
3. Air Pollution API returns AQI and pollutants.
4. Redux stores normalized response.
5. Dashboard renders charts and advice.

## CRUD

- Create: Add city to favorites.
- Read: Display favorites.
- Update: Modify preferences, favorite priority, and favorite notes.
- Delete: Remove city from favorites.

## Advanced Features

- Dashboard with Recharts visualizations
- Search, filter, and sort cities
- Real-time manual refresh
- Dark mode toggle
- Debounced search input
- Error boundary
- Pagination in favorites
- `useMemo` and `useCallback`
- Multi-city comparison
- Exposure risk score
- Pollutant mix chart
- Radar comparison
- Regional monitoring grid
- Editable saved city notes

## Error Handling

- Missing API key message
- API failure message
- Retry button
- Loading skeletons
- Error boundary for unexpected component crashes

## Deployment

Deploy to Vercel or Netlify. Set `VITE_OPENWEATHER_API_KEY` in environment variables and use `npm run build` with output directory `dist`.
