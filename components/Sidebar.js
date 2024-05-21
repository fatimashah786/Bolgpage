import React from "react";
import { FaTimes, FaUserGraduate, FaProjectDiagram } from "react-icons/fa"; // Importing icons
import Link from "next/link";
import styles from "./Sidebar.module.css";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <aside
      className={`${styles.sidebar} ${isOpen ? styles.open : styles.closed}`}
    >
      <button className={styles["close-btn"]} onClick={toggleSidebar}>
        <FaTimes />
      </button>

      <ul className={styles["sidebar-links"]}>
        <li>
          <Link href="/student">
            <span onClick={toggleSidebar}>
              <FaUserGraduate className={styles.icon} /> Student
            </span>
          </Link>
        </li>
        <li>
          <Link href="/project">
            <span onClick={toggleSidebar}>
              <FaProjectDiagram className={styles.icon} /> Project
            </span>
          </Link>
        </li>
        {/* Add more links as needed */}
      </ul>
    </aside>
  );
};

export default Sidebar;
