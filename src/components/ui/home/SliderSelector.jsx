const SliderSelector = ({ color, filteredInfo, sliderRef }) => {

  // select handle
  const handleSlideChange = (e) => {
    // 선택한 쉐프님을 가운데로 위치시키기 위함
    const slideIndex = parseInt(e.target.value, 10) - 1;

    if (sliderRef.current) {
      sliderRef.current.slickGoTo(slideIndex);
    }
  };

  return (
    <select
      id={color}
      onChange={handleSlideChange}
      className={`
            ${color === 'black' ? `black-section-select-design` : `white-section-select-design`}`}
    >
      {filteredInfo.map((info, index) => (
        <option key={info.id} value={index}>
          {info.name}
        </option>
      ))}
    </select>
  );
};

export default SliderSelector;