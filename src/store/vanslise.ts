import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { DecoderResponseData } from "../common/interfaces/vininterfaces";

interface VinValuesState {
  variables: DecoderResponseData;
  isDataLoading: boolean;
}

const initialState: VinValuesState = {
  variables: [],
  isDataLoading: false,
};

export const vinValuesSlise = createSlice({
  name: "vinValue",
  initialState,
  reducers: {
    setVariables: (state, action: PayloadAction<DecoderResponseData>) => {
      state.variables = action.payload;
    },
    toggleDataLoading: (state) => {
      state.isDataLoading = !state.isDataLoading;
    },
  },
});

export const { setVariables, toggleDataLoading } = vinValuesSlise.actions;
export default vinValuesSlise.reducer;
