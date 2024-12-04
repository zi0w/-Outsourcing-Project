// White Custom Prev Arrow
const WhiteCustomPrevArrow = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="w-8 h-8 flex items-center justify-center absolute top-1/2 left-[-20px] transform -translate-y-[100%] p-4 rounded-full shadow-[0px_2px_2px_rgba(0,0,0,0.3)] z-30 text-black bg-white indent-[-9999em]"
    >
      prev
    </button>
  );
};

// White Custom Next Arrow
const WhiteCustomNextArrow = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="w-8 h-8 flex items-center justify-center absolute top-1/2 right-[-20px] transform -translate-y-[100%] p-4 rounded-full shadow-[0px_2px_2px_rgba(0,0,0,0.3)] z-30 text-black bg-white text-center indent-[-9999em]"
    >
      next
    </button>
  );
};

// Black Custom Prev Arrow
const BlackCustomPrevArrow = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="w-8 h-8 flex items-center justify-center absolute top-1/2 left-[-20px] transform -translate-y-[100%] p-4 rounded-full shadow-[0px_2px_2px_rgba(0,0,0,0.3)] z-30 text-white bg-black text-center"
    >
      prev
    </button>
  );
};

// Black Custom Next Arrow
const BlackCustomNextArrow = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="w-8 h-8 flex items-center justify-center absolute top-1/2 right-[-20px] transform -translate-y-[100%] text-white bg-black p-4 rounded-full shadow-[0px_2px_2px_rgba(0,0,0,0.3)] z-30 text-center"
    >
      next
    </button>
  );
};

export { BlackCustomPrevArrow, BlackCustomNextArrow, WhiteCustomPrevArrow, WhiteCustomNextArrow };
