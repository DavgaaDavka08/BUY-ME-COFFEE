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
  email: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});
const FirstPage = ({ next }: { next: () => void }) => {
  console.log("next :>> ", next);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }
  return (
    <div className="w-[60%] m-auto h-screen flex flex-col">


      <div className="flex flex-col m-auto p-6 items-start justify-center gap-2.5">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="gap-4">
                  <FormLabel className="text-[24px]">
                    Welcome, baconpancakes1
                  </FormLabel>
                  <FormDescription>
                    Connect email and set a password
                  </FormDescription>
                  <FormLabel className="text-[16px]">email</FormLabel>
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
          </form>
        </Form>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="password"
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
            <Button onClick={() => next()} className="w-[355px]" type="submit">
              Submit
            </Button>
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
