import { createContext } from "react";

const AppContext = createContext({
  currentDate: new Date(),
  setCurrentDate: () => {},
  totalCalories: 0,
});

export default AppContext;
