import CalorieRecord from "./CalorieRecord";
import styles from "./RecordList.module.css";

function RecordList({ records }) {
  if (!records || records.length === 0) {
    return <p className={styles.empty}>No records found for this date 📅</p>;
  }

  const total = records.reduce(
    (sum, r) => sum + (r.calories >= 0 ? r.calories : 0),
    0
  );

  return (
    <table className={styles.table}>
      <colgroup>
        <col style={{ width: "28%" }} />
        <col style={{ width: "20%" }} />
        <col style={{ width: "30%" }} />
        <col style={{ width: "22%" }} />
      </colgroup>
      <thead>
        <tr>
          <th className={styles.th}>Date</th>
          <th className={`${styles.th} ${styles["th-center"]}`}>Meal</th>
          <th className={`${styles.th} ${styles["th-center"]}`}>Food</th>
          <th className={`${styles.th} ${styles["th-center"]}`}>Calories</th>
        </tr>
      </thead>
      <tbody>
        {records.map((record) => (
          <CalorieRecord key={record.id} {...record} />
        ))}
      </tbody>
      <tfoot>
        <tr className={styles["total-row"]}>
          <td colSpan={3} className={styles["total-label"]}>
            Total for the day
          </td>
          <td className={styles["total-value"]}>
            <span className={styles["total-badge"]}>
              {total}
              <span className={styles["kcal-label"]}>kcal</span>
            </span>
          </td>
        </tr>
      </tfoot>
    </table>
  );
}

export default RecordList;
