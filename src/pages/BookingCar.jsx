import React, { useState, useEffect } from "react";
import DefaultLayout from "../components/DefaultLayout";
import { useSelector, useDispatch } from "react-redux";
import { getAllCars } from "../redux/actions/carsAction";
import {
  Button,
  Row,
  Col,
  Divider,
  DatePicker,
  Checkbox,
  Card,
  Modal,
} from "antd";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import moment from "moment";
import { bookCar } from "../redux/actions/bookingActions";
import StripeCheckout from "react-stripe-checkout";

const { RangePicker } = DatePicker;

const BookingCar = ({ match }) => {
  const { cars } = useSelector((state) => state.carsReducer);
  const { loading } = useSelector((state) => state.alertsReducer);
  const [car, setCar] = useState({});
  const [from, setFrom] = useState();
  const [to, setTo] = useState();
  const [totalHours, setTotalHours] = useState(0);
  const [driver, setDriver] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (cars.length == 0) {
      dispatch(getAllCars());
    } else {
      setCar(cars.find((o) => o._id == match.params.carid));
    }
  }, [cars]);

  const selectTimeSlots = (values) => {
    setFrom(moment(values[0]).format("MM DD YYYY HH:mm"));
    setTo(moment(values[1]).format("MM DD YYYY HH:mm"));
    setTotalHours(values[1].diff(values[0], "hours"));
  };

  

  const onToken = (token) => {
    const reqObj = {
      token,
      user: JSON.parse(localStorage.getItem("user"))._id,
      car: car._id,
      totalHours,
      totalAmount,
      driverRequired: driver,
      bookedTimeSlots: {
        from,
        to,
      },
    };

    dispatch(bookCar(reqObj));
  };
  useEffect(() => {
    setTotalAmount(totalHours * car.rentPerHour);
    if (driver) {
      setTotalAmount(totalAmount + 30 * totalHours);
    }
  }, [driver, totalHours]);

  return (
    <DefaultLayout>
      {loading && <Spinner />}
      <Row
        justify="center"
        className="d-flex align-items-center"
        style={{ minHeight: "90vh" }}
      >
        <Col lg={10} sm={24} xs={24}>
          <img src={car.image} className="carimg2 bs1" alt="" />
        </Col>

        <Col lg={10} sm={24} xs={24} className="text-right">
          <Divider dashed type="horizontal">
            Car-Info
          </Divider>
          <div>
            <p>{car.name}</p>
            <p>{car.rentPerHour} Rent Per Hour</p>
            <p>Fuel:{car.fuelType}</p>
            <p>Capacity:{car.capacity}</p>
          </div>
          <Divider dashed type="horizontal">
            Select Time Slots
          </Divider>
          <RangePicker
            showTime={{ format: "HH:mm" }}
            format="MM DD YYYY HH:mm"
            onChange={selectTimeSlots}
          />
          <br />
          <button
            className="btn1 mt-2"
            onClick={() => {
              setShowModal(true);
            }}
          >
            See Booked Slots
          </button>
          {from && to && (
            <div>
              <p>
                Total Hours:
                <b>{totalHours}</b>
              </p>
              <Checkbox
                onChange={(e) => {
                  if (e.target.checked) {
                    setDriver(true);
                  } else {
                    setDriver(false);
                  }
                }}
              >
                Driver Required
              </Checkbox>

              <h3>
                Total Amount: <b>{totalAmount}</b>
              </h3>
              <StripeCheckout
                shippingAddress
                token={onToken}
                amount={totalAmount * 100}
                stripeKey="pk_test_51LJhJ7SCfwlvAQMZfP44IaY1cAsVKLRkhXmCydPxjfEcZXamLSoawiWGlwL3qvJcxYuQ4yhE98FVQUYafGrfvQ5F00NV03LOwB"
                currency="INR"
              >
                <button className="btn1">Book Now</button>
              </StripeCheckout>
            </div>
          )}
        </Col>
        {car.name && (
          <Modal
            visible={showModal}
            closable={false}
            footer={false}
            title="Booked Time Slots"
          >
            <div className="p-2">
              {car.bookedTimeSlots.map((slot) => {
                return (
                  <button className="btn1 mt-2">
                    {slot.from}-{slot.to}
                  </button>
                );
              })}
              <div className="text-right">
                <button
                  className="btn1"
                  onClick={() => {
                    setShowModal(false);
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          </Modal>
        )}
      </Row>
    </DefaultLayout>
  );
};

export default BookingCar;
