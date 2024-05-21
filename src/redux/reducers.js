import { combineReducers } from "redux";
import {
  STORE_SIGNUP_DATA,
  STORE_STUDENT_DATA,
  STORE_SIGNIN_DATA,
  STORE_PROJECT_DATA,
  EDIT_PROJECT_DATA,
  DELETE_PROJECT_DATA,
  SIGN_IN,
  SIGN_OUT,
  EDIT_STUDENT_DATA,
  DELETE_STUDENT_DATA,
} from "./action";

// Initial state for authentication
const initialAuthState = {
  isAuthenticated: false,
  user: null,
};

// Initial state for signup data
const initialSignupState = {
  signupData: null,
};

// Initial state for signin data
const initialSigninState = {
  signinData: null,
};

// Initial state for student data
const initialStudentState = {
  studentData: [],
};

// Initial state for project data
const initialProjectState = {
  projectData: [],
};

// Reducer for authentication
const authReducer = (state = initialAuthState, action) => {
  switch (action.type) {
    case SIGN_IN:
      return {
        isAuthenticated: true,
        user: action.payload,
      };
    case SIGN_OUT:
      return {
        isAuthenticated: false,
        user: null,
      };
    default:
      return state;
  }
};

// Reducer for signup data
const signupReducer = (state = initialSignupState, action) => {
  switch (action.type) {
    case STORE_SIGNUP_DATA:
      return {
        ...state,
        signupData: action.payload,
      };
    default:
      return state;
  }
};

// Reducer for signin data
const signinReducer = (state = initialSigninState, action) => {
  switch (action.type) {
    case STORE_SIGNIN_DATA:
      return {
        ...state,
        signinData: action.payload,
      };
    default:
      return state;
  }
};

// Reducer for student data
const studentReducer = (state = initialStudentState, action) => {
  switch (action.type) {
    case STORE_STUDENT_DATA:
      return {
        ...state,
        studentData: [...state.studentData, action.payload],
      };
    case EDIT_STUDENT_DATA:
      return {
        ...state,
        studentData: state.studentData.map((student) =>
          student.id === action.payload.studentId
            ? { ...student, ...action.payload.updatedData }
            : student
        ),
      };
    case DELETE_STUDENT_DATA:
      return {
        ...state,
        studentData: state.studentData.filter(
          (student) => student.id !== action.payload
        ),
      };
    default:
      return state;
  }
};

// Reducer for project data
const projectReducer = (state = initialProjectState, action) => {
  switch (action.type) {
    case STORE_PROJECT_DATA:
      return {
        ...state,
        projectData: [...state.projectData, action.payload],
      };
    case EDIT_PROJECT_DATA:
      return {
        ...state,
        projectData: state.projectData.map((project) =>
          project.id === action.payload.projectId
            ? { ...project, ...action.payload.updatedData }
            : project
        ),
      };
    case DELETE_PROJECT_DATA:
      return {
        ...state,
        projectData: state.projectData.filter(
          (project) => project.id !== action.payload
        ),
      };
    default:
      return state;
  }
};

// Combine all reducers
const Reducer = combineReducers({
  auth: authReducer,
  signup: signupReducer,
  student: studentReducer,
  signin: signinReducer,
  project: projectReducer,
});

export default Reducer;
