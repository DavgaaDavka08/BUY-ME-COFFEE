"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import CoffeeType from "../../../../utils/Types";

const formSchema = z.object({
  email: z.string().min(3, {
    message: "Email must be at least 3 characters.",
  }),
  password: z.string().min(3, {
    message: "Password must be at least 3 characters.",
  }),
  username: z.string().min(3, {
    message: "Username must be at least 3 characters.",
  }),
});

export default function Second({ user }: { user: string }) {
  const [postDatas, setPostDatas] = useState<CoffeeType[]>([]);
  console.log("postDatas :>> ", postDatas);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      username: user,
    },
  });
  const router = useRouter();

  const PostData = async ({
    values,
  }: {
    values: { email: string; password: string; username: string };
  }) => {
    try {
      const postData = await fetch("/api/burtguuleh", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      const getJson = await postData.json();
      console.log("Response from server:", getJson);
      console.log(getJson.user.id);
      if (getJson?.postData) {
        setPostDatas(getJson.postData);
      }
      localStorage.setItem("userId", getJson.user.id);
      // PostData(values.email, values.password, values.username);
      router.push("/nevtreh");
    } catch (error) {
      console.log("Error during signup:", error);
    }
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("Form values:", values);
    PostData({ values });
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
            <Button className="w-[355px]" type="submit">
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
