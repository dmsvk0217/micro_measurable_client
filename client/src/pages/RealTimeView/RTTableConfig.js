import { createColumnHelper } from "@tanstack/react-table";

export const data = [
    {
      date: "24-01-17 14:00",
      node: "뉴턴홀",
      pm25: "76",
      pm10: "151",
      HCHO: "0.002",
      wind_speed: "5m/s",
      wind_direction: "남서",
      temperature: "8 °C",
      humidity: "30%"
    },
    {
      date: "24-01-17 14:00",
      node: "그레이스홀",
      pm25: "56",
      pm10: "81",
      HCHO: "0.002",
      wind_speed: "5m/s",
      wind_direction: "남서",
      temperature: "8 °C",
      humidity: "30%"
    },
    {
      date: "24-01-17 14:00",
      node: "현동홀",
      pm25: "13",
      pm10: "15",
      HCHO: "0.002",
      wind_speed: "5m/s",
      wind_direction: "남서",
      temperature: "8 °C",
      humidity: "30%"
    },
    {
      date: "24-01-17 14:00",
      node: "느헤미야홀",
      pm25: "46",
      pm10: "42",
      HCHO: "0.002",
      wind_speed: "5m/s",
      wind_direction: "남서",
      temperature: "8 °C",
      humidity: "30%"
    },
    {
      date: "24-01-17 14:00",
      node: "오석관",
      pm25: "26",
      pm10: "98",
      HCHO: "0.002",
      wind_speed: "5m/s",
      wind_direction: "남서",
      temperature: "8 °C",
      humidity: "30%"
    },
    {
      date: "24-01-17 14:00",
      node: "채플별관",
      pm25: "77",
      pm10: "67",
      HCHO: "0.002",
      wind_speed: "5m/s",
      wind_direction: "남서",
      temperature: "8 °C",
      humidity: "30%"
    }
  ];
  

const columnHelper = createColumnHelper();

const months = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

export const columns = [
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

