import React from 'react';

const TeamInfo = ({ github, name, color }) => {
  return (
    <li className="flex flex-row justify-between items-center">
      <a
        target="blank"
        href={github}
        className="block w-[24px] h-[24px] mx-[5px] indent-[-9999rem] bg-[url('/github.png')] bg-no-repeat bg-center bg-cover rounded-[50%]"
      >
        dev.{name}'s github
      </a>
      <p className="font-medium" style={{ color: color }}>
        {name}
      </p>
    </li>
  );
};

export default TeamInfo;
