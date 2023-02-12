import egg_full_img from "../../assets/egg-full.png";
import "./MinigameButton.css";
import { Link } from "react-router-dom";

const MinigameButton = () => {

  return (
    <Link to={"/minigame"}>
      <div className="mg-button-container">
        <img className="mg-img" src={egg_full_img} alt="" />
      </div>
    </Link>
  );
};

export default MinigameButton;
