import React from 'react';
import { Link } from 'react-router-dom';

const TeamInfo = ({ github, name, color }) => {
  return (
    <Link to={github} className="flex flex-row justify-between items-center">
      <span className="block w-[24px] h-[24px] mx-[5px] indent-[-9999rem] bg-[url('/github.png')] bg-no-repeat bg-center bg-cover rounded-[50%]">
        dev.{name}'s github
      </span>
      <p className="font-medium" style={{ color }}>
        {name}
      </p>
    </Link>
  );
};

export default TeamInfo;
