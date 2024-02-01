// client/src/pages/StatisticsView/Day/SDTableConfig.js
import { createColumnHelper } from "@tanstack/react-table";

export const data = [
    {
        node: "뉴턴홀",
        average: "23",
        Jan: "23",
        Feb: "",
        Mar: "",
        Apr: "",
        May: "",
        Jun: "",
        Jul: "",
        Aug: "",
        Sep: "",
        Oct: "",
        Nov: "",
        Dec: ""
    },
    {
        node: "그레이스홀",
        average: "21",
        Jan: "21",
        Feb: "",
        Mar: "",
        Apr: "",
        May: "",
        Jun: "",
        Jul: "",
        Aug: "",
        Sep: "",
        Oct: "",
        Nov: "",
        Dec: ""
    },
    {
        node: "그레이스홀",
        average: "21",
        Jan: "21",
        Feb: "",
        Mar: "",
        Apr: "",
        May: "",
        Jun: "",
        Jul: "",
        Aug: "",
        Sep: "",
        Oct: "",
        Nov: "",
        Dec: ""
    },
    {
        node: "현동홀",
        average: "25",
        Jan: "25",
        Feb: "",
        Mar: "",
        Apr: "",
        May: "",
        Jun: "",
        Jul: "",
        Aug: "",
        Sep: "",
        Oct: "",
        Nov: "",
        Dec: ""
    },
    {
        node: "오석관",
        average: "28",
        Jan: "28",
        Feb: "",
        Mar: "",
        Apr: "",
        May: "",
        Jun: "",
        Jul: "",
        Aug: "",
        Sep: "",
        Oct: "",
        Nov: "",
        Dec: ""
    },

]

const columnHelper = createColumnHelper();

const days = [
  "1", "2","3","4","5","6","7","8","9","10",
  "11","12","13","14","15","16","17","18","19","20",
  "21","22","23","24","25","26","27","28","29","30"
];

export const columns = [
  columnHelper.accessor("node", {
    header: "위치",
    size: 100,
  }),
  columnHelper.accessor("average", {
    header: "평균",
    size: 90,
  }),
  // ... 다른 열
];

for (const day of days) {
  columns.push(
    columnHelper.accessor(day, {
      header: `${days.indexOf(day) + 1}`,
      size: 80,
    })
  );
}
