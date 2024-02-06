import { create } from 'zustand';
const useSDStore = create((set) => ({
    locations: '전체',
    substance: null,
    year: null,
    month: null,

    setLocations: data => set({locations:data}),
    setSubstance: data => set({substance:data}),
    setYear: data => set({year: data}),
    setMonth: data => set({month:data}),

    tableData:null,
    graphData:null,
    setTableData: data => set({tableData:data}),
    setGraphData: data => set({graphData:data})
    
}));

export default useSDStore;