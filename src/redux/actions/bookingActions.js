import axios from "axios";
import { message } from "antd";
export const bookCar = (reqObj) => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });

  try {
    const response = await axios.post(
      "http://localhost:5000/api/bookings/bookcar",reqObj
    );
    dispatch({ type: "LOADING", payload: false });
    message.success("Your car booked sucessfully");
  } catch (error) {
    console.log(error);
    dispatch({ type: "LOADING", payload: false });
    message.error("Something went wrong.Please try later");
  }
};
