import {Heading} from "@/components/heading";
import {Settings} from "lucide-react";
import {checkSubscription} from "@/lib/subscription";
import {SubscriptionButton} from "@/components/subscription-button";

export default async function SettingsPage() {
    const isPro = await checkSubscription();

    return (
        <div>
            <Heading
                title="Settings"
                description="Mange your account settings here"
                icon={Settings}
                iconColor="text-gray-700"
                bgColor="bg-gray-700/10"
            />
            <div  className="px-4 lg:px-8 space-y-4">
                <div className="text-muted-foreground text-sm">
                    {isPro ? "You are a pro user" : "You are not a pro user"}
                </div>
                <SubscriptionButton isPro={isPro}/>
            </div>
        </div>
    );
}