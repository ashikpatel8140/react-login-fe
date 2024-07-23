import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./App.scss";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import Forgot from "./pages/Forgot/Forgot";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import { store } from "./store";
import Home from "./pages/Home/Home";
import ProtectedRoutes from "./pages/ProtectedRoutes/ProtectedRoutes";
import NotFound from "./components/NotFoundPage/NotFound";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoutes />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />,
      },
    ],
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "signup",
    element: <Signup />,
  },
  {
    path: "forgot",
    element: <Forgot />,
  },
]);

function App() {
  return (
    <>
      <Provider store={store}>
        <RouterProvider router={routes} />
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </Provider>
    </>
  );
}

export default App;

function About() {
  return <div>About</div>;
}

