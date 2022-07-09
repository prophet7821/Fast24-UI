import React from "react";
import { Button, Dropdown, Menu, Row, Col } from "antd";

const DefaultLayout = (props) => {
  const user = JSON.parse(localStorage.getItem("user"));

  const menu = (
    <Menu
      items={[
        {
          key: "1",
          label: <a href="https://www.antgroup.com">Home</a>,
        },
        {
          key: "2",
          label: <a href="https://www.aliyun.com">Profile</a>,
        },
        {
          key: "3",
          label: <a href="https://www.luohanacademy.com">Bookings</a>,
        },
        {
          key: "4",
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
              <h1>Sam Cars</h1>
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
