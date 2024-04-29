'use client'

import * as z from "zod";
import {Heading} from "@/components/heading";
import {Code} from "lucide-react";
import {useForm} from "react-hook-form";
import {formSchema} from "@/app/(dashboard)/(routes)/conversation/constants";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";
import {useState} from "react";
import { ChatCompletionRequestMessage } from "openai";
import axios from "axios";
import {Empty} from "@/components/empty";
import {Loader} from "@/components/loader";
import { cn } from "@/lib/utils";
import {UserAvatar} from "@/components/user-avatar";
import {BotAvatar} from "@/components/bot-avatar";
import ReactMarkdown from "react-markdown";



export default function CodePage() {
    const router = useRouter();
    const [messages, setMessages] = useState<ChatCompletionRequestMessage[]>([])

   const form =  useForm<z.infer<typeof formSchema>>({
       resolver: zodResolver(formSchema),
       defaultValues: {
           prompt: "",
       }
   })
    const  isLoading = form.formState.isSubmitting;

   const onSubmit = async (values: z.infer<typeof formSchema>) => {

        try {

            const userMessage:ChatCompletionRequestMessage = {
                role: "user",
                content: values.prompt
            }
            const newMessages = [...messages, userMessage];
            console.log("newMessages",newMessages)

            const response = await axios.post("/api/code", {messages: newMessages});
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
                title="Code Generation"
                description="Generate code snippets using OpenAI's GPT-3."
                icon={Code}
                iconColor="text-green-700"
                bgColor="bg-green-700/10"
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
                                               placeholder="Type your wanted code here"
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
                    {messages.length === 0 && !isLoading && (
                        <Empty label="No conversation started."/>
                    )}
                   <div className="flex flex-col-reverse gap-y-4">
                       {messages.map((message) =>(
                               <div
                                   key={message.content}
                                   className={cn("p-8 w-full items-start gap-x-8 rounded-lg",message.role === "user" ? "bg-white border border-black/10" : "bg-muted")}
                               >
                                   {message.role === "user" ? <UserAvatar/> : <BotAvatar/>}
                                  <ReactMarkdown
                                      components={{
                                          pre:({node,...props})=>(
                                              <div className="overflow-auto w-full my-2 bg-black/10 p-2 rounded-lg">
                                                    <pre {...props}/>
                                              </div>
                                          ),
                                            code:({node,...props})=>(
                                                <code {...props} className="bg-black/10 rounded-lg p-1"/>
                                            )
                                      }}
                                      className="text-sm overflow-hidden leading-7"
                                  >
                                      {message.content || ""}
                                  </ReactMarkdown>
                               </div>
                       ))}
                   </div>
                </div>
            </div>
        </div>
    )
}