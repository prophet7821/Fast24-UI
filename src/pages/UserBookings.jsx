import React, { useEffect } from "react";
import DefaultLayout from "../components/DefaultLayout";
import { useDispatch, useSelector } from "react-redux";
import { getAllBookings } from "../redux/actions/bookingActions";
import { Row, Col } from "antd";
import Spinner from "../components/Spinner"
const UserBookings = () => {
  const dispatch = useDispatch();
  const { bookings } = useSelector((state) => state.bookingsReducer);
  const {loading} = useSelector(state=>state.alertsReducer);
  const user = JSON.parse(localStorage.getItem("user"))

  useEffect(() => {
    dispatch(getAllBookings());
  },[bookings]);
  return (
    <DefaultLayout>
      {loading && <Spinner/>} 
      <h3 className="text-center">My Bookings</h3>
      <Row justify="center">
        <Col lg={20} sm={24}>
          {bookings.filter(o=>o.user == user._id ).map((booking) => {
            return (
              <Row className="bs1 text-left flex mt-3">
                <Col lg={4} sm={24}>
                  <p>
                    <b>{booking.car.name}</b>
                  </p>
                  <p>
                    Total Hours : <b>{booking.totalHours}</b>
                  </p>
                  <p>
                    Rent Per Hour : <b>{booking.car.rentPerHour}</b>
                  </p>
                  <p>
                    Total Amount : <b>{booking.totalAmount}</b>
                  </p>
                </Col>
                <Col lg={16} sm={24}>
                  <p>
                    Transaction ID:<b>{bookings.transactionId}</b>
                  </p>
                  <p>
                    From:<b>{bookings.bookedTimeSlots.from}</b>
                  </p>
                  <p>
                    To:<b>{bookings.bookedTimeSlots.to}</b>
                  </p>
                  <p>
                    Date of Booking:<b>{bookings.createdAt}</b>
                  </p>
                </Col>
                <Col lg={4} sm={24} className="text-right">
                  <img style ={{borderRadius:5}}src={booking.car.image} height="140" className="p-2" alt=""/>
                </Col>
              </Row>
            );
          })}
        </Col>
      </Row>
    </DefaultLayout>
  );
};

export default UserBookings;
