import { create } from 'zustand';

const useSMStore = create((set) => ({
    //selection
    locations: ['전체'],
    substance: '포름알데히드',
    year: '2024',

    setLocations: data => set({ locations: data }),
    setSubstance: data => set({ substance: data }),
    setYear: data => set({ year: data }),


    tableData: {},
    setTableData: data => set({ tableData: data }),
    graphData: {},
    setGraphData: data => set({ graphData: data}),

}));

export default useSMStore;