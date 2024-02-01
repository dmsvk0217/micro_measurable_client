import axiosInstance from './axiosInstance';
import  { locationFromNodeNumberOptions } from "../util.js";


export const fetchSMTableData = async ({selectedLocation, selectedYear, selectedSubstance}) => {
    

    let formattedDate;
    let requestURL;
    let requestBody;

    requestURL = "/api/all-nodes/all-substances/monthly-averages";
    formattedDate = selectedYear;
    //isoString.split('T')[0].slice(0, 4);
  
    requestBody = {
      date: formattedDate,
    };
    

    console.log("🚀 ~ handleTableSubmit ~ requestURL:", requestURL);
    console.log("🚀 ~ handleTableSubmit ~ requestBody:", requestBody);

    const response = await axiosInstance.post(requestURL, requestBody);


    return response.data;

    // return response.data;
};