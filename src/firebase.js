// For Firebase JS SDK v7.20.0 and later, measurementId is optional

import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyC0JWhLI0UoGmxwd5n9MBcw8VITH5CJxw4",
  authDomain: "e-market-75ce3.firebaseapp.com",
  projectId: "e-market-75ce3",
  storageBucket: "e-market-75ce3.appspot.com",
  messagingSenderId: "1064557129650",
  appId: "1:1064557129650:web:7797847d2f0a41518efeab",
  measurementId: "G-CBHZ9HK58H",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();

const auth = firebase.auth();

var storageRef = firebase.storage().ref();

export const addToWishlist = async (uid, productId) => {
  await db
    .collection("Product")
    .doc(productId)
    .update({
      wishlist: firebase.firestore.FieldValue.arrayUnion(uid),
    });
};

export const removeFromWishlist = async (uid, productId) => {
  await db
    .collection("Product")
    .doc(productId)
    .update({
      wishlist: firebase.firestore.FieldValue.arrayRemove(uid),
    });
};

export const addToCart = async (uid, productId) => {
  await db
    .collection("Product")
    .doc(productId)
    .update({
      cart: firebase.firestore.FieldValue.arrayUnion(uid),
    });
};

export const removeFromCart = async (uid, productId) => {
  await db
    .collection("Product")
    .doc(productId)
    .update({
      cart: firebase.firestore.FieldValue.arrayRemove(uid),
    });
};

export const addToOrders = async (uid, productId) => {
  await db
    .collection("Product")
    .doc(productId)
    .update({
      orders: firebase.firestore.FieldValue.arrayUnion(uid),
    });
};

export { db, auth, storageRef };
