// // components/SigninForm.js

// import { useState } from "react";
// import { useDispatch } from "react-redux";
// import { signInWithEmailAndPassword } from "firebase/auth";
// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
// import { useRouter } from "next/router";
// import firebaseConfig from "@/firebaseConfig";

// const SigninForm = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const dispatch = useDispatch();
//   const router = useRouter();

//   // Initialize Firebase app
//   const firebaseApp = initializeApp(firebaseConfig);
//   const auth = getAuth(firebaseApp);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       // Firebase sign-in
//       await signInWithEmailAndPassword(auth, email, password);

//       // Redirect authenticated user to dashboard
//       router.push("/student");
//     } catch (error) {
//       setError(error.message);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input
//         type="email"
//         placeholder="Email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//       />
//       <input
//         type="password"
//         placeholder="Password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//       />
//       <button type="submit">Sign In</button>
//       {error && <p>{error}</p>}
//     </form>
//   );
// };

// export default SigninForm;

import Link from "next/link";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { signInWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { useRouter } from "next/router";
import firebaseConfig from "@/firebaseConfig";
import styles from "./SigninForm.module.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { storeSigninData, signIn } from "@/redux/action";
const SigninForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();

  // Initialize Firebase app
  const firebaseApp = initializeApp(firebaseConfig);
  const auth = getAuth(firebaseApp);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear previous errors
    setEmailError("");
    setPasswordError("");

    if (!email.trim()) {
      setEmailError("Email is required");
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Invalid email");
    }
    if (!password.trim()) {
      setPasswordError("Password is required");
    } else if (password.length < 5) {
      setPasswordError("Invalid Password");
    }
    if (emailError || passwordError) {
      return;
    }

    try {
      // Firebase sign-in
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Dispatch Redux actions to store sign-in data
      dispatch(storeSigninData({ email: user.email, uid: user.uid }));
      dispatch(signIn({ email: user.email, uid: user.uid }));

      // Show success toast
      toast.success("Sign-In successful!", {
        position: "top-right",
        autoClose: 3000, // 3 seconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      // Redirecting to the student page after successful sign-in
      setTimeout(() => {
        router.push("/student");
      }, 2000);
    } catch (error) {
      if (
        error.code === "auth/invalid-email" ||
        error.code === "auth/wrong-password"
      ) {
        toast.error("Invalid email or password");
      } else {
        toast.error("Sign-In failed");
      }
    }
  };

  return (
    <>
      <ToastContainer />
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.inputGroup}>
          <label htmlFor="email" className={styles.label}>
            Email:
          </label>
          <input
            id="email"
            className={styles.input}
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {emailError && <p className={styles.error}>{emailError}</p>}
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="password" className={styles.label}>
            Password:
          </label>
          <input
            id="password"
            className={styles.input}
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {passwordError && <p className={styles.error}>{passwordError}</p>}
        </div>
        <button className={styles.button} type="submit">
          Sign In
        </button>

        <h3 className={styles.h3}>Or</h3>
        <div className={styles.btn}>
          <Link href="/signup">Sign-Up</Link>
        </div>
      </form>
    </>
  );
};

export default SigninForm;
