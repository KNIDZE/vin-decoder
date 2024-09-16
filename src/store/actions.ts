import { setVariables, toggleDataLoading } from "./vanslise";
import api from "../api/api";
import { AppDispatch, RootState } from "./store";
import { ResponseObject } from "../common/interfaces/vininterfaces";

const filterVariablesData = (value: string) => {
  return value !== "" && value !== null && value !== "Not Applicable";
};
export const fetchVinVariables =
  (vinCode: string) => async (dispatch: AppDispatch) => {
    dispatch(toggleDataLoading());
    const response: ResponseObject = await api.get(
      `vehicles/decodevin/${vinCode}?format=json`
    );
    let filteredVariables = response.data.Results.filter((elem) =>
      filterVariablesData(elem.Value)
    );
    dispatch(toggleDataLoading());
    dispatch(setVariables(filteredVariables));
  };

export const selectVinState = (state: RootState) => state.vinValue;
