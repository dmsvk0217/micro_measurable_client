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

const months = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

export const columns = [
  columnHelper.accessor("node", {
    header: "측정위치",
    size: 100,
  }),
  columnHelper.accessor("average", {
    header: "평균",
    size: 90,
  }),
  // ... 다른 열
];

for (const month of months) {
  columns.push(
    columnHelper.accessor(month, {
      header: `${months.indexOf(month) + 1}월`,
      size: 80,
    })
  );
}
