"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import CoffeeType from "../../../utils/Types";
import { useRouter } from "next/navigation";
const formSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: "First name must be at least 2 characters." }),
  lastName: z
    .string()
    .min(2, { message: "Last name must be at least 2 characters." }),
  cardNumber: z
    .string()
    .min(16, { message: "Card number must be at least 16 digits." }),
  month: z.string().min(1, { message: "Month is required." }),
  year: z.string().min(4, { message: "Year must be 4 digits." }),
  CVC: z.string().min(3, { message: "CVC must be at least 3 digits." }),
  selectCountry: z.string().min(1, { message: "Please select a country" }),
});

const SecondPage = ({ user }: { user: string }) => {
  const [postDatas, setPostDatas] = useState<CoffeeType[]>([]);
  console.log('postDatas :>> ', postDatas);
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      cardNumber: "",
      month: "",
      year: "",
      CVC: "",
      selectCountry: "",
    },
  });
  const PostData = async ({
    values,
  }: {
    values: { firstname: string; lastname: string; country: string; cardnumber: string; expirydate: string; userid: string };
  }) => {
    try {
      const postData = await fetch("/api/banckcards", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      const getJson = await postData.json();
      console.log("Response from server:", getJson);
      if (getJson?.postData) {
        setPostDatas(getJson.postData);
      }
      // PostData(values.email, values.password, values.username);
      router.push("/default");
    } catch (error) {
      console.log("Error during signup:", error);
    }
  };


  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("Form values:", values);
    const formattedValues = {
      firstname: values.firstName,
      lastname: values.lastName,
      cardnumber: values.cardNumber,
      country: values.selectCountry,
      expirydate: `${values.month}/${values.year}`,
      userid: user,
    }
    PostData({ values: formattedValues });
  }

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      <div className="max-w-[510px] h-auto p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Payment Information
        </h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormLabel>Country</FormLabel>

            <FormField
              control={form.control}
              name="selectCountry"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-[448px] h-[24px] px-2 py-3 justify-center items-center gap-4">
                      <SelectValue placeholder="Select Country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>City</SelectLabel>
                        <SelectItem value="Mongulia">Mongulia</SelectItem>
                        <SelectItem value="Japen">Japen</SelectItem>
                        <SelectItem value="Koreo">Koreo</SelectItem>
                        <SelectItem value="United-State">United-State</SelectItem>
                        <SelectItem value="Australia">Australia</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex gap-4">
              {/* First Name */}
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input placeholder="First Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Last Name */}
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Last Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {/* Card Number */}
            <FormField
              control={form.control}
              name="cardNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Card Number</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="0000 0000 0000 0000"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Expiry Date & CVC */}
            <div className="flex gap-4">
              {/* Month */}
              <FormField
                control={form.control}
                name="month"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Month</FormLabel>
                    <FormControl>
                      <Input placeholder="MM" maxLength={2} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Year */}
              <FormField
                control={form.control}
                name="year"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Year</FormLabel>
                    <FormControl>
                      <Input placeholder="YYYY" maxLength={4} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* CVC */}
              <FormField
                control={form.control}
                name="CVC"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>CVC</FormLabel>
                    <FormControl>
                      <Input placeholder="CVC" maxLength={4} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button type="submit" className="w-full">
              Submit Payment
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default SecondPage;
