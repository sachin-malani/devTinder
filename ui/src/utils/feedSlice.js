import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feed",
  initialState: null,
  reducers: {
    addFeed: (state, action) => action.payload,
    removeUser: (state, action) => {
      const feed = state.filter((user) => user._id !== action.payload);
      return feed;
    },
  },
});

export const { addFeed, removeUser } = feedSlice.actions;
export default feedSlice.reducer;
