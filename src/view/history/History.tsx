import React, { Fragment, useEffect, useState } from "react";
import {
  Container,
  Form,
  Button,
  Alert,
  Row,
  Col,
  Image,
  Card,
} from "react-bootstrap";
import "./History.scss";
import { login, logout, authSelector } from "../../redux/auth.reducer";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { ICart, IHotel, IHotelRoom } from "../../interfaces";
import loadingGif from "../../assets/loading.gif";
import bgimg from "../../assets/search-page-bg.jpg";
// import { hotels } from "../../constants";
import ProductCard from "../../component/product_card/ProductCard";
import { consumers } from "stream";
import axios from "axios";

interface ICartDetail {
  hotelName: string;
  roomDetails: IRoomDetail[];
}

interface IRoomDetail {
  roomName: string;
  roomPrice: number;
}

interface ITransactionDetail {
  room: IHotelRoom;
  dayOrNight: number;
  finalPrice: number;
}

interface IOrder {
  endDate: Date;
  hotel: IHotel;
  orderDate: Date;
  orderId: string;
  startDate: Date;
  status: string;
  userId: string;
  transactionDetail: ITransactionDetail[];
}

const History = () => {
  const [order, setOrders] = useState<IOrder[]>([]);
  const auth = useSelector(authSelector);

  const fetchData = async () => {
    try {
      const res = await axios.get(
        `https://localhost:7103/api/transaction/${auth.userId}`
      );
      await setOrders(res.data.transaction);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    console.log(order);
  }, [order]);

  return (
    <Fragment>
      <div className="cart-main-page">
        <div className="cart-wrapper">
          <h3 className="cart-title">History</h3>
          {order.length === 0 && (
            <h6 style={{ margin: "20px 0px" }}>
              There is nothing on the history yet
            </h6>
          )}
          {order.length > 0 && (
            <div>
              {order.map((item, idx) => {
                let total = 0;
                return (
                  <Fragment>
                    <Card className="cart-item-card">
                      <Row>
                        <Col xs={12} className="cart-title-name">
                          {item.hotel.hotelName} ({item.status})
                        </Col>
                      </Row>
                      {item.transactionDetail.map((tr, trIdx) => {
                        total = total += tr.room.price * tr.dayOrNight;
                        return (
                          <Fragment>
                            <Row>
                              <Col xs={1}>{tr.dayOrNight}x</Col>
                              <Col xs={6}>{tr.room.roomName}</Col>
                              <Col xs={4}>
                                Rp.{tr.room.price * tr.dayOrNight}
                              </Col>
                            </Row>
                          </Fragment>
                        );
                      })}
                      <Row>
                        <Col xs={12} className="cart-total">
                          Total : {total}
                        </Col>
                      </Row>
                    </Card>
                  </Fragment>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
};

// mapStateToProps here if needed

// mapDispatchToProps here if needed

export default History;
