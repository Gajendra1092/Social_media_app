import { Navigate, Outlet } from "react-router-dom";
import { useUserContext } from "@/context/AuthContext"; // Adjust the path based on your project structure

const RootLayout = () => {
  const { isAuthenticated } = useUserContext(); // Get actual auth state

  if (!isAuthenticated) {
    return <Navigate to="/sign-in" />;
  }

  return (
    <div>
      <Outlet />
    </div>
  );
};

export default RootLayout;
