import axiosInstance from './axiosInstance';


export const fetchRTTableData = async ({selectedLocation, selectedDate, selectedUnit, selectedHour}) => {
    

    let formattedDate;
    let requestURL;
    let requestBody;

    const offset = selectedDate.getTimezoneOffset() * 60000;
    const adjustedDate = new Date(selectedDate.getTime() - offset);


    if(selectedUnit.match("일평균")){
      requestURL = "/all-nodes/all-substances/daily-averages";

      const isoString = adjustedDate.toISOString(); // ISO 8601 형식의 문자열로 변환
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


    return response.data;
};


export const fetchRTGraphData = async ({selectedLocation, selectedDate, selectedUnit, selectedHour}) => {
  let requestURL;
  const requestBody = {};

  const response = await axiosInstance.post(requestURL, requestBody);

  return response.data;
};