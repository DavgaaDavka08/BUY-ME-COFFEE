"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

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
import { useEffect, useState } from "react";
import { useUser } from "../_Context/userContext";
import CoffeeType from "../../../utils/Types";

const UPLOAD_PRESET = "food";
const CLOUD_NAME = "748589482997997";

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
    return { "failed to upload image": error };
  }
};

const formSchema = z.object({
  name: z.string().min(2, "Хамгийн багадаа 2 үсэгтэй байх ёстой"),
  image: z.string().nonempty("Zuragaa oruulna uu"),
  about: z.string().min(2, "Хамгийн багадаа 2 үсэгтэй байх ёстой"),
  urL: z.string().nonempty("link оруулна уу"),
});

export default function FirstPage({ next }: { next: () => void }) {
  const [foodImageFile, setFoodImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>();
  const [callData, setCallData] = useState<CoffeeType[] | null>(null);
  useEffect(() => {
    fetch("/api/coffee")
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        setCallData(json.data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      image: "",
      about: "",
      urL: "",
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];
    setFoodImageFile(file);
    const tempImageUrl = URL.createObjectURL(file);
    setPreviewUrl(tempImageUrl);
    form.setValue("image", "uploaded");
  };
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const imageUrl = await uploadImage(foodImageFile);
    if (!imageUrl || typeof imageUrl !== "string") {
      form.setError("image", { message: "Зургийг хуулж чадсангүй" });
      return;
    }
    const updatedValues = { ...values, image: imageUrl };
    console.log("Updated values:", updatedValues);
    form.setValue("image", imageUrl);
    setFoodImageFile(null);
    setPreviewUrl("");
    form.setValue("image", "");
    next();
  };

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      <div className="max-w-[510px]  h-[631px] flex flex-col gap-5">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="image"
                      type="file"
                      onChange={(e) => {
                        field.onChange(e);
                        handleChange(e);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Food name</FormLabel>
                  <FormControl>
                    <Input
                      className="w-[510px] h-[40px]"
                      placeholder="Soup"
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
                  <FormLabel>Food name</FormLabel>
                  <FormControl>
                    <Input
                      className="w-[510px] h-[131px]"
                      placeholder="Soup"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="urL"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>urL</FormLabel>
                  <FormControl>
                    <Input type="url" placeholder="http//" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-end justify-end">
              <Button className="w-[246px] h-[40px]" type="submit">
                Submit
              </Button>
            </div>
          </form>
        </Form>
        {previewUrl && (
          <div className="border">
            <img className="size-48 object-cover" src={previewUrl} alt="" />
          </div>
        )}
        {callData && callData[0].name}
      </div>
    </div>
  );
}
