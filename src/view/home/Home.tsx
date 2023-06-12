
import React, { Component, Fragment, useEffect, useState } from "react";
import Image from "react-bootstrap/Image";
import "./Home.scss";
import { Card, Col, Row } from "react-bootstrap";
import { placeholderProductPage, placeholderProductPageTwo } from "./constants";
import searchbarbg from "../../assets/search-bar-bg.jpg";
import star from "../../assets/star.png";
import { Link } from "react-router-dom";

const useWindowSize = () => {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    // Handler to call on window resize
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

const Home = () => {

  const windowSize = useWindowSize();

  const renderFirstRow = () => {
    const marginBottom = windowSize.width > 1200 ? 80 : 30;
    return (
      <Fragment>
        <div style={{ marginBottom: marginBottom, marginTop: "25px" }}>
          <div className="product-row-header d-flex justify-content-between align-items-center mb-3">
            <p className="product-row-title m-0">Most popular attractions</p>
            <div className="px-4 py-2 product-row-sm-btn">Show More</div>
          </div>
          <div className="row-1-container">
            {placeholderProductPage.map((prd, prdIdx) => {
              const imgWidth = windowSize.width > 1200 ? 350 : 250;
              const imgHeight = windowSize.width > 1200 ? 218.75 : 156.25;
              return (
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
                        {prd.regency}, {prd.city}
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
              );
            })}
          </div>
        </div>
      </Fragment>
    );
  };

  const renderSecondRow = () => {
    const marginBottom = windowSize.width > 1200 ? 80 : 30;
    return (
      <Fragment>
        <div style={{ marginBottom: marginBottom }}>
          <div className="product-row-header d-flex justify-content-between align-items-center mb-3">
            <p className="product-row-title m-0">
              Accomodations you might like
            </p>
            <div className="px-4 py-2 product-row-sm-btn">Show More</div>
          </div>
          <div className="row-1-container">
            {placeholderProductPageTwo.map((prd, prdIdx) => {
              const imgWidth = windowSize.width > 1200 ? 350 : 250;
              const imgHeight = windowSize.width > 1200 ? 218.75 : 156.25;
              return (
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
                        {prd.regency}, {prd.city}
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
              );
            })}
          </div>
        </div>
      </Fragment>
    );
  };

  const renderThirdRow = () => {
    const marginBottom = windowSize.width > 1200 ? 80 : 30;
    return (
      <Fragment>
        <div style={{ marginBottom: marginBottom }}>
          <div className="product-row-header d-flex justify-content-between align-items-center mb-3">
            <p className="product-row-title m-0">
              Accomodations you might like
            </p>
            <div className="px-4 py-2 product-row-sm-btn">Show More</div>
          </div>
          <div className="row-1-container">
            {placeholderProductPageTwo.map((prd, prdIdx) => {
              const imgWidth = windowSize.width > 1200 ? 350 : 250;
              const imgHeight = windowSize.width > 1200 ? 218.75 : 156.25;
              return (
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
                        {prd.regency}, {prd.city}
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
              );
            })}
          </div>
        </div>
      </Fragment>
    );
  };

  const renderPacketRow = () => {
    const marginBottom = windowSize.width > 1200 ? 80 : 30;
    return (
      <Fragment>
        <div
          style={{ marginBottom: marginBottom }}
          className="d-flex flex-column"
        >
          <div className="product-row-header d-flex justify-content-between align-items-center mb-3">
            <p className="product-row-title m-0">Vacation trips to enjoy</p>
            <div className="px-4 py-2 product-row-sm-btn">Show More</div>
          </div>
          <div className="row-1-container">
            {placeholderProductPageTwo.map((prd, prdIdx) => {
              const imgWidth = windowSize.width > 1200 ? 350 : 250;
              const imgHeight = windowSize.width > 1200 ? 218.75 : 156.25;
              return (
                <Link to={"/packet"} style={{textDecoration: "none", color:"black"}}>
                  <div className="product-card product-card-relative-item">
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
                          Labuan Bajo Beach Hopping Trip
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
                    <div className="product-card-absolute-item">
                      3 Days, 2 Nights
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </Fragment>
    );
  };

  const searchBlockHeight = windowSize.width > 1200 ? 400 : 250;
  const searchBarPadding = windowSize.width > 1200 ? "20%" : "10%";

  return (
    <Fragment>
      <div className="search-block-container">
        <img
          src={searchbarbg}
          alt=""
          className="search-block-img"
          style={{ height: searchBlockHeight }}
        />
        <div className="search-block-back-layer"></div>
        <div className="search-block-front-layer">
          <p
            className={
              "search-title" + (windowSize.width > 1200 ? "" : "-small")
            }
          >
            Where do you want to go?
          </p>
          <div
            className="search-container"
            style={{
              paddingLeft: searchBarPadding,
              paddingRight: searchBarPadding,
            }}
          >
            <input
              type="text"
              className="search-bar"
              placeholder="Search here ... "
            />
          </div>
        </div>
      </div>
      <div className={"home-page" + (windowSize.width > 1200 ? "" : "-small")}>
        {renderFirstRow()}
        {renderPacketRow()}
        {renderSecondRow()}
      </div>
    </Fragment>
  );
};

// mapStateToProps here if needed

// mapDispatchToProps here if needed

export default Home;
