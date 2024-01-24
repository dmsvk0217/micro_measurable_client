import React, { useState, useEffect } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import "./RTSelection.css";
import { FaCalendarAlt } from "react-icons/fa";
import CurrentDate from "../../../components/CurrentDate";

function RTSelection() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedHour, setSelectedHour] = useState("전체");
  const [selectedNode, setSelectedNode] = useState("0");
  const [selectedUnit, setSelectedUnit] = useState("일평균");

  const handleNodeSelect = (node) => {
    setSelectedNode(node);
  };

  const handleUnitSelect = (unit) => {
    setSelectedUnit(unit);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleHourSelect = (hour) => {
    setSelectedHour(hour);
  };

  const CustomDatePickerIcon = React.forwardRef(({ onClick }, ref) => (
    <button
      onClick={onClick}
      ref={ref}
      style={{ background: "none", border: "none" }}
    >
      <FaCalendarAlt style={{ color: "rgba(85,183,107)", fontSize: "1.2em" }} />
    </button>
  ));

  // 시간 배열 생성
  useEffect(() => {
    const now = new Date();
    const nearestHour = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      now.getHours(),
      0,
      0,
      0
    );
    setSelectedDate(nearestHour);
  }, []);

  const [responseData, setResponseData] = useState(null);
  const [responseError, setResponseError] = useState(null);
  const handleTableSubmit = async () => {
    console.log("🚀 ~ handleTableSubmit ~ selectedHour:", selectedHour);
    console.log("🚀 ~ handleTableSubmit ~ selectedNode:", selectedNode);
    console.log("🚀 ~ handleTableSubmit ~ selectedUnit:", selectedUnit);
    console.log("🚀 ~ handleTableSubmit ~ selectedDate:", selectedDate);

    let requestURL;
    const requestBody = {
      date: selectedDate.toISOString().split("T")[0],
    };

    if (selectedNode.match("0") && selectedUnit.match("일평균")) {
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

    if (!selectedNode.match("0") && selectedUnit.match("일평균")) {
      console.log("특정노드 일평균");
      requestBody["nodeAddress"] = selectedNode;
      requestURL =
        "http://localhost:4000/api/node/all-substances/daily-averages";
      /*
        특정 노드에 대한 모든 물질의 일평균 데이터
        /api/node/all-substances/daily-averages
        {
          "date":"2024-01-15"
          "nodeAddress": "2"
        }
      */
    }

    if (
      selectedNode.match("0") &&
      selectedUnit.match("시간평균") &&
      selectedHour.match("전체")
    ) {
      console.log("전체노드 시간평균 전체시간");
      alert("전체시간으로 검색시에는 상세 측정소명을 선택하셔야 합니다.");
    }

    if (
      selectedNode.match("0") &&
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
      !selectedNode.match("0") &&
      selectedUnit.match("시간평균") &&
      selectedHour.match("전체")
    ) {
      console.log("특정노드 시간평균 전체시간");
      requestBody["nodeAddress"] = selectedNode;
      requestURL =
        "http://localhost:4000/api/node/all-substances/all-hourly-averages";
      /*
        특정 노드에 대한 모든 물질의 일간 시간평균 데이터
        /api/node/all-substances/all-hourly-averages
        {
          ”date”:”2024-01”
          ”nodeAddress” : “4”
        }
      */
    }

    if (
      !selectedNode.match("0") &&
      selectedUnit.match("시간평균") &&
      !selectedHour.match("전체")
    ) {
      console.log("특정노드 시간평균 특정시간");
      requestBody["hour"] = selectedHour;
      requestBody["nodeAddress"] = selectedNode;
      requestURL =
        "http://localhost:4000/api/node/all-substances/hourly-averages";
      /*
        특정 노드에 대한 모든 물질의 시간평균 데이터
        /api/node/all-substances/hourly-averages
        {
          ”date”:”2024-01-15”
          ”hour”:”21”
          ”nodeAddress”:13
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
    <div className="RTTable">
      {/* table container section */}
      <div className="RT-table-select-container">
        <div>
          <div className="location-and-unit">
            <div className="RT-table-location">
              <p style={{ fontWeight: "bold", marginRight: "10px" }}>
                측정위치
              </p>
              <div className="RT-table-location-dropdown">
                <select
                  value={selectedNode}
                  onChange={(e) => handleNodeSelect(e.target.value)}
                  className="location-dropdown"
                >
                  <option value="0">전체</option>
                  <option value="1">뉴턴홀</option>
                  <option value="2">현동홀</option>
                  <option value="3">느헤미아홀</option>
                  <option value="4">오석관</option>
                  <option value="5">코너스톤홀</option>
                  <option value="6">올네이션스홀</option>
                  <option value="7">그레이스스쿨</option>
                  <option value="8">로멘틱잔디</option>
                  <option value="9">평봉필드</option>
                  <option value="10">히딩크 풋살장</option>
                  <option value="11">복지동</option>
                  <option value="12">채플앞</option>
                  <option value="13">하용조관</option>
                  <option value="14">벧엘관</option>
                  <option value="15">창조관</option>
                </select>
              </div>
            </div>
            <div className="RT-table-unit">
              <p style={{ fontWeight: "bold", marginRight: "10px" }}>
                측정단위
              </p>
              <div className="RT-table-location-dropdown">
                <select
                  value={selectedUnit}
                  onChange={(e) => handleUnitSelect(e.target.value)}
                  className="location-dropdown"
                >
                  <option value="시간평균">시간평균</option>
                  <option value="일평균">일평균</option>
                </select>
              </div>
            </div>
            <div className="RT-table-time">
              <p style={{ fontWeight: "bold", marginRight: "10px" }}>
                측정일시
              </p>
              <div className="time-dropdown" style={{ marginRight: "10px" }}>
                {selectedDate && (
                  <div style={{ marginLeft: "10px", marginRight: "10px" }}>
                    {selectedDate.toLocaleDateString()}
                  </div>
                )}
                <DatePicker
                  selected={selectedDate}
                  onChange={handleDateChange}
                  showTimeSelect={false}
                  dateFormat="MMMM d, yyyy h:mm aa"
                  customInput={<CustomDatePickerIcon />}
                />
              </div>
              {selectedUnit == "시간평균" ? (
                <select
                  value={selectedHour}
                  onChange={(e) => handleHourSelect(e.target.value)}
                  className="hour-dropdown"
                >
                  <option key="-1" value="전체">
                    전체
                  </option>
                  {Array.from({ length: 24 }, (_, index) => (
                    <option
                      key={index}
                      value={index < 10 ? "0" + index : index.toString()}
                    >
                      {`${index < 10 ? "0" + index : index.toString()}:00`}
                      {/* 시간 형식으로 표시 */}
                    </option>
                  ))}
                </select>
              ) : null}
            </div>
          </div>
          <div className="search-btn-container">
            <button className="search-btn" onClick={handleTableSubmit}>
              검색
            </button>
          </div>
        </div>
      </div>
      <p>
        <span className="RT-table-title">| 측정 일시 |</span> <CurrentDate />
      </p>
    </div>
  );
}

export default RTSelection;
