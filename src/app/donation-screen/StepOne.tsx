"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState } from "react";
////
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
})
const StepOne = ({ next }: { next: () => void }) => {
  const [showQRCode, setShowQRCode] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState("$2");

  const handleSupport = () => {
    setShowQRCode(true);
  };
  const handleBack = () => {
    setShowQRCode(false);
  };
  ///
  //
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  })
  function onSubmit(values: z.infer<typeof formSchema>) {

    console.log(values)
  }
  return (
    <div className="w-full min-h-screen bg-white">
      {/* Cover Image Area */}
      <div className="w-full h-[339px] flex justify-end items-start p-6 bg-emerald-400">
        <Button variant="secondary" className="flex items-center gap-2">
          <span>Change cover</span>
        </Button>
      </div>
      <div className="max-w-7xl mx-auto px-4 -mt-16">
        <div className="flex flex-col md:flex-row w-full gap-8 items-start justify-between">
          {/* Left Column */}
          <div className="flex w-full md:w-[45%] flex-col gap-6">
            {/* Profile Card */}
            <div className="flex p-6 gap-6 flex-col items-start rounded-2xl border bg-white">
              <div className="w-full flex justify-between items-center">
                <div className="flex gap-3 items-center">
                  <div className="w-[50px] h-[50px] bg-gray-200 rounded-full flex items-center justify-center">
                    <span className="text-gray-500">J</span>
                  </div>
                  <p className="text-xl font-medium"></p>
                </div>
                <Button variant="outline" size="sm">
                  Edit page
                </Button>
              </div>
            </div>

            {/* Social Media URL Card */}
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input placeholder="shadcn" {...field} />
                      </FormControl>
                      <FormDescription>
                        This is your public display name.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit">Submit</Button>
              </form>
            </Form>

            {/* Recent Supporters Card */}
            <div className="flex p-6 flex-col items-start gap-4 rounded-2xl border bg-white">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                          <Input placeholder="shadcn" {...field} />
                        </FormControl>
                        <FormDescription>
                          This is your public display name.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit">Submit</Button>
                </form>
              </Form>
            </div>

          </div>
          {/* Right Column - Donation Form */}
          <div className="w-full md:w-[45%]">
            <div className="bg-white p-6 rounded-2xl border">
              {showQRCode ? (
                <div className="relative bg-white p-6 rounded-lg">
                  <div className="flex flex-col items-center justify-center">
                    <Button
                      onClick={handleBack}
                      className="absolute top-2 left-2 p-1 rounded-full hover:bg-gray-100"
                    />
                    <h2 className="text-xl font-semibold mb-2">Scan QR code</h2>
                    <p className="text-sm text-gray-600 mb-4">
                      Scan the QR code to complete your donation
                    </p>

                    <div className="w-40 h-40 relative mb-4">
                      <Image
                        src="/frame.png"
                        alt="QR Code"
                        width={160}
                        height={160}
                        className="border border-gray-200 rounded-md"
                      />
                    </div>

                    <Button
                      onClick={next}
                      className="w-full bg-black text-white hover:bg-gray-800"
                    >
                      Complete Payment
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold"></h2>

                  <div>
                    <p className="mb-2 text-sm font-medium">Select amount:</p>
                    <div className="grid grid-cols-4 gap-2">
                      <Button
                        variant="outline"
                        className={`rounded-full ${selectedAmount === "$1" ? "bg-gray-100" : ""
                          }`}
                        onClick={() => setSelectedAmount("$1")}
                      >
                        $1
                      </Button>
                      <Button
                        variant="outline"
                        className={`rounded-full ${selectedAmount === "$2" ? "bg-gray-100" : ""
                          }`}
                        onClick={() => setSelectedAmount("$2")}
                      >
                        $2
                      </Button>
                      <Button
                        variant="outline"
                        className={`rounded-full ${selectedAmount === "$5" ? "bg-gray-100" : ""
                          }`}
                        onClick={() => setSelectedAmount("$5")}
                      >
                        $5
                      </Button>
                      <Button
                        variant="outline"
                        className={`rounded-full ${selectedAmount === "$10" ? "bg-gray-100" : ""
                          }`}
                        onClick={() => setSelectedAmount("$10")}
                      >
                        $10
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                          control={form.control}
                          name="username"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Username</FormLabel>
                              <FormControl>
                                <Input placeholder="shadcn" {...field} />
                              </FormControl>
                              <FormDescription>
                                This is your public display name.
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                      </form>
                    </Form>
                  </div>

                  <div className="space-y-2">
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                          control={form.control}
                          name="username"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Username</FormLabel>
                              <FormControl>
                                <Input placeholder="shadcn" {...field} />
                              </FormControl>
                              <FormDescription>
                                This is your public display name.
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <Button type="submit">Submit</Button>
                        <Button
                          type="submit"
                          onClick={handleSupport}
                          className="w-full bg-black text-white hover:bg-gray-800"
                        >
                          Support
                        </Button>
                      </form>
                    </Form>
                  </div>


                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default StepOne;
