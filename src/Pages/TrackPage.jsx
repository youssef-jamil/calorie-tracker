import { useState } from "react";
import { useRecords } from "../context/RecordsContext";
import CalorieRecordEdit from "../Component/Edit/CalorieRecordEdit";
import ListingSection from "../Component/CalorieRecordSection/ListingSection";
import Modal from "react-modal";
import styles from "./TrackPage.module.css";

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
  overlay: { backgroundColor: "rgba(0,0,0,0.5)" },
};

export function TrackPage() {
  const { records, addRecord, currentDate, setCurrentDate, totalForDate } =
    useRecords();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal  = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const onFormSubmit = (record) => {
    addRecord(record);
    handleCloseModal();
  };

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Calorie Tracker</h1>

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
          totalCalories={totalForDate}
        />
      </Modal>

      <ListingSection
        allRecords={records}
        currentDate={currentDate}
        setCurrentDate={setCurrentDate}
        totalCalories={totalForDate}
      />

      <button className={styles["open-modal-btn"]} onClick={handleOpenModal}>
        <svg
          width="18" height="18" viewBox="0 0 24 24"
          fill="none" stroke="currentColor" strokeWidth="2"
          strokeLinecap="round" strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8"  x2="12" y2="16" />
          <line x1="8"  y1="12" x2="16" y2="12" />
        </svg>
        Track food
      </button>
    </div>
  );
}
