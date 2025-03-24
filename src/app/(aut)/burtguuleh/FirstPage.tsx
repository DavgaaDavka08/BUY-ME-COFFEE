"use client";
import {
  Form,
  FormControl,
  FormDescription,
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

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});
const FirstPage = ({ next }: { next: () => void }) => {
  console.log("next :>> ", next);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }
  return (
    <div className="w-[60%] h-screen flex flex-col ">
      <div className="w-[900px] p-14 flex items-end justify-end ">
        <ButtonSecondary />
      </div>
      <div className="flex flex-col m-auto p-6 items-start justify-center gap-2.5">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem className="gap-4">
                  <FormLabel className="text-[24px]">
                    Create Youre Account
                  </FormLabel>
                  <FormDescription>
                    Choose a username for your page
                  </FormDescription>
                  <FormLabel className="text-[16px]">UserName</FormLabel>
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
            <Button onClick={() => next()} className="w-[355px]" type="submit">
              Submitfnsdkjabfdjkasbfdsakjlb
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default FirstPage;
