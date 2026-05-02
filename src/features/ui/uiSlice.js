import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    searchQuery: "",
    sortBy: "aqi-desc",
    filterCategory: "all",
    page: 1
  },
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
    setFilterCategory: (state, action) => {
      state.filterCategory = action.payload;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    }
  }
});

export const { setSearchQuery, setSortBy, setFilterCategory, setPage } = uiSlice.actions;
export default uiSlice.reducer;
