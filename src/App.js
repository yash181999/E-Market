import "./App.css";
import Categories from "./Components/Categories";
import HomeCarousal from "./Components/HomeCarousal";
import Navbar from "./Components/Navbar";
import TopBrands from "./Components/TopBrands";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Views/Home";
import CategoryPage from "./Views/CategoryPage";
import SellerPage from "./Views/SellerPage";
import SellerPageLogin from "./Components/SellerPageLogin";
import SellerPageSignup from "./Components/SellerPageSignup";
import { useStateValue } from "./StateProvider";
import { auth } from "./firebase";
import { useEffect } from "react";
import { useGlobalContext } from "./context";
import ProductPage from "./Views/ProductPage";
import Wishlist from "./Views/Wishlist";
import Cart from "./Views/Cart";
import Profile from "./Views/Profile";
import Orders from "./Views/Orders";

function App() {
  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      console.log("The User Is >>>", authUser);

      if (authUser) {
        //the user is logged in
        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        console.log("logged out");
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
  }, [auth]);

  const { clickedDocId, setClickedDocId } = useGlobalContext();

  useEffect(() => {
    setClickedDocId(localStorage.getItem("clickedDocId"));
  }, []);

  return (
    <Router>
      <div className="app">
        <Switch>
          <Route path="/category_page/mobile">
            <Navbar />
            <CategoryPage />
          </Route>
          <Route path="/category_page/computer">
            <Navbar />
            <CategoryPage />
          </Route>
          <Route path="/category_page/tablet">
            <Navbar />
            <CategoryPage />
          </Route>
          <Route path="/seller_account">
            <Navbar />
            <SellerPage />
          </Route>

          <Route path="/category_page/acessories">
            <Navbar />
            <CategoryPage />
          </Route>

          <Route path={`/product_page/${clickedDocId}`}>
            <Navbar />
            <ProductPage />
          </Route>

          <Route path={`/wishlist`}>
            <Navbar />
            <Wishlist />
          </Route>
          <Route path={`/cart`}>
            <Navbar />
            <Cart />
          </Route>

          <Route path={`/profile`}>
            <Navbar />
            <Profile />
          </Route>

          <Route path={`/my_orders`}>
            <Navbar />
            <Orders />
          </Route>

          <Route path="/login">
            <SellerPageLogin></SellerPageLogin>
          </Route>

          <Route path="/signup">
            <SellerPageSignup />
          </Route>

          <Route path="/">
            <Navbar />
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
