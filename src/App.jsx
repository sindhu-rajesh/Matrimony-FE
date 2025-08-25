import React from "react";
import { RouterProvider } from "react-router-dom";
import { AppRoutes } from "./Routes/Routes";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function App() {
  return <RouterProvider router={AppRoutes} />;
}

export default App;
