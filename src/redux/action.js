// redux/actions.js

export const STORE_SIGNUP_DATA = "STORE_SIGNUP_DATA";
export const STORE_STUDENT_DATA = "STORE_STUDENT_DATA";
export const STORE_PROJECT_DATA = "STORE_PROJECT_DATA";
export const EDIT_PROJECT_DATA = "EDIT_PROJECT_DATA";
export const DELETE_PROJECT_DATA = "DELETE_PROJECT_DATA";
export const STORE_SIGNIN_DATA = "STORE_SIGNIN_DATA";

export const SIGN_IN = "SIGN_IN";
export const SIGN_OUT = "SIGN_OUT";

export const EDIT_STUDENT_DATA = "EDIT_STUDENT_DATA";
export const DELETE_STUDENT_DATA = "DELETE_STUDENT_DATA";

export const storeSignupData = (userData) => ({
  type: STORE_SIGNUP_DATA,
  payload: userData,
});

export const storeStudentData = (studentData) => ({
  type: STORE_STUDENT_DATA,
  payload: studentData,
});

export const storeProjectData = (projectData) => ({
  type: STORE_PROJECT_DATA,
  payload: projectData,
});

export const editProjectData = (projectId, updatedData) => ({
  type: EDIT_PROJECT_DATA,
  payload: { projectId, updatedData },
});

export const deleteProjectData = (projectId) => ({
  type: DELETE_PROJECT_DATA,
  payload: projectId,
});

export const storeSigninData = (userData) => ({
  type: STORE_SIGNIN_DATA,
  payload: userData,
});

export const signIn = (userData) => ({
  type: SIGN_IN,
  payload: userData,
});

export const signOut = () => ({
  type: SIGN_OUT,
});

export const editStudentData = (studentId, updatedData) => ({
  type: EDIT_STUDENT_DATA,
  payload: { studentId, updatedData },
});

export const deleteStudentData = (studentId) => ({
  type: DELETE_STUDENT_DATA,
  payload: studentId,
});
