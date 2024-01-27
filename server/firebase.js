const { initializeApp } = require("firebase/app");
const { getFirestore } = require("firebase/firestore");

const firebaseConfig = {
  apiKey: "AIzaSyCqcuHvJwtE1TO6lyUuH20O8no5fuHnN7s",
  authDomain: "capstone-c6d9e.firebaseapp.com",
  databaseURL: "https://capstone-c6d9e-default-rtdb.firebaseio.com",
  projectId: "capstone-c6d9e",
  storageBucket: "capstone-c6d9e.appspot.com",
  messagingadderId: "164554046589",
  appId: "1:164554046589:web:cd640b8d44a6bc9bc70514",
  measurementId: "G-K7B3FH99ZC",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

module.exports = db;