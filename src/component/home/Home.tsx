import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Home.css";
import "../data/List.css";
import "../data/Grid.css";
// import IData from '../data/Data.interfaces'
import { Link } from "react-router-dom";

import grid from "../../assets/grid.png";
import list from "../../assets/list.png";
import loading from "../../assets/loading.gif";
import { IData } from "../data/Data.interfaces";
import MinigameButton from "../minigame_button/MinigameButton";

const getSearchedItems = (query: string, items: IData[]) => {
  if (!query) {
    return items;
  }
  return items.filter((item: IData) =>
    item.title.toLowerCase().includes(query.toLowerCase())
  );
};

const Home = () => {
  const [data, setData] = useState<IData[]>([]);
  const [filter, setFilter] = useState<IData[]>(data);
  const [loadingStatus, setLoadingStatus] = useState(false);
  const [viewProduct, setViewProduct] = useState<string>("grid");
  const [query, setQuery] = useState<string>("");

  let componentIsMounted = true;

  useEffect(() => {
    const getProduct = async () => {
      setLoadingStatus(true);
      const res = await axios.get("https://fakestoreapi.com/products");
      if (componentIsMounted) {
        setData(res.data);
        setFilter(res.data);
        setLoadingStatus(false);
      }
      return () => {
        componentIsMounted = false;
      };
    };
    getProduct();
  }, []);

  const handleChange = (e: string) => {
    setQuery(e);
  };

  const filteredItems = getSearchedItems(query, filter);

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
            {filteredItems.map((product: IData) => {
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
                    <Link to={"/product:" + product.id.toString()}>
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
            {filteredItems.map((product: IData) => {
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
                      <Link to={"/product:" + product.id.toString()}>
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

  const Loading = () => {
    return (
      <div className="loading-container">
        <img src={loading} alt="" className="loading-btn" />
        <h1 className="loading-desc">Loading . . . </h1>
      </div>
    );
  };

  return (
    <div className="home-page">
      <div className="home-item">
        <Link to={"/my-product"}>
          <button className="my-product-button">My Products</button>
        </Link>
      </div>
      <div>
        <div className="search-container">
          <input
            type="text"
            className="search-bar"
            placeholder="Search products here"
            onChange={(e: any) => handleChange(e.target.value)}
          />
        </div>
      </div>
      <div>
        {loadingStatus ? (
          <Loading />
        ) : viewProduct.match("grid") ? (
          <ShowGrid />
        ) : (
          <ShowList />
        )}
      </div>
      <MinigameButton />
    </div>
  );
};

export default Home;
