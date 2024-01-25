import React, { useState } from "react";
import axios from "axios";
import "./RTSubmitButton.css";

function RTTSubmitButton({
  selectedLocation,
  selectedDate,
  selectedUnit,
  selectedHour,
}) {
  const [responseData, setResponseData] = useState(null);
  const [responseError, setResponseError] = useState(null);

  const handleTableSubmit = async () => {
    let requestURL;
    const requestBody = {
      date: selectedDate.toISOString().split("T")[0],
    };

    if (selectedLocation.match("전체") && selectedUnit.match("일평균")) {
      console.log("전체노드 일평균");
      requestURL =
        "http://localhost:4000/api/all-nodes/all-substances/daily-averages";
      /*
        모든 노드에 대한 모든 물질의 일평균 데이터
        /api/all-nodes/all-substances/daily-averages
        {
          date : "2024-01-01"
        }
      */
    }

    if (!selectedLocation.match("전체") && selectedUnit.match("일평균")) {
      console.log("특정노드 일평균");
      requestBody["nodeAddressName"] = selectedLocation;
      requestURL =
        "http://localhost:4000/api/node/all-substances/daily-averages";
      /*
        특정 노드에 대한 모든 물질의 일평균 데이터
        /api/node/all-substances/daily-averages
        {
          "date":"2024-01-15"
          "nodeAddressName": "2"
        }
      */
    }

    if (
      selectedLocation.match("전체") &&
      selectedUnit.match("시간평균") &&
      selectedHour.match("전체")
    ) {
      console.log("전체노드 시간평균 전체시간");
      alert("전체시간으로 검색시에는 상세 측정소명을 선택하셔야 합니다.");
    }

    if (
      selectedLocation.match("전체") &&
      selectedUnit.match("시간평균") &&
      !selectedHour.match("전체")
    ) {
      console.log("전체노드 시간평균 특정시간");
      requestBody["hour"] = selectedHour;
      requestURL =
        "http://localhost:4000/api/all-nodes/all-substances/hourly-averages";
      /*
        모든 노드에 대한 모든 물질의 시간평균 데이터
        /api/all-nodes/all-substances/hourly-averages
        {
          ”date”:”2024-01-15”
          ”hour”:”08”
        }
      */
    }

    if (
      !selectedLocation.match("전체") &&
      selectedUnit.match("시간평균") &&
      selectedHour.match("전체")
    ) {
      console.log("특정노드 시간평균 전체시간");
      requestBody["nodeAddressName"] = selectedLocation;
      requestURL =
        "http://localhost:4000/api/node/all-substances/all-hourly-averages";
      /*
        특정 노드에 대한 모든 물질의 일간 시간평균 데이터
        /api/node/all-substances/all-hourly-averages
        {
          ”date”:”2024-01”
          ”nodeAddressName” : “4”
        }
      */
    }

    if (
      !selectedLocation.match("전체") &&
      selectedUnit.match("시간평균") &&
      !selectedHour.match("전체")
    ) {
      console.log("특정노드 시간평균 특정시간");
      requestBody["hour"] = selectedHour;
      requestBody["nodeAddressName"] = selectedLocation;
      requestURL =
        "http://localhost:4000/api/node/all-substances/hourly-averages";
      /*
        특정 노드에 대한 모든 물질의 시간평균 데이터
        /api/node/all-substances/hourly-averages
        {
          ”date”:”2024-01-15”
          ”hour”:”21”
          ”nodeAddressName”:13
        }
      */
    }

    try {
      console.log("🚀 ~ handleTableSubmit ~ requestURL:", requestURL);
      console.log("🚀 ~ handleTableSubmit ~ requestBody:", requestBody);

      const response = await axios.post(requestURL, requestBody);
      setResponseData(response.data);
      console.log("🚀 ~ handleTableSubmit ~ response.data:", response.data);
    } catch (error) {
      setResponseError(error);
      console.log("🚀 ~ handleTableSubmit ~ error:", error);
    }
  };

  return (
    <div className="search-btn-container">
      <button type="button" className="search-btn" onClick={handleTableSubmit}>
        검색
      </button>
    </div>
  );
}

export default RTTSubmitButton;
