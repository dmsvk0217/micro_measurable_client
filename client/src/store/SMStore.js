import { create } from 'zustand';

const useSMStore = create((set) => ({
    tableData: null,
    setTableData: (tableData) => set({ tableData:tableData }),
}));

export default useSMStore;