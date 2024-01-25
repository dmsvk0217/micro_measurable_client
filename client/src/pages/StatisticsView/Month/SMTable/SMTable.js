import React, { useState, useEffect } from "react";
import './SMTable.css';
import './SMTable.css';
import axios from "axios";
import { SMTableData } from "./SMTableData";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

function SMTable(){
  const [data] = useState([...SMTableData]);
    const columnHelper = createColumnHelper();
    const months = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    
    const columns = [
      columnHelper.accessor("node", {
        header: "측정위치",
        size: 100,
      }),
      columnHelper.accessor("average", {
        header: "평균",
        size: 90,
      }),
    ];
    
    for (const month of months) {
      columns.push(
        columnHelper.accessor(month, {
          header: `${months.indexOf(month) + 1}월`,
          size: 80,
        })
      );
    }
    const table = useReactTable({
      data,
      columns,
      getCoreRowModel: getCoreRowModel(),
    });
    

    return (
        <div className="SMTable">
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

export default SMTable;