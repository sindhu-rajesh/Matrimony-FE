import React from "react";
import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import LandingPage from "../pages/LandingPage";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import DashboardLayout from "../layouts/DashboardLayout";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";

import EditBiodata from "../pages/Dashboard/User/EditBiodata";
import ViewBiodata from "../pages/Dashboard/User/ViewBiodata";
import FavoritesBiodata from "../pages/Dashboard/User/FavoritesBiodata";
import MyContactRequest from "../pages/Dashboard/User/MyContactRequest";
import GotMarried from "../pages/Dashboard/User/GotMarried";

import ManageUsers from "../pages/Dashboard/Admin/ManageUsers";
import ApprovedPremium from "../pages/Dashboard/Admin/ApprovedPremium";
import ApproveContactRequest from "../pages/Dashboard/Admin/ApproveContactRequest";
import AdminSuccessStory from "../pages/Dashboard/Admin/AdminSuccessStory";
import AdminHeroSection from "../pages/Dashboard/Admin/AdminHeroSection";

import Dashboard from "../pages/Dashboard/Dashboard";

import AboutUs from "../pages/AboutUs";
import MatchesPage from "../pages/Matchpage";
import Search from "../pages/Search";
import Plans from "../components/Plan";
import ContactPage from "../pages/ContactPage";
import AllBiodatas from "../pages/Biodatas/AllBiodatas";
import BiodataDetails from "../pages/Biodatas/BiodataDetails";
import PaymentPlans from "../pages/PaymentsPlans";
import ProfilePage from "../pages/ProfilePage";

export const AppRoutes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <LandingPage /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "about", element: <AboutUs /> },
      { path: "matches", element: <MatchesPage /> },
      { path: "search", element: <Search /> },
      { path: "plans", element: <Plans /> },
      { path: "contact", element: <ContactPage /> },
      { path: "biodatas", element: <AllBiodatas /> },
      {
        path: "biodata-details/:id",
        element: (
          <PrivateRoute>
            <BiodataDetails />
          </PrivateRoute>
        ),
      },
      { path: "profile/:id", element: <ProfilePage /> },
      { path: "payment", element: <PaymentPlans /> },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: "home",
        element: <Dashboard />,  // Dashboard component must include <Outlet />
        children: [
          {
            path: "hero-section",
            element: (
              <AdminRoute>
                <AdminHeroSection />
              </AdminRoute>
            ),
          },
          {
            path: "success-story",
            element: (
              <AdminRoute>
                <AdminSuccessStory />
              </AdminRoute>
            ),
          },
        ],
      },
      {
        path: "manage-users",
        element: (
          <AdminRoute>
            <ManageUsers />
          </AdminRoute>
        ),
      },
      {
        path: "approved-premium",
        element: (
          <AdminRoute>
            <ApprovedPremium />
          </AdminRoute>
        ),
      },
      {
        path: "approved-contact-request",
        element: (
          <AdminRoute>
            <ApproveContactRequest />
          </AdminRoute>
        ),
      },
      { path: "edit-biodata", element: <EditBiodata /> },
      { path: "view-biodata", element: <ViewBiodata /> },
      { path: "my-contact-requests", element: <MyContactRequest /> },
      { path: "favourites", element: <FavoritesBiodata /> },
      { path: "got-married", element: <GotMarried /> },
    ],
  },
]);
