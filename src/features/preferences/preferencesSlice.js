import { createSlice } from "@reduxjs/toolkit";

const saved = JSON.parse(localStorage.getItem("preferences") || "{}");

const initialState = {
  theme: saved.theme || "light",
  defaultCity: saved.defaultCity || "Delhi",
  refreshInterval: saved.refreshInterval || 10,
  userGroup: saved.userGroup || "general"
};

function persist(state) {
  localStorage.setItem("preferences", JSON.stringify(state));
}

const preferencesSlice = createSlice({
  name: "preferences",
  initialState,
  reducers: {
    updatePreferences: (state, action) => {
      Object.assign(state, action.payload);
      persist(state);
    },
    toggleTheme: (state) => {
      state.theme = state.theme === "dark" ? "light" : "dark";
      persist(state);
    }
  }
});

export const { updatePreferences, toggleTheme } = preferencesSlice.actions;
export default preferencesSlice.reducer;
