import React from "react";
import { Button, Dropdown, Menu, Row, Col } from "antd";
import {Link} from 'react-router-dom';
const DefaultLayout = (props) => {
  const user = JSON.parse(localStorage.getItem("user"));

  const menu = (
    <Menu
      items={[
        {
          key: "1",
          label: <Link to='/'>Home</Link>,
        },
        {
          key: "2",
          label: <Link to='/userbookings'>Bookings</Link>,
        },
        {
          key: "3",
          label: (
            <div
              onClick={() => {
                localStorage.removeItem("user");
                window.location.href = "/login";
              }}
            >
              <li>Logout</li>
            </div>
          ),
        },
      ]}
    />
  );

  return (
    <div>
      <div className="header bs1">
        <Row gutter={16} justify="center">
          <Col lg={20} sm={24} xs={24}>
            <div className="d-flex justify-content-between">
              <h1><b><Link to='/' style={{color:'orangered'}}>Fast 24</Link></b></h1>
              <Dropdown overlay={menu} placement="bottom">
                <Button>{user.username}</Button>
              </Dropdown>
            </div>
          </Col>
        </Row>
      </div>
      <div className="content">{props.children}</div>
    </div>
  );
};

export default DefaultLayout;
