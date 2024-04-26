'use client'

import * as z from "zod";
import {Heading} from "@/components/heading";
import {MessageSquare} from "lucide-react";
import {useForm} from "react-hook-form";
import {formSchema} from "@/app/(dashboard)/(routes)/conversation/constants";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";
import {useState} from "react";
import { ChatCompletionMessageParam } from "openai/resources/chat/completions";
import axios from "axios";



export default function ConversationPage() {
    const router = useRouter();
    const [messages, setMessages] = useState<ChatCompletionMessageParam[]>([])

   const form =  useForm<z.infer<typeof formSchema>>({
       resolver: zodResolver(formSchema),
       defaultValues: {
           prompt: "",
       }
   })
    const  isLoading = form.formState.isSubmitting;

   const onSubmit = async (values: z.infer<typeof formSchema>) => {

        try {

            const userMessage:ChatCompletionMessageParam = {
                role: "user",
                content: values.prompt
            }
            const newMessages = [...messages, userMessage];
            console.log("newMessages",newMessages)

            const response = await axios.post("/api/conversation", {messages: newMessages});
            console.log("20000000000000000",response.data)
            setMessages((current) => [...current,userMessage,response.data]);

            form.reset()

        }catch (error){
            //TODO:open pro model
            console.error("[CONVERSATION]",error)
        }finally {
            router.refresh()
        }
   }

    console.log("messages22222222222",messages)

    // @ts-ignore
    return (
        <div>
            <Heading
                title="Conversation"
                description="This is the most advanced  conversation"
                icon={MessageSquare}
                iconColor="text-violet-500"
                bgColor="bg-violet-500/10"
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
                                               placeholder="Type your prompt here"
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
                   <div className="flex flex-col-reverse gap-y-4">
                       {messages.map((message) =>(
                               <div key="">
                                   {message.content}
                               </div>
                       ))}
                   </div>
                </div>
            </div>
        </div>
    )
}