import { useState } from "react";
import CalorieRecordEdit from "./Component/Edit/CalorieRecordEdit";
import ListingSection from "./Component/CalorieRecordSection/ListingSection";
import Modal from "react-modal";
import styles from "./App.module.css";
import getDateFromString from "./utils";
const INIL_RECORDS = [
  {
    id: 1,
    date: new Date("2024-01-01"),
    meal: "Breakfast",
    content: "Oatmeal",
    calories: 350
  },
  {
    id: 2,
    date: new Date("2024-01-03"),
    meal: "Lunch",
    content: "Chicken",
    calories: 350
  },
  {
    id: 3,
    date: new Date("2024-01-02"),
    meal: "Dinner",
    content: "cheese",
    calories: 350
  }
];

function App() {
  const [records, setRecords] = useState(INIL_RECORDS);
  const [nextId, setNextId] = useState(4);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
      borderRadius: "20px"
    },

    overlay: {
      backgroundColor: "rgba(0,0,0,0.5)"
    }
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const onFormSubmit = (record) => {
    const formatRecord = {
      ...record,
      date: getDateFromString(record.date),
      id: nextId
    };

    setRecords((prev) =>
      [...prev, formatRecord].sort((a, b) => a.date - b.date)
    );

    setNextId((prev) => prev + 1);

    handleCloseModal();
  };

  const handlerOpenModal = () => {
    handleOpenModal();
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
        />
      </Modal>
      <ListingSection allRecords={records} />
      <button className={styles["open-modal-btn"]} onClick={handlerOpenModal}>
        Track Food
      </button>
    </div>
  );
}

export default App;
