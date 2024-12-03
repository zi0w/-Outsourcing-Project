const { kakao } = window;

const changeAddress = (address, name, description, phoneNumber, ref) => {
  const mapOption = {
    center: new window.kakao.maps.LatLng(37.566696, 126.977942), // 지도의 중심좌표
    level: 3 // 지도의 확대 레벨
  };

  const map = new window.kakao.maps.Map(ref.current, mapOption);

  let geocoder = new kakao.maps.services.Geocoder();

  geocoder.addressSearch(address, (result, status) => {
    if (status === kakao.maps.services.Status.OK) {
      let cords = new kakao.maps.LatLng(result[0].y, result[0].x);

      console.log('cords', cords);

      let marker = new kakao.maps.Marker({
        map: map,
        position: cords
      });

      marker.setMap(map);

      let content = `
        <div class="map-overlay">
          <div id="close">&#128473;</div>
          <h4 class="name">${name}</h4>
          <p class="desc">${description}</p>
          <a href=${`tel: ${phoneNumber}`} class="phone-number">&#128222; : ${phoneNumber}</a>
        </div>
      `;

      let customOverlay = new kakao.maps.CustomOverlay({
        position: cords,
        content: content,
        yAnchor: 1.35
      });

      customOverlay.setMap(map);

      map.setCenter(cords);

      kakao.maps.event.addListener(marker, 'click', function () {
        customOverlay.setMap(map);
      });

      document.querySelector('#close').addEventListener('click', () => {
        customOverlay.setMap(null);
      });
    }
  });
};

export default changeAddress;
