import CalorieRecordDate from "./CalorieRecordDate";
import StyledRecordCell from "../Comm/StyledRecordCell";
import styles from "./CalorieRecord.module.css";

function CalorieRecord({ meal, content, calories, date }) {
  let recordContent = (
    <>
      <li>{meal}</li>
      <li>{content}</li>
    </>
  );

  if (calories < 0) {
    recordContent = (
      <>
        <li></li>
        <li>Invalid calories</li>
      </>
    );
  }

  return (
    <ul className={styles.record}>
      <li>
        <CalorieRecordDate date={date} />
      </li>

      {recordContent}

      <li className={styles["record-calories"]}>
        <StyledRecordCell>{calories >= 0 ? calories : "-"}</StyledRecordCell>
      </li>
    </ul>
  );
}

export default CalorieRecord;
