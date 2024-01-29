import { createColumnHelper } from "@tanstack/react-table";

const columnHelper = createColumnHelper();

export const columns = [
  columnHelper.accessor("date", { header: "측정일시", size: 120 }),
  columnHelper.accessor("location", {
    header: "측정위치",
    size: 100,
  }),
  columnHelper.accessor("pm25", {
    header: (
      <div>
        초미세먼지
        <div style={{ fontSize: "0.8em", fontWeight: "350", marginTop: "10" }}>
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
        <div style={{ fontSize: "0.8em", fontWeight: "350", marginTop: "10" }}>
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
  columnHelper.accessor("ch2o", {
    header: (
      <div>
        포름알데히드
        <div style={{ fontSize: "0.8em", fontWeight: "350", marginTop: "10" }}>
          CH2O (ppm)
        </div>
      </div>
    ),
    size: 80,
  }),
  columnHelper.accessor("wind_speed", {
    header: (
      <div>
        풍속
        <div style={{ fontSize: "0.8em", fontWeight: "350", marginTop: "10" }}>
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
        <div style={{ fontSize: "0.8em", fontWeight: "350", marginTop: "10" }}>
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
        <div style={{ fontSize: "0.8em", fontWeight: "350", marginTop: "10" }}>
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
        <div style={{ fontSize: "0.8em", fontWeight: "350", marginTop: "10" }}>
          {" "}
          (%)
        </div>
      </div>
    ),
    size: 80,
  }),
];
