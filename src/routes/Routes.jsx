import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Profile from "../components/Profile/Profile";
import DashboardLayout from "../layouts/DashboardLayout";
import Dashboard from "../components/Dashboard/Dashboard";
import AddMeal from "../components/Dashboard/Chef/AddMeal";

import ManageOrder from "../components/Dashboard/Chef/ManageOrder";
import MealDetails from "../pages/MealDeatails/MealDetails";
import PaymentSuccess from "../pages/Payment/PaymentSuccess";
import MyOrder from "../components/Dashboard/User/MyOrder";
import MyInventory from "../components/Dashboard/Chef/MyInventory";
import BecomeASeller from "../components/Dashboard/User/BecomeASeller";
import Statistics from "../components/Dashboard/Statistics";
import ManageUser from "../components/Dashboard/Admin/ManageUser";
import SellerRequest from "../components/Dashboard/Admin/SellerRequest";

import AllMeal from "../pages/AllMeal/AllMeal";

import AboutUs from "../pages/AboutUs/AboutUs";
import SearchPage from "../pages/SearchPage/SearchPage";
import Logo from "../components/Shared/Logo/Logo";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/meal/:id",
        element: <MealDetails></MealDetails>,
      },

      {
        path: "/allmeal",
        element: <AllMeal></AllMeal>,
      },

      {
        path: "/payment-success",
        Component: PaymentSuccess,
      },
      {
        path: "/search",
        element: <SearchPage></SearchPage>,
      },
      {
        path: "/aboutus",
        element: <AboutUs></AboutUs>,
      },
    ],
  },
  {
    path: "/login",
    element: <Login></Login>,
  },

  {
    path: "/register",
    element: <Register></Register>,
  },

  {
    path: "/profile",
    element: <Profile></Profile>,
  },

 {
    path: "/logo",
    element: <Logo></Logo>,
  },


  {
    path: "/dashboard",
    element: <DashboardLayout></DashboardLayout>,
    children: [
      {
        index: true,
        element: <Dashboard></Dashboard>,
      },
      {
        path: "/dashboard/add-meal",
        element: <AddMeal></AddMeal>,
      },
      // {
      //   path: "/dashboard/my-meals",
      //   element: <MyMeals></MyMeals>,
      // },
      {
        path: "/dashboard/statistics",
        element: <Statistics></Statistics>,
      },
      {
        path: "/dashboard/manage-user",
        element: <ManageUser></ManageUser>,
      },

      {
        path: "/dashboard/my-orders",
        element: <MyOrder></MyOrder>,
      },

      {
        path: "/dashboard/seller-request",
        element: <SellerRequest></SellerRequest>,
      },
      {
        path: "/dashboard/become-a-seller",
        element: <BecomeASeller></BecomeASeller>,
      },

      {
        path: "/dashboard/my-inventory",
        element: <MyInventory></MyInventory>,
      },

      {
        path: "/dashboard/manage-orders",
        element: <ManageOrder></ManageOrder>,
      },
{
    path: "/dashboard/profile",
    element: <Profile></Profile>,
  },

    ],
  },
]);
