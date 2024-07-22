import { createBrowserRouter, Link, RouterProvider } from "react-router-dom";
import "./App.css";
import Home from "./pages/home/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
