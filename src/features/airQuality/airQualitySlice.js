import { createSlice } from "@reduxjs/toolkit";
import { NCR_CITIES } from "../../utils/constants";
import { fetchCityAirQuality, fetchComparisonCities, searchCityAirQuality } from "./airQualityThunks";

const initialState = {
  selectedCity: NCR_CITIES[0],
  current: null,
  comparison: [],
  loading: false,
  comparisonLoading: false,
  error: "",
  lastUpdated: null
};

const airQualitySlice = createSlice({
  name: "airQuality",
  initialState,
  reducers: {
    setSelectedCity: (state, action) => {
      state.selectedCity = action.payload;
    },
    clearAirQualityError: (state) => {
      state.error = "";
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCityAirQuality.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(fetchCityAirQuality.fulfilled, (state, action) => {
        state.loading = false;
        state.current = action.payload;
        state.selectedCity = action.payload;
        state.lastUpdated = Date.now();
      })
      .addCase(fetchCityAirQuality.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(searchCityAirQuality.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(searchCityAirQuality.fulfilled, (state, action) => {
        state.loading = false;
        state.current = action.payload;
        state.selectedCity = action.payload;
        state.lastUpdated = Date.now();
      })
      .addCase(searchCityAirQuality.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchComparisonCities.pending, (state) => {
        state.comparisonLoading = true;
        state.error = "";
      })
      .addCase(fetchComparisonCities.fulfilled, (state, action) => {
        state.comparisonLoading = false;
        state.comparison = action.payload;
      })
      .addCase(fetchComparisonCities.rejected, (state, action) => {
        state.comparisonLoading = false;
        state.error = action.payload;
      });
  }
});

export const { setSelectedCity, clearAirQualityError } = airQualitySlice.actions;
export default airQualitySlice.reducer;
