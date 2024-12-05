import { useProfileUploadImage } from '../../../hooks/profile/useProfileUploadImage';

import defaultImg from '../../../assets/images/profile/default_img.jpg';

const MyProfile = ({ newProfileImg, setNewProfileImg }) => {
  const { user, handleImageChange } = useProfileUploadImage(newProfileImg, setNewProfileImg);

  return (
    <div className="text-center">
      <label htmlFor="imgFile" className="relative group cursor-pointer block w-[138px] h-[138px] mx-auto">
        <img
          src={newProfileImg || user.profile_image_url || defaultImg}
          alt="프로필 사진"
          className="w-full h-full object-cover rounded-full"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full">
          <span className="text-white text-4xl font-bold">+</span>
        </div>
      </label>
      <input
        id="imgFile"
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => handleImageChange(e.target.files)}
      />
      <h1 className="mt-[20px] text-white font-medium text-[20px]">{user.nickname}</h1>
    </div>
  );
};

export default MyProfile;
