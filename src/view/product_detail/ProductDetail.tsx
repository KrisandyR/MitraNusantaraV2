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
import { login, logout, authSelector } from "../../redux/auth.reducer";
import { useDispatch, useSelector } from "react-redux";
import { RouteComponentProps, useHistory, useParams } from "react-router-dom";
import { IFacility, IHotel, IHotelRoom } from "../../interfaces";
import loadingGif from "../../assets/loading.gif";
import bgimg from "../../assets/search-page-bg.jpg";
// import { hotels } from "../../constants";
import ProductCard from "../../component/product_card/ProductCard";
import { consumers } from "stream";
import axios from "axios";
import RoomCard from "./components/room_card/RoomCard";
import StarRating from "./components/star_rating/StarRating";

interface IHotelParams {
  hotelId: string;
}

const ProductDetail = () => {
  const { hotelId } = useParams<IHotelParams>();
  const [hotels, setHotels] = useState<IHotel>();
  const [rooms, setRooms] = useState<IHotelRoom[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isNotFound, setIsNotFound] = useState<boolean>(false);

  const fetchHotel = async () => {
    try {
      const res = await axios.get(
        `https://localhost:7103/api/hotel/${hotelId}`
      );
      await setHotels(res.data.hotel);
      await setRooms(res.data.room);
      // add validation for params hotelId not found
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    console.log("first run");
    fetchHotel();
  }, []);

  useEffect(() => {
    console.log(rooms);
    console.log(hotels);
    if (rooms.length > 0 && !!hotels) {
      setIsLoading(false);
      console.log("there is ROOMS and HOTELS !");
    }
  }, [rooms, hotels]);

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

  return (
    <Fragment>
      <div className="prod-detail-page">
        <div className="rooms-section-wrapper">
          {isLoading && (
            <div className="rooms-loading-wrapper">
              <Image
                width={150}
                height={150}
                src={loadingGif}
                className="rooms-loading-img"
              />
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
          {!isLoading &&
            rooms.map((room, roomIdx) => {
              return (
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
              );
            })}
        </div>
      </div>
    </Fragment>
  );
};

// mapStateToProps here if needed

// mapDispatchToProps here if needed

export default ProductDetail;
