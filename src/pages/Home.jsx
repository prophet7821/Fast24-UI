import React, { useState, useEffect } from "react";
import DefaultLayout from "../components/DefaultLayout";
import { useSelector, useDispatch } from "react-redux";
import { getAllCars } from "../redux/actions/carsAction";
import { Button, Row, Col, Divider, DatePicker, Checkbox, Card } from "antd";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import moment from "moment";
const { RangePicker } = DatePicker;

const Home = () => {
  const { cars } = useSelector((state) => state.carsReducer);
  const { loading } = useSelector((state) => state.alertsReducer);
  const [totalCars, setTotalCars] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCars());
  }, []);

  useEffect(() => {
    setTotalCars(cars);
  }, [cars]);

  const setFilter = (values) => {
    var temp = [];
    var selectedFrom = moment(values[0], "MMM DD YYYY HH:mm");
    var selectedTo = moment(values[1], "MMM DD YYYY HH:mm");
    for (var car of cars) {
      if (car.bookedTimeSlots.length == 0) {
        temp.push(car);
      } else {
        for (var booking of car.bookedTimeSlots) {
          if (
            selectedFrom.isBetween(booking.from, booking.to) ||
            selectedTo.isBetween(booking.from, booking.to) ||
            moment(booking.from).isBefore(selectedFrom, selectedTo) ||
            moment(booking.to).isBefore(selectedFrom, selectedTo)
          ) {
          } else temp.push(car);
        }
      }
    }
    setTotalCars(temp);
  };

  return (
    <DefaultLayout>
      <Row className="mt-3" justify="center">
        <Col lg={20} sm={24} className=" d-flex text-left">
          <RangePicker
            showTime={{ format: "HH:mm" }}
            format="MM DD YYYY HH:mm"
            onChange={setFilter}
          />
        </Col>
      </Row>

      {loading && <Spinner />}
      <Row justify="center" gutter={16} className="">
        {totalCars.map((car) => {
          return (
            <Col lg={5} sm={24} xs={24}>
              <div className="car p-2 bs1">
                <img src={car.image} className="carimg" alt="carimg" />
                <div className="car-content d-flex align-items-center justify-content-between">
                  <div>
                    <p>{car.name}</p>
                    <p>{car.rentPerHour}</p>
                  </div>
                  <div>
                    <button className="btn1 mr-2">
                      <Link to={`/booking/${car._id}`}>Book Now</Link>
                    </button>
                  </div>
                </div>
              </div>
            </Col>
          );
        })}
      </Row>
    </DefaultLayout>
  );
};

export default Home;
