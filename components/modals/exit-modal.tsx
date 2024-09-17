"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "../ui/dialog";

import { Button } from "../ui/button";
import { useExitModal } from "@/store/use-exit-modal";

export const ExitModal = () => {
    const router = useRouter();
    const { isOpen, close } = useExitModal();
    const [isClient, setClient] = useState(false);

    useEffect(() => {
        setClient(true); // Set isClient to true when client-side rendering
    }, []);

    if (!isClient) {
        return null; // Return nothing if not on client-side
    }

    const handleKeepLearning = () => {
        close(); // Close the modal
    };

    const handleEndSession = () => {
        close(); // Close the modal before routing
        router.push("/learn"); // Navigate to the "/learn" route
    };

    return (
        <Dialog open={isOpen} onOpenChange={close}>
            <DialogContent className="max-w-md bg-white">
                <DialogHeader>
                    <div className="flex items-center mb-5 justify-center">
                        <Image
                            src="/mascot_sad.svg"
                            alt="sad"
                            width={100}
                            height={100}
                        />
                    </div>
                    <DialogTitle className="text-center font-bold text-2xl">
                        Wait, don't go!
                    </DialogTitle>
                    <DialogDescription className="text-center text-base">
                        Wait! You are about to leave the lesson.
                    </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col gap-y-4 w-full">
                    <Button
                        onClick={handleKeepLearning}
                        variant="primary"
                        className="w-full"
                        size="lg"
                    >
                        Keep Learning
                    </Button>
                    <Button
                        variant="dangerOutline"
                        className="w-full"
                        onClick={handleEndSession}
                    >
                        End Session
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};
