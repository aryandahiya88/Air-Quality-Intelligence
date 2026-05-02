import { getDemoAirQuality, getDemoCoordinates } from "./demoAirQuality";

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org";

const isDemoMode = !API_KEY || API_KEY === "your_openweather_api_key_here";

export async function getCoordinates(city) {
  if (isDemoMode) return getDemoCoordinates(city);

  const response = await fetch(
    `${BASE_URL}/geo/1.0/direct?q=${encodeURIComponent(city)},IN&limit=5&appid=${API_KEY}`
  );

  if (!response.ok) throw new Error("Unable to fetch city coordinates.");
  return response.json();
}

export async function getAirQuality(lat, lon) {
  if (isDemoMode) return getDemoAirQuality(lat, lon);

  const response = await fetch(
    `${BASE_URL}/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`
  );

  if (!response.ok) throw new Error("Unable to fetch air quality data.");
  return response.json();
}
