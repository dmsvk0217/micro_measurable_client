import { useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchSDTableData } from '../api/SDTableApi';
import useSDStore from '../store/SDStore';

export const useSDTableDataMutation = () => {
  // const queryClient = useQueryClient();
  const { setTableData } = useSDStore();

  const tableMutate = (selectOption) => {
    return fetchSDTableData(selectOption);
  };

  
  // const makeFormattedTable = (responseJson,day, selectedSubstance, selectedLocation, selectedDate) => {
  //   const transformedArray = [];
  //   const responseJsonData = responseJson.data;
  
  //   // 데이터 구조를 순회하면서 변환
  //   for( const [key,value] of Object.entries(responseJsonData["day"+day])){//한 달을 들고 와서 하루씩
  //     if (!key.startsWith("node")) continue;
  
  //     if (selectedSubstance === "포름알데히드"){
        
  //     }
  //     else if (selectedSubstance === "PM10"){
  
  //     }
  //     else if (selectedSubstance === "PM2.5"){
  
  //     }
  //     else if (selectedSubstance === "온도"){
  
  //     }
  //     else if (selectedSubstance === "습도"){
  
  //     }
  //     else if (selectedSubstance === "풍향"){
  
  //     }
  //     else {//풍속
  
  //     }
      
  //     transformedArray.push({
  //       date: responseJsonData["day"+day]["date"],
  //       location: locationFromNodeNumberOptions[parseInt(key.replace("node",""),10)],
  //       pm25: String(value["pm25-daily-average"].toFixed(2)),
  //       pm10: String(value["pm10-daily-average"].toFixed(2)),
  //       ch2o: String(value["ch2o-daily-average"].toFixed(2)),
  //       wind_speed: String(value["wind-speed-daily-average"].toFixed(2)), // 임의의 값으로 설정
  //       wind_direction: value["wind-direction-daily-average"], // 임의의 값으로 설정
  //       temperature: `${value["temperature-daily-average"].toFixed(2)} °C`,
  //       humidity: `${value["humidity-daily-average"].toFixed(2)} %`,
  //     });
  
  //   }
  
  //   return transformedArray;
  // };

  const mutation = useMutation({
      mutationFn: tableMutate,
      onSuccess: (data, variables, context) => {
        //setTableData(data);
        console.log("✅ SMStore success", data);
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

