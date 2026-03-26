import RecordList from "./RecoridList";
import styles from "./ListingSection.module.css";
import { useState } from "react";
import getDateFromString from "../../utils";

function ListingSection({ allRecords }) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const dateChangeHandler = (event) => {
    const selectedDate = getDateFromString(event.target.value);
    setCurrentDate(selectedDate);
    console.log({ currentDate });
  };

  const filteredRecords = allRecords.filter((record) => {
    const recordDate = new Date(record.date);

    return (
      recordDate.getDate() === currentDate.getDate() &&
      recordDate.getMonth() === currentDate.getMonth() &&
      recordDate.getFullYear() === currentDate.getFullYear()
    );
  });

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

      <RecordList records={filteredRecords} />
    </>
  );
}

export default ListingSection;
