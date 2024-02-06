import { useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchSMData } from '../api/SMTableApi';
import useSMStore from '../store/SMStore';
import { useEffect } from 'react';
import { numToMonth } from '../constants/selectOption.js';
import { locationFromNodeNumberOptions, substanceMonthlyEnum } from '../util.js';
export const useSMDataMutation = () => {
  // const queryClient = useQueryClient();
  const { locations, year, substance, setTableData, setGraphData } = useSMStore();

  

  const makeFormattedTable = (responseJson) => {
    // console.log("📍",locations);
    const transformedArray = [];
    const nodeArray = [];
    let firstVisit = true;
    const responseJsonData = responseJson.data;

    console.log(responseJsonData);
    //데이터 구조를 순회하면서 변환
    for( const [monthKey,monthValue] of Object.entries(responseJsonData)){//한 달을 들고 와서 하루씩
      if (!monthKey.startsWith("month")) continue;
      const month = numToMonth[parseInt(monthKey.slice(5,7))];
      console.log("✅",month);
        
      for(const [nodeKey, nodeValue] of Object.entries(monthValue)){
        if (!nodeKey.startsWith("node")) continue;
        const node = String(locationFromNodeNumberOptions[parseInt(nodeKey.slice(4,6))]);
        console.log("😆",node);
        // console.log("📍",locations);
        if(!locations.includes(node)) continue;//선택한 노드만
        const value = nodeValue[substanceMonthlyEnum[substance]].toFixed(2);
        console.log("💵", typeof value, value);

        if(firstVisit){
          console.log("asdf");
          nodeArray.push(node);
          transformedArray.push({
            node: node,
            Jan:"", Feb:"", Mar:"", Apr:"", May:"", Jun:"", Jul:"", Aug:"", Sep:"", Jan:"", Oct:"", Nov:"", Dec:""
          });
          // [month]:value,
          // transformedArray[month] 

          console.log("🆕",transformedArray);
        }
        
        // console.log(nodeArray.indexOf(node));
        transformedArray[nodeArray.indexOf(node)][month] = value;
      }
      console.log(firstVisit);
      firstVisit = false;
      console.log(firstVisit);
    }
    console.log("😆😆😆",transformedArray);
    return transformedArray;
  };

  const SMMutate = () => {
    return fetchSMData(locations, year, substance);
  };

  const mutation = useMutation({
      mutationFn: SMMutate,
      onSuccess: (data, variables, context) => {
        // setTableData(data);
        console.log("✅ SMStore success", data);
        setTableData(makeFormattedTable(data));
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

