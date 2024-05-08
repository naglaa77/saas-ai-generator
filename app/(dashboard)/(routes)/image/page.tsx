'use client'

import * as z from "zod";
import {Heading} from "@/components/heading";
import {Download, ImageIcon} from "lucide-react";
import {useForm} from "react-hook-form";
import {formSchema} from "@/app/(dashboard)/(routes)/image/constants";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";
import {useState} from "react";
import axios from "axios";
import {Empty} from "@/components/empty";
import {Loader} from "@/components/loader";
import { cn } from "@/lib/utils";
import {UserAvatar} from "@/components/user-avatar";
import {BotAvatar} from "@/components/bot-avatar";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {amountOptions, resolutionOptions} from "@/app/(dashboard)/(routes)/image/constants";
import {Card, CardFooter} from "@/components/ui/card";
import Image from "next/image";
import {useProModal} from "@/hooks/use-pro-modal";
import toast from "react-hot-toast";




export default function ImagePage() {

    const proModal = useProModal()
    const router = useRouter();
    const [images, setImages] = useState<string[]>([])

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: "",
            amount: "1",
            resolution: "512x512"
        }
    });
    const  isLoading = form.formState.isSubmitting;

   const onSubmit = async (values: z.infer<typeof formSchema>) => {

        try {
            setImages([])

             const response = await axios.post("/api/image",values)
            const urls = response.data.map((image:{url:string}) => image.url)
            setImages(urls)
            form.reset()
            console.log("images",values)

        }catch (error:any){
            if (error?.response?.status === 403) {
                proModal.onOpen()
            }else {
                toast.error("An error occurred. Please try again later.");
            }
        }finally {
            router.refresh()
        }
   }


    // @ts-ignore
    return (
        <div>
            <Heading
                title="Image Generation"
                description="Turn your text into an image."
                icon={ImageIcon}
                iconColor="text-pink-700"
                bgColor="bg-pink-700/10"
            />
            <div className="px-4 lg:px-8">
                <div>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}
                           className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2"
                        >
                            <FormField
                                name="prompt"
                                render={({ field }) =>(
                                    <FormItem className="col-span-12 lg:col-span-6">
                                        <FormControl className="m-0 p-0">
                                            <Input className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                                               disabled={isLoading}
                                               placeholder="A picture of a cat"
                                                {...field}
                                            />
                                        </FormControl>
                                    </FormItem>

                                )}
                            />
                            <FormField
                                name="amount"
                                control={form.control}
                                render={({field}) =>(
                                    <FormItem className="col-span-12 lg:col-span-2">
                                        <Select
                                            disabled={isLoading}
                                            onValueChange={field.onChange}
                                            value={field.value}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue defaultValue={field.value}/>
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {amountOptions.map((option) => (
                                                    <SelectItem key={option.value} value={option.value}>
                                                        {option.label}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="resolution"
                                render={({field}) =>(
                                    <FormItem className="col-span-12 lg:col-span-2">
                                        <Select
                                            disabled={isLoading}
                                            onValueChange={field.onChange}
                                            value={field.value}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue defaultValue={field.value}/>
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {resolutionOptions.map((option) => (
                                                    <SelectItem key={option.value} value={option.value}>
                                                        {option.label}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </FormItem>
                                )}
                            />
                            <Button className="col-span-12 lg:col-span-2 w-full">Generate</Button>
                        </form>

                    </Form>
                </div>
                <div className="space-y-4 mt-4">
                    {isLoading && (
                        <div className="p-20">
                            <Loader/>
                        </div>

                    )}
                    {images.length === 0 && !isLoading && (
                        <Empty label="No images generated."/>
                    )}
                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:gird-cols-4 gap-4 mt-8">
                         {images.map((src) =>(
                            <Card
                                key={src}
                                className="overflow-hidden rounded-lg"
                            >
                                <div className="relative aspect-square">
                                    <Image src={src} alt="image" fill/>
                                </div>
                                <CardFooter className="p-2">
                                    <Button className="w-full" variant="secondary" onClick={() => window.open(src)}>
                                        <Download className="h-4 w-4 mr-2"/>
                                        Download
                                    </Button>
                                </CardFooter>

                            </Card>
                         ))}
                     </div>
                </div>
            </div>
        </div>
    )
}



// "use client";
//
// import axios from "axios";
// import * as z from "zod";
// import { Download, ImageIcon } from "lucide-react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useRouter } from "next/navigation";
// import { useState } from "react";
// import Image from "next/image";
//
// import {
//     Select,
//     SelectContent,
//     SelectItem,
//     SelectTrigger,
//     SelectValue
// } from "@/components/ui/select";
// import { Heading } from "@/components/heading";
// import {
//     Form,
//     FormControl,
//     FormField,
//     FormItem
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Empty } from "@/components/empty";
// import { Loader } from "@/components/loader";
// import { cn } from "@/lib/utils";
// import { Card, CardFooter } from "@/components/ui/card";
//
// import {
//     amountOptions,
//     formSchema,
//     resolutionOptions
// } from "./constants";
//
// type ChatCompletionMessageParam = {         //maybe delete this part, not in the video!
//     role: "user" | "assistant";             //no chat completion request message
//     content: string;
// };
//
// const ImagePage = () => {
//     const router = useRouter();
//     const [images, setImages] = useState<string[]>([]);
//
//     const form = useForm<z.infer<typeof formSchema>>({
//         resolver: zodResolver(formSchema),
//         defaultValues: {
//             prompt: "",
//             amount: "1",
//             resolution: "256x256",
//         }
//     });
//
//     const isLoading  = form.formState.isSubmitting;
//
//     const onSubmit = async (values: z.infer<typeof formSchema>) => {
//         try {
//             setImages([]);
//
//             const response = await axios.post("/api/image", values);
//
//             const urls = response.data.map((image: { url: string }) => image.url);
//
//             setImages(urls);
//             form.reset();
//         }   catch (error: any) {
//             // TO DO: Open Pro Modal
//             console.log(error);
//         }   finally {
//             router.refresh();
//         }
//     };
//
//     return (
//         <div>
//             <Heading
//                 title="Image Generation"
//                 description="Create an image from a prompt."
//                 icon={ImageIcon}
//                 iconColor="text-pink-700"
//                 bgColor="bg-pink-700/10"
//             />
//             <div className="px-4 lg:px-8">
//                 <div>
//                     <Form {...form}>
//                         <form
//                             onSubmit={form.handleSubmit(onSubmit)}
//                             className="
//                                 rounded-lg
//                                 border
//                                 w-full
//                                 p-4
//                                 px-3
//                                 md:px-6
//                                 focus-within:shadow-sm
//                                 grid
//                                 grid-cols-12
//                                 gap-2
//                             "
//                         >
//                             <FormField
//                                 name ="prompt"
//                                 render={({ field }) => (
//                                     <FormItem className="col-span-12 lg:col-span-6">
//                                         <FormControl className="m-0 p-0">
//                                             <Input
//                                                 className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
//                                                 disabled={isLoading}
//                                                 placeholder="A colloseum in the style of nordic mythology"
//                                                 {...field}
//                                             />
//                                         </FormControl>
//                                     </FormItem>
//                                 )}
//                             />
//                             <FormField
//                                 control={form.control}
//                                 name="amount"
//                                 render={({ field }) => (
//                                     <FormItem className="col-span-12 lg:col-span-2">
//                                         <Select
//                                             disabled={isLoading}
//                                             onValueChange={field.onChange}
//                                             value={field.value}
//                                             defaultValue={field.value}
//                                         >
//                                             <FormControl>
//                                                 <SelectTrigger>
//                                                     <SelectValue defaultValue={field.value} />
//                                                 </SelectTrigger>
//                                             </FormControl>
//                                             <SelectContent>
//                                                 {amountOptions.map((option) => (
//                                                     <SelectItem
//                                                         key={option.value}
//                                                         value={option.value}
//                                                     >
//                                                         {option.label}
//                                                     </SelectItem>
//                                                 ))}
//                                             </SelectContent>
//                                         </Select>
//                                     </FormItem>
//                                 )}
//                             />
//                             <FormField
//                                 control={form.control}
//                                 name="resolution"
//                                 render={({ field }) => (
//                                     <FormItem className="col-span-12 lg:col-span-2">
//                                         <Select
//                                             disabled={isLoading}
//                                             onValueChange={field.onChange}
//                                             value={field.value}
//                                             defaultValue={field.value}
//                                         >
//                                             <FormControl>
//                                                 <SelectTrigger>
//                                                     <SelectValue defaultValue={field.value} />
//                                                 </SelectTrigger>
//                                             </FormControl>
//                                             <SelectContent>
//                                                 {resolutionOptions.map((option) => (
//                                                     <SelectItem
//                                                         key={option.value}
//                                                         value={option.value}
//                                                     >
//                                                         {option.label}
//                                                     </SelectItem>
//                                                 ))}
//                                             </SelectContent>
//                                         </Select>
//                                     </FormItem>
//                                 )}
//                             />
//                             <Button className="col-span-12 lg:col-span-2 w-full bg-pink-500 hover:bg-pink-700" disabled={isLoading}>
//                                 Generate
//                             </Button>
//                         </form>
//                     </Form>
//                 </div>
//                 <div className="space-y-4 mt-4">
//                     {isLoading && (
//                         <div className="p-20">
//                             <Loader />
//                         </div>
//                     )}
//                     {images.length === 0 && !isLoading && (
//                         <Empty label="No images generated." />
//                     )}
//                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8">
//                         {images.map((src) => (
//                             <Card
//                                 key={src}
//                                 className="rounded-lg overflow-hidden"
//                             >
//                                 <div className="relative aspect-square">
//                                     <Image
//                                         alt="Image"
//                                         fill
//                                         src={src}
//                                     />
//                                 </div>
//                                 <CardFooter className="p-2">
//                                     <Button
//                                         onClick={() => window.open(src)}
//                                         variant="secondary"
//                                         className="w-full">
//                                         <Download className="h-4 w-4 mr-2" />
//                                         Download
//                                     </Button>
//                                 </CardFooter>
//                             </Card>
//                         ))}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }
//
// export default ImagePage;
//
//currently up to 2:32