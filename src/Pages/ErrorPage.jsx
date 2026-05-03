import { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./ErrorPage.module.css";

const REDIRECT_SECONDS = 10;
const HOME = "/";

function ErrorPage() {
  const [counter, setCounter] = useState(REDIRECT_SECONDS);
  const intervalRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    intervalRef.current = setInterval(
      () => setCounter((prev) => prev - 1),
      1000
    );
    return () => clearInterval(intervalRef.current);
  }, []);

  useEffect(() => {
    if (counter <= 0) {
      clearInterval(intervalRef.current);
      navigate(HOME);
    }
  }, [counter, navigate]);

  return (
    <div className={styles.page}>
      <div className={styles.code}>404</div>
      <h1 className={styles.title}>Page not found</h1>
      <p className={styles.description}>
        The page you're looking for doesn't exist or has been moved.
      </p>
      <p className={styles.countdown}>
        Redirecting to home in{" "}
        <span className={styles.counter}>{counter}</span>s…
      </p>
      <Link to={HOME} className={styles.homeLink}>
        Take me home now →
      </Link>
    </div>
  );
}

export default ErrorPage;
