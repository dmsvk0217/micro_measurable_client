// client/src/pages/StatisticsView/Day/SDTableConfig.js
import { createColumnHelper } from "@tanstack/react-table";

const columnHelper = createColumnHelper();

const days = [
  "01", "02","03","04","05","06","07","08","09","10",
  "11","12","13","14","15","16","17","18","19","20",
  "21","22","23","24","25","26","27","28","29","30","31"
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
