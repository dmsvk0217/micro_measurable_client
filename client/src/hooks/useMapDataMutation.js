import { useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchMapData } from '../api/MapApi';
import useMapStore from '../store/MapStore';


export const useMapDataMutation = () => {
  // const queryClient = useQueryClient();
  const { mapLocation, setMapData } = useMapStore();

  const mapMutate = () => {
    return fetchMapData(mapLocation);
  };

  const makeFormattedSubstance = (responseJson) => {
    const transformedArray = [];
    const responseJsonData = responseJson.data;

    console.log(responseJsonData);

    // 데이터 구조를 순회하면서 변환
    // for( const [key,value] of Object.entries(responseJsonData["day"+day])){
    //     if (!key.startsWith("node")) continue;
        
    //     if(!location.match("전체"))
    //     if(!location.match(locationFromNodeNumberOptions[parseInt(key.replace("node",""),10)])) continue;

    //     transformedArray.push({
    //     date: responseJsonData["day"+day]["date"],
    //     location: locationFromNodeNumberOptions[parseInt(key.replace("node",""),10)],
    //     pm25: String(value["pm25-daily-average"].toFixed(2)),
    //     pm10: String(value["pm10-daily-average"].toFixed(2)),
    //     ch2o: String(value["ch2o-daily-average"].toFixed(2)),
    //     wind_speed: String(value["wind-speed-daily-average"].toFixed(2)), // 임의의 값으로 설정
    //     wind_direction: value["wind-direction-daily-average"], // 임의의 값으로 설정
    //     temperature: `${value["temperature-daily-average"].toFixed(2)} °C`,
    //     humidity: `${value["humidity-daily-average"].toFixed(2)} %`,
    //     });
    // }

    return transformedArray;
  };

  const mutation = useMutation({
      mutationFn: mapMutate,
      onSuccess: (data, variables, context) => {
        // const queryClient = useQueryClient(); // 캐시 데이터된 무효화 -> 다시 실행 -> 최신 데이터
        setMapData(data);
        console.log("✅  MapStore fetch success", data, new Date());
        makeFormattedSubstance(data);
      },
      onError: (error, variables, context) => {
        console.log("🚨 MapStore fetch error", error);
      },
      onSettled: (data, error, variables, context) => {
        // console.log("🚀 Loading table ...");
      },
      //retry: 1,//오류 발생시, 1회 더 시도
  });

  return mutation;
}