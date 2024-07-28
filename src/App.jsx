import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Product from "./pages/Product";
import EditProduct from "./pages/EditProduct";
import NewCellphone from "./pages/NewCellphone";
import { useSelector } from "react-redux";
import Logs from "./pages/Logs";
import ErrorPage from "./pages/ErrorPage";

function App() {
  const user = useSelector((state) => state.user);

  const ProtectedRoute = ({ children }) => {
    if (!user.token) {
      return <Navigate to="/login" />;
    }
    return children ? children : <Outlet />;
  };

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<ProtectedRoute />}>
          <Route index element={<Home />} />
          <Route path="/cellphones/:id" element={<Product />} />
          <Route path="/edit/:id" element={<EditProduct />} />
          <Route path="/add/" element={<NewCellphone />} />
          <Route path="/logs" element={<Logs />} />
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </>
    )
  );

  return <RouterProvider router={router} />;
}
export default App;
