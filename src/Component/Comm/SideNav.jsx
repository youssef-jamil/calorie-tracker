import { NavLink } from "react-router-dom";
import styles from "./SideNav.module.css";

const NAV_LINKS = [
  { to: "/",      label: "Home",    end: true },
  { to: "/track", label: "Tracker", end: false },
];

function SideNav() {
  return (
    <nav className={styles.nav} aria-label="Main navigation">
      <div className={styles.brand}>
        <span className={styles.brandIcon}>🥗</span>
        <span className={styles.brandName}>Calorie Tracker</span>
      </div>
      <ul className={styles.links}>
        {NAV_LINKS.map(({ to, label, end }) => (
          <li key={to}>
            <NavLink
              to={to}
              end={end}
              className={({ isActive }) =>
                `${styles.link} ${isActive ? styles.active : ""}`
              }
            >
              {label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default SideNav;
