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
  push,
  set,
  remove,
  onValue,
} from "firebase/database";

import {
  storeProjectData,
  editProjectData,
  deleteProjectData,
} from "@/redux/action";

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

import firebaseConfig from "@/firebaseConfig";
import { useRouter } from "next/router";

import "react-toastify/dist/ReactToastify.css"; // Import toast styles
import Link from "next/link";
import styles from "../../components/Project.module.css";

const Project = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    projectName: "",
    budget: "",
    description: "",
    name: "",
    projectType: "",
  });
  const [formErrors, setFormErrors] = useState({
    projectName: "",
    budget: "",
    description: "",
    name: "",
    projectType: "",
  });
  const [projectList, setProjectList] = useState([]);
  const [studentList, setStudentList] = useState([]);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const dispatch = useDispatch();

  const router = useRouter();

  const firebaseApp = initializeApp(firebaseConfig);
  const auth = getAuth(firebaseApp);
  const db = getDatabase();

  useEffect(() => {
    const projectsRef = ref(db, "nextprojects");
    const studentsRef = ref(db, "nextstudents");

    onValue(projectsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const projectData = Object.entries(data).map(([id, project]) => ({
          id,
          ...project,
        }));
        setProjectList(projectData);
      } else {
        setProjectList([]);
      }
    });

    onValue(studentsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const studentData = Object.entries(data).map(([id, student]) => ({
          id,
          ...student,
        }));
        setStudentList(studentData);
      } else {
        setStudentList([]);
      }
    });
  }, [db]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProjectId(null);
    setFormData({
      projectName: "",
      budget: "",
      description: "",
      name: "",
      projectType: "",
    });
    setFormErrors({
      projectName: "",
      budget: "",
      description: "",
      name: "",
      projectType: "",
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const errors = {};
    if (!formData.projectName.trim()) {
      errors.projectName = "Project Name is required";
    }
    if (!formData.budget.trim() || isNaN(formData.budget.trim())) {
      errors.budget = "Budget must be a number";
    }
    if (!formData.description.trim()) {
      errors.description = "Description is required";
    }
    if (!formData.name.trim()) {
      errors.name = "Name is required";
    }
    if (!formData.projectType.trim()) {
      errors.projectType = "Project Type is required";
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    try {
      if (selectedProjectId) {
        await updateProjectData(selectedProjectId, formData);
        dispatch(editProjectData(selectedProjectId, formData));
      } else {
        const newProjectId = await saveProjectData(formData);
        dispatch(storeProjectData({ id: newProjectId, ...formData }));
      }
      closeModal();
      toast.success("Data saved successfully!");
    } catch (error) {
      console.error("Error creating project: ", error);
      toast.error("Failed to create project");
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

  const saveProjectData = async (projectData) => {
    const projectsRef = ref(db, "nextprojects");
    const newProjectRef = push(projectsRef);

    await set(newProjectRef, projectData);
    console.log("Project data saved successfully!");
    return newProjectRef.key; // Return the new project ID
  };

  const updateProjectData = async (projectId, projectData) => {
    const projectRef = ref(db, `nextprojects/${projectId}`);

    await set(projectRef, projectData);
    console.log("Project data updated successfully!");
  };

  const deleteProject = async (projectId) => {
    const projectRef = ref(db, `nextprojects/${projectId}`);

    try {
      await remove(projectRef);
      dispatch(deleteProjectData(projectId));
      console.log("Project deleted successfully!");
      toast.success("Project deleted successfully!");
    } catch (error) {
      console.error("Error deleting project: ", error);
      toast.error("Failed to delete project");
    }
  };

  const handleEdit = (project) => {
    setIsModalOpen(true);
    setSelectedProjectId(project.id);
    setFormData({
      projectName: project.projectName,
      budget: project.budget,
      description: project.description,
      name: project.name,
      projectType: project.projectType,
    });
  };

  return (
    <>
      <ToastContainer />
      <div>
        <div className={styles.cntnr}>
          <button className={styles.btnaddp} onClick={openModal}>
            <BsPersonFillAdd /> Add Project
          </button>
        </div>
        {isModalOpen && (
          <div className={styles.modal}>
            <div className={styles["modal-content"]}>
              <span className={styles.close} onClick={closeModal}>
                &times;
              </span>
              <h2 className={styles.h2}>Project Details</h2>

              <form onSubmit={handleSubmit}>
                <div className={styles["form-group"]}>
                  <label className={styles.label} htmlFor="projectName">
                    Project Name:
                  </label>
                  <input
                    className={styles.input}
                    type="text"
                    id="projectName"
                    name="projectName"
                    value={formData.projectName}
                    onChange={handleChange}
                  />
                  {formErrors.projectName && (
                    <h6 className={styles["h6"]}>{formErrors.projectName}</h6>
                  )}
                </div>
                <div className={styles["form-group"]}>
                  <label className={styles.label} htmlFor="budget">
                    Budget:
                  </label>
                  <input
                    className={styles.input}
                    type="number"
                    id="budget"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                  />
                  {formErrors.budget && (
                    <h6 className={styles["h6"]}> {formErrors.budget}</h6>
                  )}
                </div>
                <div className={styles["form-group"]}>
                  <label className={styles.label} htmlFor="description">
                    Description:
                  </label>
                  <textarea
                    className={styles.textarea}
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                  ></textarea>
                  {formErrors.description && (
                    <h6 className={styles["h6"]}> {formErrors.description}</h6>
                  )}
                </div>
                <div className={styles["form-group"]}>
                  <label className={styles.label} htmlFor="name">
                    Name:
                  </label>
                  <select
                    className={styles.input}
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  >
                    <option value="">Select Name</option>
                    {studentList.map((student) => (
                      <option key={student.id} value={student.name}>
                        {student.name}
                      </option>
                    ))}
                  </select>
                  {formErrors.name && (
                    <h6 className={styles["h6"]}> {formErrors.name}</h6>
                  )}
                </div>
                <div className={styles["form-group"]}>
                  <label className={styles.label} htmlFor="projectType">
                    Project Type:
                  </label>
                  <select
                    className={styles.input}
                    id="projectType"
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleChange}
                  >
                    <option value="">Select Project Type</option>
                    <option value="Web">Web</option>
                    <option value="Mobile">Mobile</option>
                    <option value="Desktop">Desktop</option>
                  </select>
                  {formErrors.projectType && (
                    <h6 className={styles["h6"]}> {formErrors.projectType}</h6>
                  )}
                </div>
                <button className={styles.btnsub} type="submit">
                  Submit
                </button>
              </form>
            </div>
          </div>
        )}
        <br />
        <div className={styles.container1}>
          <div className={styles["project-list-container"]}>
            <div className={styles.containere}>
              <h2 className={styles.h2}>Project List</h2>
              {projectList.length > 0 ? (
                <table className={styles["project-table"]}>
                  <thead>
                    <tr>
                      {/* <th>ID</th> */}
                      <th>Project Name</th>
                      <th>Budget</th>
                      <th>Description</th>
                      <th>Name</th>
                      <th>Project Type</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {projectList.map((project) => (
                      <tr key={project.id}>
                        {/* <td data-label="ID">{project.id}</td> */}
                        <td data-label="Project Name">{project.projectName}</td>
                        <td data-label="Budget">{project.budget}</td>
                        <td data-label="Description">{project.description}</td>
                        <td data-label="Name">{project.name}</td>
                        <td data-label="Project Type">{project.projectType}</td>
                        <td data-label="Actions">
                          <button
                            className={`${styles.butne} btn-sm btn-primary mr-2`}
                            onClick={() => handleEdit(project)}
                          >
                            <EditIcon />
                          </button>{" "}
                          &nbsp;
                          <button
                            className={`${styles.butnd} btn-sm btn-danger`}
                            onClick={() => deleteProject(project.id)}
                          >
                            <DeleteIcon />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className={styles.p}>No project data available.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default withAuth(Project);
