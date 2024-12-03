import { useQuery } from '@tanstack/react-query';
import supabase from '../../../supabase/supabase';

// Supabase Storage에서 이미지를 가져오는 함수
const fetchImages = async (bucketName) => {
  // Supabase에서 버킷의 파일 목록을 가져옴
  const storageBucket = supabase.storage.from(bucketName);
  const { data, error } = await storageBucket.list('');

  // 에러 처리
  if (error) {
    throw new Error(error.message);
  }

  // 파일 목록에서 각 파일의 공개 URL을 생성
  const imageUrls = data.map((item) => {
    const { data: publicUrlData } = storageBucket.getPublicUrl(item.name);
    return publicUrlData.publicUrl; // 공개 URL 반환
  });

  // console.log(imageUrls);
  return imageUrls;
};

// React Query를 사용하여 이미지를 가져오는 커스텀 훅
const useFetchImages = (bucketName) => {
  return useQuery({
    queryKey: [bucketName], // Query Key로 버킷 이름과 제한 값을 지정
    queryFn: () => fetchImages(bucketName), // Fetch 함수 호출
  });
};

export default useFetchImages;
