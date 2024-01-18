import { collection, addDoc, query, getDocs } from "firebase/firestore";
import db from "../firebase.js";
import {
  NUMBEROFNODE,
  NUMBEROFSUBSTANCE,
  substanceType,
  substanceDailyAverageType,
} from "../const.js";

export default function calDailyAverage() {
  const currentDate = new Date();
  const hhmmss = currentDate.toLocaleTimeString("en-US", { hour12: false }); // HH:MM:SS format
  console.log(`[${hhmmss}] calDailyAverage `);

  for (let i = 0; i < NUMBEROFNODE; i++) {
    calDailyAverageWithNode(i);
  }
  return;
}

async function calDailyAverageWithNode(i) {
  const currentDate = new Date();
  const yyyyMM = currentDate.toISOString().slice(0, 7); // YYYY-MM format
  const dayDD = currentDate.getDate().toString().padStart(2, "0"); // DD format
  const hhmmss = currentDate.toLocaleTimeString("en-US", { hour12: false }); // HH:MM:SS format

  const dailyRawDataRef = collection(
    db,
    `daily-raw-data/${yyyyMM}/day${dayDD}/node${i + 1}/data`
  );
  const dailyAverageRef = collection(
    db,
    `daily-data/${yyyyMM}/day${dayDD}/node${i + 1}/data`
  );

  let avgValue;
  let dataObject;

  try {
    const querySnapshot = await getDocs(query(dailyRawDataRef));

    if (querySnapshot.docs.length === 0) {
      console.log("🚀 ~ calDailyAverageWithNode docs.length = 0");
      return;
    }

    dataObject = {
      "node-address": i + 1,
      date: `${yyyyMM}-${dayDD}`,
      timestamp: hhmmss,
    };

    // 특정날짜 특정노드에 대해서, 모든 물질의 평균값 계산하여 dataObject에 추가
    for (let j = 0; j < NUMBEROFSUBSTANCE; j++) {
      const valueArray = querySnapshot.docs.map(
        (doc) => doc.data()[substanceType[j]]
      );
      avgValue =
        valueArray.reduce((acc, value) => acc + value, 0) / valueArray.length;

      dataObject[substanceDailyAverageType[j]] = avgValue;
    }

    await addDoc(dailyAverageRef, dataObject);
    console.log("done");
  } catch (error) {
    console.log("🚀 ~ calDayAverageWithNodeSubstance ~ error:", error);
  }
  return;
}
