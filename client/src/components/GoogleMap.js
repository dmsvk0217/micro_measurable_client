import { useState, useEffect, useRef } from "react";

const GoogleMap = () => {
    const [map, setMap] = useState(null);
    const ref = useRef();
    const markerRef = useRef(null);

    useEffect(() => {
        // 맵 생성
        const newMap = new window.google.maps.Map(ref.current, {
            center: { lat: 36.1031423, lng: 129.3884771 }, // 지도 빌드 시 중심점
            zoom: 17.7,
        });

        // 마커 커스터마이징용 아이콘 생성
        const customMarkerIcon = {
            path: window.google.maps.SymbolPath.CIRCLE,
            fillColor: 'red',
            fillOpacity: 0.7,
            scale: 25, 
            strokeColor: 'red',
            strokeWeight: 2, 
        };

        // 마커 생성
        const marker = new window.google.maps.Marker({
            position: { lat: 36.1031423, lng: 129.3884771 }, // 마커 위치
            map: newMap,
            icon: customMarkerIcon, // 아이콘
            label: {
                text: '뉴턴홀',
                color: 'white',
                fontSize: '16px',
                fontWeight: '500',
            },
            optimized: false,
        });

        // 맵 상태 업데이트
        setMap(newMap);
        markerRef.current = marker;

        // 줌 레벨 변경 이벤트 리스너 추가
        const zoomChangedListener = newMap.addListener('zoom_changed', () => {
            const currentZoom = newMap.getZoom(); // 현재의 줌 사이즈
            const minZoomToShowMarker = 16; // 이하의 줌 레벨에서는 마커를 숨김

            if (currentZoom <= minZoomToShowMarker) {
                markerRef.current.setVisible(false);
            } else {
                markerRef.current.setVisible(true);
            }
        });

        return () => {
            // 컴포넌트 언마운트 시 이벤트 리스너 제거
            window.google.maps.event.removeListener(zoomChangedListener);
        };
    }, []);

    return (
        <div ref={ref} id="map" style={{ width: "100%", height: "1000px" }}>
        </div>
    );
};

export default GoogleMap;
