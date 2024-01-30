import axiosInstance from './axiosInstance';
import  { locationFromNodeNumberOptions } from "../util.js";

export const makeFormattedTable = (responseJson,day,location) => {
  const transformedArray = [];
  const responseJsonData = responseJson.data;

  // 데이터 구조를 순회하면서 변환
  for( const [key,value] of Object.entries(responseJsonData["day"+day])){
    if (!key.startsWith("node")) continue;
    
    if(!location.match("전체"))
      if(!location.match(locationFromNodeNumberOptions[parseInt(key.replace("node",""),10)])) continue;
      
    transformedArray.push({
      date: responseJsonData["day"+day]["date"],
      location: locationFromNodeNumberOptions[parseInt(key.replace("node",""),10)],
      pm25: String(value["pm25-daily-average"].toFixed(2)),
      pm10: String(value["pm10-daily-average"].toFixed(2)),
      ch2o: String(value["ch2o-daily-average"].toFixed(2)),
      wind_speed: String(value["wind-speed-daily-average"].toFixed(2)), // 임의의 값으로 설정
      wind_direction: value["wind-direction-daily-average"], // 임의의 값으로 설정
      temperature: `${value["temperature-daily-average"].toFixed(2)} °C`,
      humidity: `${value["humidity-daily-average"].toFixed(2)} %`,
    });

  }

  return transformedArray;
};

export const fetchRTTableData = async ({selectedLocation, selectedDate, selectedUnit, selectedHour}) => {
    

    let formattedDate;
    let requestURL;
    let requestBody;

    const offset = selectedDate.getTimezoneOffset() * 60000;
    const adjustedDate = new Date(selectedDate.getTime() - offset);
    const isoString = adjustedDate.toISOString(); // ISO 8601 형식의 문자열로 변환
    const day = isoString.split('T')[0].slice(8, 10);


    if(selectedUnit.match("일평균")){
      requestURL = "/all-nodes/all-substances/daily-averages";

      formattedDate = isoString.split('T')[0].slice(0, 7); // 'YYYY-MM' 형식으로 변환
    }
    else{
      requestURL = "/all-nodes/all-substances/hourly-averages";
      formattedDate = adjustedDate.toISOString().split('T')[0];
    }

    requestBody = {
      date: formattedDate,
    };
    

    console.log("🚀 ~ handleTableSubmit ~ requestURL:", requestURL);
    console.log("🚀 ~ handleTableSubmit ~ requestBody:", requestBody);

    const response = await axiosInstance.post(requestURL, requestBody);


    return makeFormattedTable(response.data, day, selectedLocation);

    // return response.data;
};


export const fetchRTGraphData = async ({selectedLocation, selectedDate, selectedUnit, selectedHour}) => {
  let requestURL;
  const requestBody = {};

  const response = await axiosInstance.post(requestURL, requestBody);

  return response.data;
};