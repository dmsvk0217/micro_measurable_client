import axiosInstance from './axiosInstance';


export const fetchMapData = async (graphLocation, graphSubstance) => {


    //시차 영향 제거
    const offset = new Date().getTimezoneOffset() * 60000;
    const adjustedDate = new Date(new Date().getTime() - offset);
    let formattedDate = adjustedDate.toISOString().split('T')[0];
  
    let requestURL = "/api/all-nodes/all-substances/hourly-averages";
    const requestBody = {
      date : "2024-01-01",// formattedDate
    };
    
    const response = await axiosInstance.post(requestURL, requestBody);
  
    //console.log(makeFormattedGraph(response,selectedLocation,selectedSubstance));
  
    return makeFormattedGraph(response,graphLocation, graphSubstance );
  };