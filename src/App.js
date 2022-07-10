import React from "react";
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import "./App.css";
import BookingCar from "./pages/BookingCar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserBookings from "./pages/UserBookings";
import "antd/dist/antd.css";
import AddCar from "./pages/AddCar";
import AdminHome from "./pages/AdminHome";
import EditCar from "./pages/EditCar";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <ProtectedRoutes path="/" exact component={Home} />
        <ProtectedRoutes path="/booking/:carid" exact component={BookingCar} />
        <Route path="/login" exact component={Login} />
        <Route path="/register" exact component={Register} />
        <ProtectedRoutes path="/userbookings" exact component={UserBookings} />
        <ProtectedRoutes path="/addcar" exact component={AddCar} />
        <ProtectedRoutes path="/admin" exact component={AdminHome} />
        <ProtectedRoutes path="/editcar/:carid" exact component={EditCar} />
      </BrowserRouter>
    </div>
  );
};

export default App;

export const ProtectedRoutes = (props) => {
  if (localStorage.getItem("user")) {
    return <Route {...props} />;
  } else {
    return <Redirect to="/login" />;
  }
};
