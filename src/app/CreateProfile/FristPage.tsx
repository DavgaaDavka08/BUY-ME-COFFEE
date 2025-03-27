"use client";

import type React from "react";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Camera } from "lucide-react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import type CoffeeType from "../../../utils/Types";

const UPLOAD_PRESET = "food";
const CLOUD_NAME = "748589482997997";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  about: z.string().min(2, "About must be at least 2 characters"),
  socialMediaURL: z.string().url("Please enter a valid URL"),
});

export default function ProfileForm({ next }: { next: () => void }) {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [callData, setCallData] = useState<CoffeeType[] | null>(null);
  const [loading, setLoading] = useState(true);

  console.log("loading :>> ", loading);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/coffee");

        if (!res.ok) {
          throw new Error(`API responded with status: ${res.status}`);
        }

        const contentType = res.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          return;
          throw new Error("API did not return JSON");
        }

        const json = await res.json();
        setCallData(json.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Set callData to an empty array instead of null to avoid errors
        setCallData([]);
      } finally {
        setLoading(false);
      }
    };

    // Only fetch if we're in a browser environment
    if (typeof window !== "undefined") {
      fetchData();
    } else {
      setLoading(false);
    }
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: (callData && callData[0]?.name) || "",
      about: (callData && callData[0]?.about) || "",
      socialMediaURL: (callData && callData[0]?.socialMediaURL) || "",
    },
  });

  const uploadImage = async (file: File | null) => {
    if (!file) {
      return null;
    }
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
      const result = await response.json();
      return result.secure_url;
    } catch (error: unknown) {
      console.error("Failed to upload image:", error);
      return null;
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      const tempImageUrl = URL.createObjectURL(file);
      setPreviewUrl(tempImageUrl);
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const imageUrl = await uploadImage(imageFile);
    const updatedValues = { ...values, image: imageUrl };
    console.log("Updated values:", updatedValues);
    setImageFile(null);
    setPreviewUrl(null);
    next();
    return;
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-[510px] bg-white rounded-lg p-6 space-y-6">
        <h1 className="text-2xl font-semibold text-center">
          Complete your profile page
        </h1>

        <div className="flex flex-col items-center">
          <p className="text-sm mb-4">Add photo</p>
          <div className="relative">
            <div
              className="w-24 h-24 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center bg-gray-50"
              onClick={() => document.getElementById("photo-upload")?.click()}
            >
              {previewUrl ? (
                <Image
                  src={previewUrl || "/placeholder.svg"}
                  alt="Profile preview"
                  width={96}
                  height={96}
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <Camera className="text-gray-400" />
              )}
            </div>
            <Input
              id="photo-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your name here"
                      className="h-12"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="about"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>About</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Write about yourself here"
                      className="min-h-[120px] resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="socialMediaURL"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Social media URL</FormLabel>
                  <FormControl>
                    <Input
                      type="url"
                      placeholder="https://"
                      className="h-12"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="pt-4">
              <Button type="submit" className="w-full h-12 rounded-md">
                Continue
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
