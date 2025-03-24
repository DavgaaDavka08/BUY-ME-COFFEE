import Image from "next/image";
import React from "react";

const Photo = () => {
  return (
    <div className="w-[45%] bg-[#FBBF24] h-screen ">
      <div className="flex p-10">
        <Image alt="" src="/coffee.svg" width={20} height={20} />
        <p>buy me coffee</p>
      </div>

      <div className="w-[40%] h-[944px] m-auto flex flex-col items-center justify-center gap-5 ">
        <Image alt="" src="/photo.png" width={240} height={240} />
        <div className=" gap-2  w-[445px] h-[88px] items-center flex flex-col justify-center">
          <p className="text-[#09090B] text-center font-serif text-[24px] font-bold ">
            Fund your creative work
          </p>
          <p className="text-[#09090B] text-[16px] leading-[24px] font-normal text-center text-text-foreground ">
            Accept support. Start a membership. Setup a shop Its think.
          </p>
          <p>easier than you think</p>
        </div>
      </div>
    </div>
  );
};

export default Photo;
