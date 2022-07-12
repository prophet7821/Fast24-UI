import axios from "axios";
import { message } from "antd";

export const userLogin = (reqObj) => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });

  try {
    const response = await axios.post(
      "https://passport-fast-24.herokuapp.com/api/users/login",
      reqObj
    );
    localStorage.setItem("user", JSON.stringify(response.data));
    message.success("Login successful");
    dispatch({ type: "LOADING", payload: false });
    setTimeout(() => {
      window.location.href = "/";
    }, 500);
  } catch (error) {
    console.log(error);
    message.error("Something went wrong");
    dispatch({ type: "LOADING", payload: false });
  }
};

export const userRegister = (reqObj) => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });

  try {
    await axios.post(
      "https://passport-fast-24.herokuapp.com/api/users/register",
      reqObj
    );
    message.success("Registration successful");
    setTimeout(() => {
      window.location.href = "/login";
    }, 500);

    dispatch({ type: "LOADING", payload: false });
  } catch (error) {
    console.log(error);
    dispatch({ type: "LOADING", payload: false });
  }
};
