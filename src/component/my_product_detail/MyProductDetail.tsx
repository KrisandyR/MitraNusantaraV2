import React, { useState, useEffect } from "react";
import { IParamID } from "../../config/interfaces";
import { useParams } from "react-router-dom";
import { IMyProduct } from "../../config/interfaces";
import star_img from "../../assets/star.png";
import star_coin_img from "../../assets/star-coin.png";
import "./MyProductDetail.css";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addBalance, balanceSelector } from "../../config/balanceReducer";
import { removeProduct, myProductSelector } from "../../config/myProductReducer";

const MyProductDetail = () => {
  const productInitState = {
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

  const { id } = useParams<IParamID>();
  const [product, setProduct] = useState<IMyProduct>(productInitState);
  const [productStatus, setProductStatus] = useState(false)
  const [sellStatus, setSellStatus] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const balance = useSelector(balanceSelector);
  const myProduct = useSelector(myProductSelector);

  useEffect(() => {
    const getProduct = async () => {
        let idPure = id?.replace("my-product", "")
        idPure = id?.replace(":", "")
        myProduct.product.map((item:IMyProduct) => {
            if(idPure?.match(item.transaction_id.toString())){
                setProduct(item)
                setProductStatus(true)
            }
        })
    };
    getProduct();
  }, [id, myProduct.product]);

  const sellProduct = (e: IMyProduct) => {
    dispatch(addBalance(e.price));
    dispatch(removeProduct(e));
    setSellStatus(true);
  };

  const disableSellStatus = () => {
    setSellStatus(false)
    window.location.href = "/my-product"
  }

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
          <button className="pd-btn-buy" onClick={() => sellProduct(product)}>
            Sell
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

  const ProductSellStatus = () => {
    return (
      <div className="product-buy-status">
        <div className="product-outer-2"></div>
        <div className="buy-status-card">
          <div className="buy-status-container">
            <div className="buy-status-text">
              <h2 className="success-status">SUCCESS</h2>
              <p className="success-desc">{product.title} was sold succesfully</p>
              <h2 className="balance-status">Your Current Balance : {balance.value.toFixed(2)}</h2>
            </div>
            <div className="buy-status-btn-container">
              <button className="buy-status-btn" onClick={disableSellStatus}>
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
          {productStatus ? (
            <ShowProduct />
          ) : (
            <ShowNotFound />
          )}
        </div>
        <button className="pd-btn-close" onClick={() => history.goBack()}>
          X
        </button>
      </div>
      {sellStatus ? <ProductSellStatus /> : <></>}
    </div>
  );
};

export default MyProductDetail;
