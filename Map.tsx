import React, { useEffect } from 'react';

// Declare global kakao object
declare global {
  interface Window {
    kakao: any;
  }
}

const Map = () => {
  useEffect(() => {
    const script = document.createElement('script');
    // Make sure protocol is consistent
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=c70022d9b554b46cc2259d0011436714&autoload=false`;
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      // Safely check if kakao object is available
      if (window.kakao && window.kakao.maps) {
        window.kakao.maps.load(() => {
          const container = document.getElementById('map');
          if (!container) {
            console.error('Map container element not found');
            return;
          }

          const options = {
            center: new window.kakao.maps.LatLng(33.450701, 126.570667),
            level: 3,
          };
          const map = new window.kakao.maps.Map(container, options);

          const markerPosition = new window.kakao.maps.LatLng(33.450701, 126.570667);
          const marker = new window.kakao.maps.Marker({
            position: markerPosition,
          });
          marker.setMap(map);
        });
      } else {
        console.error('Failed to load Kakao Maps API');
      }
    };
  }, []);

  return <div id="map" style={{ width: '100%', height: '100%' }} />;
};

export default Map;
