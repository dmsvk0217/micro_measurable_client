import { createColumnHelper } from "@tanstack/react-table";

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
