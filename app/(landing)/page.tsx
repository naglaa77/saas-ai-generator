import Link from "next/link";
import {Button} from "@/components/ui/button";
import {LandingNavbar} from "@/components/landing-navbar";
import {LandingHero} from "@/components/landing-hero";
import {LandingContent} from "@/components/landing-content";

export default function LandingPage() {
    return (
        <div className="h-full">
            <LandingNavbar/>
            <LandingHero/>
            <LandingContent/>
        </div>
    );
}