//i must update version of openai
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { Configuration, OpenAIApi } from "openai";
import {checkApiLimit,increaseApiLimit} from "@/lib/api-limit";
import {checkSubscription} from "@/lib/subscription";


const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export async function POST(req:Request) {
  try {

    const { userId } = auth();
    const body = await req.json();
    const { messages  } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!configuration.apiKey) {
      return new NextResponse("OpenAI API Key not configured.", { status: 500 });
    }

    if (!messages) {
      return new NextResponse("Messages are required", { status: 400 });
    }

    const freeTrail = await checkApiLimit();
    const isPro = await checkSubscription();

    if(!freeTrail && !isPro){
      return new NextResponse("You have exceeded the free trail limit",{status:403})
    }

    //console.log("messages",messages)
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages
    });
    if(!isPro){
      await increaseApiLimit();
    }


    return NextResponse.json(response.data.choices[0].message);

    }catch(error){
        console.error("[CONVERSATION]",error)
        return new NextResponse("Internal error",{status:500})
    }

}

// import { auth } from "@clerk/nextjs";
// import { NextResponse } from "next/server";
// import OpenAI from "openai";
// import { ChatCompletionMessageParam } from "openai/resources/index.mjs";
//
// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });
//
// const instructionMessage: ChatCompletionMessageParam = {
//   role: "system",
//   content: "Answer questions as short and quickly as possible. You must do it under 75 tokens."
// }
//
// export async function POST(
//     req: Request
// )   {
//   try {
//     const { userId } = auth();
//     const body = await req.json();
//     const { messages  } = body;
//
//     if (!userId) {
//       return new NextResponse("Unauthorized", { status: 401 });
//     }
//
//     if (!openai.apiKey) {
//       return new NextResponse("OpenAI API Key not configured.", { status: 500 });
//     }
//
//     if (!openai.apiKey) {
//       return new NextResponse("OpenAI API Key not configured.", { status: 500 });
//     }
//
//     if (!messages) {
//       return new NextResponse("Messages are required", { status: 400 });
//     }
//
//     const response = await openai.chat.completions.create({
//       model: "gpt-3.5-turbo",
//       max_tokens: 75,
//       temperature: 0.5,
//       messages: [instructionMessage, ...messages]
//     });
//
//     return NextResponse.json(response.choices[0].message);
//   }   catch (error) {
//     console.log("[CONVERSATION_ERROR]", error);
//     return new NextResponse("Internal Error", { status: 500 });
//   }
// }

//EXACT Copy // added 75 token limit

// additional added
// const instructionMessage: ChatCompletionMessageParam = {
//role: "system",
//content: "Answer questions as short and quickly as possible. You must do it under 75 tokens."
//}

// Unaltered version below
// const response = await openai.chat.completions.create({
// model: "gpt-3.5-turbo",
// messages
// });