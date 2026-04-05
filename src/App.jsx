import { useEffect, useState } from "react";
import CalorieRecordEdit from "./Component/Edit/CalorieRecordEdit";
import ListingSection from "./Component/CalorieRecordSection/ListingSection";
import Modal from "react-modal";
import styles from "./App.module.css";
import getDateFromString from "./utils";
import AppContext from "../app-context";

const LOCAL_STORAGE_KEY = "calorie_records";

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

  const total = records
    .filter((r) => r.date.getTime() === currentDate.getTime())
    .reduce((sum, r) => sum + r.calories, 0);

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(records));
  }, [records]);

  const modalStyled = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50% , -50%)",
      border: "none",
      padding: "0px",
      borderRadius: "20px",
    },
    overlay: {
      backgroundColor: "rgba(0,0,0,0.5)",
    },
  };

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const onFormSubmit = (record) => {
    const formatRecord = {
      ...record,
      date: getDateFromString(record.date),
      id: crypto.randomUUID(),
    };

    setRecords((prev) =>
      [...prev, formatRecord].sort((a, b) => a.date - b.date),
    );

    handleCloseModal();
  };

  return (
    <div className="App">
      <h1 className={styles.title}>The Calories Tracker Project</h1>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
        contentLabel="Modal"
        style={modalStyled}
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
