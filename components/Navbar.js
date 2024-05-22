import { FaSignOutAlt, FaBars } from "react-icons/fa";
import Button from "react-bootstrap/Button";
import { useRouter } from "next/router";
import styles from "./Navbar.module.css";

const Navbar = ({ toggleSidebar }) => {
  const router = useRouter();

  const handleLogout = () => {
    router.push("/signin");
  };

  return (
    <nav className="navbar">
      <div className="nav-center">
        <button className="menu-toggle" onClick={toggleSidebar}>
          <FaBars style={{ padding: "15px" }} />
        </button>
        <Button
          variant="outline-danger"
          className={styles.logoutButton}
          onClick={handleLogout}
        >
          <FaSignOutAlt /> Logout
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
