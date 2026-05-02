import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cities: JSON.parse(localStorage.getItem("favoriteCities") || "[]")
};

function persist(cities) {
  localStorage.setItem("favoriteCities", JSON.stringify(cities));
}

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addFavoriteCity: (state, action) => {
      const exists = state.cities.some((city) => city.id === action.payload.id);
      if (!exists) {
        state.cities.push({ ...action.payload, addedAt: new Date().toISOString() });
        persist(state.cities);
      }
    },
    removeFavoriteCity: (state, action) => {
      state.cities = state.cities.filter((city) => city.id !== action.payload);
      persist(state.cities);
    },
    updateFavoriteCity: (state, action) => {
      const index = state.cities.findIndex((city) => city.id === action.payload.id);
      if (index !== -1) {
        state.cities[index] = { ...state.cities[index], ...action.payload.updates };
        persist(state.cities);
      }
    }
  }
});

export const { addFavoriteCity, removeFavoriteCity, updateFavoriteCity } = favoritesSlice.actions;
export default favoritesSlice.reducer;
