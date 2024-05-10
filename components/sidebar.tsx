'use client'
import Link from "next/link";
import Image from "next/image";
import {Montserrat} from "next/font/google";
import {cn} from "@/lib/utils";
import {routes} from "@/constants";
import {usePathname} from "next/navigation";
import {FreeCounter} from "@/components/free-counter";

interface SidebarProps {
    apiLimitCount: number,
    isPro: boolean
}

const montserrat = Montserrat({
    weight:"600",
    subsets:["latin"]
})


export default function Sidebar({apiLimitCount=0,isPro=false}:SidebarProps) {

   const pathName =  usePathname()

    return (
        <div className="space-y-4 py-4 flex flex-col h-full bg-[#111827] text-white">
            <div className="px-3 py-2 flex-1">
                <Link href="/dashboard" className="flex items-center pl-3 mb-14">
                    <div className="relative w-8 h-8 mr-4">
                        <Image fill src="/logo.png" alt="logo"/>
                    </div>
                    <h1 className={cn("text-2xl font-bold",montserrat.className)}>PYROCODEAI</h1>
                </Link>
                <div className="space-y-1">
                    {routes.map(route => (
                        <Link href={route.href} key={route.href} className={cn("text-sm flex group p-3 w-full" +
                            " justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg" +
                            " transition",pathName === route.href? "text-white bg-white/10" :"text-zinc-400")}>
                            <div className="flex items-center flex-1">
                                <route.icon className={cn("w-5 h-5 mr-3",route.color)}/>
                                {route.label}
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
            <FreeCounter isPro={isPro} apiLimitCount={apiLimitCount}/>
        </div>
    )
}