'use client'
import {Button} from "@/components/ui/button";
import {Zap} from "lucide-react";
import axios from "axios";
import {useState} from "react";

interface SubscriptionButtonProps {
    isPro: boolean;
}

export function SubscriptionButton({isPro=false}: SubscriptionButtonProps) {

    const [loading, setLoading] = useState(false)

    const onclick = async() => {
        try {
            setLoading(true)
            const response = await axios.get("/api/stripe")
            window.location.href = response.data.url;

        } catch (error) {
            console.log("BILLING_ERROR", error);
        } finally {
            setLoading(false)
        }
    }
    return (
        <Button disabled={loading} className={isPro ? "default" : "premium"} onClick={onclick}>
            {isPro ? "Manage Subscription" : "Upgrade to Pro"}
            {!isPro && <Zap className="w-4 h-4 ml-2 fill-white" />}
        </Button>
    );
}