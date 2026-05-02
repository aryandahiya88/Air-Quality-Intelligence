import { configureStore } from "@reduxjs/toolkit";
import airQualityReducer from "../features/airQuality/airQualitySlice";
import favoritesReducer from "../features/favorites/favoritesSlice";
import preferencesReducer from "../features/preferences/preferencesSlice";
import uiReducer from "../features/ui/uiSlice";

export const store = configureStore({
  reducer: {
    airQuality: airQualityReducer,
    favorites: favoritesReducer,
    preferences: preferencesReducer,
    ui: uiReducer
  }
});
