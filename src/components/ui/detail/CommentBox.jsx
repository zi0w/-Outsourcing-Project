import { useQuery } from '@tanstack/react-query';

import supabase from '../../../supabase/supabase';

const CommentBox = ({ userId, comment, createdAt }) => {
  const getUserData = async (Id) => {
    let { data } = await supabase.from('users').select('*').eq('id', Id).single();

    return data;
  };

  const {
    data: userData,
    isPending,
    isError
  } = useQuery({
    queryKey: ['user', userId],
    queryFn: () => getUserData(userId)
  });

  if (isPending) {
    return <div>로딩 중..</div>;
  }

  if (isError) {
    return <div>에러발 생...</div>;
  }

  return (
    <div className="w-full min-h-[120px] p-2 rounded-[16px] border-none shadow-md flex flex-row items-center gap-[9.98px] bg-slate-400">
      <img src={userData.profile_image_url} alt="User Profile" className="w-[60px] h-[60px] rounded-full" />
      <div className="w-full">
        <div className="flex items-center justify-between">
          <h5 className="text-base font-[600]">{userData.nickname}</h5>
          <p className="text-[12px] text-slate-300">
            {new Date(createdAt).toLocaleDateString('ko-KR', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </p>
        </div>
        <div className="mt-[6.67px] flex items-center justify-between">
          <p className="text-sm">{comment}</p>
        </div>
        <div className="mt-[8px] flex gap-2 items-center justify-end">
          <button className="w-[50px] h-[30px] border-none outline-none rounded-[5px] text-white text-sm bg-blue-600">
            수정
          </button>
          <button className="w-[50px] h-[30px] border-none outline-none rounded-[5px] text-white text-sm bg-red-600">
            삭제
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommentBox;
