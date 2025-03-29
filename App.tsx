import React, { useEffect, useRef } from 'react';

// Kakao 타입 선언
declare global {
  interface Window {
    kakao: any;
  }
}

const App = () => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 기존 kakao script 제거
    const oldScript = document.querySelector('script[src*="kakao"]');
    if (oldScript) oldScript.remove();

    // 새로운 스크립트 동적 삽입
    const script = document.createElement('script');
    script.src = 'https://dapi.kakao.com/v2/maps/sdk.js?appkey=c70022d9b554b46cc2259d0011436714&autoload=false';
    script.async = true;

    script.onload = () => {
      if (window.kakao && window.kakao.maps) {
        window.kakao.maps.load(() => {
          if (!mapRef.current) return;

          const map = new window.kakao.maps.Map(mapRef.current, {
            center: new window.kakao.maps.LatLng(37.5665, 126.9780),
            level: 3,
          });

          const marker = new window.kakao.maps.Marker({
            position: new window.kakao.maps.LatLng(37.5665, 126.9780),
          });
          marker.setMap(map);
        });
      }
    };

    document.head.appendChild(script);
  }, []);

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <div ref={mapRef} style={{ width: '100%', height: '100%' }}></div>
    </div>
  );
};

export default App;
