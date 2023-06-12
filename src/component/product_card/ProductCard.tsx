import React, { Component, Fragment, useEffect, useState } from "react";
import "./ProductCard.scss";
import { IHotel } from "../../interfaces";
import { Card, Image } from "react-bootstrap";
import star from "../../assets/star.png";

const ProductCard = (prod: IHotel) => {
  return (
    <Fragment>
      <Card className="prod-card-wrapper">
        <img src={prod.images[0]} alt="prod-img" className="prod-img" />
        <div className="prod-info-wrapper">
          <div>
            <Card.Title className="prod-title">{prod.hotelName}</Card.Title>
            <Card.Subtitle className="prod-subtitle">{prod.city}</Card.Subtitle>
            <div className="prod-rating-container">
              <Image width={20} height={20} src={star} className="prod-star"/>
              <span className="prod-rating">
                {prod.rating} ({prod.ratingCount})
              </span>
            </div>
          </div>
          <div className="prod-price-container">
            <p className="prod-price-intro">Starts from</p>
            <p className="prod-price">Rp.{prod.minPrice}</p>
          </div>
        </div>
      </Card>
    </Fragment>
  );
};

// mapStateToProps here if needed

// mapDispatchToProps here if needed

export default ProductCard;
