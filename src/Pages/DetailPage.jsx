import { useParams, useNavigate } from "react-router-dom";
import { useRecords } from "../context/RecordsContext";
import styles from "./DetailPage.module.css";

const MONTHS = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December",
];
const MEAL_ICONS = { Breakfast: "🌅", Lunch: "☀️", Dinner: "🌙", Snack: "🍎" };

function DetailPage() {
  const { recordId } = useParams();
  const { getRecordById } = useRecords();
  const navigate = useNavigate();

  const record = getRecordById(recordId);

  if (!record) {
    return (
      <div className={styles.notFound}>
        <span className={styles.notFoundIcon}>🔍</span>
        <h2>Record not found</h2>
        <p>This entry may have been deleted or the link is invalid.</p>
        <button className={styles.backBtn} onClick={() => navigate("/track")}>
          ← Back to Tracker
        </button>
      </div>
    );
  }

  const { date, meal, content, calories } = record;
  const month   = MONTHS[date.getUTCMonth()];
  const day     = date.getUTCDate();
  const year    = date.getUTCFullYear();
  const isValid = typeof calories === "number" && !isNaN(calories);

  return (
    <div className={styles.page}>
      <button className={styles.backBtn} onClick={() => navigate(-1)}>← Back</button>

      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <div className={styles.dateBadge}>
            <span className={styles.dateMonth}>{month}</span>
            <span className={styles.dateDay}>{day}</span>
            <span className={styles.dateYear}>{year}</span>
          </div>
          <span className={`${styles.mealPill} ${styles[`meal-${meal?.toLowerCase()}`]}`}>
            {MEAL_ICONS[meal] ?? "🍽️"} {meal}
          </span>
        </div>

        <div className={styles.cardBody}>
          <div className={styles.field}>
            <span className={styles.fieldLabel}>Food</span>
            <span className={styles.fieldValue}>
              {isValid ? content : <em className={styles.invalid}>Invalid entry</em>}
            </span>
          </div>
          <div className={styles.field}>
            <span className={styles.fieldLabel}>Calories</span>
            <span className={`${styles.calBadge} ${!isValid ? styles.calInvalid : calories < 0 ? styles.calNegative : ""}`}>
              {isValid ? <>{calories}<span className={styles.kcal}>kcal</span></> : "—"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailPage;
