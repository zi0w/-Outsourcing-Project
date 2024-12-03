import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchMap = () => {
  const address = '서울 성동구 성수일로6길 7-1';
  const { kakao } = window;
  const navigate = useNavigate();

  useEffect(() => {
    // 지도를 표시할 컨테이너
    const container = document.getElementById('map');
    const options = {
      center: new kakao.maps.LatLng(37.5665, 126.978), // 지도 중심 초기값(서울 중심 좌표)
      level: 3 // 확대 레벨
    };

    // 지도 생성
    const map = new kakao.maps.Map(container, options);
    const geocoder = new kakao.maps.services.Geocoder();

    // 주소 -> 좌표 변환
    geocoder.addressSearch(address, (result, status) => {
      if (status === kakao.maps.services.Status.OK) {
        let coords = new kakao.maps.LatLng(result[0].y, result[0].x);

        // coords에 마커 생성
        let marker = new kakao.maps.Marker({
          map: map,
          position: coords
        });

        // 커스텀 오버레이 생성
        const overlayContent = document.createElement('div');
        overlayContent.innerHTML = `
          <div style="width: 16rem; padding: .75rem; background: white; border: .5rem; border-radius: .5rem; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);">
            <div style="display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: .5rem;">
              <h3 style="font-weight: 600; font-size: 1.125rem; font-color: #1F2937; line-height: 1.75rem">중앙감속기</h3>
              <div id="close-overlay" style="font-weight: 700; cursor: pointer;">&#10005;</div>
            </div>
            <div style="font-color:#4B5563;">
              <p style="margin-bottom: .1rem; font-size: .875rem; overflow-wrap: break-word; text-wrap:wrap; break-word: keep-all">서울 성동구 성수일로6길 7-1</p>
              <span style="font-size: .875rem;">02-123-4567</span>
            </div>
            <button style="width:100%; margin-top:.75rem; border-radius: .5rem; background-color:black; text-align: center; padding: .5rem 1rem .5rem 1rem; color:white; cursor: pointer;">
              자세히 보기
            </button>
          </div>
        `;

        const overlay = new kakao.maps.CustomOverlay({
          content: overlayContent,
          position: coords,
          map,
          yAnchor: 1.4
        });

        overlay.setMap(null); // 초기에는 표시하지 않음

        kakao.maps.event.addListener(marker, 'click', () => {
          overlay.setMap(map);
        });

        const closeButton = overlayContent.querySelector('#close-overlay');
        console.log(closeButton);
        closeButton.addEventListener('click', () => {
          overlay.setMap(null);
        });

        map.setCenter(coords);
      }
    });
  }, [kakao, address]);

  return (
    <>
      {/* 지도가 표시될 영역 */}
      <div id="map" style={{ width: '100%', height: '100%', borderRadius: '24px' }}></div>
    </>
  );
};

export default SearchMap;
