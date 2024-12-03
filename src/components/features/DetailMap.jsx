import { useEffect, useRef } from 'react';

import useDetailMap from '../../hooks/useDetailMap';

import changeAddress from '../../utils/changeAddress';

const DetailMap = ({ id }) => {
  const mapRef = useRef(null);

  const { mapData, isPending, isError } = useDetailMap(id);

  useEffect(() => {
    if (mapData?.address && mapRef.current) {
      changeAddress(mapData.address, mapData.name, mapData.description, mapData.phone_number, mapRef);
    }
  }, [mapData]);

  console.log(mapRef);

  if (isPending) {
    return <div>로딩 중..</div>;
  }

  if (isError) {
    return <div>에러 발생...</div>;
  }

  return <div ref={mapRef} className="w-full h-full rounded-[24px]" />;
};

export default DetailMap;
