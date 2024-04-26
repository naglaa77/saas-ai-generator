//update version of openai
import {NextResponse} from "next/server";
import {auth} from "@clerk/nextjs";
import OpenAI from "openai";


const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req:Request) {
  try {
    const {userId} = auth()
    const body = await req.json()
    const {messages} = body

      console.log("messages",messages)

    if(!userId){
      return new NextResponse("Unauthorized",{status:401})
    }

    if(!openai.apiKey){
      return new NextResponse("API key not configured",{status:500})
    }

    if(!messages){
      return new NextResponse("Message is required",{status:400})
    }

      console.log("messages",messages)
      const response = await openai.chat.completions.create({
          model: "gpt-3.5-turbo",
          messages
      })
      console.log("responseeeeeeeeeeeeeeeeeeeee",response)
      return NextResponse.json(response.choices[0].message);

    }catch(error){
        console.error("[CONVERSATION]",error)
        return new NextResponse("Internal error",{status:500})
    }

}