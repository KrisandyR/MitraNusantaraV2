import React from "react";
import logo from "./logo.svg";
import "./App.scss";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "./view/login";
import Example from "./view/example/Example";
import NavigationBar from "./component";
import Home from "./view/home";
import Packet from "./view/packet-remove-later";
import RecommendationPage from "./view/recommendation_page";
import SearchPage from "./view/search_page/SearchPage";
import ProductDetail from "./view/product_detail/ProductDetail";
import Cart from "./view/cart/Cart";
import History from "./view/history/History";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route path={"/"} exact>
            <NavigationBar />
            <Home />
          </Route>
          <Route path={"/packet"}>
            <NavigationBar />
            <Packet />
          </Route>
          <Route path={"/recomPage"} exact>
            <NavigationBar />
            <RecommendationPage />
          </Route>
          <Route path={"/search:keyword?"}>
            <NavigationBar />
            <SearchPage />
          </Route>
          <Route path={"/hotel/:hotelId"}>
            <NavigationBar />
            <ProductDetail />
          </Route>
          <Route path={"/login"} exact>
            <Login />
          </Route>
          <Route path={"/example"} exact>
            <Example />
          </Route>
          <Route path={"/cart"} exact>
            <NavigationBar />
            <Cart />
          </Route>
          <Route path={"/history"} exact>
            <NavigationBar />
            <History />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
