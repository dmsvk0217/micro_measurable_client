import { create } from 'zustand';

const useSMStore = create((set) => ({
    //selection
    locations: '전체',
    substance: null,
    year: null,

    setLocations: data => set({ locations: data }),
    setSubstance: data => set({ substance: data }),
    setYear: data => set({ year: data }),


    tableData: null,
    setTableData: data => set({ tableData: data }),
    graphData: null,
    setGraphData: data => set({ graphData: data}),

}));

export default useSMStore;