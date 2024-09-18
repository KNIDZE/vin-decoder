import {
  setError,
  setVariablesInfo,
  setVariablesValues,
  toggleDataLoading,
} from "./vanslise";
import api from "../api/api";
import { AppDispatch, RootState } from "./store";
import {
  VariableData,
  VariablesResponseObject,
  VinResponseObject,
} from "../common/interfaces/vininterfaces";
import axios from "axios";
import { createSelector } from "@reduxjs/toolkit";

const filterVariablesData = (value: string) => {
  return value !== "" && value !== null && value !== "Not Applicable";
};
export const fetchVinVariables =
  (vinCode: string) => async (dispatch: AppDispatch) => {
    dispatch(toggleDataLoading());
    let errorMessage = "";
    try {
      const response: VinResponseObject = await api.get(
        `vehicles/decodevin/${vinCode}?format=json`
      );
      let filteredVariables = response.data.Results.filter((elem) =>
        filterVariablesData(elem.Value)
      );
      dispatch(
        setVariablesValues({
          variables: filteredVariables,
          apiMessage: response.data.Message,
        })
      );
    } catch (err) {
      if (axios.isAxiosError(err)) {
        errorMessage = err.message || "Something went wrong";
      }
    }
    dispatch(setError(errorMessage));
    dispatch(toggleDataLoading());
  };

export const fetchVariablesList = () => async (dispatch: AppDispatch) => {
  dispatch(toggleDataLoading());
  let errorMessage = "";
  try {
    const response: VariablesResponseObject = await api.get(
      `vehicles/getvehiclevariablelist?format=json`
    );
    dispatch(setVariablesInfo(response.data.Results));
  } catch (err) {
    if (axios.isAxiosError(err)) {
      errorMessage = err.message || "Something went wrong";
    }
  }
  dispatch(setError(errorMessage));
  dispatch(toggleDataLoading());
};

export const selectVinState = (state: RootState) => state.vinValue;
export const selectVariablesInfo = (state: RootState) => {
  return {
    variables: state.vinValue.variablesInfo,
    errorMessage: state.vinValue.errorMessage,
  };
};

export const selectVariableById = createSelector(
  [
    (state: RootState) => state.vinValue.variablesInfo,
    (state: RootState, id: string) => +id,
  ],
  (variables: VariableData[], id: number) => variables.find((v) => v.ID === id)
);
