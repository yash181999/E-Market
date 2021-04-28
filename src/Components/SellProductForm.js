import {
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextareaAutosize,
  TextField,
} from "@material-ui/core";
import React, { useRef, useState } from "react";
import { db, storageRef } from "../firebase";
import { useStateValue } from "../StateProvider";
import "./SellProductForm.css";

function SellProductForm() {
  //use ref for images
  const imageRefOne = useRef(null);
  const imageRefTwo = useRef(null);

  //get from data
  const [imageOne, setImageOne] = useState(null);
  const [imageTwo, setImageTwo] = useState(null);
  const [productName, setProductName] = useState(null);
  const [productCategory, setProductCategory] = useState(null);
  const [productBrand, setProductBrand] = useState(null);
  const [productPrice, setProductPrice] = useState(null);
  const [productDetails, setProductDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [{ user }] = useStateValue();
  const [imageUrlOne, setImageUrlOne] = useState(null);
  const [imageUrlTwo, setImageurlTwo] = useState(null);
  const checkForEmptyForm = () => {
    if (
      imageOne &&
      imageTwo &&
      productName &&
      productCategory &&
      productBrand &&
      productPrice &&
      productDetails
    ) {
      return false;
    } else {
      return true;
    }
  };

  const getImageOne = () => {
    setImageOne(null);
    imageRefOne.current.click();
  };

  const getImageTwo = () => {
    setImageTwo(null);
    imageRefTwo.current.click();
  };

  const getImageOneFile = (e) => {
    if (e.target.files[0]) {
      setImageOne(e.target.files[0]);
    }
  };

  const getImageTwoFile = (e) => {
    if (e.target.files[0]) {
      setImageTwo(e.target.files[0]);
    }
  };

  const submitDetails = async () => {
    setLoading(true);
    if (user) {
      let imageUrlOne = null;
      let imageUrlTwo = null;

      let uploadTaskOne = storageRef
        .child(user.uid)
        .child(Date.now().toString())
        .child(productName)
        .child("1");

      let uploadTaskTwo = storageRef
        .child(user.uid)
        .child(Date.now().toString())
        .child(productName)
        .child("2");

      await uploadTaskOne.put(imageOne).then((snapshot) => {
        uploadTaskOne.getDownloadURL().then((url) => {
          setImageUrlOne(url);
        });
      });

      await uploadTaskTwo.put(imageTwo).then((snapshot) => {
        uploadTaskTwo.getDownloadURL().then((url) => {
          setImageurlTwo(url);
        });
      });

      setLoading(false);
    }

    if (loading === false && imageUrlOne && imageUrlTwo) {
      setLoading(true);
     await db.collection("Product").doc().set({
        sellerId: user.uid,
        productName: productName,
        productCategory: productCategory,
        productDetails: productDetails,
        productPrice: productPrice,
        imageOne: imageUrlOne,
        imageTwo: imageUrlTwo,
        productBrand : productBrand,
      });
      setImageOne(null);
      setImageTwo(null);
      setImageUrlOne(null);
      setProductName(null);
      setProductDetails(null);
      setProductCategory(null);
      setProductPrice(null);
      setProductBrand(null);
      setLoading(false);

    }
    
  };

  return !loading ? (
    <div className="sellProductForm">
      <h1>Product Details</h1>
      <h6>All fields are compulsory</h6>
      <form>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="productname"
          placeholder="Product Name"
          name="name"
          autoFocus
          type="text"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />
        <FormControl fullWidth variant="outlined">
          <InputLabel id="demo-simple-select-outlined-label">
            Product Category
          </InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={productCategory}
            onChange={(e) => setProductCategory(e.target.value)}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={"Mobile"}>Mobiles</MenuItem>
            <MenuItem value={"Computer"}>Computers</MenuItem>
            <MenuItem value={"Tablet"}>Tablets</MenuItem>
            <MenuItem value={"Acessories"}>Acessories</MenuItem>
          </Select>
        </FormControl>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="brandname"
          placeholder="Product Brand"
          name="brandName"
          autoFocus
          type="text"
          value={productBrand}
          onChange={(e) => setProductBrand(e.target.value)}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="productPrice"
          placeholder="Product Price"
          name="price"
          autoFocus
          type="number"
          value={productPrice}
          onChange={(e) => setProductPrice(e.target.value)}
        />
        <label>Product Details*</label>
        <textarea
          className="textArea__detials"
          placeholder="Product Details"
          value={productDetails}
          onChange={(e) => setProductDetails(e.target.value)}
        ></textarea>
        <label>Product Images*</label>
        <div style={{ display: "flex", marginTop: "10px" }}>
          <div className="imageBox">
            <input
              ref={imageRefOne}
              onChange={getImageOneFile}
              type="file"
              accept="image/*"
              hidden
            ></input>
            {imageOne == null && (
              <Button fullWidth onClick={getImageOne}>
                Select Image 1
              </Button>
            )}
            {imageOne && (
              <img
                onClick={getImageOne}
                style={{
                  objectFit: "contain",
                  height: "400px",
                  width: "100%",
                }}
                src={URL.createObjectURL(imageOne)}
              ></img>
            )}
          </div>

          <div className="imageBox">
            <input
              ref={imageRefTwo}
              onChange={getImageTwoFile}
              hidden
              type="file"
              accept="image/*"
            ></input>
            {imageTwo == null && (
              <Button fullWidth onClick={getImageTwo}>
                Select Image 2
              </Button>
            )}
            {imageTwo && (
              <img
                onClick={getImageTwo}
                style={{
                  objectFit: "contain",
                  height: "400px",
                  width: "100%",
                }}
                src={URL.createObjectURL(imageTwo)}
              ></img>
            )}
          </div>
        </div>

        <Button
          disabled={checkForEmptyForm() === true && true}
          onClick={submitDetails}
          className="sellProductForm__submitButton"
          style={{
            background: "deepSkyBlue",
          }}
          fullWidth
        >
          Submit
        </Button>
      </form>
    </div>
  ) : (
    <div style={{ width: "100%", display: "grid", placeItems: "center" }}>
      <CircularProgress />
    </div>
  );
}

export default SellProductForm;
