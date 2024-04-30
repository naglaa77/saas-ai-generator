//update version of openai
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import {ChatCompletionRequestMessage, Configuration, OpenAIApi} from "openai";


const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const instructionMessage:ChatCompletionRequestMessage = {
  role: "system",
  content: "Ypu are a code generator. you can generate markdown code snippets."
}

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


    console.log("messages",messages)
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages:[instructionMessage,...messages],
    });
      console.log("responseeeeeeeeeeeeeeeeeeeee",response)
    return NextResponse.json(response.data.choices[0].message);

    }catch(error){
        console.error("[CODE_ERROR]",error)
        return new NextResponse("Internal error",{status:500})
    }

}


// import { auth } from "@clerk/nextjs";
// import { NextResponse } from "next/server";
// import OpenAI from "openai";
//
// import { ChatCompletionMessageParam } from "openai/resources/index.mjs";
//
// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });
//
// const instructionMessage: ChatCompletionMessageParam = {
//   role: "system",
//   content: "You are a code generator. You must answer only in markdown code snippets. Use code comments and code for explanations."
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
//       messages: [instructionMessage, ...messages],
//     });
//
//     return NextResponse.json(response.choices[0].message);
//   }   catch (error) {
//     console.log("[CODE_ERROR]", error);
//     return new NextResponse("Internal Error", { status: 500 });
//   }
// };
//
// //come back to 2:14.30 to fix code
// // LATEST VERSION BEYOND THE OTHERS
//
//
// // line 40 original         const response = await openai.chat.completions.create({
//
// //lifesaver for migrating to v4
// //npm exec openai migrate
