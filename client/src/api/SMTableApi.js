import axiosInstance from './axiosInstance';
import  { locationFromNodeNumberOptions } from "../util.js";
import useSMStore from '../store/SMStore.js';


export const fetchSMData = async (selectedLocation, selectedYear, selectedSubstance) => {

    let requestURL;
    let requestBody;

    requestURL = "/api/all-nodes/all-substances/monthly-averages";
  
    requestBody = {
      date: selectedYear,
    };
    

    console.log("🚀 ~ handleTableSubmit ~ requestURL:", requestURL);
    console.log("🚀 ~ handleTableSubmit ~ requestBody:", requestBody);

    const response = await axiosInstance.post(requestURL, requestBody);


    return response.data;

    // return response.data;
};