"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import React, { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";

import { useRouter } from "next/navigation";
import CoffeeType from "../../../../utils/Types";
import axios from "axios";

const formSchema = z.object({
  email: z.string().min(2, {
    message: "Email must be at least 2 characters.",
  }),
  password: z.string().min(2, {
    message: "Password must be at least 2 characters.",
  }),
});

const FirstPage = () => {
  const router = useRouter();
  const [user, setUser] = useState<CoffeeType[]>([]);
  console.log("user :>> ", user);
  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await axios.post("http://localhost:3000/api/nevtreh");
        setUser(response.data || []);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    }
    fetchUsers();
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await axios.post("/api/nevtreh", {
        email: values.email,
        password: values.password,
      });
      console.log("response :>> ", response);
      router.push("/CreateProfile");
    } catch (error) {
      console.log("ERROR in nevtreh", error);
    }
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
                  <FormLabel className="text-[24px]">Welcome back</FormLabel>
                  <FormLabel className="text-[16px]">Email</FormLabel>
                  <FormControl>
                    <Input
                      className="w-[355px]"
                      placeholder="you@example.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="gap-4">
                  <FormLabel className="text-[16px]">Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      className="w-[355px]"
                      placeholder="••••••"
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
};

export default FirstPage;
