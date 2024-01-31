// DownloadButton.js
import React from "react";
import { exportToCSV } from './DataToExcel'; 
import "./DownloadButton.css";
import { FaFileDownload } from "react-icons/fa";

const DownloadButton = ({data}) => {
  const handleDownload = () => {
    exportToCSV(data, "pohang-avengers data"); 
  };

  return (
    <button onClick={handleDownload} className="download-button">엑셀파일 다운로드 <FaFileDownload className="file"/></button>
  );
};

export default DownloadButton;
