import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import {
  DecoderResponseData,
  VariableData,
} from "../common/interfaces/vininterfaces";

interface VinValuesState extends DecoderResponseData {
  isDataLoading: boolean;
  errorMessage: string;
  variablesInfo: VariableData[];
}

const initialState: VinValuesState = {
  variables: [],
  isDataLoading: false,
  errorMessage: "",
  apiMessage: "",
  variablesInfo: [],
};

export const vinValuesSlise = createSlice({
  name: "vinValue",
  initialState,
  reducers: {
    setVariablesValues: (state, action: PayloadAction<DecoderResponseData>) => {
      state.variables = action.payload.variables;
      state.apiMessage = action.payload.apiMessage;
    },
    toggleDataLoading: (state) => {
      state.isDataLoading = !state.isDataLoading;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.errorMessage = action.payload;
    },
    setVariablesInfo: (state, action: PayloadAction<VariableData[]>) => {
      state.variablesInfo = action.payload;
    },
    clearApiMessage: (state) => {
      state.apiMessage = "";
    },
  },
});

export const {
  setVariablesValues,
  toggleDataLoading,
  setError,
  setVariablesInfo,
  clearApiMessage,
} = vinValuesSlise.actions;
export default vinValuesSlise.reducer;
