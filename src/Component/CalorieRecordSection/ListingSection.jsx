import RecordList from "./RecoridList";
import styles from "./ListingSection.module.css";
import { useState } from "react";
import getDateFromString from "../../utils";

function ListingSection({ allRecords }) {
  const [currentDate, setCurrentDate] = useState(() => {
    const now = new Date();
    return new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()));
  });

  const dateChangeHandler = (event) => {
    const selectedDate = getDateFromString(event.target.value);
    setCurrentDate(selectedDate);
  };

  const dateFilter = (record) =>
    record.date.getUTCDate() === currentDate.getUTCDate() &&
    record.date.getUTCMonth() === currentDate.getUTCMonth() &&
    record.date.getUTCFullYear() === currentDate.getUTCFullYear();

  const formatDate = (date) => {
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, "0");
    const day = String(date.getUTCDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  return (
    <>
      <label htmlFor="listingPicker" className={styles["listing-picker-label"]}>
        Select date
      </label>

      <input
        id="listingPicker"
        className={styles["listing-picker-input"]}
        type="date"
        value={formatDate(currentDate)}
        onChange={dateChangeHandler}
      />

      <RecordList records={allRecords.filter(dateFilter)} />
    </>
  );
}

export default ListingSection;
