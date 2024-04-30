'use client'

import * as z from "zod";
import {Heading} from "@/components/heading";
import {MessageSquare, Music, VideoIcon} from "lucide-react";
import {useForm} from "react-hook-form";
import {formSchema} from "@/app/(dashboard)/(routes)/conversation/constants";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";
import {useState} from "react";
import axios from "axios";
import {Empty} from "@/components/empty";
import {Loader} from "@/components/loader";



export default function VideoPage() {
    const router = useRouter();
    const [video, setVideo] = useState<string>()

   const form =  useForm<z.infer<typeof formSchema>>({
       resolver: zodResolver(formSchema),
       defaultValues: {
           prompt: "",
       }
   })
    const  isLoading = form.formState.isSubmitting;

   const onSubmit = async (values: z.infer<typeof formSchema>) => {

        try {

            // @ts-ignore
            setVideo(undefined)
            const response = await axios.post("/api/video",values);
            setVideo(response.data[0])

            form.reset()

        }catch (error){
            //TODO:open pro model
            console.error("[CONVERSATION]",error)
        }finally {
            router.refresh()
        }
   }


    // @ts-ignore
    return (
        <div>
            <Heading
                title="Video Generation"
                description="Turn your prompt to video"
                icon={VideoIcon}
                iconColor="text-orange-700"
                bgColor="bg-orange-700/10"
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
                                    <FormItem className="col-span-12 lg:col-span-10">
                                        <FormControl className="m-0 p-0">
                                            <Input className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                                               disabled={isLoading}
                                               placeholder="Fish swimming in the ocean."
                                                {...field}
                                            />
                                        </FormControl>
                                    </FormItem>

                                )}
                            />
                            <Button className="col-span-12 lg:col-span-2 w-full">Generate</Button>
                        </form>

                    </Form>
                </div>
                <div className="space-y-4 mt-4">
                    {isLoading && (
                        <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
                            <Loader/>
                        </div>

                    )}
                    {!video && !isLoading && (
                        <Empty label="No video started."/>
                    )}

                       {video && (
                           <video controls  className="w-full mt-8 aspect-video rounded-lg border bg-black">
                               <source src={video} />
                           </video>

                       )}

                </div>
            </div>
        </div>
    )
}


// "use client";
//
// import axios from "axios";
// import * as z from "zod";
// import { MessageSquare } from "lucide-react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useRouter } from "next/navigation";
// import OpenAI from "openai";
// import { useState } from "react";
//
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
// import {UserAvatar} from "@/components/user-avatar";
// import { BotAvatar } from "@/components/bot-avatar";
//
// import { formSchema } from "./constants";
//
// type ChatCompletionMessageParam = {
//     role: "user" | "assistant";
//     content: string;
// };
//
// const ConversationPage = () => {
//     const router = useRouter();
//     const [messages, setMessages] = useState<ChatCompletionMessageParam[]>([]);
//
//     const form = useForm<z.infer<typeof formSchema>>({
//         resolver: zodResolver(formSchema),
//         defaultValues: {
//             prompt: ""
//         }
//     });
//
//     const isLoading  = form.formState.isSubmitting;
//
//     const onSubmit = async (values: z.infer<typeof formSchema>) => {
//         try {
//             const userMessage: ChatCompletionMessageParam = {
//                 role: "user",
//                 content: values.prompt,
//             };
//             const newMessages = [...messages, userMessage];
//
//             const response = await axios.post("/api/conversation", {
//                 messages: newMessages,
//             });
//
//             setMessages((current) => [...current, userMessage, response.data]);
//
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
//                 title="Conversation"
//                 description="Our most innovative conversation model to date"
//                 icon={MessageSquare}
//                 iconColor="text-violet-500"
//                 bgColor="bg-violet-500/10"
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
//                                     <FormItem className="col-span-12 lg:col-span-10">
//                                         <FormControl className="m-0 p-0">
//                                             <Input
//                                                 className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
//                                                 disabled={isLoading}
//                                                 placeholder="What is the circumference of the Earth?"
//                                                 {...field}
//                                             />
//                                         </FormControl>
//                                     </FormItem>
//                                 )}
//                             />
//                             <Button className="col-span-12 lg:col-span-2 w-full bg-purple-500 hover:bg-purple-700" disabled={isLoading}>
//                                 Generate
//                             </Button>
//                         </form>
//                     </Form>
//                 </div>
//                 <div className="space-y-4 mt-4">
//                     {isLoading && (
//                         <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
//                             <Loader />
//                         </div>
//                     )}
//                     {messages.length === 0 && !isLoading && (
//                         <Empty label="No conversation started." />
//                     )}
//                     <div className="flex flex-col-reverse gap-y-4">
//                         {messages.map((message) => (
//                             <div
//                                 key={message.content}
//                                 className={cn(
//                                     "p-8 w-full flex items-start gap-x-8 rounded-lg",
//                                     message.role === "user" ? "bg-white border border-black/10" : "bg-muted"
//                                 )}
//                             >
//                                 {message.role === "user" ? <UserAvatar /> : <BotAvatar />}
//                                 <p className="text-sm">
//                                     {message.content}
//                                 </p>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }
//
// export default ConversationPage;