import { useEffect } from "react";
import { useRouter } from "next/router";
import styles from "./404.module.css";
const pnf = () => {
  const router = useRouter();

  useEffect(() => {
    // Optionally, you can add some custom logic here, like reporting the error or logging
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>404</h1>
      <p className={styles.message}>
        The page you are looking for does not exist.
      </p>
      <a href="/signin" className={styles.button}>
        Go to Homepage
      </a>
    </div>
  );
};

export default pnf;
