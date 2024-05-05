'use client'
import {useEffect, useState} from "react";
import {Card, CardContent} from "@/components/ui/card";
import {MAX_FREE_COUNTS} from "@/constants";
import {Progress} from "@/components/ui/progress";
import {Button} from "@/components/ui/button";
import {Zap} from "lucide-react";
import {useProModal} from "@/hooks/use-pro-modal";


interface FreeCounterProps {
    apiLimitCount: number
    isPro: boolean
}

export function FreeCounter({apiLimitCount=0,isPro=false}:FreeCounterProps) {
    const proModal = useProModal()

    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    })
    if (!mounted) {
        return null
    }
    if(isPro) {
        return null
    }

    return (
        <div className="px-3">
            <Card className="bg-white/10 border-0">
                <CardContent className="p-6">
                    <div className="text-sm text-center text-white mb-4 space-y-2">
                        <p>
                            {apiLimitCount} / {MAX_FREE_COUNTS} Free API Calls
                        </p>
                        <Progress className="h-3" value={(apiLimitCount / MAX_FREE_COUNTS) * 100}  />
                    </div>
                    <Button
                        onClick={proModal.onOpen}
                        className="w-full" variant="premium"
                    >
                        Upgrade Plan <Zap size={16} className="ml-2 w-4 h-4 fill-white" />
                    </Button>
                </CardContent>
            </Card>
        </div>
    )
}