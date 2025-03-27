"use client";
import React, { useState } from "react";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo"; // ✅ Зөв замаар импортолж байна.

const Page = () => {
  const [changePage, setChangePage] = useState<number>(0);
  const FormStep = [StepOne, StepTwo][changePage];

  console.log(StepOne, StepTwo); // Undefined байгаа эсэхийг шалгаарай.

  const next = () => {
    setChangePage(changePage + 1);
  };
  const back = () => {
    setChangePage(changePage - 1);
  };

  return (
    <div>
      <FormStep next={next} back={back} />
    </div>
  );
};

export default Page;
