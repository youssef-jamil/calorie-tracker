import { useState, useEffect } from "react";
import styles from "./CaloriesRecordForm.module.css";

function CalorieRecordEdit(props) {
  const DEFAULT_VALUE = {
    date: "",
    meal: "",
    content: "",
    calories: ""
  };

  const [records, setRecords] = useState(DEFAULT_VALUE);
  const [formValid, setFormValid] = useState(false);
  const onDateHandler = (e) => {
    setRecords({
      ...records,
      date: e.target.value
    });
  };

  const onMealHandler = (e) => {
    setRecords({
      ...records,
      meal: e.target.value
    });
  };

  const onContentHandler = (e) => {
    setRecords({
      ...records,
      content: e.target.value
    });
  };

  const onCaloriesHandler = (e) => {
    setRecords({
      ...records,
      calories: Number(e.target.value)
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onFormSubmit(records);
    setRecords(DEFAULT_VALUE);
  };

  const handlerCancel = () => {
    setRecords(DEFAULT_VALUE);
    props.onCancel();
  };

  const validateForm = () => {
    const { date, meal, content, calories } = records;
    const isValid =
      date.trim() !== "" &&
      meal.trim() !== "" &&
      content.trim() !== "" &&
      calories !== "" &&
      calories >= 0;
    setFormValid(isValid);
  };

  useEffect(() => {
    validateForm();
  }, [records]);

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label htmlFor="date">Date:</label>
      <input
        type="date"
        value={records.date}
        id="date"
        onChange={onDateHandler}
      />

      <label htmlFor="meal">Meal:</label>
      <select id="meal" value={records.meal} onChange={onMealHandler}>
        <option value="">Select meal</option>
        <option value="Breakfast">Breakfast</option>
        <option value="Lunch">Lunch</option>
        <option value="Dinner">Dinner</option>
        <option value="Snack">Snack</option>
      </select>

      <label htmlFor="content">Content:</label>
      <input
        type="text"
        id="content"
        onChange={onContentHandler}
        value={records.content}
      />

      <label htmlFor="calories">Calories:</label>
      <input
        type="number"
        min={0}
        id="calories"
        placeholder="e.g., 350"
        value={records.calories}
        onChange={onCaloriesHandler}
        className={`${styles["calories-input"]} ${
          records.calories < 0 ? styles.error : ""
        }`}
      />

      <footer className={styles.footer}>
        <button disabled={!formValid} type="submit">
          Add Record
        </button>
        <button
          className={styles.secondary}
          type="button"
          onClick={handlerCancel}
        >
          Cancel
        </button>
      </footer>
    </form>
  );
}

export default CalorieRecordEdit;
