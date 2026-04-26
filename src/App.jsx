import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { TrackPage } from "./Pages/TrackPage";
import { LandingPage } from "./Pages/LandingPage";
import { PageLayout } from "./Pages/PageLayout";
const router = createBrowserRouter([
  {
    path: "/",
    element: <PageLayout />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "/track",
        element: <TrackPage />,
      },
    ],
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
