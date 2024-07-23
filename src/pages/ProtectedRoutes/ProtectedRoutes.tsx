import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { setUser } from "../../features/user/userSlice";
import { Navigate, Outlet } from "react-router-dom";

interface ProtectedRoutesProps {}

const ProtectedRoutes: React.FC<ProtectedRoutesProps> = () => {
  const user = useSelector((state: RootState) => state.user.token); // Assuming 'token' is in 'user' state
  const dispatch = useDispatch();

  // Retrieve token from localStorage (optional, for persistence)
  let token;
  try {
    let localStorageToken: any = JSON.parse(`${localStorage.getItem("user")}`);
    if (localStorageToken) {
      token = localStorageToken.token;
      dispatch(setUser(localStorageToken));
    }
  } catch (error) {
    console.error("Error parsing localStorage data:", error);
    // Consider redirecting to login or handling the error gracefully
  }

  // Check if token exists in either state or localStorage
  const hasToken = user || token; // Access 'token' property within localStorage object (if parsed)

  return hasToken ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
