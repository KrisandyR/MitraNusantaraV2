import React from "react";
import "./Minigame.css";
import { useDispatch } from "react-redux";
import { useState } from "react";
import {
  addBalance
} from "../../config/balanceReducer";
import gold_coin_img from "../../assets/gold-coin.png";
import silver_coin_img from "../../assets/silver-coin.png";
import bronze_coin_img from "../../assets/bronze-coin.png";
import egg_img from "../../assets/egg-full.png";
import broken_egg_img from "../../assets/egg-broken.png";

const Minigame = () => {
  const [clickedState, setClickState] = useState(false);
  const [coinWon, setCoinWon] = useState("");

  const dispatch = useDispatch();

  const randomize = () => {
    let rand = Math.ceil(Math.random() * 3);
    if (rand === 1) {
      setClickState(true);
      setCoinWon("Gold");
      dispatch(addBalance(100))
    } else if (rand === 2) {
      setClickState(true);
      setCoinWon("Silver");
      dispatch(addBalance(50))
    } else if (rand === 3) {
      setClickState(true);
      setCoinWon("Bronze");
      dispatch(addBalance(20))
    }
  };

  const refreshPage = () => {
    window.location.reload();
  };

  const WinStatus = () => {
    if (clickedState === true) {
      return (
        <>
          <div className="game-status">
            <h3>Congratulations</h3>
            <h4>You won a {coinWon} Coin</h4>
          </div>
          <div className="won-img-container">
            <img src={broken_egg_img} alt="" className="broken-egg-img" />
            <img src={img_src} alt="" className="coin-won-img" />
          </div>

          <button className="reset-btn" onClick={refreshPage}>
            Play Again
          </button>
        </>
      );
    }

    return (
      <>
        <div className="game-status">
          <h4> Click the egg to get coins</h4>
        </div>
        <div className="neutral-img-container" onClick={() => randomize()}>
          <img src={egg_img} alt="" className="full-egg-img" />
        </div>
      </>
    );
  };

  let img_src = "";
  if (coinWon.match("Gold")) {
    img_src = gold_coin_img;
  } else if (coinWon.match("Silver")) {
    img_src = silver_coin_img;
  } else if (coinWon.match("Bronze")) {
    img_src = bronze_coin_img;
  }

  return (
    <div className="mg-page">
      <div className="mg-part">
        <h2 className="mg-title">Collect the Coins</h2>
      </div>
      <div className="mg-part mg-coin-list">
        <div className="mg-coin-item">
          <img src={gold_coin_img} alt="" className="coin-img" />
          <h3 className="coin-value">100</h3>
        </div>
        <div className="mg-coin-item">
          <img src={silver_coin_img} alt="" className="coin-img" />
          <h3 className="coin-value">50</h3>
        </div>
        <div className="mg-coin-item">
          <img src={bronze_coin_img} alt="" className="coin-img" />
          <h3 className="coin-value">20</h3>
        </div>
      </div>
      <WinStatus />
    </div>
  );
};

export default Minigame;
