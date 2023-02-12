import React, { useState } from "react";
import { Link } from "react-router-dom";
import grid from "../../assets/grid.png";
import list from "../../assets/list.png";
import { IMyProduct } from "../../config/interfaces";
import { useSelector } from "react-redux";
import { myProductSelector } from "../../config/myProductReducer";
import MinigameButton from "../minigame_button/MinigameButton";
import "../home/Home.css";
import "../data/List.css";
import "../data/Grid.css";

const MyProduct = () => {
  const [viewProduct, setViewProduct] = useState<string>("grid");
  const myProducts = useSelector(myProductSelector);

  const ShowGrid = () => {
    return (
      <div className="product-container">
        <div className="home-item">
          <div className="home-container">
            <div className="home-page-status home-item">
              <p>Home {">"} Product List</p>
            </div>
            <button
              className="view-button"
              onClick={() => setViewProduct("list")}
            >
              <img src={list} alt="" />
            </button>
          </div>

          <div className="grid-body">
            {myProducts.product.map((product: IMyProduct) => {
              return (
                <div className="home-item grid-container">
                  <div className="grid-part">
                    <div className="grid-img-container">
                      <img className="grid-img" src={product.image} alt="" />
                    </div>
                    <h3 className="grid-title home-long-item">
                      {product.title}
                    </h3>
                    <h3 className="grid-title home-short-item">
                      {product.title.length < 55 ? (
                        product.title
                      ) : (
                        <>{product.title.substring(0, 55)}...</>
                      )}
                    </h3>
                    <h3 className="grid-price">{product.price} Coin</h3>
                    <p className="grid-description home-long-item">
                      {product.description.length < 150 ? (
                        product.description
                      ) : (
                        <>{product.description.substring(0, 150)}...</>
                      )}
                    </p>
                    <p className="grid-description home-short-item">
                      {product.description.length < 75 ? (
                        product.description
                      ) : (
                        <>{product.description.substring(0, 75)}...</>
                      )}
                    </p>
                  </div>
                  <div className="grid-view-product-container">
                    <Link to={"/my-product:" + product.transaction_id.toString()}>
                      <button className="grid-view-product-button">
                        View Product
                      </button>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  const ShowList = () => {
    return (
      <div className="product-container">
        <div className="home-item">
          <div className="home-container">
            <div className="home-page-status home-item">
              <p>Home {">"} Product List</p>
            </div>
            <button
              className="view-button"
              onClick={() => setViewProduct("grid")}
            >
              <img src={grid} alt="" />
            </button>
          </div>

          <div className="list-body">
            {myProducts.product.map((product: IMyProduct) => {
              return (
                <div className="home-item list-container">
                  <div className="list-item list-img-container">
                    <img className="list-img" src={product.image} alt="" />
                  </div>
                  <div className="list-item list-info">
                    <h3 className="list-title home-long-item">
                      {product.title}
                    </h3>
                    <h3 className="list-title home-short-item">
                      {product.title.length < 67 ? (
                        product.title
                      ) : (
                        <>{product.title.substring(0, 67)}...</>
                      )}
                    </h3>
                    <h3 className="list-price">{product.price} Coin</h3>
                    <p className="list-description home-long-item">
                      {product.description.length < 300 ? (
                        product.description
                      ) : (
                        <>{product.description.substring(0, 300)}...</>
                      )}
                    </p>
                    <p className="list-description home-short-item">
                      {product.description.length < 150 ? (
                        product.description
                      ) : (
                        <>{product.description.substring(0, 150)}...</>
                      )}
                    </p>
                    <div className="list-view-product-container">
                      <Link to={"/my-product:" + product.transaction_id.toString()}>
                        <button className="list-view-product-button">
                          View Product
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  const NoProductsYet = () => {
    return(
        <div className="npy-container">
            <h1 className="npy-text">
                No Products Yet...
            </h1>
        </div>
    )
  }

  return (
    <div className="home-page">
      <div className="home-item">
        <h2 className="home-status">My Product {">"} Product List</h2>
      </div>
      <div>{viewProduct.match("grid") ? <ShowGrid /> : <ShowList />}</div>
      {(myProducts.product === undefined || myProducts.product.length === 0) ? <NoProductsYet /> : <></>}
      <MinigameButton />
    </div>
  );
};

export default MyProduct;
