const Footer = () => {
  return (
    // full-back
    <div className="bg-[#0a0a0a] w-full fixed bottom-0">
      {/* footer - inner */}
      <div className="mx-auto w-full max-w-[600px] h-[130px] pt-[30px] text-center">
        {/* copyright text */}
        <p className="mb-[15px] text-[#fff] text-[16px] font-medium">
          @ Copyright 2024 pa5rangers. All rights reserved
        </p>
        {/* developer intro */}
        <ul className="flex justify-between text-[13px]">
          <li className="flex flex-row justify-between items-center">
            <a
              target="blank"
              href="https://github.com/Noonsae"
              className="block w-[24px] h-[24px] mx-[5px] indent-[-9999rem] bg-[url('/github.png')] bg-no-repeat bg-center bg-cover rounded-[50%]"
            >
              dev.Noonsae's github
            </a>
            <p className="text-[#FF5555] font-medium">최민석</p>
          </li>
          <li className="flex flex-row justify-between items-center">
            <a
              target="blank"
              href="https://github.com/kminhoo"
              className="block w-[24px] h-[24px] mx-[5px] indent-[-9999rem] bg-[url('/github.png')] bg-no-repeat bg-center bg-cover rounded-[50%]"
            >
              dev.kminhoo's github
            </a>
            <p className="text-[#F66CC8]">김민후</p>
          </li>
          <li className="flex flex-row justify-between items-center">
            <a
              target="blank"
              href="https://github.com/minji7901"
              className="block w-[24px] h-[24px] mx-[5px] indent-[-9999rem] bg-[url('/github.png')] bg-no-repeat bg-center bg-cover rounded-[50%]"
            >
              dev.minji7901's github
            </a>
            <p className="text-[#ffff42]">김민지</p>
          </li>
          <li className="flex flex-row justify-between items-center">
            <a
              target="blank"
              href="https://github.com/zi0w"
              className="block w-[24px] h-[24px] mx-[5px] indent-[-9999rem] bg-[url('/github.png')] bg-no-repeat bg-center bg-cover rounded-[50%]"
            >
              {' '}
              dev.zi0w's github
            </a>
            <p className="text-[#53FF67]">우지영</p>
          </li>
          <li className="flex flex-row justify-between items-center">
            <a
              target="blank"
              href="https://github.com/Choi-kanggun"
              className="block w-[24px] h-[24px] mx-[5px] indent-[-9999rem] bg-[url('/github.png')] bg-no-repeat bg-center bg-cover rounded-[50%]"
            >
              {' '}
              dev.Choi-kanggun's github
            </a>
            <p className="text-[#455EFF]">최강건</p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;
