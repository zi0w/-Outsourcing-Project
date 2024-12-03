const { kakao } = window;

const changeAddress = (address, name, ref) => {
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

      console.log('marker', marker);

      let infowindow = new kakao.maps.InfoWindow({
        content: `<div style="width: 150px; text-align: center; border-radius: 16px; padding: 10px 4px">${name}</div>`
      });

      console.log('infowindow', infowindow);

      infowindow.open(map, marker);

      console.log(map);
      map.setCenter(cords);
    }
  });
};

export default changeAddress;
