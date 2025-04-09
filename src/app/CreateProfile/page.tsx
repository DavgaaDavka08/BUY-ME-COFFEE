"use client";

import { useState } from "react";
import SecondPage from "./SecondPage";
import Firstpage from "./FristPage";


export default function Page() {
    const [current, setCurrent] = useState(0);
    const [user, setUser] = useState("");
    const Form = [Firstpage, SecondPage][current];
    console.log("Form :>> ", Form);
    const changepage = () => {
        setCurrent(current + 1);
    };
    console.log("changepage :>> ", changepage);
    return (
        <div>
            {!user ? <Firstpage setUser={setUser} changepage={changepage} /> : <SecondPage user={user} />}
        </div>
    );
}
