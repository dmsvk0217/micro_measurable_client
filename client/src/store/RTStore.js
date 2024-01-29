import { create } from 'zustand';

const useRTSotre = create((set) => ({
    tableData: null,
    graphData: null,
    setTableData: (tableData) => set({ tableData:tableData }),
    setGraphData: (graphData) => set({ graphData: graphData}),
}));

export default useRTSotre;