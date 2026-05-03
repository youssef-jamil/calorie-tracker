import styles from "./CalorieRecord.module.css";
import { useNavigate } from "react-router-dom";

const MEAL_STYLES = {
  Breakfast: styles["meal-breakfast"],
  Lunch: styles["meal-lunch"],
  Dinner: styles["meal-dinner"],
  Snack: styles["meal-snack"],
};

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function CalorieRecord({ meal, content, calories, date, recordId }) {
  const month = MONTHS[date.getUTCMonth()];
  const day = date.getUTCDate();
  const year = date.getUTCFullYear();
  const isValid = typeof calories === "number" && !isNaN(calories);
  const isBurned = isValid && calories < 0;

  const navigate = useNavigate();

  return (
    <tr
      className={`${styles.row} ${isBurned ? styles["row-sport"] : ""}`}
      onClick={() => navigate(`/track/${recordId}`)}
    >
      <td>
        <div className={styles["date-cell"]}>
          <div className={styles["date-badge"]}>
            <span className={styles.month}>{month}</span>
            <span className={styles.day}>{day}</span>
            <span className={styles.year}>{year}</span>
          </div>
        </div>
      </td>
      <td className={styles["center-cell"]}>
        <span className={`${styles["meal-pill"]} ${MEAL_STYLES[meal] || ""}`}>
          {meal}
        </span>
      </td>
      <td className={styles["center-cell"]}>
        {isValid ? (
          <span className={styles["content-cell"]}>
            {isBurned && <span className={styles["sport-icon"]}>🔥</span>}
            {content}
          </span>
        ) : (
          <span className={styles.invalid}>Invalid entry</span>
        )}
      </td>
      <td className={styles["center-cell"]}>
        {isValid ? (
          isBurned ? (
            <span className={styles["cal-badge-burned"]}>
              <span className={styles["burned-arrow"]}>↓</span>
              {Math.abs(calories)}
              <span className={styles["kcal-label-burned"]}>kcal burned</span>
            </span>
          ) : (
            <span className={styles["cal-badge"]}>
              {calories}
              <span className={styles["kcal-label"]}>kcal</span>
            </span>
          )
        ) : (
          <span className={styles["cal-badge"]}>—</span>
        )}
      </td>
    </tr>
  );
}

export default CalorieRecord;
