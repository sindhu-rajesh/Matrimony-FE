import React from "react";
import { Outlet } from "react-router-dom";
import UserHome from "./User/UserHome";
import AdminHome from "./Admin/AdminHome";
import useRole from "../../hooks/UseRole";
import LoadingSpinner from "../../components/LoadingSpinner";

const Dashboard = () => {
  const [role, isLoading] = useRole();

  if (isLoading) return <LoadingSpinner />;

  return (
    <div>
      {/* Conditionally render UserHome or AdminHome based on role */}
      {role === "user" || role === "premium" ? (
        <UserHome />
      ) : role === "admin" ? (
        <>
          <AdminHome />
          {/* Outlet renders nested routes like hero-section, success-story */}
          <Outlet />
        </>
      ) : (
        <p className="text-center mt-10 text-red-500">Invalid user role.</p>
      )}
    </div>
  );
};

export default Dashboard;




