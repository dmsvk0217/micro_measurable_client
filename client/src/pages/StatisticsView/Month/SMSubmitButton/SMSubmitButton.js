import React, { useState } from "react";
import axios from "axios";
import "../../../../components/SubmitButton/SubmitButton.css";

function SMSubmitButton({ selectedYear, selectedLocation, selectedSubstance }) {
  const [responseData, setResponseData] = useState(null);
  const [responseError, setResponseError] = useState(null);

  const handleTableSubmit = async () => {
    let requestURL;
    const requestBody = {
      date: `${selectedYear}`,
    };

    if (selectedLocation.match("전체")) {
      console.log(`전체노드 ${selectedSubstance} ${selectedYear} 연간 월평균`);
      requestURL =
        "http://localhost:4000/api/all-nodes/substance/monthly-averages";
      /*
        모든 노드에 대한 특정 물질의 월간(일)평균 데이터
        /api/all-nodes/substance/monthly-averages
        {
          date : "2024-01"
          substance: "pm25"
        }
      */
    }

    if (!selectedLocation.match("전체")) {
      console.log(
        `특정노드 ${selectedLocation} ${selectedSubstance} ${selectedYear} 연간 월평균`
      );
      requestBody["nodeAddress"] = selectedLocation;
      requestURL = "http://localhost:4000/api/nodes/substance/monthly-averages";
      /*
        특정 노드들에 대한 특정 물질의 월간(일)평균 데이터
        /api/nodes/substance/monthly-averages
        {
          "date":"2024-01"
          "substance": “pm25
          "nodeAddressesArray": ["3", "8", "14"]
        }
      */
    }

    // try {
    console.log("🚀 ~ handleTableSubmit ~ requestURL:", requestURL);
    console.log("🚀 ~ handleTableSubmit ~ requestBody:", requestBody);

    //   const response = await axios.post(requestURL, requestBody);
    //   setResponseData(response.data);
    //   console.log("🚀 ~ handleTableSubmit ~ response.data:", response.data);
    // } catch (error) {
    //   setResponseError(error);
    //   console.log("🚀 ~ handleTableSubmit ~ error:", error);
    // }
  };

  return (
    <div className="search-btn-container">
      <button className="search-btn" onClick={handleTableSubmit}>
        검색
      </button>
    </div>
  );
}

export default SMSubmitButton;
