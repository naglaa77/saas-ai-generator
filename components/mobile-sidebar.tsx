"use client"

import {Button} from "@/components/ui/button";
import {Menu, } from "lucide-react";
import {Sheet, SheetContent, SheetTrigger} from "@/components/ui/sheet";
import Sidebar from "@/components/sidebar";
import {useEffect, useState} from "react";


interface MobileSidebarProps {
    apiLimitCount: number,
    isPro: boolean
}

export default function MobileSidebar({apiLimitCount=0,isPro=false}:MobileSidebarProps) {
// i do that because i have error Hydration where In HTML, <button> cannot be a descendant of <button>. so
// i use this to prevent the error useState and useEffect
    const [isMounted, setIsMounted] = useState(false)
    useEffect(() => {
        setIsMounted(true)
    },[])
    if(!isMounted){
        return null
    }
    return (
       <Sheet>
           <SheetTrigger>
               <Button variant="ghost" size="icon" className="md:hidden">
                   <Menu/>
               </Button>
           </SheetTrigger>
           <SheetContent side="left" className="p-0">
               <Sidebar isPro={isPro} apiLimitCount={apiLimitCount}/>
           </SheetContent>

       </Sheet>
    )
}