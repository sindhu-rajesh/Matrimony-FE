import React, { useEffect, useRef, useState } from "react";
import { Outlet, NavLink, useNavigate } from "react-router";
import useRole from "../hooks/UseRole";
import useAuth from "../hooks/useAuth";
import LoadingSpinner from "../components/LoadingSpinner";
import { FaBars, FaTimes, FaChevronDown, FaChevronUp } from "react-icons/fa";

const DashboardLayout = () => {
  const [role, isLoading] = useRole();
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isHomeMenuOpen, setIsHomeMenuOpen] = useState(false); // for home submenu
  const drawerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (drawerRef.current && !drawerRef.current.contains(e.target)) {
        setIsDrawerOpen(false);
      }
    };
    if (isDrawerOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isDrawerOpen]);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const linkClass = ({ isActive }) =>
    isActive
      ? "block text-purple-300 font-semibold"
      : "block hover:text-purple-200";

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen flex flex-col md:flex-row relative">
      {/* Mobile Menu Button */}
      <div className="sticky top-0 left-0 right-0 z-[999] md:hidden bg-[#C2185B] h-14 flex items-center justify-between flex-row-reverse px-4">
        <h2 className="text-xl font-bold text-white">Dashboard</h2>
        <button
          className="text-white text-2xl"
          onClick={() => setIsDrawerOpen((prev) => !prev)}
        >
          {isDrawerOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        ref={drawerRef}
        className={`fixed top-0 left-0 w-64 z-50 bg-[#C2185B]/90 text-white py-15 px-6 mx-auto space-y-4 transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${
          isDrawerOpen ? "translate-x-0" : "-translate-x-full"
        } md:block`}
      >
        <h2 className="text-2xl font-bold mb-6 hidden md:block">Dashboard</h2>
        <nav className="space-y-2">
          {/* Home with Submenu */}
          <div>
            <button
              onClick={() => setIsHomeMenuOpen((prev) => !prev)}
              className="flex items-center justify-between w-full text-left hover:text-purple-200"
            >
              <span>Home</span>
              {isHomeMenuOpen ? <FaChevronUp /> : <FaChevronDown />}
            </button>

            {isHomeMenuOpen && (
              <div className="ml-4 mt-2 space-y-2 text-sm">
                <NavLink
                  to="/dashboard/home/hero-section"
                  className={linkClass}
                >
                  Hero Section
                </NavLink>
                <NavLink
                  to="/dashboard/home/success-story"
                  className={linkClass}
                >
                  Success Story
                </NavLink>
                <NavLink
                  to="/dashboard/home/new-registration"
                  className={linkClass}
                >
                  New Registration Profile
                </NavLink>
                <NavLink
                  to="/dashboard/home/membership-plan"
                  className={linkClass}
                >
                  Membership Plan
                </NavLink>
                <NavLink
                  to="/dashboard/home/payment-details"
                  className={linkClass}
                >
                  Payment Details
                </NavLink>
              </div>
            )}
          </div>

          {/* User routes */}
          {role === "user" && (
            <>
              <NavLink to="/dashboard/edit-biodata" className={linkClass}>
                Edit Biodata
              </NavLink>
              <NavLink to="/dashboard/view-biodata" className={linkClass}>
                View Biodata
              </NavLink>
              <NavLink
                to="/dashboard/my-contact-requests"
                className={linkClass}
              >
                My Contact Request
              </NavLink>
              <NavLink to="/dashboard/favourites" className={linkClass}>
                Favourites Biodata
              </NavLink>
              <NavLink to="/dashboard/got-married" className={linkClass}>
                Got Married
              </NavLink>
            </>
          )}

          {/* Premium routes */}
          {role === "premium" && (
            <>
              <NavLink to="/dashboard/edit-biodata" className={linkClass}>
                Edit Biodata
              </NavLink>
              <NavLink to="/dashboard/view-biodata" className={linkClass}>
                View Biodata
              </NavLink>
              <NavLink to="/dashboard/favourites" className={linkClass}>
                Favourites Biodata
              </NavLink>
              <NavLink to="/dashboard/got-married" className={linkClass}>
                Got Married
              </NavLink>
            </>
          )}

          {/* Admin routes */}
          {role === "admin" && (
            <>
              <NavLink to="/dashboard/manage-users" className={linkClass}>
                Manage Users
              </NavLink>
              <NavLink to="/dashboard/approved-premium" className={linkClass}>
                Approved Premium
              </NavLink>
              <NavLink
                to="/dashboard/approved-contact-request"
                className={linkClass}
              >
                Approved Contact Request
              </NavLink>
              
            </>
          )}

          <button
            onClick={handleLogout}
            className="block text-rose-300 hover:text-white mt-4"
          >
            Logout
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 w-full mx-auto min-h-screen">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
