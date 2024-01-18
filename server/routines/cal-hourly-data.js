import { collection, addDoc, query, getDocs } from "firebase/firestore";
import db from "../firebase.js";
import {
  NUMBEROFNODE,
  NUMBEROFHOUR,
  NUMBEROFSUBSTANCE,
  substanceType,
  substanceHourlyAverageType,
} from "../const.js";

export default function calHourlyAverage() {
  const currentDate = new Date();
  const hhmmss = currentDate.toLocaleTimeString("en-US", { hour12: false }); // HH:MM:SS format
  console.log(`[${hhmmss}] calHourlyAverage `);

  for (let i = 0; i < NUMBEROFNODE; i++) {
    calHourlyAverageWithNodeAndHour(i);
  }
}

async function calHourlyAverageWithNodeAndHour(i) {
  const currentDate = new Date();
  const yyyyMM = currentDate.toISOString().slice(0, 7); // YYYY-MM format
  const dayDD = currentDate.getDate().toString().padStart(2, "0"); // DD format
  const hhmmss = currentDate.toLocaleTimeString("en-US", { hour12: false }); // HH:MM:SS format
  const hh = currentDate.getHours().toString().padStart(2, "0"); // HH format

  const hourlyRawDataRef = collection(
    db,
    `hourly-raw-data/${yyyyMM}/day${dayDD}/hour${hh}/node${i + 1}`
  );
  const hourlyAverageRef = collection(
    db,
    `hourly-data/${yyyyMM}/day${dayDD}/hour${hh}/node${i + 1}`
  );

  let avgValue;
  let dataObject;

  try {
    const querySnapshot = await getDocs(query(hourlyRawDataRef));

    if (querySnapshot.docs.length === 0) {
      console.log("🚀 ~ calHourlyAverageWithNodeAndHour docs.length = 0");
      return;
    }

    dataObject = {
      "node-address": i + 1,
      date: `${yyyyMM}-${dayDD}`,
      timestamp: hhmmss,
    };

    // 특정시간 특정노드에 대해서, 모든 물질의 평균값 계산하여 dataObject에 추가
    for (let j = 0; j < NUMBEROFSUBSTANCE; j++) {
      const valueArray = querySnapshot.docs.map(
        (doc) => doc.data()[substanceType[j]]
      );

      avgValue =
        valueArray.reduce((acc, value) => acc + value, 0) / valueArray.length;

      dataObject[substanceHourlyAverageType[j]] = avgValue;
    }

    await addDoc(hourlyAverageRef, dataObject);
    console.log("done");
  } catch (error) {
    console.log("🚀 ~ calDayAverageWithNodeSubstance ~ error:", error);
  }
  return;
}
