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
import "./Cart.scss";
import { login, logout, authSelector } from "../../redux/auth.reducer";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { ICart, IHotel } from "../../interfaces";
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

const Cart = () => {
  const [carts, setCarts] = useState<ICart[]>([]);
  const auth = useSelector(authSelector);

  const getCartFromLocalStorage = (): ICart[] => {
    const cartJSON = localStorage.getItem("cart");
    if (cartJSON) {
      console.log(JSON.parse(cartJSON));
      return JSON.parse(cartJSON);
    } else {
      return [];
    }
  };

  const deleteCartItemToLocalStorage = async (item: ICart, idx: number) => {
    // Retrieve existing cart array from localStorage
    const cartJSON = localStorage.getItem("cart");
    let cart: ICart[] = [];
    if (cartJSON) {
      cart = JSON.parse(cartJSON);
    }
    // Push the new item to the cart array
    cart = cart.filter((cart, cartIdx) => cartIdx !== idx);
    console.log(cart);
    // Save the updated cart array back to localStorage
    await localStorage.setItem("cart", JSON.stringify(cart));
    await setCarts(cart);
  };

  const postTransaction = async (cartItem: ICart, total: number) => {
    try {
      let requestBody = {
        userId: auth.userId,
        hotelId: cartItem.hotelId,
        startDate: cartItem.startDate,
        endDate: cartItem.endDate,
        room: cartItem.room.map((room, idx) => {
          return {
            roomId: room.roomId,
            dayOrNight: room.dayOrNight,
          };
        }),
      };
      const res = await axios.post(`https://localhost:7103/api/transaction/insert`, requestBody);
      console.log(res)
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setCarts(getCartFromLocalStorage);
  }, []);

  const submitOrder = (cartItem: ICart, total: number, cartIdx: number) => {
    deleteCartItemToLocalStorage(cartItem, cartIdx);
    postTransaction(cartItem, total);
  };

  return (
    <Fragment>
      <div className="cart-main-page">
        <div className="cart-wrapper">
          <h3 className="cart-title">Cart</h3>
          {carts.length === 0 && (
            <h6 style={{ margin: "20px 0px" }}>
              There is nothing on the cart yet
            </h6>
          )}
          {carts.length > 0 && (
            <div>
              {carts.map((item, idx) => {
                let total = 0;
                return (
                  <Fragment>
                    <Card className="cart-item-card">
                      <Row>
                        <Col xs={12} className="cart-title-name">
                          {item.hotelName}
                        </Col>
                      </Row>
                      {item.room.map((room, roomIdx) => {
                        total = total + room.roomPrice * room.dayOrNight;
                        return (
                          <Fragment>
                            <Row>
                              <Col xs={1}>{room.dayOrNight}x</Col>
                              <Col xs={6}>{room.roomName}</Col>
                              <Col xs={4}>
                                Rp.{" "}
                                {(room.roomPrice * room.dayOrNight).toString()}
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

                    <div className="purchase-btn-container">
                      <Button
                        className="purchase-btn"
                        type="submit"
                        onClick={() => {
                          submitOrder(item, total, idx);
                        }}
                      >
                        Purchase
                      </Button>
                    </div>
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

export default Cart;
