//  Region Import External Lib (e.g React, Reactstrap, etc)
import React, { Component, Fragment, useEffect, useState } from "react";
//  Region Import Constants

//  Region Import Interfaces

//  Region Import Redux Action Type and Redux Action

//  Region Import Utility/Helper Function

//  Region Import Components

//  Region Import Assets

//  Region Import Style
import "./Packet.scss";
import labuangbajo from "../../assets/labuan-bajo.png";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { placeholderProductPageTwo } from "../home/constants";
import { placeholderProduct } from "./constants";
import Image from "react-bootstrap/Image";
import star from "../../assets/star.png";

const useWindowSize = () => {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  });
  
  

  useEffect(() => {
    // Handler to call on window resize
    window.scrollTo(0, 0);
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    // Add event listener
    window.addEventListener("resize", handleResize);
    // Call handler right away so state gets updated with initial window size
    handleResize();
    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount
  return windowSize;
};

const Packet = () => {
  const windowSize = useWindowSize();
  const packetHeight = windowSize.width > 1200 ? 400 : 200;
  const packetPadding = windowSize.width > 1200 ? "20%" : "10%";
  const marginBottom = windowSize.width > 1200 ? 80 : 30;

  return (
    <Fragment>
      <div className={"home-page" + (windowSize.width > 1200 ? "" : "-small")}>
        <div className="packet-block-container">
          <img
            src={labuangbajo}
            alt=""
            className="packet-block-img"
            style={{ height: packetHeight }}
          />
          <div className="packet-block-back-layer"></div>
          <div className="packet-block-front-layer">
            <p
              className={
                "packet-title" + (windowSize.width > 1200 ? "" : "-small")
              }
              style={{ marginBottom: "5px" }}
            >
              Labuan Bajo Beach Hopping Trip
            </p>
            <p
              className={
                "packet-subtitle" + (windowSize.width > 1200 ? "" : "-small")
              }
              style={{ marginTop: "0px", marginBottom: "20px" }}
            >
              3 Days 2 Nights
            </p>
          </div>
        </div>
        <div
          style={{ marginBottom: marginBottom, marginTop: "60px" }}
          className="d-flex flex-column"
        >
          <div className="product-row-header d-flex justify-content-between align-items-center mb-3">
            <p className="product-row-title m-0">Accomodations</p>
          </div>
          <div className="row-1-container">
            {placeholderProduct.map((prd, prdIdx) => {
              const imgWidth = windowSize.width > 1200 ? 350 : 250;
              const imgHeight = windowSize.width > 1200 ? 218.75 : 156.25;
              return (
                <Link
                  to={"/packet"}
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <div className="product-card">
                    <Card>
                      <div>
                        <Image
                          width={imgWidth}
                          height={imgHeight}
                          src={prd.img}
                        />
                      </div>
                      <div className="p-3">
                        <p
                          className={
                            "prdct-title" +
                            (windowSize.width > 1200 ? "" : "-small")
                          }
                        >
                          {prd.title}
                        </p>
                        <p
                          className={
                            "prdct-location" +
                            (windowSize.width > 1200 ? "" : "-small")
                          }
                        >
                          Labuan Bajo
                        </p>

                        <div className="d-flex align-items-center">
                          <Image width={20} height={20} src={star} />
                          <span
                            className={
                              "prdct-rating" +
                              (windowSize.width > 1200 ? "" : "-small")
                            }
                          >
                            {prd.rating} ({prd.ratingCount})
                          </span>
                        </div>

                        <p
                          className={
                            "prdct-price" +
                            (windowSize.width > 1200 ? "" : "-small")
                          }
                        >
                          Rp. {prd.price}
                        </p>
                      </div>
                    </Card>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
        <div
          style={{ marginBottom: marginBottom }}
          className="d-flex flex-column"
        >
          <div className="product-row-header d-flex justify-content-between align-items-center mb-3">
            <p className="product-row-title m-0">Activities</p>
          </div>
          <div className="row-1-container">
            {placeholderProduct.map((prd, prdIdx) => {
              const imgWidth = windowSize.width > 1200 ? 350 : 250;
              const imgHeight = windowSize.width > 1200 ? 218.75 : 156.25;
              return (
                <Link
                  to={"/packet"}
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <div className="product-card">
                    <Card>
                      <div>
                        <Image
                          width={imgWidth}
                          height={imgHeight}
                          src={prd.img}
                        />
                      </div>
                      <div className="p-3">
                        <p
                          className={
                            "prdct-title" +
                            (windowSize.width > 1200 ? "" : "-small")
                          }
                        >
                          {prd.title}
                        </p>
                        <p
                          className={
                            "prdct-location" +
                            (windowSize.width > 1200 ? "" : "-small")
                          }
                        >
                          Labuan Bajo
                        </p>

                        <div className="d-flex align-items-center">
                          <Image width={20} height={20} src={star} />
                          <span
                            className={
                              "prdct-rating" +
                              (windowSize.width > 1200 ? "" : "-small")
                            }
                          >
                            {prd.rating} ({prd.ratingCount})
                          </span>
                        </div>

                        <p
                          className={
                            "prdct-price" +
                            (windowSize.width > 1200 ? "" : "-small")
                          }
                        >
                          Rp. {prd.price}
                        </p>
                      </div>
                    </Card>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
        <div
          style={{ marginBottom: marginBottom }}
          className="d-flex flex-column"
        >
          <div className="product-row-header d-flex justify-content-between align-items-center mb-3">
            <p className="product-row-title m-0">Culinary Reccomendation</p>
          </div>
          <div className="row-1-container">
            {placeholderProduct.map((prd, prdIdx) => {
              const imgWidth = windowSize.width > 1200 ? 350 : 250;
              const imgHeight = windowSize.width > 1200 ? 218.75 : 156.25;
              return (
                <Link
                  to={"/packet"}
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <div className="product-card">
                    <Card>
                      <div>
                        <Image
                          width={imgWidth}
                          height={imgHeight}
                          src={prd.img}
                        />
                      </div>
                      <div className="p-3">
                        <p
                          className={
                            "prdct-title" +
                            (windowSize.width > 1200 ? "" : "-small")
                          }
                        >
                          {prd.title}
                        </p>
                        <p
                          className={
                            "prdct-location" +
                            (windowSize.width > 1200 ? "" : "-small")
                          }
                        >
                          Labuan Bajo
                        </p>

                        <div className="d-flex align-items-center">
                          <Image width={20} height={20} src={star} />
                          <span
                            className={
                              "prdct-rating" +
                              (windowSize.width > 1200 ? "" : "-small")
                            }
                          >
                            {prd.rating} ({prd.ratingCount})
                          </span>
                        </div>

                        <p
                          className={
                            "prdct-price" +
                            (windowSize.width > 1200 ? "" : "-small")
                          }
                        >
                          Rp. {prd.price}
                        </p>
                      </div>
                    </Card>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
        <div className="packet-buy-container d-flex flex-column justify-content-center align-items-center">
          <div className="packet-buy-btn">
            Purchase
          </div>
          <h4>Rp. 1,200,000</h4>
        </div>
      </div>
    </Fragment>

    // <div>
    //   tes
    // </div>
  );
};

// mapStateToProps here if needed

// mapDispatchToProps here if needed

export default Packet;
