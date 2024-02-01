import axiosInstance from './axiosInstance';
import  { locationFromNodeNumberOptions } from "../util.js";

export const makeFormattedTable = (responseJson, year, substance, location) => {
  const transformedArray = [];
  const responseJsonData = responseJson.data;

  // 데이터 구조를 순회하면서 변환
  /*for( const [key,value] of Object.entries(responseJsonData["day"+day])){//한 년을 들고 와서 한 달씩 
    if (!key.startsWith("node")) continue;

    if (selectedSubstance === "포름알데히드"){
      
    }
    else if (selectedSubstance === "PM10"){

    }
    else if (selectedSubstance === "PM2.5"){

    }
    else if (selectedSubstance === "온도"){

    }
    else if (selectedSubstance === "습도"){

    }
    else if (selectedSubstance === "풍향"){

    }
    else {//풍속

    }
    
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
  */
};

export const fetchSMTableData = async ({selectedLocation, selectedYear, selectedSubstance}) => {
    

    let formattedDate;
    let requestURL;
    let requestBody;

    //const offset = selectedDate.getTimezoneOffset() * 60000;
    //const adjustedDate = new Date(selectedDate.getTime() - offset);
    //const isoString = adjustedDate.toISOString(); // ISO 8601 형식의 문자열로 변환
    //const day = isoString.split('T')[0].slice(8, 10);

    requestURL = "/api/all-nodes/all-substances/monthly-averages";
    formattedDate = selectedYear;
    //isoString.split('T')[0].slice(0, 4);
  
    requestBody = {
      date: formattedDate,
    };
    

    console.log("🚀 ~ handleTableSubmit ~ requestURL:", requestURL);
    console.log("🚀 ~ handleTableSubmit ~ requestBody:", requestBody);

    const response = await axiosInstance.post(requestURL, requestBody);


    return makeFormattedTable(response.data, selectedYear, selectedSubstance, selectedLocation);

    // return response.data;
};


/*export const fetchRTGraphData = async ({selectedLocation, selectedDate, selectedUnit, selectedHour}) => {
  let requestURL;
  const requestBody = {};

  const response = await axiosInstance.post(requestURL, requestBody);

  return response.data;
};*/