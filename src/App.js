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
import Footer from "./Components/Footer";

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
        {!user && (
         
            <SellerPageLogin></SellerPageLogin>
          
        )}
        {user && <>
          <Switch>
            <Route path="/category_page/mobile">
              <Navbar />
              <CategoryPage />
              <Footer />
            </Route>
            <Route path="/category_page/computer">
              <Navbar />
              <CategoryPage />
              <Footer />
            </Route>
            <Route path="/category_page/tablet">
              <Navbar />
              <CategoryPage />
              <Footer />
            </Route>
            <Route path="/seller_account">
              <Navbar />
              <SellerPage />
              <Footer />
            </Route>

            <Route path="/category_page/acessories">
              <Navbar />
              <CategoryPage />
              <Footer />
            </Route>
            <Route path="/category_page/samsung">
              <Navbar />
              <CategoryPage />
              <Footer />
            </Route>
            <Route path="/category_page/apple">
              <Navbar />
              <CategoryPage />
              <Footer />
            </Route>
            <Route path="/category_page/dell">
              <Navbar />
              <CategoryPage />
              <Footer />
            </Route>
            <Route path="/category_page/hp">
              <Navbar />
              <CategoryPage />
              <Footer />
            </Route>
            <Route path="/category_page/lenovo">
              <Navbar />
              <CategoryPage />
              <Footer />
            </Route>

            <Route path={`/product_page/${clickedDocId}`}>
              <Navbar />
              <ProductPage />
              <Footer />
            </Route>

            <Route path={`/wishlist`}>
              <Navbar />

              <Wishlist />
              <Footer />
            </Route>
            <Route path={`/cart`}>
              <Navbar />
              <Cart />
              <Footer />
            </Route>

            <Route path={`/profile`}>
              <Navbar />
              <Profile />
              <Footer />
            </Route>

            <Route path={`/my_orders`}>
              <Navbar />
              <Orders />
              <Footer />
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
              <Footer />
            </Route>
          </Switch>
        </>}
      </div>
    </Router>
  );
}

export default App;
