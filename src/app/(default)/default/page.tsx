"use client";
import { useUser } from "@/app/_Context/getCreateProfile";
import { useUsers } from "@/app/_Context/getUser";
import { ButtonDemo } from "@/components/buttun";
import { SelectDemo } from "@/components/my-shadchn/selegtdashboard";
import Image from "next/image";
import React from "react";
const DashboardProfile = () => {
  const { callData } = useUser();
  const { callUser } = useUsers()
  console.log("object :>> ", callData);
  console.log('callUser !!!!!!!!!!:>> ', callUser);
  return (
    <div className="w-[67%] h-screen m-auto ">
      <div className="w-[100%] h-[220px] flex py-4 px-9 justify-between flex-col items-start gap-6 rounded-2xl bg-white border">
        <div className="w-[100%]  flex justify-between items-center">
          <div className="flex gap-3">
            <Image
              alt=""
              src="/avatarImage"
              width={50}
              height={50}
            />
            <div className="flex flex-col justify-center items-start">
              <p>{callData && callData[0].name}</p>
              <p>{callUser && callUser[0].email}</p>
            </div>
          </div>
          <div>
            <ButtonDemo />
          </div>
        </div>
        <div className="flex flex-col items-start gap-6">
          <div className="flex gap-4 items-center">
            <p>Earnings</p>
            <div>
              <SelectDemo />
            </div>
          </div>
          <div>$450</div>
        </div>
      </div>
      <div className="flex h-[200px] justify-between w-[100%] items-center ">
        <p>Recent transactions</p>
        <div>
          <SelectDemo />
        </div>
      </div>
      <div className="flex p-6 flex-col items-start gap-4 rounded-2xl border">
        <div className="flex p-3 w-[100%]  flex-col items-start gap-2.5">
          <div className="w-[100%]  flex justify-between items-center">
            <div className="flex gap-3 items-center">
              <Image alt="" src="/avatar.svg" width={50} height={50} />
              <div className="flex flex-col">
                <p>Guest</p>
                <p>instagram.com/welesley</p>
              </div>
            </div>
            <div className="flex flex-col">
              <p>+1$</p>
              <p>10 hours ago</p>
            </div>
          </div>
        </div>
        <p></p>
        <div className="flex p-3 w-[100%]  flex-col items-start gap-2.5">
          <div className="w-[100%]  flex justify-between items-center">
            <div className="flex gap-3 items-center">
              <Image alt="" src="/avatar.svg" width={50} height={50} />
              <div className="flex flex-col">
                <p>Guest</p>
                <p>instagram.com/welesley</p>
              </div>
            </div>
            <div className="flex flex-col">
              <p>+1$</p>
              <p>10 hours ago</p>
            </div>
          </div>
        </div>
        <div className="flex p-3 w-[100%]  flex-col items-start gap-2.5">
          <div className="w-[100%]  flex justify-between items-center">
            <div className="flex gap-3 items-center">
              <Image alt="" src={`/avatarImage`} width={50} height={50} />
              <div className="flex flex-col">
                <p>Guest</p>
                <p>instagram.com/welesley</p>
              </div>
            </div>
            <div className="flex flex-col">
              <p>+1$</p>
              <p>10 hours ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardProfile;
