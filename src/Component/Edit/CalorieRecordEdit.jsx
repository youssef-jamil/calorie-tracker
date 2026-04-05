import { useEffect, useReducer } from "react";
import styles from "./CaloriesRecordForm.module.css";

const DEFAULT_VALUE = {
  date: { value: "", isValid: false },
  meal: { value: "", isValid: false },
  content: { value: "", isValid: false },
  calories: { value: "", isValid: false },
};

const isSport = (content) => content.trim().toLowerCase().includes("sport");

function formReducer(state, action) {
  switch (action.type) {
    case "SET_FIELD":
      return {
        ...state,
        [action.payload.field]: {
          value: action.payload.value,
          isValid: action.payload.isValid,
        },
      };
    case "RESET":
      return DEFAULT_VALUE;
    default:
      return state;
  }
}

function CalorieRecordEdit({ onFormSubmit, onCancel }) {
  const [formState, dispatch] = useReducer(formReducer, DEFAULT_VALUE);

  const formValid = Object.values(formState).every((field) => field.isValid);

  const setField = (field, value, isValid) =>
    dispatch({ type: "SET_FIELD", payload: { field, value, isValid } });

  // ─── Cross-validation: content ↔ calories ────────────────────────────────
  useEffect(() => {
    const cal = Number(formState.calories.value);
    const sport = isSport(formState.content.value);

    if (formState.calories.value === "") {
      setField("calories", "", false);
    } else if (sport) {
      // Sport → only negative allowed
      setField("calories", formState.calories.value, cal < 0);
    } else if (cal < 0) {
      // Non-sport + negative → reset
      setField("calories", "", false);
    } else {
      // Non-sport + positive → valid
      setField("calories", formState.calories.value, cal > 0);
    }
  }, [formState.content.value, formState.calories.value]);

  // ─── Handlers ────────────────────────────────────────────────────────────
  const onDateHandler = (e) =>
    setField("date", e.target.value, !!e.target.value);

  const onMealHandler = (e) =>
    setField("meal", e.target.value, !!e.target.value);

  const onContentHandler = (e) =>
    setField("content", e.target.value, !!e.target.value.trim());

  const onCaloriesHandler = (e) => {
    const value = e.target.value === "" ? "" : Number(e.target.value);
    // isValid will be computed by the useEffect above
    setField("calories", value, false);
  };

  const reset = () => dispatch({ type: "RESET" });

  const handleSubmit = (e) => {
    e.preventDefault();
    const records = Object.fromEntries(
      Object.entries(formState).map(([key, { value }]) => [key, value]),
    );
    onFormSubmit(records);
    reset();
  };

  const handleCancel = () => {
    reset();
    onCancel();
  };

  // ─── Render ──────────────────────────────────────────────────────────────
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label htmlFor="date">Date:</label>
      <input
        type="date"
        id="date"
        value={formState.date.value}
        onChange={onDateHandler}
        className={`${styles["form-input"]} ${formState.date.isValid ? "" : styles.error}`}
      />

      <label htmlFor="meal">Meal:</label>
      <select
        id="meal"
        value={formState.meal.value}
        onChange={onMealHandler}
        className={`${styles["form-input"]} ${formState.meal.isValid ? "" : styles.error}`}
      >
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
        value={formState.content.value}
        onChange={onContentHandler}
        className={`${styles["form-input"]} ${formState.content.isValid ? "" : styles.error}`}
      />

      <label htmlFor="calories">Calories:</label>
      <input
        type="number"
        id="calories"
        placeholder={
          isSport(formState.content.value) ? "e.g., -350 (sport)" : "e.g., 350"
        }
        value={formState.calories.value}
        onChange={onCaloriesHandler}
        className={`${styles["form-input"]} ${formState.calories.isValid ? "" : styles.error}`}
      />

      <footer className={styles.footer}>
        <button type="submit" disabled={!formValid}>
          Add Record
        </button>
        <button
          type="button"
          className={styles.secondary}
          onClick={handleCancel}
        >
          Cancel
        </button>
      </footer>
    </form>
  );
}

export default CalorieRecordEdit;
