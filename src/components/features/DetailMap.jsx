import { useEffect, useRef } from 'react';
import supabase from '../../supabase/supabase';
import { useQuery } from '@tanstack/react-query';

import changeAddress from '../../utils/changeAddress';

const DetailMap = ({ id }) => {
  const mapRef = useRef(null);

  const getRestorantAddress = async (restaurantId) => {
    const { data, error } = await supabase.from('restaurants').select('name, address').eq('id', restaurantId).single();

    console.log(data);

    return data;
  };
  const {
    data: mapData,
    isPending,
    isError
  } = useQuery({
    queryKey: ['map', id],
    queryFn: () => getRestorantAddress(id)
  });

  console.log(mapData);

  useEffect(() => {
    if (mapData?.address && mapRef.current) {
      changeAddress(mapData.address, mapData.name, mapRef);
    }
  }, [mapData]);

  if (isPending) {
    return <div>로딩 중..</div>;
  }

  if (isError) {
    return <div>에러 발생...</div>;
  }

  return (
    <div ref={mapRef} className="w-full h-full rounded-[24px] bg-red-500">
      여긴 지도
    </div>
  );
};

export default DetailMap;
