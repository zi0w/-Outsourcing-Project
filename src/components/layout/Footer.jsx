const Footer = () => {
  return (
    // full-back
    <div className="bg-[#0a0a0a]">
      {/* footer - inner */}
      <div className="mx-auto w-full max-w-[600px] h-[200px] p-[43px] text-center">
        {/* copyright text */}
        <p className="mb-[20px] text-[#fff] text-[21px] font-medium">
          @ Copyright 2024 pa5rangers. All rights reserved
        </p>
        {/* developer intro */}
        <ul className="flex justify-between mx-auto ">
          <li className>
            <p className="text-[#FF5555] font-medium">최민석</p>
            <a
              target="blank"
              href="https://github.com/Noonsae"
              className="block w-[42px] h-[42px] mx-auto indent-[-9999rem] bg-[url('/github.png')] bg-no-repeat bg-center bg-cover rounded-[50%]"
            >
              dev.Noonsae's github
            </a>
          </li>
          <li>
            <p className="text-[#F66CC8]">김민후</p>
            <a
              target="blank"
              href="https://github.com/kminhoo"
              className="block w-[42px] h-[42px] mx-auto indent-[-9999rem] bg-[url('/github.png')] bg-no-repeat bg-center bg-cover rounded-[50%]"
            >
              dev.kminhoo's github
            </a>
          </li>
          <li>
            <p className="text-[#ffff42]">김민지</p>
            <a
              target="blank"
              href="https://github.com/minji7901"
              className="block w-[42px] h-[42px] mx-auto indent-[-9999rem] bg-[url('/github.png')] bg-no-repeat bg-center bg-cover rounded-[50%]"
            >
              dev.minji7901's github
            </a>
          </li>
          <li>
            <p className="text-[#53FF67]">우지영</p>
            <a
              target="blank"
              href="https://github.com/zi0w"
              className="block w-[42px] h-[42px] mx-auto indent-[-9999rem] bg-[url('/github.png')] bg-no-repeat bg-center bg-cover rounded-[50%]"
            >
              dev.zi0w's github
            </a>
          </li>
          <li>
            <p className="text-[#455EFF]">최강건</p>
            <a
              target="blank"
              href="https://github.com/Choi-kanggun"
              className="block w-[42px] h-[42px] mx-auto indent-[-9999rem] bg-[url('/github.png')] bg-no-repeat bg-center bg-cover rounded-[50%]"
            >
              dev.Choi-kanggun's github
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;
