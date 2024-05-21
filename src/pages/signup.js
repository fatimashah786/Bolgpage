// pages/signup.js

import SignUpForm from "../../components/SignupForm";

const SignUpPage = () => {
  return (
    <div>
      <h1
        style={{
          textAlign: "center",
          fontSize: "2rem",
          marginBottom: "1.5rem",
          fontFamily: "sans-serif",
          color: "teal",
          marginTop: "99px",
        }}
      >
        Sign Up
      </h1>

      <SignUpForm />
    </div>
  );
};

export default SignUpPage;
