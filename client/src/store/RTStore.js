import { create } from 'zustand';

const useRTStore = create((set) => ({
    //graph 관련
    graphLocation: "그레이스",
    graphSubstance: "포름알데히드",

    setGraphLocation: graphLocation => set({graphLocation: graphLocation}),
    setGraphSubstance: graphSubstance => set({graphSubstance: graphSubstance}),

    graphData: {},
    setGraphData: (graphData) => set({ graphData: graphData}),


    //table 관련
    tableLocation: "그레이스",
    tableUnit:"일평균",
    tableDate: new Date(),
    tableHour:"01:00",

    setTableLocation: tableLocation => set({tableLocation: tableLocation}),
    setTableUnit: tableUnit => set({tableUnit: tableUnit}),
    setTableDate: tableDate => set({tableDate: tableDate}),
    setTableHour: tableHour => set({tableHour: tableHour}),

    tableData: {},
    setTableData: (tableData) => set({ tableData: tableData }),
}));

export default useRTStore;