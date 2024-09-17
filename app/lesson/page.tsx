import { getLesson, getUserProgress } from "@/db/queries";
import { redirect } from "next/navigation";
import { Quiz } from "./quiz";

const LessonPage = async () => {
    const [lesson, userProgress] = await Promise.all([
        getLesson(),
        getUserProgress(),
    ]);

    if (!lesson || !userProgress) {
        redirect('/learn');
        return null;
    }

    const totalChallenges = lesson.challenges.length || 1;
    const initialPercentage =
        (lesson.challenges.filter((challenge) => challenge.completed).length /
            totalChallenges) *
        100;

    return (
        <Quiz
            initialLessonId={lesson.id}
            initialLessonChallenges={lesson.challenges}
            initialHearts={userProgress.hearts}
            initialPercentage={initialPercentage}
            userSubscription={userProgress.subscription || null} 
        />
    );
};

export default LessonPage;
