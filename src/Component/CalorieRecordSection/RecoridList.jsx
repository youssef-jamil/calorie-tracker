import CalorieRecord from "./CalorieRecord";
import styles from "./RecordList.module.css";

function RecordList({ records }) {
  if (!records || records.length === 0) {
    return <p className={styles.empty}>No records found for this date 📅</p>;
  }

  return (
    <ul className={styles.list}>
      {records.map((record) => (
        <li className={styles.listItem} key={record.id}>
          <CalorieRecord {...record} />
        </li>
      ))}
    </ul>
  );
}

export default RecordList;
