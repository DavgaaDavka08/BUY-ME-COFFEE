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

import CoffeeType from "../../../utils/Types";
import Image from "next/image";

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
        return { "failed to upload avatarImage": error };
    }
};

const formSchema = z.object({
    name: z.string().min(2, "bagdada2"),

    about: z.string().min(2, "2 useg"),
    socialMediaURL: z.string().nonempty("link orul"),
});

export default function FirstPage({ next }: { next: () => void }) {
    const [foodImageFile, setFoodImageFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string>();
    const [callData, setCallData] = useState<CoffeeType[] | null>(null);
    const [loading, setLoading] = useState(true);
    console.log('loading :>> ', loading);
    useEffect(() => {
        fetch("/api/coffee")
            .then((res) => res.json())
            .then((json) => {
                setCallData(json.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
                setLoading(false);
            });
    }, []);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",

            about: "",
            socialMediaURL: ""
        },
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files![0];
        setFoodImageFile(file);
        const tempImageUrl = URL.createObjectURL(file);
        setPreviewUrl(tempImageUrl);

    };
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        const imageUrl = await uploadImage(foodImageFile);
        // if (!imageUrl || typeof imageUrl !== "string") {
        //     return;
        // }
        const updatedValues = { ...values, image: imageUrl };
        console.log("Updated values:", updatedValues);
        setFoodImageFile(null);
        setPreviewUrl("");
        next();
        return
    };

    return (
        <div className="w-full h-screen flex flex-col items-center justify-center">
            <div className="max-w-[510px]  h-[631px] flex flex-col gap-5">
                <Input
                    placeholder="avatarImage"
                    type="file"
                    onChange={(e) => {
                        handleChange(e);
                    }}
                />
                <Form {...form}>


                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

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
                            name="socialMediaURL"
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
                        <Image width={100} height={100} className="size-48 object-cover" src={previewUrl} alt="" />
                    </div>
                )}
                <div className="flex flex-col gap-1">
                    {callData && callData[0].name}
                    {callData && callData[0].about}

                </div>
                {callData && callData[0].socialMediaURL}
                {callData && callData[0].avatarImage}
            </div>
        </div>
    );
}
