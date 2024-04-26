import Image from "next/image";

interface EmptyProps {
    label: string;
}

export function Empty({label}: EmptyProps) {
    return <div className="h-full flex justify-center items-center flex-col p-20">
            <div className="relative h-72 w-72">
                <Image alt="empty" fill src="/empty.png"/>
            </div>
            <p className="text-sm text-muted-foreground text-center">{label}</p>
        </div>;
}