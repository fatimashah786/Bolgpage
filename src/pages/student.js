import { BsPersonFillAdd } from "react-icons/bs";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import withAuth from "./withAuth";
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
  const auth = getAuth(firebaseApp);
  const db = getDatabase();

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
      errors.name = "Name is  Required";
    } else if (!/^[a-zA-Z]+$/.test(formData.name.trim())) {
      errors.name = "Name must be Alphabetic";
    }

    if (!formData.email.trim()) {
      errors.email = " Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email.trim())) {
      errors.email = "Invalid email";
    }

    if (!formData.age.trim()) {
      errors.age = "Lifespan is Required";
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
                  />{" "}
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
                  <select
                    className={styles.input}
                    id="department"
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                  >
                    {" "}
                    <option value="">Select Department</option>
                    <option value="IT">IT</option>
                    <option value="Computer">Computer</option>
                    <option value="Civil">Civil</option>
                  </select>

                  {formErrors.department && (
                    <span className={styles["error-message"]}>
                      {formErrors.department}
                    </span>
                  )}
                </div>
                <div className={styles["form-group"]}>
                  <label className={styles.label} htmlFor="Gender">
                    Gender:
                  </label>
                  <div className={`${styles["radio-group"]} ${styles.f}`}>
                    <label
                      className={`${styles.gender} ${styles.spc} ${styles.label} `}
                    >
                      <input
                        type="radio"
                        name="gender"
                        value="Male"
                        checked={formData.gender === "Male"}
                        onChange={handleChange}
                      />
                      Male
                    </label>
                    <label className={`${styles.gender} ${styles.label}`}>
                      <input
                        type="radio"
                        name="gender"
                        value="Female"
                        checked={formData.gender === "Female"}
                        onChange={handleChange}
                      />
                      Female
                    </label>
                  </div>
                  {formErrors.gender && (
                    <span className={styles["error-message"]}>
                      {formErrors.gender}
                    </span>
                  )}
                </div>
                <button className={styles.btnsub} type="submit">
                  Submit
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
              <h2 className={styles.h2}>Confirmation</h2>
              <p className={styles.p2}>
                Are you sure you want to delete this student?
              </p>
              <div className={styles["modal-buttons"]}>
                <button className={styles.confirm} onClick={handleDelete}>
                  OK
                </button>
                <button
                  className={styles.cancel}
                  onClick={closeDeleteConfirmationModal}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
        <br />
        <div className={styles.contai}>
          <div className={styles["student-list-container"]}>
            <h2 className={styles.clr}>Student List</h2>
            {studentList.length > 0 ? (
              <table className={styles["student-table"]}>
                <thead>
                  <tr>
                    {/* <th>ID</th> */}
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
                      {/* <td data-label="ID">{student.id}</td> */}
                      <td data-label="Name">{student.name}</td>
                      <td data-label="Email">{student.email}</td>
                      <td data-label="Age">{student.age}</td>
                      <td data-label="Address">{student.address}</td>
                      <td data-label="Department">{student.department}</td>
                      <td data-label="Gender">{student.gender}</td>
                      <td data-label="Actions">
                        <button
                          className={`${styles.butne} btn-sm btn-primary mr-2`}
                          onClick={() => openModal(student.id)}
                        >
                          <EditIcon />
                        </button>{" "}
                        &nbsp;
                        <button
                          className={`${styles.butnd} btn-sm btn-danger`}
                          onClick={() =>
                            openDeleteConfirmationModal(student.id)
                          }
                        >
                          <DeleteIcon />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className={styles.p}>No student data available.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default withAuth(Student);
