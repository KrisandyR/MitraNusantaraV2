import React, { Fragment, useEffect, useState } from "react";
import {
  Container,
  Form,
  Button,
  Alert,
  Row,
  Col,
  Image,
  Carousel,
  CarouselItem,
  ListGroup,
} from "react-bootstrap";
import "./ProductDetail.scss";
import {
  login,
  logout,
  authSelector,
} from "../../redux/auth.reducer";
import { useDispatch, useSelector } from "react-redux";
import { RouteComponentProps, useHistory, useParams } from "react-router-dom";
import {
  ICart,
  ICartRoom,
  IFacility,
  IHotel,
  IHotelRoom,
} from "../../interfaces";
import loadingGif from "../../assets/loading.gif";
import bgimg from "../../assets/search-page-bg.jpg";
// import { hotels } from "../../constants";
import ProductCard from "../../component/product_card/ProductCard";
import { consumers } from "stream";
import axios from "axios";
import RoomCard from "./components/room_card/RoomCard";
import StarRating from "./components/star_rating/StarRating";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface IHotelParams {
  hotelId: string;
}

const ProductDetail = () => {
  const { hotelId } = useParams<IHotelParams>();
  const [hotels, setHotels] = useState<IHotel>();
  const [rooms, setRooms] = useState<IHotelRoom[]>([]);
  const [roomsQuantity, setRoomsQuantity] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const auth = useSelector(authSelector);

  const handleStartDateChange = (date: Date | null) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date: Date | null) => {
    setEndDate(date);
  };

  const fetchHotel = async () => {
    try {
      const res = await axios.get(
        `https://localhost:7103/api/hotel/${hotelId}`
      );
      console.log(res)
      await setHotels(res.data.hotel);
      await setRooms(res.data.room);
      // add validation for params hotelId not found
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    console.log("first run");
    fetchHotel();
  }, []);

  useEffect(() => {
    console.log(rooms);
    console.log(hotels);
    if (rooms.length > 0 && !!hotels) {
      setRoomsQuantity(Array.from({ length: rooms.length }, () => 0));
      setIsLoading(false);
      console.log("there is ROOMS and HOTELS !");
    }
  }, [rooms, hotels]);

  useEffect(() => {
    console.log("rooms qty");
    console.log(roomsQuantity);
  }, [roomsQuantity]);

  const generalHotelFacility = (facilites: IFacility[]) => {
    const generalFacility = facilites.filter(
      (fac) => fac.isGeneralFacilities === "YES"
    );
    console.log(generalFacility);
    const limitedGeneralFacility = generalFacility.slice(0, 3);
    console.log(limitedGeneralFacility);
    return (
      <Fragment>
        <hr className="hotel-divider"></hr>
        <ListGroup as="ul">
          {limitedGeneralFacility.map((item, index) => (
            <ListGroup.Item as="li" key={index}>
              {item.facilityName}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Fragment>
    );
  };

  const handleIncrease = (roomIdx: number, qty: number) => {
    const updatedRoomsQuantity = [...roomsQuantity];
    updatedRoomsQuantity[roomIdx] = qty + 1;
    setRoomsQuantity(updatedRoomsQuantity);
  };

  const handleDecrease = (roomIdx: number, qty: number) => {
    if (roomsQuantity[roomIdx] === 0) {
      return;
    }
    const updatedRoomsQuantity = [...roomsQuantity];
    updatedRoomsQuantity[roomIdx] = qty - 1;
    setRoomsQuantity(updatedRoomsQuantity);
  };

  const saveCartItemToLocalStorage = async (item: ICart) => {
    // Retrieve existing cart array from localStorage
    const cartJSON = localStorage.getItem("cart");
    let cart: ICart[] = [];
    if (cartJSON) {
      cart = JSON.parse(cartJSON);
    }
    // Push the new item to the cart array
    cart.push(item);
    console.log(cart);
    // Save the updated cart array back to localStorage
    await localStorage.setItem("cart", JSON.stringify(cart));
  };

  const getCartFromLocalStorage = (): ICart[] => {
    const cartJSON = localStorage.getItem('cart');
    if (cartJSON) {
      console.log(JSON.parse(cartJSON))
      return JSON.parse(cartJSON);
    } else {
      return [];
    }
  };


  const addToCart = () => {
    console.log("add to cart");
    let roomOrdered = 0;
    let cartRooms: ICartRoom[] = [] as ICartRoom[];
    rooms.forEach((room, roomIdx) => {
      if (roomsQuantity[roomIdx] > 0) {
        let cartRoom: ICartRoom = {
          roomId: room.roomId,
          dayOrNight: roomsQuantity[roomIdx],
          roomName: room.roomName,
          roomPrice: room.price
        };
        cartRooms.push(cartRoom);
        roomOrdered = roomOrdered + 1;
      }
    });

    if (roomOrdered === 0) {
      return;
    }
    if (
      !!hotels?.hotelId &&
      startDate !== undefined &&
      startDate !== null &&
      endDate !== undefined &&
      endDate !== null
    ) {
      const cartItem: ICart = {
        hotelId: hotels.hotelId,
        startDate: startDate,
        endDate: endDate,
        room: cartRooms,
        hotelName: hotels.hotelName
      };
      saveCartItemToLocalStorage(cartItem);
      getCartFromLocalStorage();
    }
  };

  return (
    <Fragment>
      <div className="prod-detail-page">
        <div className="rooms-section-wrapper">
          {isLoading && (
            <div className="rooms-loading-wrapper">
              <Image width={150} height={150} src={loadingGif} />
            </div>
          )}
          {!isLoading && (
            <div className="hotel-wrapper">
              <Carousel
                style={{
                  width: "700px",
                  height: "450px",
                  margin: "0px",
                  borderRadius: "20px",
                  overflow: "hidden",
                }}
              >
                {hotels?.images.map((img, imgIdx) => {
                  return (
                    <CarouselItem>
                      <img src={img} alt="" className="rooms-loading-img" />
                    </CarouselItem>
                  );
                })}
              </Carousel>

              {hotels && (
                <div className="hotel-info-wrapper">
                  <h1>{hotels.hotelName}</h1>
                  <StarRating
                    rating={hotels.rating}
                    ratingCount={hotels.ratingCount}
                  />
                  <hr className="hotel-divider"></hr>
                  <div className="hotel-address">{hotels.address}</div>
                  {generalHotelFacility(hotels.facilities)}
                </div>
              )}
            </div>
          )}
          {!isLoading && (
            <Fragment>
              {rooms.map((room, roomIdx) => {
                return (
                  <Fragment>
                    <RoomCard
                      roomId={room.roomId}
                      hotelId={room.hotelId}
                      roomName={room.roomName}
                      price={room.price}
                      maxPerson={room.maxPerson}
                      bedDesc={room.bedDesc}
                      facilities={room.facilities}
                      images={room.images}
                    />
                    <div className="input-qty-wrapper">
                      <div className="input-qty-container">
                        <Button
                          variant="primary"
                          onClick={() => {
                            handleDecrease(roomIdx, roomsQuantity[roomIdx]);
                          }}
                        >
                          -
                        </Button>
                        <Form.Control
                          type="number"
                          value={roomsQuantity[roomIdx].toString()}
                          readOnly
                        />
                        <Button
                          variant="primary"
                          onClick={() => {
                            handleIncrease(roomIdx, roomsQuantity[roomIdx]);
                          }}
                        >
                          +
                        </Button>
                      </div>
                    </div>
                  </Fragment>
                );
              })}
              <div className="hotel-date-row">
                <Form.Group className="hotel-date-input">
                  <Form.Label>Start Date:</Form.Label>
                  <DatePicker
                    selected={startDate}
                    onChange={handleStartDateChange}
                    selectsStart
                    startDate={startDate}
                    endDate={endDate}
                    className="form-control"
                  />
                </Form.Group>

                <Form.Group className="hotel-date-input">
                  <Form.Label>End Date:</Form.Label>
                  <DatePicker
                    selected={endDate}
                    onChange={handleEndDateChange}
                    selectsEnd
                    startDate={startDate}
                    endDate={endDate}
                    minDate={startDate}
                    className="form-control"
                  />
                </Form.Group>
              </div>

              <div className="hotel-cart-row">
                {!auth.isLoggedIn && (
                  <p className="add-cart-warning">
                    Please register to purchase items
                  </p>
                )}
                {auth.isLoggedIn &&
                  (startDate === null || endDate === null) && (
                    <p className="add-cart-warning">
                      Please input start and end date
                    </p>
                  )}
                <Button
                  className="add-cart-btn"
                  type="submit"
                  disabled={
                    auth.isLoggedIn && !!startDate && !!endDate ? false : true
                  }
                  onClick={addToCart}
                >
                  Add to Cart
                </Button>
              </div>
            </Fragment>
          )}
        </div>
      </div>
    </Fragment>
  );
};

// mapStateToProps here if needed

// mapDispatchToProps here if needed

export default ProductDetail;
