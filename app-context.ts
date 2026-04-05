import { createContext } from "react";

interface AppContextType {
  currentDate: Date;
  setCurrentDate: (value: Date) => void;
  totalCalories: number;
}

const AppContext = createContext<AppContextType>({
  currentDate: new Date(),
  setCurrentDate: (value: Date) => {}, // value is not used in default
  totalCalories: 0,
});

export default AppContext;
