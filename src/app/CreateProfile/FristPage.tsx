"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

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
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Image from "next/image";

const UPLOAD_PRESET = "coffee";
const CLOUD_NAME = "748589482997997";

const uploadImage = async (file: File | null): Promise<string | null> => {
    if (!file) return null;

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

        if (!response.ok) {
            throw new Error("Failed to upload image");
        }

        const result = await response.json();
        return result.secure_url;
    } catch (error) {
        console.error("Upload error:", error);
        return null;
    }
};

const formSchema = z.object({
    name: z.string().min(2, "Хамгийн багадаа 2 үсэгтэй байх ёстой"),
    image: z.string().nonempty("Зургаа оруулна уу"),
    about: z.string().min(2, "Хамгийн багадаа 2 үсэгтэй байх ёстой"),
    urL: z.string().nonempty("link оруулна уу"),
});

export default function FirstPage() {
    const [foodImageFile, setFoodImageFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string>();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            image: "",
            about: "",
            urL: ""
        },
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setFoodImageFile(file);

        const tempImageUrl = URL.createObjectURL(file);
        setPreviewUrl(tempImageUrl);
    };

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        const imageUrl = await uploadImage(foodImageFile);
        if (!imageUrl) {
            form.setError("image", { message: "Зургийг хуулж чадсангүй" });
            return;
        };
        console.log('values :>> ', values);
    };

    return (
        <div className="w-full h-screen flex flex-col items-center justify-center">
            <div className="max-w-[510px]  h-[631px] flex flex-col gap-5">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        {/* Image Upload */}
                        <FormField
                            control={form.control}
                            name="image"
                            render={({ fieldState }) => (
                                <FormItem>
                                    <FormLabel>Complete your profile page</FormLabel>
                                    <FormDescription>Add a photo</FormDescription>
                                    <FormControl>
                                        <Input
                                            type="file"
                                            className="w-[160px] h-[160px] rounded-full justify-center items-center border-2 border-dashed border-gray-300"
                                            accept="image/*"
                                            onChange={handleChange}
                                        />
                                    </FormControl>
                                    <FormMessage>{fieldState.error?.message}</FormMessage>
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
                                        <Input className="w-[510px] h-[40px]" placeholder="Soup" {...field} />
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
                                        <Input className="w-[510px] h-[131px]" placeholder="Soup" {...field} />
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
                            <Button className="w-[246px] h-[40px]" type="submit">Submit</Button>
                        </div>

                    </form>
                </Form>

                {/* Image Preview */}
                {previewUrl && (
                    <div className="border">
                        <Image width={192} height={192} className="size-48 object-cover rounded-md" src={previewUrl} alt="Preview" />
                    </div>
                )}
            </div>
        </div>
    );
}
