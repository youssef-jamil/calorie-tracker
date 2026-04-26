import { Link } from "react-router-dom";

export function LandingPage() {
  return (
    <>
      <h1>Welcome to the Landing Page</h1>
      <Link to="/track">Go to Dashboard</Link>
      <p>This is the landing page of the application.</p>
    </>
  );
}
