// import { useState } from "react";
// import { useDispatch } from "react-redux";
// import { createUserWithEmailAndPassword } from "firebase/auth";
// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
// import { getDatabase, ref, set } from "firebase/database";
// import firebaseConfig from "@/firebaseConfig";
// import { useRouter } from "next/router";
// import styles from './Signupform.module.css'

// const SignupForm = () => {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [phone, setPhone] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");

//   const dispatch = useDispatch();

//   // Initialize Firebase app
//   const firebaseApp = initializeApp(firebaseConfig);
//   const auth = getAuth(firebaseApp);
//   const database = getDatabase();

//   // Importing the useRouter hook
//   const router = useRouter();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Basic validation
//     if (!name || !email || !phone || !password) {
//       setError("All fields are required");
//       return;
//     }

//     // Firebase signup
//     try {
//       const userCredential = await createUserWithEmailAndPassword(
//         auth,
//         email,
//         password
//       );
//       const newUser = userCredential.user;

//       // Store user data in Realtime Database
//       await set(ref(database, `users/${newUser.uid}`), {
//         name: name,
//         email: email,
//         phone: phone,
//       });

//       // Dispatch action to store user data in Redux
//       dispatch({ type: "STORE_SIGNUP_DATA", payload: { name, email, phone } });

//       // Redirecting to login page after successful signup
//       router.push("/signin");
//     } catch (error) {
//       setError(error.message);
//     }
//   };

//   return (
//     <form className={styles.signupForm} onSubmit={handleSubmit}>
//       <input
//         className={styles.input}
//         type="text"
//         placeholder="Name"
//         value={name}
//         onChange={(e) => setName(e.target.value)}
//       />
//       <input
//         className={styles.input}
//         type="email"
//         placeholder="Email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//       />
//       <input
//         className={styles.input}
//         type="tel"
//         placeholder="Phone"
//         value={phone}
//         onChange={(e) => setPhone(e.target.value)}
//       />
//       <input
//         className={styles.input}
//         type="password"
//         placeholder="Password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//       />
//       <button className={styles.button} type="submit">
//         Sign Up
//       </button>
//       {error && <p className={styles.error}>{error}</p>}
//     </form>
//   );
// };

// export default SignupForm;
// import { useState } from "react";
// import { useDispatch } from "react-redux";
// import { createUserWithEmailAndPassword } from "firebase/auth";
// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
// import { getDatabase, ref, set } from "firebase/database";
// import firebaseConfig from "@/firebaseConfig";
// import { useRouter } from "next/router";
// import styles from './Signupform.module.css'

// const SignupForm = () => {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [phone, setPhone] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");

//   const dispatch = useDispatch();

//   // Initialize Firebase app
//   const firebaseApp = initializeApp(firebaseConfig);
//   const auth = getAuth(firebaseApp);
//   const database = getDatabase();

//   // Importing the useRouter hook
//   const router = useRouter();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Basic validation
//     if (!name || !email || !phone || !password) {
//       setError("All fields are required");
//       return;
//     }

//     // Firebase signup
//     try {
//       const userCredential = await createUserWithEmailAndPassword(
//         auth,
//         email,
//         password
//       );
//       const newUser = userCredential.user;

//       // Store user data in Realtime Database
//       await set(ref(database, `users/${newUser.uid}`), {
//         name: name,
//         email: email,
//         phone: phone,
//       });

//       // Dispatch action to store user data in Redux
//       dispatch({ type: "STORE_SIGNUP_DATA", payload: { name, email, phone } });

//       // Redirecting to login page after successful signup
//       router.push("/signin");
//     } catch (error) {
//       setError(error.message);
//     }
//   };

//   return (
//     <form className={styles.signupForm} onSubmit={handleSubmit}>
//       <input
//         className={styles.input}
//         type="text"
//         placeholder="Name"
//         value={name}
//         onChange={(e) => setName(e.target.value)}
//       />
//       <input
//         className={styles.input}
//         type="email"
//         placeholder="Email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//       />
//       <input
//         className={styles.input}
//         type="tel"
//         placeholder="Phone"
//         value={phone}
//         onChange={(e) => setPhone(e.target.value)}
//       />
//       <input
//         className={styles.input}
//         type="password"
//         placeholder="Password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//       />
//       <button className={styles.button} type="submit">
//         Sign Up
//       </button>
//       {error && <p className={styles.error}>{error}</p>}
//     </form>
//   );
// };

// export default SignupForm;
import { BsPersonFillAdd } from "react-icons/bs";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import {
  getDatabase,
  ref,
  remove,
  push,
  set,
  onValue,
} from "firebase/database";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import styles from "../../components/Student.module.css";
import {
  editStudentData,
  deleteStudentData,
  storeStudentData,
} from "@/redux/action";

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

import firebaseConfig from "@/firebaseConfig";
import { useRouter } from "next/router";

import "react-toastify/dist/ReactToastify.css"; // Import toast styles
import Link from "next/link";

const Student = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
    address: "",
    department: "",
    gender: "",
  });
  const [formErrors, setFormErrors] = useState({
    name: "",
    email: "",
    age: "",
    address: "",
    department: "",
    gender: "",
  });
  const [studentList, setStudentList] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editStudentId, setEditStudentId] = useState(null);
  const dispatch = useDispatch();
  const router = useRouter();

  const firebaseApp = initializeApp(firebaseConfig);
  const db = getDatabase(firebaseApp);

  useEffect(() => {
    const studentsRef = ref(db, "nextstudents");
    onValue(studentsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const studentData = Object.keys(data).map((studentId) => ({
          ...data[studentId],
          id: studentId,
        }));
        setStudentList(studentData);
      } else {
        setStudentList([]);
      }
    });
  }, [db]);

  const openModal = (studentId = null) => {
    setIsModalOpen(true);
    if (studentId) {
      const student = studentList.find((student) => student.id === studentId);
      setFormData(student);
      setEditMode(true);
      setEditStudentId(studentId);
    } else {
      setFormData({
        name: "",
        email: "",
        age: "",
        address: "",
        department: "",
        gender: "",
      });
      setEditMode(false);
      setEditStudentId(null);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setFormData({
      name: "",
      email: "",
      age: "",
      address: "",
      department: "",
      gender: "",
    });
    setFormErrors({
      name: "",
      email: "",
      age: "",
      address: "",
      department: "",
      gender: "",
    });
    setEditMode(false);
    setEditStudentId(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const errors = {};
    if (!formData.name.trim()) {
      errors.name = "Name is required";
    } else if (!/^[a-zA-Z]+$/.test(formData.name.trim())) {
      errors.name = "Name must be alphabetic";
    }

    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email.trim())) {
      errors.email = "Invalid email";
    }

    if (!formData.age.trim()) {
      errors.age = "Age is required";
    } else if (isNaN(formData.age.trim())) {
      errors.age = "Age must be a number";
    }

    if (!formData.address.trim()) {
      errors.address = "Address is required";
    }

    if (!formData.department.trim()) {
      errors.department = "Department is required";
    }

    if (!formData.gender.trim()) {
      errors.gender = "Gender is required";
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    try {
      if (editMode && editStudentId) {
        const updatedStudent = { ...formData, id: editStudentId };
        dispatch(editStudentData(editStudentId, updatedStudent));
        const studentRef = ref(db, `nextstudents/${editStudentId}`);
        set(studentRef, updatedStudent);
        toast.success("Student updated successfully!");
      } else {
        const { user } = await createUserWithEmailAndPassword(
          auth,
          formData.email,
          "password"
        );

        if (user) {
          dispatch(storeStudentData(formData));
          const newStudentRef = push(ref(db, "nextstudents"));
          set(newStudentRef, formData);
          toast.success("Student registration successful!");
        }
      }

      closeModal();
    } catch (error) {
      console.error("Error:", error);
      if (error.code === "auth/email-already-in-use") {
        toast.error(
          "This email is already in use. Please try a different email."
        );
      } else {
        toast.error("Failed to register student");
      }
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setFormErrors({
      ...formErrors,
      [name]: "",
    });
  };

  const openDeleteConfirmationModal = (studentId) => {
    setDeleteId(studentId);
    setDeleteConfirmationOpen(true);
  };

  const closeDeleteConfirmationModal = () => {
    setDeleteId(null);
    setDeleteConfirmationOpen(false);
  };

  const handleDelete = () => {
    if (deleteId) {
      dispatch(deleteStudentData(deleteId));
      const studentRef = ref(db, `nextstudents/${deleteId}`);
      remove(studentRef)
        .then(() => {
          console.log("Student data deleted successfully!");
          toast.success("Student deleted successfully!");
        })
        .catch((error) => {
          console.error("Error deleting student data: ", error);
          toast.error("Failed to delete student data");
        });
      closeDeleteConfirmationModal();
    }
  };

  return (
    <>
      <ToastContainer />

      <div>
        <div className={styles.cntnr}>
          <button className={styles.btnadds} onClick={() => openModal()}>
            <BsPersonFillAdd /> Student
          </button>
        </div>
        {isModalOpen && (
          <div className={styles.modal}>
            <div className={styles["modal-content"]}>
              <span className={styles.close} onClick={closeModal}>
                &times;
              </span>
              <h2 className={styles.h2}>
                {editMode ? "Edit Student" : "Student Registration"}
              </h2>
              <form onSubmit={handleSubmit}>
                <div className={styles["form-group"]}>
                  <label className={styles.label} htmlFor="name">
                    Name:
                  </label>
                  <input
                    className={styles.input}
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />

                  {formErrors.name && (
                    <span className={styles["error-message"]}>
                      {formErrors.name}
                    </span>
                  )}
                </div>

                <div className={`${styles["form-group"]} ${styles.eml}`}>
                  <label className={styles.label} htmlFor="email">
                    Email:
                  </label>
                  <input
                    className={styles.eml}
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />

                  {formErrors.email && (
                    <span className={styles["error-message"]}>
                      {formErrors.email}
                    </span>
                  )}
                </div>
                <div className={styles["form-group"]}>
                  <label className={styles.label} htmlFor="age">
                    Age:
                  </label>
                  <input
                    className={styles.input}
                    type="number"
                    id="age"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                  />

                  {formErrors.age && (
                    <span className={styles["error-message"]}>
                      {formErrors.age}
                    </span>
                  )}
                </div>
                <div className={styles["form-group"]}>
                  <label className={styles.label} htmlFor="address">
                    Address:
                  </label>
                  <input
                    className={styles.input}
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                  />
                  {formErrors.address && (
                    <span className={styles["error-message"]}>
                      {formErrors.address}
                    </span>
                  )}
                </div>
                <div className={styles["form-group"]}>
                  <label className={styles.label} htmlFor="department">
                    Department:
                  </label>
                  <input
                    className={styles.input}
                    type="text"
                    id="department"
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                  />
                  {formErrors.department && (
                    <span className={styles["error-message"]}>
                      {formErrors.department}
                    </span>
                  )}
                </div>
                <div className={styles["form-group"]}>
                  <label className={styles.label} htmlFor="gender">
                    Gender:
                  </label>
                  <select
                    className={styles.input}
                    id="gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                  {formErrors.gender && (
                    <span className={styles["error-message"]}>
                      {formErrors.gender}
                    </span>
                  )}
                </div>
                <button className={styles.btnsubmit} type="submit">
                  {editMode ? "Update Student" : "Register Student"}
                </button>
              </form>
            </div>
          </div>
        )}
        {deleteConfirmationOpen && (
          <div className={styles.modal}>
            <div className={styles["modal-content"]}>
              <span
                className={styles.close}
                onClick={closeDeleteConfirmationModal}
              >
                &times;
              </span>
              <h2 className={styles.h2}>Confirm Delete</h2>
              <p>Are you sure you want to delete this student?</p>
              <button className={styles.btnsubmit} onClick={handleDelete}>
                Confirm
              </button>
              <button
                className={styles.btnsubmit}
                onClick={closeDeleteConfirmationModal}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
        <div className={styles.cntnr}>
          <h2 className={styles.h2}>Student List</h2>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Age</th>
                <th>Address</th>
                <th>Department</th>
                <th>Gender</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {studentList.map((student) => (
                <tr key={student.id}>
                  <td>{student.name}</td>
                  <td>{student.email}</td>
                  <td>{student.age}</td>
                  <td>{student.address}</td>
                  <td>{student.department}</td>
                  <td>{student.gender}</td>
                  <td>
                    <button
                      className={styles.btnedit}
                      onClick={() => openModal(student.id)}
                    >
                      <EditIcon />
                    </button>
                    <button
                      className={styles.btndelete}
                      onClick={() => openDeleteConfirmationModal(student.id)}
                    >
                      <DeleteIcon />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Student;
