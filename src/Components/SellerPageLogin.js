import React, { useState } from "react";
import "./SellerPageLogin.css";
import {
  Button,
  CircularProgress,
  Grid,
  LinearProgress,
  TextField,
} from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import { auth } from "../firebase";
import logo from '../logo.png'

function SellerPageLogin() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const signIn = async (e) => {
    setLoading(true);
    e.preventDefault();
    //do some firebase login
    await auth
      .signInWithEmailAndPassword(email, password)
      .then((auth) => {
        if (auth) {
          const uId = auth.uId;
          const uName = email.split("@")[0];
          history.replace("/");
        }
      })
      .catch((error) => alert(error.message));
    setLoading(false);
  };

  const demoSignIn = async (e) => {
    setLoading(true);
    e.preventDefault();
    //do some firebase login
    await auth
      .signInWithEmailAndPassword("demouser@emarket.com", "demo123")
      .then((auth) => {
        if (auth) {
          const uId = auth.uId;
          const uName = email.split("@")[0];
          history.replace("/");
        }
      })
      .catch((error) => alert(error.message));
    setLoading(false);
  };

  return (
    <div style={{ padding: "10px" }} className="sellerPage">
      <img
        style={{ height: "150px", width: "400px", objectFit: "contain" }}
        src={logo}
      ></img>
      <h1>Login</h1>
      <br></br>
      <div className="sellerPageSignup__formContainer">
        <form>
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
            password={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
          {!loading && (
            <Button
              onClick={signIn}
              fullWidth
              color="secondary"
              variant="contained"
            >
              Log in
            </Button>
          )}
          {loading && (
            <div
              style={{ width: "100%", display: "grid", placeItems: "center" }}
            >
              <CircularProgress />
            </div>
          )}
          {!loading && (
            <Button
              type="submit"
              fullWidth
              variant="contained"
              style={{ color: "white", backgroundColor: "green"  , marginTop: '10px'}}
              
              onClick={demoSignIn}
            >
              Demo Login
            </Button>
          )}
        </form>
        <br></br>
        <Grid container>
          <Grid item xs>
            Don't have an account? <Link to="/signup">Register</Link>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default SellerPageLogin;
