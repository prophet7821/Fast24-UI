import axios from "axios";
import { message } from "antd";
export const bookCar = (reqObj) => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });

  try {
    await axios.post("https://passport-fast-24.herokuapp.com/api/bookings/bookcar", reqObj);
    dispatch({ type: "LOADING", payload: false });
    message.success("Your car booked sucessfully");
    setTimeout(() => {
      window.location.href="/userbookings";
    },500);
    
  } catch (error) {
    console.log(error);
    dispatch({ type: "LOADING", payload: false });
    message.error("Something went wrong.Please try later");
  }
};

export const getAllBookings = () => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });

  try {
    const response = await axios.get(
      "https://passport-fast-24.herokuapp.com/api/bookings/getAllBookings"
    );
    dispatch({ type: "GET_ALL_BOOKINGS", payload: response.data });
    dispatch({ type: "LOADING", payload: false });
  } catch (error) {
    console.log(error);
    dispatch({ type: "LOADING", payload: false });
 
    
  }
};
