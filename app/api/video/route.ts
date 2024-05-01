//update version of openai
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import Replicate from "replicate";
import {checkApiLimit,increaseApiLimit} from "@/lib/api-limit";


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

  const freeTrail = await checkApiLimit();
    if (!freeTrail) {
        return new NextResponse("You have exceeded the free trail limit", { status: 403 });
    }

    const input = {
      prompt: prompt,
      negative_prompt: "very blue, dust, noisy, washed out, ugly, distorted, broken"
    };

    const response = await replicate.run("anotherjesse/zeroscope-v2-xl:9f747673945c62801b13b84701c783929c0ee784e4748ec062204894dda1a351", { input });

    await increaseApiLimit();
    return NextResponse.json(response);

    }catch(error){
        console.error("[VIDEO_ERROR]",error)
        return new NextResponse("Internal error",{status:500})
    }

}

