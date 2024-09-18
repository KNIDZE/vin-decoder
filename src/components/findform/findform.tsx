import React, { ChangeEvent, useEffect, useState } from "react";
import "./findform.scss";
import { fetchVinVariables } from "../../store/actions";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import {
  getSearchingHistory,
  processSearchingQueue,
  validateForm,
} from "./formfunctions";
import { clearApiMessage } from "../../store/vanslise";

const FindForm = () => {
  const [isHistoryActive, setHistoryActive] = useState(false);
  const [searchingHistory, setSearchingHistory] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");
  // need it because
  const [hoverValue, setHoverValue] = useState("");
  const [formError, setFormError] = useState("");
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {

    setSearchingHistory(getSearchingHistory());
  }, []);

  const toggleHistory = () => {
    setHistoryActive((prevState) => !prevState);
    if (hoverValue !== "") {
      setInputValue(hoverValue);
    }
  };
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value);
    // fixed a bug, when typing text without leaving input field
    setHoverValue("");
  };
  const handleSeachingClick = (e: React.FormEvent) => {
    e.preventDefault();

    const errorMessage = validateForm(inputValue);
    if (errorMessage === "") {
      dispatch(fetchVinVariables(inputValue));
      setSearchingHistory(processSearchingQueue(searchingHistory, inputValue));
    }
    setFormError(errorMessage);
  };

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
              onMouseEnter={() => setHoverValue(searching)}
              onMouseLeave={() => setHoverValue("")}
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
