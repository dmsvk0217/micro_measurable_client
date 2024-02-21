import { useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchMonthlyAverages } from '../api/axiosApi.js';
import useSMStore from '../store/SMStore';
import { useEffect } from 'react';
import { numToMonth } from '../constants/selectOption.js';
import { locationFromNodeNumberOptions, substanceMonthlyEnum } from '../util.js';
export const useSMDataMutation = () => {
  // const queryClient = useQueryClient();
  const { locations, year, substance, setTableData, setGraphData } = useSMStore();

  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const SMMutate = () => {
    return fetchMonthlyAverages(year);
  };

  const mutation = useMutation({
      mutationFn: SMMutate,
      onSuccess: (data, variables, context) => {
        console.log("✅ SMStore success", data);
        makeFormattedData(data);
      },
      onError: (error, variables, context) => {
        console.log("🚨 SMStore error", error);
      },
      onSettled: (data, error, variables, context) => {
        console.log("🚀 Loading...");
      },
  });


  //responseData parsing
  const makeFormattedData = (responseJson) => {
    const transformedTableData = makeFormattedTableData(responseJson);
    const transformedGraphData = makeFormattedGraphData(transformedTableData);
    
    setTableData(transformedTableData);
    setGraphData(transformedGraphData);

  };

  const makeFormattedTableData = (responseJson) => {
    const transformedTableData = [];
    const nodeArray = [];
    let firstVisit = true;

    for( const [monthKey,monthValue] of Object.entries(responseJson.data)){//한 달을 들고 와서 하루씩
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
          transformedTableData.push({
            node: node,
            Jan:"", Feb:"", Mar:"", Apr:"", May:"", Jun:"", Jul:"", Aug:"", Sep:"", Oct:"", Nov:"", Dec:""
          });
          // console.log("🆕",transformedTableData);
        }
        
        // console.log(nodeArray.indexOf(node));
        transformedTableData[nodeArray.indexOf(node)][month] = value;
      }
     
      firstVisit = false;
    }

    //평균계산
    for(let nodeData of transformedTableData){
      const average = calculateAverage(nodeData);
      nodeData.average = average;
    }

    return transformedTableData;
  }

  const makeFormattedGraphData = (transformedTableData) => {
    //올해일때는 이전달까지 데이터만 담음
    const currentYear = new Date().getFullYear();
    const currentMonthIndex = new Date().getMonth();  

    const transformedGraphData = transformedTableData.map(item => {
      const data = (parseFloat(year) === currentYear ? 
        monthNames.slice(0, currentMonthIndex) : monthNames) 
        .map(month => parseFloat(item[month]) || 0);

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

    monthNames.forEach(month => {
      const value = data[month];
      if(value){
        sum += parseFloat(value);
        count++;
      }
    });

    return (count > 0) ? (sum / count).toFixed(2) : 0;
  }




  return mutation;
}

