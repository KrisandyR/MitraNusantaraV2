import React from "react";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./component/home/Home";
import MyProduct from "./component/my_product/MyProduct";
import NavbarStoregg from "./component/navbar_storegg/NavbarStoregg";
import ProductDetail from "./component/product_detail/ProductDetail";
import Minigame from "./component/minigame/Minigame";
import MyProductDetail from "./component/my_product_detail/MyProductDetail";

function App() {

  return (
    <div>
      <BrowserRouter>
        <NavbarStoregg />
        <Switch>
          <Route path={"/"} exact>
            <Home />
          </Route>
          <Route path={"/product:id"} exact>
            <Home />
            <ProductDetail />
          </Route>
          <Route path={"/my-product"} exact>
            <MyProduct />
          </Route>
          <Route path={"/my-product:id"} exact>
            <MyProduct />
            <MyProductDetail />
          </Route>
          <Route path={"/minigame"} exact>
            <Minigame />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
