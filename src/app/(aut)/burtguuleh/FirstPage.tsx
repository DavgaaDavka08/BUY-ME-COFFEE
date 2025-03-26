"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";

import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { ButtonSecondary } from "@/components/signup";
import { useUser } from "@/app/_Context/userContext";

const formSchema = z.object({
  userName: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

const FirstPage = ({ next }: { next: () => void }) => {
  const { callData } = useUser();

  console.log("object :>> ", callData);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userName: "",
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    const foundUser = callData?.find(
      (hereglegch) => hereglegch.username !== values.userName
    );
    if (foundUser) {
      console.log("adilhan nertein bn neree soli");
      return;
    }
    console.log("Aan boljiino nerchin");
    next();
  }
  return (
    <div className="w-[60%] m-auto h-screen flex flex-col">
      <div className="flex flex-col m-auto p-6 items-start justify-center gap-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="userName"
              render={({ field }) => (
                <FormItem className="gap-4">
                  <FormLabel className="text-[16px]">password</FormLabel>
                  <FormControl>
                    <Input
                      className="w-[355px]"
                      placeholder="shadcn"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-[355px]" type="submit">
              Submit
            </Button>
            {callData && callData[0].username}
          </form>
        </Form>
        <div>
          <ButtonSecondary />
        </div>
      </div>
    </div>
  );
};

export default FirstPage;
