import { create } from 'zustand';

const useRTStore = create((set) => ({
    //graph 관련
    graphLocation: null,
    graphSubstance: null,

    setGraphLocation: graphLocation => set({graphLocation: graphLocation}),
    setGraphSubstance: graphSubstance => set({graphSubstance: graphSubstance}),

    graphData: null,
    setGraphData: (graphData) => set({ graphData: graphData}),


    //table 관련
    tableLocation: null,
    tableUnit:null,
    tableDate: new Date(),
    tableHour:null,

    setTableLocation: tableLocation => set({tableLocation: tableLocation}),
    setTableUnit: tableUnit => set({tableUnit: tableUnit}),
    setTableDate: tableDate => set({tableDate: tableDate}),
    setTableHour: tableHour => set({tableHour: tableHour}),

    tableData: null,
    setTableData: (tableData) => set({ tableData: tableData }),
}));

export default useRTStore;