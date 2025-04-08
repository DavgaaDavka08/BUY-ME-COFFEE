"use client";

import { useState } from "react";
import FirstPage from "./FirstPage";
import Second from "./SecondPage";

export default function Page() {
  const [current, setCurrent] = useState(0);
  const [user, setUser] = useState("");
  const Form = [FirstPage, Second][current];
  console.log("Form :>> ", Form);
  const changepage = () => {
    setCurrent(current + 1);
  };
  console.log("changepage :>> ", changepage);
  return (
    <div>
      {!user ? <FirstPage setUser={setUser} /> : <Second user={user} />}
    </div>
  );
}
