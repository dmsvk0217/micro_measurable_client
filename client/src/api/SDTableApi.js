import axiosInstance from './axiosInstance';
import  { locationFromNodeNumberOptions } from "../util.js";


export const fetchSDData = async (location, year, month, substance) => {
    

    let formattedDate;
    let requestURL;
    let requestBody;

    const cmonth = month.slice(0,1);

    requestURL = "/api/all-nodes/all-substances/daily-averages";
    
    if(cmonth >= "10"){
      requestBody = {
        date: year+"-"+cmonth,
      };
    }
    else{
      requestBody = {
        date: year+"-0"+cmonth,
      };
    }
    

    console.log("🚀 ~ handleTableSubmit ~ requestURL:", requestURL);
    console.log("🚀 ~ handleTableSubmit ~ requestBody:", requestBody);

    const response = await axiosInstance.post(requestURL, requestBody);

    console.log("🚀🚀response", response.data)
    return response.data;

    // return response.data;
};


/*export const fetchRTGraphData = async ({selectedLocation, selectedDate, selectedUnit, selectedHour}) => {
  let requestURL;
  const requestBody = {};

  const response = await axiosInstance.post(requestURL, requestBody);

  return response.data;
};*/