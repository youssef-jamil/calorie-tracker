import { createContext, useContext, useState, useEffect, useMemo } from "react";
import getDateFromString from "../utils";

const LOCAL_STORAGE_KEY = "calorie_records";

function todayUTC() {
  const now = new Date();
  return new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()));
}

const RecordsContext = createContext(null);

export function RecordsProvider({ children }) {
  const [records, setRecords] = useState(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (!stored) return [];
      return JSON.parse(stored).map((r) => ({
        ...r,
        date: getDateFromString(r.date.split("T")[0]),
        calories: Number(r.calories) || 0,
      }));
    } catch {
      return [];
    }
  });

  const [currentDate, setCurrentDate] = useState(todayUTC);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(records));
  }, [records]);

  const addRecord = (formRecord) => {
    const formatted = {
      ...formRecord,
      date: getDateFromString(formRecord.date),
      calories: Number(formRecord.calories),
      id: crypto.randomUUID(),
    };
    setRecords((prev) =>
      [...prev, formatted].sort((a, b) => a.date - b.date)
    );
  };

  const getRecordById = (id) => records.find((r) => r.id === id) ?? null;

  const totalForDate = useMemo(
    () =>
      records
        .filter((r) => r.date.getTime() === currentDate.getTime())
        .reduce((sum, r) => sum + (Number(r.calories) || 0), 0),
    [records, currentDate]
  );

  return (
    <RecordsContext.Provider
      value={{
        records,
        addRecord,
        getRecordById,
        currentDate,
        setCurrentDate,
        totalForDate,
      }}
    >
      {children}
    </RecordsContext.Provider>
  );
}

export function useRecords() {
  const ctx = useContext(RecordsContext);
  if (!ctx) throw new Error("useRecords must be used inside <RecordsProvider>");
  return ctx;
}
