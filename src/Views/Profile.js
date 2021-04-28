import { Button } from "@material-ui/core";
import { PowerSettingsNewOutlined } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import AddressForm from "../Components/AddressForm";
import { auth, db } from "../firebase";
import { useStateValue } from "../StateProvider";
import "./Profile.css";

function Profile() {
  const [addressClicked, setAddressClicked] = useState(false);
  
  const [{ user }] = useStateValue();
  const [userData, setUserData] = useState(null);
  const history = useHistory();

  const getUserData = () => {
    user &&
      db
        .collection("Users")
        .doc(user.uid)
        .onSnapshot((value) => {
          setUserData(value.data());
        });
  };

  const signOut = () => {
      auth.signOut();
      history.replace('./home');

  }

  const saveAddress = () => {
    setAddressClicked(false);
  };

  useEffect(() => {
    getUserData();
  }, [user]);

  return (
    userData && (
      <div className="profile">
        <div className="profile__detail">
          <div className="profile__nameImage">
            <img src="https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/profile-pic-male_4811a1.svg"></img>
            <div className="profile__name">
              <p>Hello,</p>
              <h3>{userData.name}</h3>
            </div>
          </div>
          <Button onClick =  {signOut}>
            <PowerSettingsNewOutlined /> Sign out
          </Button>
        </div>
        <br />
        <div className="my__adresses">
          <h3>My Address</h3>
          <br />
          {!addressClicked && (
            <Button onClick={() => setAddressClicked(true)} fullWidth>
              Add a new Address
            </Button>
          )}
          {addressClicked && (
            <div>
              <AddressForm></AddressForm>
              <Button onClick={saveAddress} fullWidth>
                Save Adress
              </Button>
              <br />
              <Button onClick={() => setAddressClicked(false)} fullWidth>
                Cancel
              </Button>
            </div>
          )}
        </div>
        <br />
        <div className="my__adresses">
          <h3>My Cards and Wallets</h3>
          <br />
          <Button fullWidth>Add Cards and Wallets</Button>
        </div>

        <br />
        <div className="my__adresses">
          <h3>My Orders</h3>
          <br />
          <Button onClick = {() => history.push('my_orders')} fullWidth>View all Orders</Button>
        </div>
      </div>
    )
  );
}

export default Profile;
