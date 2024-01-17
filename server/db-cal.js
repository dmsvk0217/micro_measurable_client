// Import the functions you need from the SDKs you need
const { initializeApp } = require("firebase/app");
const {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
  query,
  getDocs,
} = require("firebase/firestore");

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get Firestore instance
const db = getFirestore(app);

const currentDate = new Date();
const yyyyMM = currentDate.toISOString().slice(0, 7); // YYYY-MM format
const dayDD = currentDate.getDate().toString().padStart(2, "0"); // DD format
const hhmmss = currentDate.toLocaleTimeString("en-US", { hour12: false }); // HH:MM:SS format
const hh = currentDate.getHours().toString().padStart(2, "0"); // HH format

const substanceType = ["humidity", "tempareture", "pm10", "pm25", "ch2o"];
const substanceDailyAverageType = [
  "humidity-Daily-Average",
  "tempareture-Daily-Average",
  "pm10-Daily-Average",
  "pm25-Daily-Average",
  "ch2o-Daily-Average",
];
const substanceHourlyAverageType = [
  "humidity-hourly-Average",
  "tempareture-hourly-Average",
  "pm10-hourly-Average",
  "pm25-hourly-Average",
  "ch2o-hourly-Average",
];
const NUMBEROFNODE = 15;

calMonthlyData();

function calMonthlyData() {
  for (let i = 0; i < NUMBEROFNODE; i++) {
    for (let j = 0; j < substanceType.length; j++) {
      calMonthlyDataWithNodeSubstance(j, i);
    }
  }
}

async function calMonthlyDataWithNodeSubstance(j, i) {
  const monthlyRawDataRef = collection(
    db,
    `monthly-raw-data/${yyyyMM}/${substanceType[j]}/node${i + 1}/day${dayDD}`
  );

  const q = query(monthlyRawDataRef);

  try {
    const querySnapshot = await getDocs(q);

    if (querySnapshot.docs.length === 0) {
      console.log("pass", i, " : ", j);
    } else {
      const valueArray = querySnapshot.docs.map((doc) => {
        console.log("🚀 ~ doc.data():", doc.data());
        console.log(
          `🚀 ~ doc.data()${substanceType[j]}:`,
          doc.data()[substanceType[j]]
        );
        return doc.data()[substanceType[j]];
      });
      console.log("🚀 ~ valueArray:", valueArray);

      const avgValue =
        valueArray.reduce((acc, value) => acc + value, 0) / valueArray.length;

      console.log("🚀 ~ avgValue:", avgValue);

      const averageRef = collection(
        db,
        `monthly-data/${yyyyMM}/${substanceType[j]}/node${i + 1}/day${dayDD}`
      );

      const dataObject = {
        "node-address": i,
        date: `${yyyyMM}-${dayDD}`,
        timestamp: hhmmss,
        [substanceDailyAverageType[j]]: avgValue,
      };

      addDoc(averageRef, dataObject);
    }
  } catch (error) {
    console.error("Error getting documents: ", error);
  }
}

function cal_daily_data() {}

function cal_hourly_data() {}
