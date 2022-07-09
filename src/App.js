import React from "react";
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import "./App.css";
import BookingCar from "./pages/BookingCar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import "antd/dist/antd.css";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <ProtectedRoutes path="/" exact component={Home} />
        <ProtectedRoutes path="/booking/:carid" exact component={BookingCar} />
        <Route path="/login" exact component={Login} />
        <Route path="/register" exact component={Register} />
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
