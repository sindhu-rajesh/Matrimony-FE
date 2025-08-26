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
// import Favorites from "../pages/Dashboard/User/Favorites";
import MyContactRequest from "../pages/Dashboard/User/MyContactRequest";
import GotMarried from "../pages/Dashboard/User/GotMarried";

import ManageUsers from "../pages/Dashboard/Admin/ManageUsers";
import ApprovedPremium from "../pages/Dashboard/Admin/ApprovedPremium";
import ApproveContactRequest from "../pages/Dashboard/Admin/ApproveContactRequest";
import AdminSuccessStory from "../pages/Dashboard/Admin/AdminSuccessStory";
import AdminHeroSection from "../pages/Dashboard/Admin/AdminHeroSection";
// import NewProfiles from "../pages/Dashboard/Admin/AdminNewRegister";
import NewRegistration from "../pages/Dashboard/Admin/AdminNewRegister";
import MembershipPlan from "../pages/Dashboard/Admin/AdminMembershipPlan";
import PaymentDetails from "../pages/Dashboard/Admin/AdminPaymentsDetails";
import AboutUsAdmin from "../pages/Dashboard/Admin/AdminAbout";
import ContactAdmin from "../pages/Dashboard/Admin/AdminContact";

import Dashboard from "../pages/Dashboard/Dashboard";

import AboutUs from "../pages/AboutUs";
import Matches from "../pages/Matchpage";
import Search from "../pages/Search";
import Plans from "../pages/PaymentsPlans";
import Contact from "../pages/ContactPage";

import AllBiodatas from "../pages/Biodatas/AllBiodatas";
import BiodataDetails from "../pages/Biodatas/BiodataDetails";
import PaymentPlans from "../pages/PaymentsPlans";
import Profile from "../pages/ProfilePage";

export const AppRoutes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <LandingPage /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "about", element: <AboutUs /> },
      { path: "matches", element: <Matches /> },
      { path: "search", element: <Search /> },
      { path: "plans", element: <Plans /> },
      { path: "contact", element: <Contact /> },
      { path: "biodatas", element: <AllBiodatas /> },
      {
        path: "biodata-details/:id",
        element: (
          <PrivateRoute>
            <BiodataDetails />
          </PrivateRoute>
        ),
      },
      { path: "profile/:id", element: <Profile /> },
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
      // Dashboard home with nested sub-routes
      {
        path: "home",
        element: <Dashboard />, // must contain <Outlet />
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
          {
            path: "new-registration",
            element: (
              <AdminRoute>
                <NewRegistration />
              </AdminRoute>
            ),
          },
          {
            path: "membership-plan",
            element: (
              <AdminRoute>
                <MembershipPlan />
              </AdminRoute>
            ),
          },
          {
            path: "payment-details",
            element: (
              <AdminRoute>
                <PaymentDetails />
              </AdminRoute>
            ),
          },
        ],
      },
      // Admin pages directly under dashboard
      {
        path: "aboutus",
        element: (
          <AdminRoute>
            <AboutUsAdmin />
          </AdminRoute>
        ),
      },
      {
        path: "contactus",
        element: (
          <AdminRoute>
            <ContactAdmin />
          </AdminRoute>
        ),
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
      { path: "my-contact-request", element: <MyContactRequest /> },
      // { path: "favourites", element: <Favorites /> },
      { path: "got-married", element: <GotMarried /> },
    ],
  },
]);



