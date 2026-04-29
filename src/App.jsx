import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { TrackPage } from "./Pages/TrackPage";
import { LandingPage } from "./Pages/LandingPage";
import { PageLayout } from "./Pages/PageLayout";
import ErrorPage from "./Pages/ErrorPage";
import DetailPage from "./Pages/DetailPage";
const router = createBrowserRouter([
  {
    path: "/",
    element: <PageLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "/track",
        element: <TrackPage />,
      },
      {
        path: "/track/:recordId",
        element: <DetailPage />,
      },
    ],
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
