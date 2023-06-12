import { width } from "@mui/system";
import React, { Component, useState, useEffect, Fragment } from "react";
import { Card } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import { placeholderRecomPage } from "./constants";
import "./RecomPage.scss";
import { IRecomFilter, IRecomPageProduct } from "./interfaces";
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

const Mapping = (product: IRecomPageProduct[]) => {
  const windowSize = useWindowSize();
  const map = product.map((product) =>{
    const imgWidth = windowSize.width > 1200 ? 400 : 250;
              return (
                <div className="product-card">
                  <Card>
                    <div>
                      <Image width={imgWidth} src={product.img} />
                    </div>
                    <div className="p-3">
                      <p
                        className={
                          "prdct-title" +
                          (windowSize.width > 1200 ? "" : "-small")
                        }
                      >
                        {product.title}
                      </p>
                      <p
                        className={
                          "prdct-location" +
                          (windowSize.width > 1200 ? "" : "-small")
                        }
                      >
                        {product.regency}, {product.city}
                      </p>

                      <div className="d-flex align-items-center">
                        <Image width={20} height={20} src={star} /> 
                        <span
                          className={
                            "prdct-rating" +
                            (windowSize.width > 1200 ? "" : "-small")
                          }
                        >
                          {product.rating} ({product.ratingCount})
                        </span>
                      </div>

                      <p
                        className={
                          "prdct-price" +
                          (windowSize.width > 1200 ? "" : "-small")
                        }
                      >
                        Rp. {product.price}
                      </p>
                    </div>
                  </Card>
                </div>
  )});
  return map;
};


const RecommendationPage = () => {
  return (
    <Fragment>
      <div className="border rounded container mt-4 w-50 pt-3">
        <p className="fs-4 fw-semibold">Who are you travelling with?</p>
        <div>
          <div className="d-flex justify-content-start">
            <input
              type={"checkbox"}
              alt="Family-checkbox"
              className="form-check-input mt-2 ms-3"
            />
            <label className="fs-5 fw-light ms-2">Family</label>
            <input
              type={"checkbox"}
              alt="Couple-checkbox"
              className="form-check-input mt-2 ms-3"
            />
            <label className="fs-5 fw-light ms-2">Couple</label>
            <input
              type={"checkbox"}
              alt="Group-checkbox"
              className="form-check-input mt-2 ms-3"
            />
            <label className="fs-5 fw-light ms-2">Group</label>
            <input
              type={"checkbox"}
              alt="Alone-checkbox"
              className="form-check-input mt-2 ms-3"
            />
            <label className="fs-5 fw-light ms-2">Alone</label>
          </div>

          <p className="fs-4 fw-semibold">Budget Range</p>
          <div className="d-flex justify-content-start mt-4 w-100">
            <div className="input-group mb-3 ml-4">
              <p className="fs-6 fw-semibold">MIN</p>
              <div className="d-flex input-group flex-row">
                <span className="input-group-text">Rp.</span>
                <input type={"text"} className="form-control w-25"></input>
              </div>
            </div>

            <div className="mb-3 ms-4 w-100">
              <p className="fs-6 fw-semibold">MAX</p>
              <div className="d-flex input-group flex-row">
                <span className="input-group-text ">Rp.</span>
                <input type={"text"} className="form-control w-25"></input>
              </div>
            </div>
          </div>

          <p className="fs-4 fw-semibold">Package Type</p>
          <div className="d-flex justify-content-start mt-4 w-100">
          <input
              type={"checkbox"}
              alt="Chill-checkbox"
              className="form-check-input mt-2 ms-3"
            />
            <label className="fs-5 fw-light ms-2">Chill</label>
            <input
              type={"checkbox"}
              alt="Relaxing-checkbox"
              className="form-check-input mt-2 ms-3"
            />
            <label className="fs-5 fw-light ms-2">Relaxing</label>
            <input
              type={"checkbox"}
              alt="Packed-checkbox"
              className="form-check-input mt-2 ms-3"
            />
            <label className="fs-5 fw-light ms-2">Packed</label>
          </div>

          <p className="fs-4 fw-semibold mt-3">Local / Tourist</p>
          <div className="d-flex justify-content-start mt-4 w-100 mb-1">
          <input
              type={"checkbox"}
              alt="Local-checkbox"
              className="form-check-input mt-2 ms-3"
            />
            <label className="fs-5 fw-light ms-2">Local</label>
            <input
              type={"checkbox"}
              alt="Tourist-checkbox"
              className="form-check-input mt-2 ms-3"
            />
            <label className="fs-5 fw-light ms-2">Tourist</label>
          </div>

        <div className="d-grid gap-2 d-md-flex justify-content-md-end">
        <button type="button" className="btn btn-primary mb-5 ps-2.5 pe-2.5 pb-1 pt-2"><p className="fs-5 fw-semibold text-center">Apply</p></button>
        </div>


        </div>
      </div>
        <div className="row-1-container ">
          {
            Mapping(placeholderRecomPage)
          }
        </div>
    </Fragment>
  );
};

// mapStateToProps here if needed

// mapDispatchToProps here if needed

export default RecommendationPage;
