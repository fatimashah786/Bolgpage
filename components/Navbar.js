// // components/Navbar.js
// import React from "react";
// import { FaSignOutAlt } from "react-icons/fa";
// import Button from "react-bootstrap/Button";
// import { FaBars } from "react-icons/fa";

// const Navbar = ({ toggleSidebar }) => {
//   const handleLogout = () => {
//     // Implement your logout logic here
//     console.log("Logged out");
//   };

//   return (
//     <nav className="navbar">
//       <div className="nav-center">
//         <button className="menu-toggle" onClick={toggleSidebar}>
//           <FaBars style={{ padding: "15px" }} />
//         </button>

//         <div className="nav-links">
//           <a href="#">Home</a>
//         </div>

//         <Button
//           style={{
//             color: "red",
//             backgroundColor: "#fff",
//             marginRight: "-5px",
//             borderRadius: "7px",
//             padding: "9px",
//           }}
//           variant="danger"
//           onClick={handleLogout}
//         >
//           <FaSignOutAlt style={{ color: "red", marginRight: "9px" }} />
//           Logout
//         </Button>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
// components/Navbar.js
import React from "react";
import { FaSignOutAlt } from "react-icons/fa";
import Button from "react-bootstrap/Button";
import { FaBars } from "react-icons/fa";

const Navbar = ({ toggleSidebar }) => {
  return (
    <nav className="navbar">
      <div className="nav-center">
        <button className="menu-toggle" onClick={toggleSidebar}>
          <FaBars style={{ padding: "15px" }} />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
