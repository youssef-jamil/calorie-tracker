import styles from "./CalorieRecord.module.css";

const MEAL_STYLES = {
  Breakfast: styles["meal-breakfast"],
  Lunch: styles["meal-lunch"],
  Dinner: styles["meal-dinner"],
  Snack: styles["meal-snack"]
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
  "Dec"
];

function CalorieRecord({ meal, content, calories, date }) {
  const month = MONTHS[date.getUTCMonth()];
  const day = date.getUTCDate();
  const year = date.getUTCFullYear();
  const isValid = calories >= 0;

  return (
    <tr className={styles.row}>
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
          content
        ) : (
          <span className={styles.invalid}>Invalid entry</span>
        )}
      </td>
      <td className={styles["center-cell"]}>
        {isValid ? (
          <span className={styles["cal-badge"]}>
            {calories}
            <span className={styles["kcal-label"]}>kcal</span>
          </span>
        ) : (
          <span className={styles["cal-badge"]}>—</span>
        )}
      </td>
    </tr>
  );
}

export default CalorieRecord;
