import { cn } from "@/lib/utils";

type Props = {
    id: number;
    text: string;
    imageSrc: string;
    shortcut: string;
    selected?: boolean;
    onClick: () => void;
    status?: "correct" | "incorrect" | "none";
    audioSrc?: string;
    disabled?: boolean;
    type: "ASSIST" | "SELECT";
}

export const Card = ({
    id,
    text,
    imageSrc,
    shortcut,
    selected,
    onClick,
    status,
    audioSrc,
    disabled,
    type,
}:Props) => {
    return (
        <div 
            onClick={() => {}}
            className={cn(
                "border-2 border-b-4 gap-2 p-4 rounded-xl bg-slate-200 hover:bg-slate-300 cursor-pointer active:border-b-2 lg:p-6 h-full",
            )}
        >
            
        </div>
    )
}