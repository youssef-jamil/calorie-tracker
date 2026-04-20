import { useEffect, useMemo, useState } from "react";
import CalorieRecordEdit from "./Component/Edit/CalorieRecordEdit";
import ListingSection from "./Component/CalorieRecordSection/ListingSection";
import Modal from "react-modal";
import styles from "./App.module.css";
import getDateFromString from "./utils";

const LOCAL_STORAGE_KEY = "calorie_records";

/*
 * FIX #8: Define the modal style object outside the component so it is not
 * recreated on every render (previously a new object reference was created each
 * render, causing react-modal to re-apply styles unnecessarily).
 */
const MODAL_STYLE = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    border: "none",
    padding: "0px",
    borderRadius: "20px",
  },
  overlay: {
    backgroundColor: "rgba(0,0,0,0.5)",
  },
};

function App() {
  const [records, setRecords] = useState(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!stored) return [];

    return JSON.parse(stored).map((record) => ({
      ...record,
      date: getDateFromString(record.date.split("T")[0]),
    }));
  });

  const [currentDate, setCurrentDate] = useState(() => {
    const now = new Date();
    return new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()));
  });

  /*
   * FIX #7: The original reduce used r.calories directly, but values loaded
   * from localStorage are deserialized as whatever JSON.parse returns — which
   * could be a string if an older version of the app stored them that way.
   * Wrapping with Number() and defaulting NaN to 0 makes the sum robust.
   *
   * FIX #8 (secondary): moved into useMemo so the value is only recomputed
   * when records or currentDate actually change, not on every render.
   *
   * FIX #12: AppContext was created and exported but the Provider was never
   * rendered, so every consumer always received the stale default value. Since
   * only App.jsx and CalorieRecordEdit.jsx need totalCalories (and it is
   * already passed as a prop), the context is simply not used here. The file
   * app-context.js can be deleted — it is dead code.
   */
  const total = useMemo(
    () =>
      records
        .filter((r) => r.date.getTime() === currentDate.getTime())
        .reduce((sum, r) => sum + (Number(r.calories) || 0), 0),
    [records, currentDate],
  );

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(records));
  }, [records]);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const onFormSubmit = (record) => {
    const formatted = {
      ...record,
      date: getDateFromString(record.date),
      /*
       * FIX #7 (secondary): ensure calories is always stored as a number so
       * future reads from localStorage never encounter string values.
       */
      calories: Number(record.calories),
      id: crypto.randomUUID(),
    };

    setRecords((prev) =>
      [...prev, formatted].sort((a, b) => a.date - b.date),
    );

    handleCloseModal();
  };

  return (
    <div className="App">
      <h1 className={styles.title}>The Calories Tracker Project</h1>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
        contentLabel="Add food record"
        style={MODAL_STYLE}
      >
        <CalorieRecordEdit
          onCancel={handleCloseModal}
          onFormSubmit={onFormSubmit}
          currentDate={currentDate}
          setCurrentDate={setCurrentDate}
          totalCalories={total}
        />
      </Modal>

      <ListingSection
        allRecords={records}
        currentDate={currentDate}
        setCurrentDate={setCurrentDate}
        totalCalories={total}
      />

      <button className={styles["open-modal-btn"]} onClick={handleOpenModal}>
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="16" />
          <line x1="8" y1="12" x2="16" y2="12" />
        </svg>
        Track food
      </button>
    </div>
  );
}

export default App;
