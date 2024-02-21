import { useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchDailyAverages } from '../api/axiosApi';
import useSDStore from '../store/SDStore';
import { locationFromNodeNumberOptions, substanceDailyEnum } from '../util';

export const useSDDataMutation = () => {
  // const queryClient = useQueryClient();
  const { locations, year, month, substance, setTableData, setGraphData } = useSDStore();

  const days = [
    "01", "02","03","04","05","06","07","08","09","10",
    "11","12","13","14","15","16","17","18","19","20",
    "21","22","23","24","25","26","27","28","29","30","31"
  ];

  const SDMutate = () => {
    return fetchDailyAverages(year, month);
  };

  const mutation = useMutation({
      mutationFn: SDMutate,
      onSuccess: (data, variables, context) => {
        //setTableData(data);
        console.log("✅ SDStore success", data);
        makeFormattedData(data);
      },
      onError: (error, variables, context) => {
        console.log("🚨 SDStore error", error);
      },
      onSettled: (data, error, variables, context) => {
        console.log("🚀 Loading...");
      },
      retry: 1,//오류 발생시, 1회 더 시도
  });

  const makeFormattedData = (responseJson) => {
    const transformedTableData = makeFormattedTableData(responseJson);
    const transformedGraphData = makeFormattedGraphData(transformedTableData);
    
    setTableData(transformedTableData);
    setGraphData(transformedGraphData);

  }

  const makeFormattedTableData = (responseJson) => {
    const transformedTableData = [];
    const nodeArray = [];
    let firstVisit = true;

    for( const [dayKey, dayValue] of Object.entries(responseJson.data)){//한 달을 들고 와서 하루씩
      if (!dayKey.startsWith("day")) continue;
      const day = dayKey.slice(3,5);
      // console.log("✅",month);
        
      for(const [nodeKey, nodeValue] of Object.entries(dayValue)){
        if (!nodeKey.startsWith("node")) continue;
        const node = String(locationFromNodeNumberOptions[parseInt(nodeKey.slice(4,6))]);
        // console.log("😆",node);
        // console.log("📍",locations);
        if(!locations.includes('전체') && !locations.includes(node)) continue;//선택한 노드만
        const value = nodeValue[substanceDailyEnum[substance]].toFixed(2);
        // console.log("💵", typeof value, value);

        if(firstVisit){
          nodeArray.push(node);

          // 각 날짜에 대응하는 키-값 쌍을 동적으로 생성합니다.
          const dayData = days.reduce((acc, day) => {
            acc[day] = ""; // 각 날짜에 빈 문자열 할당
            return acc;
          }, {});


          transformedTableData.push({
            node: node,
            ...dayData
          });

        }
        
        // console.log(nodeArray.indexOf(node));
        transformedTableData[nodeArray.indexOf(node)][day] = value;
      }
     
      firstVisit = false;
    }

    //평균계산
    for(let nodeData of transformedTableData){
      const average = calculateAverage(nodeData);
      nodeData.average = average;
    }

    // console.log("😡", transformedTableData);
    return transformedTableData;
  }

  const makeFormattedGraphData = (transformedTableData) => {
   

    const transformedGraphData = transformedTableData.map(item => {
      const data = days.map(day => parseFloat(item[day]) || 0);

      return {
      node: item.node,
      data: data,
      };
    });

    return transformedGraphData;
  }

  const calculateAverage = (data) => {
    
    let sum = 0;
    let count = 0;

    days.forEach(day => {
      const value = data[day];
      if(value){
        sum += parseFloat(value);
        count++;
      }
    });

    return (count > 0) ? (sum / count).toFixed(2) : 0;
  }



  return mutation;
}

