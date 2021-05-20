import React, { useEffect, useState } from "react";
import { Button, CircularProgress, Grid, TextField } from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import "./SellerPageSignup.css";
import { auth, db } from "../firebase";
import { useStateValue } from "../StateProvider";
import logo from "../logo.png";
function SellerPageSignup() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
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

  const checkFields = () => {
    if (name != "" && email != "" && password != "") return false;
    else return true;
  };

  const register = async (e) => {
    e.preventDefault();
    setLoading(true);
    //do some fancy firebase registerx

    await auth
      .createUserWithEmailAndPassword(email, password)
      .then((auth) => {
        if (auth) {
          history.replace("/home");
        }
      })
      .catch((error) => alert(error.message));

    const uId = auth.currentUser.uid;

    if (uId != null) {
      await db
        .collection("Users")
        .doc(uId)
        .set({
          uid: uId,
          name: name,
          password: password,
        })
        .then()
        .catch((e) => console.log(e));
    }
    setLoading(false);
  };

  return (
    <div className="sellerPage">
      <img style={{ height: "100px", width: "200px" , objectFit :'contain'}} src={logo}></img>
      <h1>Welcome!</h1>
      <h3>Join us and start selling your electronic items</h3>
      <br></br>
      <div className="sellerPageSignup__formContainer">
        <form>
          <label>Full Name*</label>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            placeholder="Full Name"
            name="name"
            autoComplete="text"
            autoFocus
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label>Email Address*</label>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            placeholder="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>Password*</label>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="password"
            placeholder="Password"
            name="password"
            autoComplete="password"
            autoFocus
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {!loading ? (
            <Button
              onClick={register}
              disabled={checkFields() === true ? true : false}
              fullWidth
              color="primary"
              variant="contained"
            >
              Register
            </Button>
          ) : (
            <div
              style={{ width: "100%", display: "grid", placeItems: "center" }}
            >
              <CircularProgress />
            </div>
          )}
        </form>
        <br></br>
        <Grid container>
          <Grid item xs>
            Already have a seller account? <Link to="/login">Log in</Link>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default SellerPageSignup;
