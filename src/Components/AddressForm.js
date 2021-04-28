import { Button, TextField } from "@material-ui/core";
import React from "react";
import "./AddressForm.css";

function AddressForm() {




  return (
    <div className="addressForm">
      <form>
        <TextField
          className="textField"
          variant="outlined"
          fullWidth
          type="name"
          label="Full Name*"
        ></TextField>

        <TextField
          className="textField"
          variant="outlined"
          fullWidth
          type="number"
          label="Phone Number*"
        ></TextField>

        <TextField
          className="textField"
          variant="outlined"
          fullWidth
          type="number"
          label="Pin Code*"
        ></TextField>

        <TextField
          className="textField"
          variant="outlined"
          fullWidth
          type="text"
          label="State*"
        ></TextField>
        <TextField
          className="textField"
          variant="outlined"
          fullWidth
          type="text"
          label="House No. Building*"
        ></TextField>
        <TextField
          className="textField"
          variant="outlined"
          fullWidth
          type="text"
          label="Road Name, Area Colony*"
        ></TextField>
        
      </form>
    </div>
  );
}

export default AddressForm;
