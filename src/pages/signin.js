// pages/signup.js

import SigninForm from "../../components/SigninForm";

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
        Sign In
      </h1>
      <SigninForm />
    </div>
  );
};

export default SignUpPage;
