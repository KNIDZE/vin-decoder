import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
import "./findform.scss";
import { fetchVinVariables } from "../../store/actions";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import {
  getSearchingHistory,
  processSearchingQueue,
  validateForm,
} from "./formfunctions";

const FindForm = () => {
  const [isHistoryActive, setHistoryActive] = useState(false);
  const [searchingHistory, setSearchingHistory] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");
  // need it because when click on option toggle function is called first and so onclick event is not fired
  const [formError, setFormError] = useState("");
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    setSearchingHistory(getSearchingHistory());
  }, []);

  const toggleHistory = useCallback(() => {
    setHistoryActive((prevState) => !prevState);
  }, []);
  const handleInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value);
  }, []);
  const handleSeachingClick = useCallback((e: React.FormEvent) => {
    e.preventDefault();

    const errorMessage = validateForm(inputValue);
    if (errorMessage === "") {
      dispatch(fetchVinVariables(inputValue));
      setSearchingHistory(processSearchingQueue(searchingHistory, inputValue));
    }
    setFormError(errorMessage);
  }, [dispatch, inputValue, searchingHistory]);

  return (
    <form className="vin-form" onSubmit={(e) => handleSeachingClick(e)}>
      <input
        onChange={handleInputChange}
        value={inputValue}
        onFocus={toggleHistory}
        onBlur={toggleHistory}
      />
      <button type="submit">Search</button>
      {isHistoryActive && (
        <div className="searching-list">
          {searchingHistory.map((searching) => (
            <div
              key={searching}
              className="searching-option"
              onMouseDown={() => setInputValue(searching)}
            >
              {searching}
            </div>
          ))}
        </div>
      )}
      <p>{formError}</p>
    </form>
  );
};

export default FindForm;
