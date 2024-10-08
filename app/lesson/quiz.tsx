"use client";

import { challengeOptions, challenges } from "@/db/schema"; // Proper import
import { useState } from "react";
import { Header } from "./header";
import { Challenge } from "./challenge";

type Props = {
    initialPercentage: number;
    initialHearts: number;
    initialLessonId: number;
    initialLessonChallenges: (typeof challenges.$inferSelect & {
        completed: boolean;
        challengeOptions: typeof challengeOptions.$inferSelect[];
    })[];
    userSubscription: { isActive: boolean } | null; 
};

export const Quiz = ({
    initialPercentage,
    initialHearts,
    initialLessonId,
    initialLessonChallenges,
    userSubscription,
}: Props) => {
    const [hearts, setHearts] = useState(initialHearts);
    const [percentage, setPercentage] = useState(initialPercentage);
    const [challenges] = useState(initialLessonChallenges)
    const [activeIndex, setActiveIndex] = useState(() => {
        const uncompletedIndex = challenges.findIndex((challenges) => !challengeOptions.completed);
        return uncompletedIndex !== -1 ? 0 : uncompletedIndex;
     });

     const challenge = challenges[activeIndex];
     const options = challenge?.challengeOptions ?? [];

    const title = challenge.type === "ASSIST" ? "Select the correct meaning" : challenge.question;

    return (
        <>
            <Header
                hearts={hearts}
                percentage={percentage}
                hasActiveSubscription={!!userSubscription?.isActive} 
            />
            <div className="flex-1">
                <div className="h-full flex items-center justify-center">
                    <div className="pt-20 lg:min-h-[350px] w-[600px] lg:w-[900px] px-6 lg:px-0 flex flex-col gap-y-12">
                        <h1 className="text-lg lg:text-3xl text-center lg:text-start font-bold text-neutral-600">
                            {title}
                        </h1>
                        <div>
                            <Challenge
                                options={options}
                                onSelect={() => {}}
                                status="none"
                                selectedOption={undefined}
                                disabled={false}
                                type={challenge.type}
                            />
                        </div>

                    </div>

                </div>
            </div>
        </>
    );
};
