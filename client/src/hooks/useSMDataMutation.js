import { useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchMonthlyAverages } from '../api/axiosApi.js';
import useSMStore from '../store/SMStore';
import { useEffect } from 'react';
import { numToMonth } from '../constants/selectOption.js';
import { locationFromNodeNumberOptions, substanceMonthlyEnum } from '../util.js';
export const useSMDataMutation = () => {
  // const queryClient = useQueryClient();
  const { locations, year, substance, setTableData, setGraphData } = useSMStore();


  const SMMutate = () => {
    return fetchMonthlyAverages(year);
  };

  const mutation = useMutation({
      mutationFn: SMMutate,
      onSuccess: (data, variables, context) => {
        // setTableData(data);
        console.log("✅ SMStore success", data);
        setTableData(makeFormattedTable(data));
        //Todo: setGraphData(makeFormattedGraph(data));
      },
      onError: (error, variables, context) => {
        console.log("🚨 SMStore error", error);
      },
      onSettled: (data, error, variables, context) => {
        console.log("🚀 Loading...");
      },
  });


  //responseData parsing
  const makeFormattedTable = (responseJson) => {
    const transformedArray = [];
    const nodeArray = [];
    let firstVisit = true;
    const responseJsonData = responseJson.data;



    //데이터 구조를 순회하면서 변환
    for( const [monthKey,monthValue] of Object.entries(responseJsonData)){//한 달을 들고 와서 하루씩
      if (!monthKey.startsWith("month")) continue;
      const month = numToMonth[parseInt(monthKey.slice(5,7))];
      // console.log("✅",month);
        
      for(const [nodeKey, nodeValue] of Object.entries(monthValue)){
        if (!nodeKey.startsWith("node")) continue;
        const node = String(locationFromNodeNumberOptions[parseInt(nodeKey.slice(4,6))]);
        // console.log("😆",node);
        // console.log("📍",locations);
        if(!locations.includes('전체') && !locations.includes(node)) continue;//선택한 노드만
        const value = nodeValue[substanceMonthlyEnum[substance]].toFixed(2);
        // console.log("💵", typeof value, value);

        if(firstVisit){
          nodeArray.push(node);
          transformedArray.push({
            node: node,
            Jan:"", Feb:"", Mar:"", Apr:"", May:"", Jun:"", Jul:"", Aug:"", Sep:"", Oct:"", Nov:"", Dec:""
          });
          // console.log("🆕",transformedArray);
        }
        
        // console.log(nodeArray.indexOf(node));
        transformedArray[nodeArray.indexOf(node)][month] = value;
      }
     
      firstVisit = false;
    }

    //평균계산
    for(let nodeData of transformedArray){
      const average = calculateAverage(nodeData);
      nodeData.average = average;
    }

    return transformedArray;
  };

  const calculateAverage = (data) => {
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    
    let sum = 0;
    let count = 0;

    monthNames.forEach(month => {
      const value = data[month];
      if(value){
        sum += parseFloat(value);
        count++;
      }
    });

    return (count > 0) ? (sum / count) : 0;
  }



  return mutation;
}

