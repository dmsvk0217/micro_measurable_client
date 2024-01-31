import { create } from 'zustand';

const useMapStore = create((set) => ({
    mapPM25Data: null,
    mapPM10Data: null,
    mapCH2OData: null,
    setMapPM25Data: data => set({ mapPM25Data: data }),
    setMapPM10Data: data => set({ mapPM10Data: data }),
    setMapCH2OData: data => set({ mapCH2OData: data }),


    mapLocation: null,
    setMapLocation: data => set({ mapLocation: data }),


    mapData: null,
    setMapData: data => set({ mapData: data }),
}));

export default useMapStore;