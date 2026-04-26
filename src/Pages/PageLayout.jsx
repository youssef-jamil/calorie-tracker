import SideNav from "../Component/Comm/SideNav";
import styles from "./PageLayout.module.css";
import { Outlet } from "react-router-dom";

export function PageLayout() {
  return (
    <div className={styles.layout}>
      <SideNav />
      <div className={styles["content-wrapper"]}>
        <Outlet />
      </div>
    </div>
  );
}
