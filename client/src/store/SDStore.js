import { create } from 'zustand';

const useSDStore = create((set) => ({
    tableData: null,
    setTableData: (tableData) => set({ tableData:tableData }),
}));

export default useSDStore;