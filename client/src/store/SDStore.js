import { create } from 'zustand';
const useSDStore = create((set) => ({
    locations: ['전체'],
    substance: '포름알데히드',
    year: 2024,
    month: '1월',

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