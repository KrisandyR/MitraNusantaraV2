
import logo_storreg from "../../assets/logo-storegg.png";
import profile_img from "../../assets/profile.png";
import star_coin_img from "../../assets/star-coin.png";
import './NavbarStoregg.css';
import { useSelector } from 'react-redux';
import { balanceSelector } from "../../config/balanceReducer";

import {Link} from "react-router-dom";


const NavbarStoregg = () => {

  const myBalance = useSelector(balanceSelector)

  return (
    <header>
      <Link to={"/"}>
        <button className="logo">
          <img src={logo_storreg} alt="" />
          <h1>Storegg</h1>
        </button>
      </Link>
      <nav>
        <ul>
          <li>
            <div className="nav-item">
              <div className="balance-container">
                <img src={star_coin_img} className="star-coin" alt="" />
                <p>{myBalance.value.toFixed(2)} Coin</p>
              </div>
            </div>

            <div className="nav-item">
              <img src={profile_img} className="profile" alt="" />
            </div>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default NavbarStoregg;
