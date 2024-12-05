import { useEffect, useRef } from 'react';

import Loading from '../ui/common/Loading';

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

  if (isPending) {
    return <Loading />;
  }

  if (isError) {
    return <div>에러발생...</div>;
  }

  return <div ref={mapRef} className="w-full h-full rounded-[24px] shadow-[0px_6px_8px_rgba(0,0,0,0.3)]" />;
};

export default DetailMap;
