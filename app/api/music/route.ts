//update version of openai
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});


export async function POST(req:Request) {
  try {

    const { userId } = auth();
    const body = await req.json();
    const { prompt  } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!prompt) {
      return new NextResponse("Prompt are required", { status: 400 });
    }



    const input = {
      prompt_b: prompt,
    };

    const response = await replicate.run("riffusion/riffusion:8cf61ea6c56afd61d8f5b9ffd14d7c216c0a93844ce2d82ac1c9ecc9c7f24e05", { input });

    console.log("response",response)

    return NextResponse.json(response);

    }catch(error){
        console.error("[MUSIC_ERROR]",error)
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