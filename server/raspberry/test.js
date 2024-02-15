const db = require("../firebase/firebase.js");

const query = db.collection("node-info");

const observer = query.onSnapshot(
  (querySnapshot) => {
    console.log(`Received query snapshot of size ${querySnapshot.size}`);
    querySnapshot.docs.map((doc) => {
      console.log("🚀 ~ querySnapshot.docs ~ doc.data():", doc.data());
    });
  },
  (err) => {
    console.log(`Encountered error: ${err}`);
  }
);
