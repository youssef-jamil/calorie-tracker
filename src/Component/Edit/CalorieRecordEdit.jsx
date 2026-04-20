import { useMemo, useReducer, useRef, useEffect, useCallback } from "react";
import styles from "./CaloriesRecordForm.module.css";

const DEFAULT_VALUE = {
  date: { value: "", isValid: false },
  meal: { value: "", isValid: false },
  content: { value: "", isValid: false },
  calories: { value: "", isValid: false },
};

const isSport = (content) => content.trim().toLowerCase().includes("sport");

function caloriesValid(caloriesStr, contentStr) {
  if (caloriesStr === "") return false;
  const cal = Number(caloriesStr);
  if (isNaN(cal)) return false;
  return isSport(contentStr) ? cal <= 0 : cal >= 0;
}

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

function utcDateString(date) {
  const y = date.getUTCFullYear();
  const m = String(date.getUTCMonth() + 1).padStart(2, "0");
  const d = String(date.getUTCDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function CalorieRecordEdit({
  onFormSubmit,
  onCancel,
  currentDate,
  setCurrentDate,
  totalCalories,
}) {
  const mealRef = useRef();
  const contentRef = useRef();
  const caloriesRef = useRef();

  const [formState, dispatch] = useReducer(
    formReducer,
    DEFAULT_VALUE,
    (initialState) => ({
      ...initialState,
      date: { value: utcDateString(currentDate), isValid: true },
    }),
  );

  // حساب الصلاحية فورياً (Derived State) لضمان عدم حدوث Loop
  const caloriesIsValid = useMemo(
    () => caloriesValid(formState.calories.value, formState.content.value),
    [formState.calories.value, formState.content.value],
  );

  const formValid =
    formState.date.isValid &&
    formState.meal.isValid &&
    formState.content.isValid &&
    caloriesIsValid;

  // تغليف الدالة بـ useCallback لضمان ثبات المرجع
  const setField = useCallback((field, value, isValid) => {
    dispatch({ type: "SET_FIELD", payload: { field, value, isValid } });
  }, []);

  // ─── Handlers (تم تحسينها بـ useCallback) ──────────────────────────────

  const onDateHandler = useCallback(
    (e) => {
      const value = e.target.value;
      setField("date", value, !!value);
      if (value) {
        const [year, month, day] = value.split("-").map(Number);
        setCurrentDate(new Date(Date.UTC(year, month - 1, day)));
      }
    },
    [setField, setCurrentDate],
  );

  const onMealHandler = useCallback(
    (e) => {
      setField("meal", e.target.value, !!e.target.value);
    },
    [setField],
  );

  const onContentHandler = useCallback(
    (e) => {
      const value = e.target.value;
      setField("content", value, !!value.trim());
      // تحديث صلاحية السعرات فوراً بناءً على المحتوى الجديد (Sport or not)
      const newIsValid = caloriesValid(formState.calories.value, value);
      setField("calories", formState.calories.value, newIsValid);
    },
    [setField, formState.calories.value],
  );

  const onCaloriesHandler = useCallback(
    (e) => {
      const value = e.target.value;
      const isValid = caloriesValid(value, formState.content.value);
      setField("calories", value, isValid);
    },
    [setField, formState.content.value],
  );

  const reset = useCallback(() => dispatch({ type: "RESET" }), []);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const record = Object.fromEntries(
        Object.entries(formState).map(([key, { value }]) => [key, value]),
      );
      onFormSubmit(record);
      reset();
    },
    [formState, onFormSubmit, reset],
  );

  const handleCancel = useCallback(() => {
    reset();
    onCancel();
  }, [reset, onCancel]);

  // ─── Keyboard Navigation ──────────────────────────────────────────────

  const onMealKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      caloriesRef.current?.focus();
    }
  };

  const onContentKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      mealRef.current?.focus();
    }
  };

  const onCaloriesKeyDown = (e) => {
    if (e.key === "Enter" && formValid) {
      handleSubmit(e);
    }
  };

  // التركيز التلقائي عند الفتح
  useEffect(() => {
    contentRef.current?.focus();
  }, []);

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <p className={styles.warning}>
        {totalCalories >= 0 ? (
          <>
            You consumed <span className={styles.number}>{totalCalories}</span>{" "}
            kcal today.
          </>
        ) : (
          <>
            You burned more than you consumed! Net:{" "}
            <span className={styles.number}>{totalCalories}</span> kcal today.
          </>
        )}
      </p>

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
        onKeyDown={onMealKeyDown}
        ref={mealRef}
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
        ref={contentRef}
        value={formState.content.value}
        onChange={onContentHandler}
        onKeyDown={onContentKeyDown}
        className={`${styles["form-input"]} ${formState.content.isValid ? "" : styles.error}`}
      />

      <label htmlFor="calories">Calories:</label>
      <input
        type="number"
        id="calories"
        ref={caloriesRef}
        placeholder={
          isSport(formState.content.value) ? "e.g., -350 (sport)" : "e.g., 350"
        }
        value={formState.calories.value}
        onChange={onCaloriesHandler}
        onKeyDown={onCaloriesKeyDown}
        className={`${styles["form-input"]} ${caloriesIsValid ? "" : styles.error}`}
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
