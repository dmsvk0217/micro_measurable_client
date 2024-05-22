import { create } from 'zustand';

const useMapStore = create((set) => ({
    //선택된 물질 보기 - 범례관련
    selectedSubstance: "초미세먼지",
    setSelectedSubstance: data => set({ selectedSubstance: data }),

    mapLocation: '',
    setMapLocation: data => set({ mapLocation: data }),

    mapData: [],
    setMapData: (data) => set({
        mapData: data.sort((a,b) => b.timestamp.localeCompare(a.timestamp)) // desc
    }),
}));

export default useMapStore;