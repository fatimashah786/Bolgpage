import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";
import firebaseConfig from "@/firebaseConfig";
import { useRouter } from "next/router";
import styles from "./Signupform.module.css";
import { toast, ToastContainer } from "react-toastify"; // Import toast notification library
import "react-toastify/dist/ReactToastify.css"; // Import toast styles
import Link from "next/link";

const SignupForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();

  // Initialize Firebase app
  const firebaseApp = initializeApp(firebaseConfig);
  const auth = getAuth(firebaseApp);
  const database = getDatabase();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear previous errors
    setError("");

    // Validation errors
    const errors = {};

    // Basic validation
    if (!name.trim()) {
      errors.name = "Name is required";
    } else if (!/^[a-zA-Z]+$/.test(name)) {
      errors.name = "Invalid name, only characters are allowed";
    }

    if (!email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Invalid email";
    }

    if (!phone.trim()) {
      errors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(phone)) {
      errors.phone = "Invalid phone number, must be 10 digits";
    }

    if (!password.trim()) {
      errors.password = "Password is required";
    } else if (password.length < 6) {
      errors.password = "Password should be at least 6 characters";
    }

    // If there are validation errors, set them and return
    if (Object.keys(errors).length > 0) {
      setError(errors);
      return;
    }

    // Firebase signup
    setIsSubmitting(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const newUser = userCredential.user;

      // Store user data in Realtime Database
      await set(ref(database, `users/${newUser.uid}`), {
        name: name,
        email: email,
        phone: phone,
      });

      // Show success toast
      toast.success("Signup successful!", {
        position: "top-right",
        autoClose: 10000, // 10 seconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      // Redirecting to login page after successful signup
      setTimeout(() => {
        router.push("/signin");
      }, 4000); // 10000 milliseconds = 10 seconds
    } catch (error) {
      setError(error.message);

      // Show error toast for specific error
      if (error.code === "auth/invalid-email") {
        toast.error("Invalid email format");
      } else if (error.code === "auth/email-already-in-use") {
        toast.error("Email already in use");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <ToastContainer />
      <form className={styles.signupForm} onSubmit={handleSubmit}>
        <div className={styles.inputGroup}>
          <label className={styles.label} htmlFor="name">
            Name:
          </label>
          <input
            id="name"
            className={styles.input}
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {error.name && <p className={styles.error}>{error.name}</p>}
        </div>
        <div className={styles.inputGroup}>
          <label className={styles.label} htmlFor="email">
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
          {error.email && <p className={styles.error}>{error.email}</p>}
        </div>
        <div className={styles.inputGroup}>
          <label className={styles.label} htmlFor="phone">
            Phone:
          </label>
          <input
            id="phone"
            className={styles.input}
            type="tel"
            placeholder="Enter your phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          {error.phone && <p className={styles.error}>{error.phone}</p>}
        </div>
        <div className={styles.inputGroup}>
          <label className={styles.label} htmlFor="password">
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
          {error.password && <p className={styles.error}>{error.password}</p>}
        </div>
        <button className={styles.button} type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Sign Up" : "Sign Up"}
        </button>
        <h3 className={styles.h3}>Or</h3>
        <div className={styles.btn}>
          <Link href="/signin">Sign-In</Link>
        </div>
      </form>
    </>
  );
};

export default SignupForm;
