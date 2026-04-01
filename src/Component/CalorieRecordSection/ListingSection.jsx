import RecordList from "./RecoridList";
import styles from "./ListingSection.module.css";
import { useState, useEffect } from "react";
import getDateFromString from "../../utils";

function ListingSection({ allRecords }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [user, setUser] = useState({});

  const dateChangeHandler = (event) => {
    const selectedDate = getDateFromString(event.target.value);
    setCurrentDate(selectedDate);
  };

  const dateFilter = (record) =>
    record.date.getDate() === currentDate.getDate() &&
    record.date.getMonth() === currentDate.getMonth() &&
    record.date.getFullYear() === currentDate.getFullYear();

  return (
    <>
      <label htmlFor="listingPicker" className={styles["listing-picker-label"]}>
        Select date
      </label>

      <input
        id="listingPicker"
        className={styles["listing-picker-input"]}
        type="date"
        value={currentDate.toISOString().split("T")[0]}
        onChange={dateChangeHandler}
      />

      <RecordList records={allRecords.filter(dateFilter)} />
    </>
  );
}

export default ListingSection;
