import { useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchDailyAverages, fetchHourlyAverages } from '../api/axiosApi.js';
import useRTStore from '../store/RTStore';
import  { locationFromNodeNumberOptions, substanceHourlyEnum } from "../util.js";

export const useRTTableDataMutation = () => {
  // const queryClient = useQueryClient();
  const { setTableData, tableLocation, tableUnit, tableDate, tableHour } = useRTStore();

  const tableMutate = () => {
    if(tableUnit.match("일평균")){
      const year = String(tableDate.getFullYear());
      const month = String(tableDate.getMonth() + 1);

      console.log(year, month);
      return fetchDailyAverages(year, month);
    }
    else{//tableUnit이 시간평균일때
      const offset = tableDate.getTimezoneOffset() * 60000;
      const adjustedDate = new Date(tableDate.getTime() - offset);

      return fetchHourlyAverages(adjustedDate);
    }
  };

  const mutation = useMutation({
      mutationFn: tableMutate,
      onSuccess: (data, variables, context) => {
        console.log("✅ RTStore table success", data);
        // const queryClient = useQueryClient(); // 캐시 데이터된 무효화 -> 다시 실행 -> 최신 데이터
        if(tableUnit.match("일평균")){
          setTableData(makeFormattedTableDaily(data));
        }
        else{//tableUnit이 시간평균일때
          setTableData(makeFormattedTableHourly(data));
        }
      },
      onError: (error, variables, context) => {
        console.log("🚨 RTStore table error", error);
      },
      onSettled: (data, error, variables, context) => {
        // console.log("🚀 Loading table ...");
      },
      //retry: 1,//오류 발생시, 1회 더 시도
  });


  //responseData parsing
  const makeFormattedTableDaily = (responseJson) => {
    const transformedArray = [];
    const responseJsonData = responseJson.data;

    const offset = tableDate.getTimezoneOffset() * 60000;
    const adjustedDate = new Date(tableDate.getTime() - offset);
    const isoString = adjustedDate.toISOString(); // ISO 8601 형식의 문자열로 변환
    const day = isoString.split('T')[0].slice(8, 10);

  
    // 데이터 구조를 순회하면서 변환
    for( const [key,value] of Object.entries(responseJsonData["day"+day])){
      if (!key.startsWith("node")) continue;
      
      if(!tableLocation.match("전체"))
        if(!tableLocation.match(locationFromNodeNumberOptions[parseInt(key.replace("node",""),10)])) continue;
  
      transformedArray.push({
        date: responseJsonData["day"+day]["date"],
        location: locationFromNodeNumberOptions[parseInt(key.replace("node",""),10)],
        pm25: String(value["pm25-daily-average"] ? value["pm25-daily-average"].toFixed(2): '-'),
        pm10: String(value["pm10-daily-average"] ? value["pm10-daily-average"].toFixed(2): '-'),
        ch2o: String(value["ch2o-daily-average"] ? value["ch2o-daily-average"].toFixed(2): '-'),
        wind_speed: String(value["wind-speed-daily-average"].toFixed(2)), // 임의의 값으로 설정
        wind_direction: value["wind-direction-daily-average"] ?? '-', // 임의의 값으로 설정
        temperature: `${value["temperature-daily-average"] ? value["temperature-daily-average"].toFixed(2) : '-'} °C`,
        humidity: `${value["humidity-daily-average"] ? value["humidity-daily-average"].toFixed(2): '-'} %`,
      });
    }

    return transformedArray;
  };

  const makeFormattedTableHourly = (responseJson) => {
    const transformedArray = [];
    const responseJsonData = responseJson.data;

    let hour = tableHour.split(":")[0]; 

    const offset = tableDate.getTimezoneOffset() * 60000;
    const adjustedDate = new Date(tableDate.getTime() - offset);
    const isoString = adjustedDate.toISOString(); // ISO 8601 형식의 문자열로 변환
    const day = isoString.split('T')[0] + "  ";


    if(!tableHour.match('전체')){
      // console.log("🤪",'hour'+hour);
      for( const [nodeKey, nodeValue] of Object.entries(responseJsonData['hour'+hour])){
        if(!nodeKey.startsWith("node")) continue;

        if(!tableLocation.match("전체"))
          if(!tableLocation.match(locationFromNodeNumberOptions[parseInt(nodeKey.replace("node",""),10)])) continue;
          
          // console.log("🥸",nodeKey, nodeValue, day);
          transformedArray.push({
            date: day + tableHour,
            location: locationFromNodeNumberOptions[parseInt(nodeKey.replace("node",""),10)],
            pm25: String(nodeValue["pm25-hourly-average"] ? nodeValue["pm25-hourly-average"].toFixed(2): ''),
            pm10: String(nodeValue["pm10-hourly-average"] ? nodeValue["pm10-hourly-average"].toFixed(2): ''),
            ch2o: String(nodeValue["ch2o-hourly-average"] ? nodeValue["ch2o-hourly-average"].toFixed(2): ''),
            wind_speed: String(nodeValue["wind-speed-hourly-average"] ? nodeValue["wind-speed-hourly-average"].toFixed(2): ''), // 임의의 값으로 설정
            wind_direction: nodeValue["wind-direction-hourly-average"] ?? '', // 임의의 값으로 설정
            temperature: `${nodeValue["temperature-hourly-average"] ? nodeValue["temperature-hourly-average"].toFixed(2): ''} °C`,
            humidity: `${nodeValue["humidity-hourly-average"] ? nodeValue["humidity-hourly-average"].toFixed(2): ''} %`,
          });

      }
    }
    else{
      for( const [hourKey, hourValue] of Object.entries(responseJsonData)){
        if(!hourKey.startsWith("hour")) continue;

        for( const [nodeKey, nodeValue] of Object.entries(hourValue)){
          if(!nodeKey.startsWith("node")) continue;
          if(!tableLocation.match(locationFromNodeNumberOptions[parseInt(nodeKey.replace("node",""),10)])) continue;
          
          console.log("🥸",nodeKey, nodeValue, day);
          transformedArray.push({
            date: day + hourKey.slice(4,6)+":00",
            location: locationFromNodeNumberOptions[parseInt(nodeKey.replace("node",""),10)],
            pm25: String(nodeValue["pm25-hourly-average"] ? nodeValue["pm25-hourly-average"].toFixed(2): ''),
            pm10: String(nodeValue["pm10-hourly-average"] ? nodeValue["pm10-hourly-average"].toFixed(2): ''),
            ch2o: String(nodeValue["ch2o-hourly-average"] ? nodeValue["ch2o-hourly-average"].toFixed(2): ''),
            wind_speed: String(nodeValue["wind-speed-hourly-average"] ? nodeValue["wind-speed-hourly-average"].toFixed(2): ''), // 임의의 값으로 설정
            wind_direction: nodeValue["wind-direction-hourly-average"] ?? '', // 임의의 값으로 설정
            temperature: `${nodeValue["temperature-hourly-average"] ? nodeValue["temperature-hourly-average"].toFixed(2): ''} °C`,
            humidity: `${nodeValue["humidity-hourly-average"] ? nodeValue["humidity-hourly-average"].toFixed(2): ''} %`,
          });
        }

        
      }
    }



    return transformedArray;
  }


  return mutation;
}


export const useRTGraphDataMutation = () => {
  // const queryClient = useQueryClient();
  const { setGraphData, graphLocation, graphSubstance } = useRTStore();

  const graphMutate = () => {
    return fetchHourlyAverages(new Date(2024,0,2));//🚨🚨 날짜 수정필요!
  };

  const mutation = useMutation({
      mutationFn: graphMutate,
      onSuccess: (data, variables, context) => {
        console.log("✅ RTStore graph success", data);
        // const queryClient = useQueryClient(); // 캐시 데이터된 무효화 -> 다시 실행 -> 최신 데이터
        setGraphData(makeFormattedGraph(data));
      },
      onError: (error, variables, context) => {
        console.log("🚨 RTStore graph error", error);
      },
      onSettled: (data, error, variables, context) => {
        // console.log("🚀 Loading graph...");
      },
      //retry: 1,//오류 발생시, 1회 더 시도
  });


  //responseData parsing
  const makeFormattedGraph = (responseJson) => {
    const transformedArray = [];
    const responseJsonData = responseJson["data"];
    // console.log("🏁",responseJson);
  
  
    // 데이터 구조를 순회하면서 변환
    for( const [hourKey,hourNode] of Object.entries(responseJsonData)){//key -> hour00
  
      // console.log("🕖",hourKey);
        
      for(const [nodeKey,nodeValue] of Object.entries(hourNode)){
        if(!nodeKey.includes("node")) continue;
        if(!graphLocation.match(locationFromNodeNumberOptions[parseInt(nodeKey.replace("node",""),10)])) continue;//특정 location으로 거르기
        // console.log("📍",nodeKey,locationFromNodeNumberOptions[parseInt(nodeKey.replace("node",""),10)]);
       
  
        for(const [substanceKey,substanceValue] of Object.entries(nodeValue)){
          if(!substanceKey.match(substanceHourlyEnum[graphSubstance])) continue;
          // console.log("🌡️",graphSubstance);
  
          transformedArray.push(
            substanceValue
          );
        }
        
      }
    }
    
    // console.log("😝",transformedArray);
    return transformedArray;
  };


  return mutation;
}