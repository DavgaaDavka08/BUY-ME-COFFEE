"use client"
import Image from "next/image";
import React from "react";
import { useUsers } from "../_Context/getUser";
const Header = () => {
  const { callUser } = useUsers()
  return (
    <div className="w-[90%] h-[110px] m-auto py-5  px-2 flex justify-between items-center">
      <div className="flex gap-2 items-center ">
        <Image alt="" src="/coffee.svg" width={20} height={20} />
        <p className=" text-center font-serif text-[16px] font-bold ">
          buy me coffee
        </p>
      </div>
      <div>
        <div>

        </div>
      </div>
      <div className="flex gap-2 items-center">
        <Image alt="" src="/avatar.svg" width={30} height={30} />
        {callUser && callUser[0].username}
      </div>
    </div>
  );
};

export default Header;
