import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAirQuality, getCoordinates } from "../../services/openWeatherApi";
import { normalizeAirQualityResponse } from "../../utils/aqiUtils";

export const fetchCityAirQuality = createAsyncThunk(
  "airQuality/fetchCityAirQuality",
  async (city, { rejectWithValue }) => {
    try {
      const data = await getAirQuality(city.lat, city.lon);
      return normalizeAirQualityResponse(city, data);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const searchCityAirQuality = createAsyncThunk(
  "airQuality/searchCityAirQuality",
  async (query, { rejectWithValue }) => {
    try {
      const coordinates = await getCoordinates(query);
      if (!coordinates.length) throw new Error("No matching Indian city found.");
      const city = {
        id: `${coordinates[0].name}-${coordinates[0].lat}`.toLowerCase(),
        name: coordinates[0].name,
        state: coordinates[0].state,
        country: coordinates[0].country,
        lat: coordinates[0].lat,
        lon: coordinates[0].lon
      };
      const data = await getAirQuality(city.lat, city.lon);
      return normalizeAirQualityResponse(city, data);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchComparisonCities = createAsyncThunk(
  "airQuality/fetchComparisonCities",
  async (cities, { rejectWithValue }) => {
    try {
      const results = await Promise.all(
        cities.map(async (city) => normalizeAirQualityResponse(city, await getAirQuality(city.lat, city.lon)))
      );
      return results;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
