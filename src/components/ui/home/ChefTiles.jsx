import React from 'react';
import useFetchImages from './FetchChefsImages';

const ChefTiles = ({ bucketName, title }) => {
  const { data: images, isLoading, error } = useFetchImages(bucketName);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (!images || images.length === 0) {
    return <p>No images available.</p>;
  }

  return (
    <div className="w-full max-w-[1440px] mx-auto h-[1200px]]">
      <h2 className="text-center text-[48px] font-bold mt-[260px] mb-[60px]">{title}</h2>
      <div></div>
      {/* <select
        value={onChangeSort}
        onChange={handleSortChange}
        // {}
      >
        <option value="chefs"></option>
        
      </select> */}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((url, index) => (
          <div
            key={index}
            className="w-full max-w-[360px] h-[360px] border overflow-hidden rounded-lg shadow-md mx-auto"
          >
            <img src={url} alt={`${title} Chef ${index}`} className="w-full h-full object-cover" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChefTiles;
