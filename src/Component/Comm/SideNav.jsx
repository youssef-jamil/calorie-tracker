import { NavLink } from "react-router-dom";
import styles from "./SideNav.module.css";
function SideNav() {
  return (
    <nav className={styles.nav}>
      <h1 className={styles.title}>Calorie Tracker</h1>
      <NavLink
        to="/"
        className={({ isActive }) => (isActive ? styles.active : undefined)}
      >
        Home
      </NavLink>
      <NavLink
        to="/track"
        className={({ isActive }) => (isActive ? styles.active : undefined)}
      >
        Tracker
      </NavLink>
    </nav>
  );
}

export default SideNav;
