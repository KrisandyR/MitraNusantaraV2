import { Fragment } from "react";
import { IFacility, IHotelRoom } from "../../../../interfaces";
import { Card, Carousel, CarouselItem } from "react-bootstrap";
import { FaBed, FaUser } from "react-icons/fa";
import "./RoomCard.scss";

const RoomCard = (room: IHotelRoom) => {
  const BulletList = (facilites: IFacility[], start: number, end: number) => {
    const limitedGeneralFacility = facilites.slice(start, end);
    return (
      <ul>
        {limitedGeneralFacility.map((item, index) => (
          <li style={{ width: "150px" }} key={index}>
            {item.facilityName}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <Card className="room-card-wrapper">
      <Carousel
        style={{
          width: "350px",
          height: "200px",
          margin: "0px",
          borderRadius: "5px",
          overflow: "hidden",
        }}
        interval={null}
      >
        {room.images.map((img, imgIdx) => {
          return (
            <CarouselItem>
              <img src={img} alt="" className="room-indv-img" />
            </CarouselItem>
          );
        })}
      </Carousel>
      <div className="room-card-detail-wrapper">
        <div className="room-card-info-wrapper">
          <Card.Title className="room-card-info-title">
            {room.roomName}
          </Card.Title>

          <div className="room-capacity-wrapper d-flex">
            <div className="room-bed-container d-flex">
              <FaBed
                style={{ width: "23px", height: "23px", color: "#318CE7" }}
              />
              <p className="capacity-text">{room.bedDesc}</p>
            </div>
            <div className="room-guest-container d-flex">
              <FaUser
                style={{
                  width: "16px",
                  height: "16px",
                  color: "#318CE7",
                  marginTop: "3px",
                }}
              />
              <p className="capacity-text">{room.maxPerson}</p>
            </div>
          </div>
          <hr className="room-divider"></hr>
          <div className="room-facility-container">
            {BulletList(room.facilities, 0, 3)}
            {BulletList(room.facilities, 3, 6)}
            {BulletList(room.facilities, 6, 9)}
          </div>
        </div>
        <div className="room-card-price-wrapper">
            <p className="room-card-price">Rp. {room.price}</p>
            <p className="room-card-price-desc">per Day</p>
        </div>
      </div>
    </Card>
  );
};

export default RoomCard;
