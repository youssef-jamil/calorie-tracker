import { use } from "react";
import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const REDIRECT_COUNTER = 10;
const INTERVAL_TIME = 1000;
const ERROR_MESSAGE = "404 Not Found";
const ERROR_DESCRIPTION = "Something went wrong...";
const HOME_LINK = "/";
function ErrorPage() {
  const [counter, setCounter] = useState(REDIRECT_COUNTER);

  const handleInterval = useRef();
  const navigate = useNavigate();

  // to redirect to the homepage after 10 seconds

  useEffect(() => {
    if (counter === 0) {
      clearInterval(handleInterval.current);
      navigate(HOME_LINK);
    }
  }, [counter]);

  useEffect(() => {
    handleInterval.current = setInterval(() => {
      setCounter((prev) => prev - 1);
    }, INTERVAL_TIME);

    // to clear the interval when the component unmounts
    return () => clearInterval(handleInterval.current);
  }, []);

  return (
    <>
      <h1>{ERROR_MESSAGE}</h1>
      <p>{ERROR_DESCRIPTION}</p>
      <p>You will be redirected to the homepage in {counter} seconds.</p>
      <p>
        Or Click <Link to={HOME_LINK}>here</Link> to go back to the homepage.
      </p>
    </>
  );
}
export default ErrorPage;
