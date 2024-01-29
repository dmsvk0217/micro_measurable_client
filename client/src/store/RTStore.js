import { create } from 'zustand';

const useRTSotre = create((set) => ({
    tableData: null,
    setTableData: (tableData) => set({ tableData:tableData }),
}));

export default useRTSotre;