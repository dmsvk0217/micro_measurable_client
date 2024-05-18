import { create } from 'zustand';

const useMapStore = create((set) => ({
    //선택된 물질 보기 - 범례관련
    selectedSubstance: "초미세먼지",
    setSelectedSubstance: data => set({ selectedSubstance: data }),

    //지도 관련
    mapLocation: "그레이스",
    setMapLocation: data => set({ mapLocation: data }),

    mapData: [],
    setMapData: data => set({ mapData: data }),
}));

export default useMapStore;