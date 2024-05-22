import axiosInstance from './axiosInstance';


// 실시간 로우 데이텨
export const fetchRawData = async (date) => {

  let requestURL = "/api/rawData/day";

  const requestBody = {
      date,
  }
  const response = await axiosInstance.post(requestURL, requestBody);

  console.log(response);
  return response.data;
};

//시간별 평균
export const fetchHourlyAverages = async (date) => {
    let formattedDate = date.toISOString().split('T')[0];
  
    let requestURL = "/api/all-nodes/all-substances/hourly-averages";
    const requestBody = {
      date : formattedDate, // formattedDate "2024-01-01"
    };

    console.log("🚀 ~ handleTableSubmit ~ requestURL:", requestURL);
    console.log("🚀 ~ handleTableSubmit ~ requestBody:", requestBody);
    
    const response = await axiosInstance.post(requestURL, requestBody);
  
    return response.data;
};


// 일별 평균
export const fetchDailyAverages = async (year, month) => {
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

    return response.data;
};


// 월별 평균
export const fetchMonthlyAverages = async (year) => {

    let requestURL;
    let requestBody;
 
    requestURL = "/api/all-nodes/all-substances/monthly-averages";
  
    requestBody = {
      date: year,
    };
    

    console.log("🚀 ~ handleTableSubmit ~ requestURL:", requestURL);
    console.log("🚀 ~ handleTableSubmit ~ requestBody:", requestBody);

    const response = await axiosInstance.post(requestURL, requestBody);

    return response.data;
};