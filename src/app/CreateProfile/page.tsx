"use client";
import React, { useState } from "react";
import FirstPage from "./FristPage";
import SecondPage from "./SecondPage";


const Page = () => {
    const [changePage, setChangePage] = useState<number>(0);
    const FormStep = [FirstPage, SecondPage][changePage];
    const next = () => {
        setChangePage(changePage + 1);
    };
    return (
        <div>
            <FormStep next={next} />
        </div>
    );
};

export default Page;
