import TeamInfo from './TeamInfo';

const Footer = () => {
  const teamMembersInfo = [
    {
      name: '최민석',
      github: 'https://github.com/Noonsae',
      color: '#FF5555'
    },
    {
      name: '김민후',
      github: 'https://github.com/kminhoo',
      color: '#F66CC8'
    },
    {
      name: '김민지',
      github: 'https://github.com/minji7901',
      color: '#ffff42'
    },
    {
      name: '우지영',
      github: 'https://github.com/zi0w',
      color: '#53FF67'
    },
    {
      name: '최강건',
      github: 'https://github.com/Choi-kanggun',
      color: '#455EFF'
    }
  ];

  return (
    // full-back

    <footer className="bg-[#0a0a0a] w-full">
      {/* footer - inner */}
      <div className="mx-auto w-full max-w-[600px] py-5 text-center">
        {/* copyright text */}
        <p className="mb-[15px] text-[#ccc] text-sm">@ Copyright 2024 pa5rangers. All rights reserved</p>
        {/* developer intro */}
        <div className="flex justify-between text-[13px]">
          {teamMembersInfo.map((member) => (
            <TeamInfo key={member.github} name={member.name} github={member.github} color={member.color} />
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
