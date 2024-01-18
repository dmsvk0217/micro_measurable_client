import { collection, addDoc, query, getDocs } from "firebase/firestore";
import db from "./firebase.js";
import { NUMBEROFNODE } from "./const.js";

calMonthlyDayAverage();

function calMonthlyDayAverage() {
  for (let i = 0; i < NUMBEROFNODE; i++) {
    for (let j = 0; j < substanceType.length; j++) {
      calDayAverageWithNodeSubstance(j, i);
    }
  }
}

async function calDayAverageWithNodeSubstance(j, i) {
  const currentDate = new Date();
  const yyyyMM = currentDate.toISOString().slice(0, 7); // YYYY-MM format
  const dayDD = currentDate.getDate().toString().padStart(2, "0"); // DD format
  const hhmmss = currentDate.toLocaleTimeString("en-US", { hour12: false }); // HH:MM:SS format
  const hh = currentDate.getHours().toString().padStart(2, "0"); // HH format

  const monthlyRawDataRef = collection(
    db,
    `monthly-raw-data/${yyyyMM}/${substanceType[j]}/node${i + 1}/day${dayDD}`
  );

  try {
    const querySnapshot = await getDocs(query(monthlyRawDataRef));

    if (querySnapshot.docs.length === 0) {
      console.log(
        "🚀 ~ calDayAverageWithNodeSubstance ~ querySnapshot.docs.length:",
        querySnapshot.docs.length
      );
    } else {
      const valueArray = querySnapshot.docs.map(
        (doc) => doc.data()[substanceType[j]]
      );

      const avgValue =
        valueArray.reduce((acc, value) => acc + value, 0) / valueArray.length;

      const averageRef = collection(
        db,
        `monthly-data/${yyyyMM}/${substanceType[j]}/node${i + 1}/day${dayDD}`
      );

      const dataObject = {
        "node-address": i + 1,
        date: `${yyyyMM}-${dayDD}`,
        timestamp: hhmmss,
        [substanceDailyAverageType[j]]: avgValue,
      };

      addDoc(averageRef, dataObject);
    }
  } catch (error) {
    console.log("🚀 ~ calDayAverageWithNodeSubstance ~ error:", error);
  }
}
