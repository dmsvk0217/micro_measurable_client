import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import "./RTTable.css";
import { FaCalendarAlt } from "react-icons/fa";
import { tableData } from "./tableData";
import CurrentDate from "../../../components/CurrentDate";

function RTTable() {
  const [data] = useState([...tableData]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedHour, setSelectedHour] = useState("전체");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedNode, setSelectedNode] = useState("전체");
  const [selectedUnit, setSelectedUnit] = useState("시간평균");

  const handleNodeSelect = (node) => {
    setSelectedNode(node);
    setDropdownOpen(false);
  };

  const handleUnitSelect = (unit) => {
    setSelectedUnit(unit);
    setDropdownOpen(false);
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

  // table column 지정
  const columnHelper = createColumnHelper();
  const columns = [
    columnHelper.accessor("date", { header: "측정일시", size: 120 }),
    columnHelper.accessor("node", {
      header: "측정위치",
      size: 100,
    }),
    columnHelper.accessor("pm25", {
      header: (
        <div>
          초미세먼지
          <div
            style={{ fontSize: "0.8em", fontWeight: "350", marginTop: "10" }}
          >
            PM-2.5 (㎍/㎥)
          </div>
        </div>
      ),
      size: 80,
      cell: ({ renderValue }) => {
        const pm25Value = renderValue();
        let className = "";

        if (pm25Value >= 76) {
          className = "isWorse";
        } else if (pm25Value >= 36) {
          className = "isBad";
        } else if (pm25Value >= 16) {
          className = "isNormal";
        } else if (pm25Value >= 0) {
          className = "isGood";
        }

        return <div className={className}>{pm25Value}</div>;
      },
    }),
    columnHelper.accessor("pm10", {
      header: (
        <div>
          미세먼지
          <div
            style={{ fontSize: "0.8em", fontWeight: "350", marginTop: "10" }}
          >
            PM-10 (㎍/㎥)
          </div>
        </div>
      ),
      size: 80,
      cell: ({ renderValue }) => {
        const pm10Value = renderValue();
        let className = "";

        if (pm10Value >= 151) {
          className = "isWorse";
        } else if (pm10Value >= 81) {
          className = "isBad";
        } else if (pm10Value >= 31) {
          className = "isNormal";
        } else if (pm10Value >= 0) {
          className = "isGood";
        }

        return <div className={className}>{pm10Value}</div>;
      },
    }),
    columnHelper.accessor("HCHO", {
      header: (
        <div>
          포름알데히드
          <div
            style={{ fontSize: "0.8em", fontWeight: "350", marginTop: "10" }}
          >
            HCHO (ppm)
          </div>
        </div>
      ),
      size: 80,
    }),
    columnHelper.accessor("wind_speed", {
      header: (
        <div>
          풍속
          <div
            style={{ fontSize: "0.8em", fontWeight: "350", marginTop: "10" }}
          >
            {" "}
            (m/s)
          </div>
        </div>
      ),
      size: 80,
    }),
    columnHelper.accessor("wind_direction", {
      header: (
        <div>
          풍향
          <div
            style={{ fontSize: "0.8em", fontWeight: "350", marginTop: "10" }}
          >
            {" "}
            (방향 기호)
          </div>
        </div>
      ),
      size: 80,
    }),
    columnHelper.accessor("temperature", {
      header: (
        <div>
          온도
          <div
            style={{ fontSize: "0.8em", fontWeight: "350", marginTop: "10" }}
          >
            {" "}
            (°C)
          </div>
        </div>
      ),
      size: 80,
    }),
    columnHelper.accessor("humidity", {
      header: (
        <div>
          습도
          <div
            style={{ fontSize: "0.8em", fontWeight: "350", marginTop: "10" }}
          >
            {" "}
            (%)
          </div>
        </div>
      ),
      size: 80,
    }),
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const [responseData, setResponseData] = useState(null);
  const [responseError, setResponseError] = useState(null);
  const handleTableSubmit = async () => {
    /* 
      모든 노드에 대한 모든 물질의 일평균 데이터
      /api/all-nodes/all-substances/daily-averages
      {
        date : "2024-01-01"
      }

      특정 노드에 대한 모든 물질의 일평균 데이터
      /api/node/all-substances/daily-averages
      {
        "date":"2024-01-15"
        "nodeAddress": "2"
      }
      
      모든 노드에 대한 모든 물질의 시간평균 데이터
      /api/all-nodes/all-substances/hourly-averages
      {
        ”date”:”2024-01-15”
        ”hour”:”08”
      }

      특정 노드에 대한 모든 물질의 시간평균 데이터
      /api/node/all-substances/hourly-averages
      {
        ”date”:”2024-01-15”
        ”hour”:”21”
        ”nodeAddress”:13
      }

      특정 노드에 대한 모든 물질의 일간 시간평균 데이터
      /api/node/all-substances/all-hourly-averages
      {
        ”date”:”2024-01”
        ”nodeAddress” : “4”
      }

    */
    console.log("🚀 ~ handleTableSubmit ~ selectedHour:", selectedHour);
    console.log("🚀 ~ handleTableSubmit ~ selectedNode:", selectedNode);
    console.log("🚀 ~ handleTableSubmit ~ selectedUnit:", selectedUnit);
    console.log("🚀 ~ handleTableSubmit ~ selectedDate:", selectedDate);

    const requestBody = {};

    if (selectedNode.match("전체") && selectedUnit.match("일평균")) {
      console.log("전체노드 일평균");
    }

    if (!selectedNode.match("전체") && selectedUnit.match("일평균")) {
      console.log("특정노드 일평균");
    }

    if (
      selectedNode.match("전체") &&
      selectedUnit.match("시간평균") &&
      selectedHour.match("전체")
    ) {
      console.log("전체노드 시간평균 전체시간");
      alert("전체시간으로 검색시에는 상세 측정소명을 선택하셔야 합니다.");
    }

    if (
      selectedNode.match("전체") &&
      selectedUnit.match("시간평균") &&
      !selectedHour.match("전체")
    ) {
      console.log("전체노드 시간평균 특정시간");
    }

    if (
      !selectedNode.match("전체") &&
      selectedUnit.match("시간평균") &&
      selectedHour.match("전체")
    ) {
      console.log("특정노드 시간평균 전체시간");
    }

    if (
      !selectedNode.match("전체") &&
      selectedUnit.match("시간평균") &&
      !selectedHour.match("전체")
    ) {
      console.log("특정노드 시간평균 특정시간");
    }

    // try {
    //   const response = await axios.get(
    //     "http://localhost:4000/api/all-nodes/all-substances/daily-averages"
    //   );
    //   setResponseData(response.data);
    //   console.log("🚀 ~ handleTableSubmit ~ response.data:", response.data);
    // } catch (error) {
    //   setResponseError(error);
    // }
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
                  <option value="전체">전체</option>
                  <option value="뉴턴홀">뉴턴홀</option>
                  <option value="하용조관">하용조관</option>
                  <option value="현동홀">현동홀</option>
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
                    <option key={index} value={index.toString()}>
                      {`${index}:00`}
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

      {/* table section */}
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} style={{ width: header.getSize() }}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default RTTable;
