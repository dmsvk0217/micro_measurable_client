import { create } from 'zustand';

const useMapStore = create((set) => ({
    mapLocation: "뉴턴홀",
    setMapLocation: data => set({ mapLocation: data }),


    mapData: [],
    setMapData: data => set({ mapData: data }),
}));

export default useMapStore;