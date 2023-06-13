import React, { Component, Fragment, useEffect, useState } from "react";
import Image from "react-bootstrap/Image";
import hamburgericon from "../../assets/hamburger.png";
import "./NavigationBar.scss";
import { Collapse } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, authSelector } from "../../redux/auth.reducer";

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

const NavigationBar = () => {
  const [dropdownIsOpen, setDropdownIsOpen] = useState(false);
  const auth = useSelector(authSelector);
  const dispatch = useDispatch();
  const windowSize = useWindowSize();

  return (
    <Fragment>
      <div className="p-3 navbar-background">
        <div className="d-flex align-items-center">
          <Link to={"/"} style={{ textDecoration: "none" }}>
            {" "}
            <span className="navbar-title px-3">Mitra Nusantara</span>
          </Link>
        </div>

        {windowSize.width > 1200 && (
          <div className="navbar-options-container px-3">
            <Link to={"/"} style={{ textDecoration: "none", color: "black" }}>
              <div className="px-4">Home</div>
            </Link>
            <Link
              to={"/search"}
              style={{ textDecoration: "none", color: "black" }}
            >
              <div className="px-4">Product</div>
            </Link>
            {auth.isLoggedIn && (
              <Fragment>
                <Link
                  to={"/cart"}
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <div className="px-4">Cart</div>
                </Link>
                <Link
                  to={"/history"}
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <div className="px-4">History</div>
                </Link>
                <div
                  className="px-4 py-2 mx-2 navbar-login-btn"
                  onClick={() => {
                    dispatch(logout());
                  }}
                >
                  Logout
                </div>
              </Fragment>
            )}
            {!auth.isLoggedIn && (
              <Link to={"/login"} style={{ textDecoration: "none" }}>
                <div className="px-4 py-2 mx-2 navbar-login-btn">Login</div>
              </Link>
            )}
          </div>
        )}

        {windowSize.width < 1200 && (
          <Fragment>
            <div
              className="navbar-hamburg-icon p-3 mx-2"
              onClick={() => {
                setDropdownIsOpen(!dropdownIsOpen);
              }}
            >
              <Image className="hamburg-img" src={hamburgericon} fluid />
            </div>
            <Collapse in={dropdownIsOpen}>
              <div className="navbar-dropdown-container">
                <div className="navbar-dropdown">
                  <Link
                    to={"/"}
                    style={{ textDecoration: "none", color: "white" }}
                  >
                    {" "}
                    <p className="navbar-dropdown-item m-0">Home</p>
                  </Link>

                  <Link
                    to={"/search"}
                    style={{ textDecoration: "none", color: "white" }}
                  >
                    {" "}
                    <p className="navbar-dropdown-item m-0">Product</p>
                  </Link>
                </div>

                {/* Outer area for navbar */}
                {/* <div
                  className="outer-area-navbar-dropdown"
                  onClick={() => {
                    setDropdownIsOpen(!dropdownIsOpen);
                  }}
                ></div> */}
              </div>
            </Collapse>
          </Fragment>
        )}
      </div>
    </Fragment>
  );
};

// mapStateToProps here if needed

// mapDispatchToProps here if needed

export default NavigationBar;
