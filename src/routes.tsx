import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Team from "./pages/Team";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />
  },
  {
    path: "/home",
    element: <Home />
  },
  {
    path: '/team/:league/:season/:team',
    element: <Team />
  }
])

export default router;