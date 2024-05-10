import {Code, ImageIcon, LayoutDashboard, MessageSquare, Music, Settings, VideoIcon} from "lucide-react";



export const MAX_FREE_COUNTS = 5;


export const routes = [
    {
        label: "Dashboard",
        icon: LayoutDashboard,
        href: "/dashboard",
        color: "text-sky-500",
    },
    {
        label: "Conversation",
        icon: MessageSquare,
        href: "/conversation",
        color: "text-violet-500",
    },
    {
        label: "Image Generation",
        icon: ImageIcon,
        href: "/image",
        color: "text-pink-700",
    },
    {
        label: "Video Generation",
        icon: VideoIcon,
        href: "/video",
        color: "text-orange-700",
    },
    {
        label: "Music Generation",
        icon: Music,
        href: "/music",
        color: "text-emerald-500",
    },
    {
        label: "Code Generation",
        icon: Code,
        href: "/code",
        color: "text-green-700",
    },
    {
        label: "Settings",
        icon: Settings,
        href: "/settings",
    }
]


export const testimonials = [
    {
        name: "John Doe",
        title: "CEO, Apple",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut" ,
        avatar: "J"
    },
    {
        name: "Mark Zuckerberg",
        title: "CEO, Facebook",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut" ,
        avatar: "M"
    },
    {
        name: "Pichai Sundar",
        title: "CEO, Google",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut" ,
        avatar: "P"
    },
    {
        name: "Satya Nadella",
        title: "CEO, Microsoft",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut" ,
        avatar: "S"
    },
    {
        name: "Umar Farooq",
        title: "Founder, Lucide Studio",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut" ,
        avatar: "U"
    },
    {
        name: "Hassan Ali",
        title: "Web Developer",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut" ,
        avatar: "H"
    },
    {
        name: "Linda Ikeji",
        title: "CEO, Apple",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut" ,
        avatar: "L"
    },
    {
        name: "Femi Otedola",
        title: "CEO, Apple",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut" ,
        avatar: "F"
    },
]