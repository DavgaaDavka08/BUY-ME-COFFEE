"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import axios from "axios";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { ButtonSecondary } from "@/components/signup";
import CoffeeType from "../../../../utils/Types";
const formSchema = z.object({
  userName: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});
const FirstPage = ({
  setUser,
}: {
  setUser: Dispatch<SetStateAction<string>>;
}) => {
  const [posts, setPosts] = useState<CoffeeType[]>([]);
  console.log("posts :>> ", posts);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userName: "",
    },
  });

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await axios.post(
          "http://localhost:3000/api/burtguuleh"
        );
        setPosts(response.data || []);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    }
    fetchPosts();
  }, []);
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("object :>> ", values);
    setUser(values.userName);
    return;
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
            <Button className="w-[355px]" type="submit">
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
