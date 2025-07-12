import { Navigate, useLocation } from "react-router";
import useAuth from "../hooks/useAuth";
import Loading from "../components/loader/Loading";



const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  // console.log(location);
  if (loading) {
    return <Loading/>
  }
  if (user) {
    return children;
  }

  return (
    <Navigate state={location.pathname} to="/login" replace={true}></Navigate>
  );
};

export default PrivateRoute;