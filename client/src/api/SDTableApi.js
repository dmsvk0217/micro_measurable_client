import axiosInstance from './axiosInstance';
import  { locationFromNodeNumberOptions } from "../util.js";


export const fetchSDTableData = async ({selectedLocation, selectedDate, selectedSubstance, selectedUnit}) => {
    

    let formattedDate;
    let requestURL;
    let requestBody;

    const offset = selectedDate.getTimezoneOffset() * 60000;
    const adjustedDate = new Date(selectedDate.getTime() - offset);
    const isoString = adjustedDate.toISOString(); // ISO 8601 형식의 문자열로 변환
    const day = isoString.split('T')[0].slice(8, 10);


    requestURL = "/api/all-nodes/all-substances/daily-averages";
    formattedDate = isoString.split('T')[0].slice(0, 7); // 'YYYY-MM' 형식으로 변환

    requestBody = {
      date: formattedDate,
    };
    

    console.log("🚀 ~ handleTableSubmit ~ requestURL:", requestURL);
    console.log("🚀 ~ handleTableSubmit ~ requestBody:", requestBody);

    const response = await axiosInstance.post(requestURL, requestBody);


    return response.data;

    // return response.data;
};


/*export const fetchRTGraphData = async ({selectedLocation, selectedDate, selectedUnit, selectedHour}) => {
  let requestURL;
  const requestBody = {};

  const response = await axiosInstance.post(requestURL, requestBody);

  return response.data;
};*/