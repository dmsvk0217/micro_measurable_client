import { useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchSDData } from '../api/SDTableApi';
import useSDStore from '../store/SDStore';
import { locationFromNodeNumberOptions } from '../util';

export const useSDDataMutation = () => {
  // const queryClient = useQueryClient();
  const { locations, year, month, substance, setTableData, setGraphData } = useSDStore();

  const SDMutate = () => {
    return fetchSDData(locations, year, month, substance);
  };

  
  const makeFormattedTable = (responseJson) => {
    const transformedArray = [];
    const responseJsonData = responseJson.data;

    function isLeapYear(year){
      return ((year % 4 === 0) && (year % 100 !== 0) || (year % 400 === 0))
    }

    const getLocationNumber = (locations) => {
      const invertedOptions = Object.fromEntries(
        Object.entries(locationFromNodeNumberOptions).map(([number, name]) => [name, number])
      );
      
      return invertedOptions[locations];
    }

    if(isLeapYear(year)){//윤년
      if(month === "1월" || month === "3월" || month === "5월" || month === "7월" || month === "8월" || month === "10월" || month === "12월"){//31일
        var averarr = new Array(31);
        var nodelocation;
        
        if(substance === "포름알데히드"){
          if(locations === "전체"){
            var day;
            for(day = 1; day <= 31; day++){
              if(day < 10){
                var sday = "0"+String(day);
              }
              else{
                sday = String(day);
              }
              
              for( const [key, value] of Object.entries(responseJsonData["day"+sday])){
                console.log("위치 => 숫자로 변환 : ", locationFromNodeNumberOptions[parseInt(key.replace("node",""),10)])
                //averarr[day-1] = String(value["ch2o-daily-average"].toFixed(2));
              }
            }
            transformedArray.push({
              

            })
            // transformedArray.push({
            //   date: responseJsonData["day"+day]["date"],
            //   location: locationFromNodeNumberOptions[parseInt(key.replace("node",""),10)],
            //   pm25: String(value["pm25-daily-average"].toFixed(2)),
            //   pm10: String(value["pm10-daily-average"].toFixed(2)),
            //   ch2o: String(value["ch2o-daily-average"].toFixed(2)),
            //   wind_speed: String(value["wind-speed-daily-average"].toFixed(2)), // 임의의 값으로 설정
            //   wind_direction: value["wind-direction-daily-average"], // 임의의 값으로 설정
            //   temperature: `${value["temperature-daily-average"].toFixed(2)} °C`,
            //   humidity: `${value["humidity-daily-average"].toFixed(2)} %`,
            // });
        
          }
          else{
            
          }
        }
        else if(substance === "PM10"){
          if(locations === "전체"){

          }
          else{
            
          }
        }
        else if(substance === "PM2.5"){
          if(locations === "전체"){

          }
          else{
            
          }
        }
        else if(substance === "온도"){
          if(locations === "전체"){

          }
          else{
            
          }
        }
        else if(substance === "습도"){
          if(locations === "전체"){

          }
          else{
            
          }
        }
        else if(substance === "풍향"){
          if(locations === "전체"){

          }
          else{
            
          }
        }
        else{//풍량
          if(locations === "전체"){

          }
          else{
            
          }
        }
      }
      else if(month === "2월"){//29알
        if(substance === "포름알데히드"){
          if(locations === "전체"){

          }
          else{
            
          }
        }
        else if(substance === "PM10"){
          if(locations === "전체"){

          }
          else{
            
          }
        }
        else if(substance === "PM2.5"){
          if(locations === "전체"){

          }
          else{
            
          }
        }
        else if(substance === "온도"){
          if(locations === "전체"){

          }
          else{
            
          }
        }
        else if(substance === "습도"){
          if(locations === "전체"){

          }
          else{
            
          }
        }
        else if(substance === "풍향"){
          if(locations === "전체"){

          }
          else{
            
          }
        }
        else{//풍량
          if(locations === "전체"){

          }
          else{
            
          }
        }
      }
      else{//30일
        if(substance === "포름알데히드"){
          if(locations === "전체"){

          }
          else{
            
          }
        }
        else if(substance === "PM10"){
          if(locations === "전체"){

          }
          else{
            
          }
        }
        else if(substance === "PM2.5"){
          if(locations === "전체"){

          }
          else{
            
          }
        }
        else if(substance === "온도"){
          if(locations === "전체"){

          }
          else{
            
          }
        }
        else if(substance === "습도"){
          if(locations === "전체"){

          }
          else{
            
          }
        }
        else if(substance === "풍향"){
          if(locations === "전체"){

          }
          else{
            
          }
        }
        else{//풍량
          if(locations === "전체"){

          }
          else{
            
          }
        }
      }
    }
    else{//평년
      if(month === "1월" || month === "3월" || month === "5월" || month === "7월" || month === "8월" || month === "10월" || month === "12월"){//31일
        if(substance === "포름알데히드"){
          if(locations === "전체"){

          }
          else{
            
          }
        }
        else if(substance === "PM10"){
          if(locations === "전체"){

          }
          else{
            
          }
        }
        else if(substance === "PM2.5"){
          if(locations === "전체"){

          }
          else{
            
          }
        }
        else if(substance === "온도"){
          if(locations === "전체"){

          }
          else{
            
          }
        }
        else if(substance === "습도"){
          if(locations === "전체"){

          }
          else{
            
          }
        }
        else if(substance === "풍향"){
          if(locations === "전체"){

          }
          else{
            
          }
        }
        else{//풍량
          if(locations === "전체"){

          }
          else{
            
          }
        }
      }
      else if(month === "2월"){//28알
        if(substance === "포름알데히드"){
          if(locations === "전체"){

          }
          else{
            
          }
        }
        else if(substance === "PM10"){
          if(locations === "전체"){

          }
          else{
            
          }
        }
        else if(substance === "PM2.5"){
          if(locations === "전체"){

          }
          else{
            
          }
        }
        else if(substance === "온도"){
          if(locations === "전체"){

          }
          else{
            
          }
        }
        else if(substance === "습도"){
          if(locations === "전체"){

          }
          else{
            
          }
        }
        else if(substance === "풍향"){
          if(locations === "전체"){

          }
          else{
            
          }
        }
        else{//풍량
          if(locations === "전체"){

          }
          else{
            
          }
        }
      }
      else{//30일
        if(substance === "포름알데히드"){
          if(locations === "전체"){

          }
          else{
            
          }
        }
        else if(substance === "PM10"){
          if(locations === "전체"){

          }
          else{
            
          }
        }
        else if(substance === "PM2.5"){
          if(locations === "전체"){

          }
          else{
            
          }
        }
        else if(substance === "온도"){
          if(locations === "전체"){

          }
          else{
            
          }
        }
        else if(substance === "습도"){
          if(locations === "전체"){

          }
          else{
            
          }
        }
        else if(substance === "풍향"){
          if(locations === "전체"){

          }
          else{
            
          }
        }
        else{//풍량
          if(locations === "전체"){

          }
          else{
            
          }
        }
      }
    }    
      
    return transformedArray;
  };

  const mutation = useMutation({
      mutationFn: SDMutate,
      onSuccess: (data, variables, context) => {
        //setTableData(data);
        console.log("✅ SMStore success", data);
        makeFormattedTable(data);
      },
      onError: (error, variables, context) => {
        console.log("🚨 SMStore error", error);
      },
      onSettled: (data, error, variables, context) => {
        console.log("🚀 Loading...");
      },
      retry: 1,//오류 발생시, 1회 더 시도
  });

  return mutation;
}

