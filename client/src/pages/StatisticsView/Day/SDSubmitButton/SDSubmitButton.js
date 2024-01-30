import React, { useState } from "react";
import axios from "axios";
import "../../../../components/SubmitButton/SubmitButton.css";

function SDSubmitButton({
  selectedYear,
  selectedMonth,
  selectedLocation,
  selectedSubstance,
}) {
  const [responseData, setResponseData] = useState(null);
  const [responseError, setResponseError] = useState(null);

  selectedMonth = selectedMonth.slice(0, -1);
  selectedMonth =
    parseInt(selectedMonth) < 10 ? "0" + selectedMonth : selectedMonth;

  const handleTableSubmit = async () => {
    let requestURL;
    let requestBody = {};

    /*
        모든 노드에 대한 특정 물질의 월간(일)평균 데이터
        /api/all-nodes/substance/monthly-averages
        {
          date : "2024-01"
          substance: "pm25"
        }
      */
    if (selectedLocation.match("전체")) {
      console.log(
        `전체노드 ${selectedSubstance} ${selectedYear}-${selectedMonth} 월간 일평균`
      );
      requestURL =
        "http://localhost:4000/api/all-nodes/substance/monthly-averages";
      requestBody = {
        date: `${selectedYear}-${selectedMonth}`,
        substanceKr: selectedSubstance,
      };
    }

    /*
        특정 노드들에 대한 특정 물질의 월간(일)평균 데이터
        /api/nodes/substance/monthly-averages
        {
          "date":"2024-01"
          "substanceKr": “pm25
          "nodeAddressNameesArray": ["3", "8", "14"]
        }
      */
    if (!selectedLocation.match("전체")) {
      console.log(
        `특정노드 ${selectedLocation} ${selectedSubstance} ${selectedYear}-${selectedMonth} 월간 일평균`
      );
      requestBody = {
        date: `${selectedYear}-${selectedMonth}`,
        substanceKr: selectedSubstance,
        nodeAddressNameArray: [selectedLocation],
      };
      requestURL = "http://localhost:4000/api/nodes/substance/monthly-averages";
    }

    try {
      console.log("🚀 ~ handleTableSubmit ~ requestURL:", requestURL);
      console.log("🚀 ~ handleTableSubmit ~ requestBody:", requestBody);

      const response = await axios.post(requestURL, requestBody);
      setResponseData(response.data);
      console.log("🚀 response.data:", response.data);
    } catch (error) {
      setResponseError(error);
      console.log(error.response.data);
    }
  };

  return (
    <div className="search-btn-container">
      <button className="search-btn" onClick={handleTableSubmit}>
        검색
      </button>
    </div>
  );
}

export default SDSubmitButton;
