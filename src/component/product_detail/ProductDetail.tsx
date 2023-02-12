import React, { useState, useEffect } from "react";
import { IParamID } from "../../config/interfaces";
import { useParams } from "react-router-dom";
import axios from "axios";
import { IData } from "../data/Data.interfaces";
import loading from "../../assets/loading.gif";
import star_img from "../../assets/star.png";
import star_coin_img from "../../assets/star-coin.png";
import "./ProductDetail.css";
import { useHistory } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import {
  increment,
  transactionIdSelector,
} from "../../config/transactionIdReducer";
import { subtractBalance, balanceSelector } from "../../config/balanceReducer";
import { addProduct, myProductSelector } from "../../config/myProductReducer";

const ProductDetail = () => {
  const productInitState = {
    id: 0,
    title: "",
    price: 0,
    description: "",
    category: "",
    image: "",
    rating: {
      rate: 0,
      count: 0,
    },
  };

  const { id } = useParams<IParamID>();
  const [product, setProduct] = useState<IData>(productInitState);
  const [loadingStatus, setLoadingStatus] = useState(false);
  const [buyStatus, setBuyStatus] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const balance = useSelector(balanceSelector);
  const myProduct = useSelector(myProductSelector);
  const transactionId = useSelector(transactionIdSelector);

  let productToAdd = {
    transaction_id: 0,
    id: 0,
    title: "",
    price: 0,
    description: "",
    category: "",
    image: "",
    rating: {
      rate: 0,
      count: 0,
    },
  };

  useEffect(() => {
    const getProduct = async () => {
      let idPure = id?.replace("product", "");
      idPure = id?.replace(":", "");

      setLoadingStatus(true);
      const urlToFind = "https://fakestoreapi.com/products/" + idPure;
      const res = await axios.get(urlToFind);

      setProduct(res.data);
      setLoadingStatus(false);
    };
    getProduct();
  }, [id]);

  const buyProduct = (e: IData) => {
    productToAdd.transaction_id = transactionId.transaction_id;
    productToAdd.id = e.id;
    productToAdd.title = e.title;
    productToAdd.price = e.price;
    productToAdd.description = e.description;
    productToAdd.category = e.category;
    productToAdd.image = e.image;
    productToAdd.rating.count = e.rating.count;
    productToAdd.rating.rate = e.rating.rate;

    dispatch(increment());
    dispatch(subtractBalance(e.price));
    dispatch(addProduct(productToAdd));
    setBuyStatus(true);
  };

  const disableBuyStatus = () => {
    setBuyStatus(false)
  }

  const Loading = () => {
    return (
      <div className="loading-container">
        <img src={loading} alt="" className="loading-btn" />
        <h1 className="loading-desc">Loading . . . </h1>
      </div>
    );
  };

  const ShowProduct = () => {
    return (
      <div className="product-detail-container">
        <div className="pd-part pd-info">
          <div className="pd-img-container">
            <img className="pd-img" src={product?.image} alt="" />
            <h2 className="pd-price">
              <img src={star_coin_img} alt="" className="pd-star-coin" />
              {product?.price}
            </h2>
          </div>
          <div className="pd-text-container">
            <h2 className="pd-title">{product?.title}</h2>
            <div className="pd-rating-container">
              <img src={star_img} alt="" className="pd-star-icon" />
              <h5 className="pd-rating">
                {product?.rating.rate.toFixed(2)}({product?.rating.count})
              </h5>
            </div>
            <p className="pd-desc">{product?.description}</p>
          </div>
        </div>
        <div className="pd-part pd-button-container">
          <button className="pd-btn-buy" onClick={() => buyProduct(product)}>
            Buy
          </button>
        </div>
      </div>
    );
  };

  const ShowNotFound = () => {
    return (
      <div className="product-detail-container">
        <h2 className="pd-nf-text">Product Not Found</h2>
      </div>
    );
  };

  const ProductBuyStatus = () => {
    return (
      <div className="product-buy-status">
        <div className="product-outer-2"></div>
        <div className="buy-status-card">
          <div className="buy-status-container">
            <div className="buy-status-text">
              <h2 className="success-status">SUCCESS</h2>
              <p className="success-desc">{product.title} was bought succesfully</p>
              <h2 className="balance-status">Your Current Balance : {balance.value.toFixed(2)}</h2>
            </div>
            <div className="buy-status-btn-container">
              <button className="buy-status-btn" onClick={disableBuyStatus}>
                OK
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="product-sticky">
      <div className="product-detail">
        <div className="product-outer"></div>
        <div className="product-detail-card">
          {loadingStatus ? (
            <Loading />
          ) : product ? (
            <ShowProduct />
          ) : (
            <ShowNotFound />
          )}
        </div>
        <button className="pd-btn-close" onClick={() => history.goBack()}>
          X
        </button>
      </div>
      {buyStatus ? <ProductBuyStatus /> : <></>}
    </div>
  );
};

export default ProductDetail;
