
import { RandomButton } from "@/components/my-shadchn/ramdombuttun";
import Link from "next/link";
import React from "react";
const Page = () => {
  return (
    <Link href="/burtguuleh">
      <div className="w-full h-screen flex justify-center items-center ">
        <RandomButton />
      </div>

    </Link>
  );
};
export default Page;
