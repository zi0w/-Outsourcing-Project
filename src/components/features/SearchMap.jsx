import { useEffect } from 'react';

const SearchMap = () => {
  const { kakao } = window;

  useEffect(() => {
    if (typeof kakao === 'undefined') {
      console.error('api 안됨');
      return;
    }

    // 지도를 표시할 컨테이너
    const container = document.getElementById('map');
    const options = {
      center: new kakao.maps.LatLng(37.5665, 126.978), // 서울 중심 좌표
      level: 3 // 확대 레벨
    };

    // 지도 생성
    new kakao.maps.Map(container, options);
  }, []);

  return (
    <div>
      {/* 지도가 표시될 영역 */}
      <div id="map" style={{ width: '100%', height: 'screen', borderRadius: '24px' }}></div>
    </div>
  );
};

export default SearchMap;
