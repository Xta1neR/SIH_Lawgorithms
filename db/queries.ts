// queries.ts
import { cache } from "react";
import { auth } from "@clerk/nextjs/server";
import db from "./drizzle";
import { userProgress, courses, units, challenges, challengeProgress, lessons, challengeOptions } from "./schema";
import { eq } from 'drizzle-orm';

// Fetch user progress, including active course
export const getUserProgress = cache(async () => {
    try {
        const { userId } = await auth();
        if (!userId) {
            return null;
        }

        const data = await db.query.userProgress.findFirst({
            where: eq(userProgress.userId, userId),
            with: {
                activeCourse: true,
            },
        });

        return data;
    } catch (error) {
        console.error("Error fetching user progress:", error);
        return null;
    }
});

export const getUnits = cache(async () => {
    try {
        const { userId } = await auth();
        const userProgress = await getUserProgress();

        if (!userId || !userProgress?.activeCourseId) {
            return [];
        }

        const data = await db.query.units.findMany({
            where: eq(units.courseId, userProgress.activeCourseId),
            with: {
                lessons: {
                    with: {
                        challenges: {
                            with: {
                                challengeProgress: {
                                    where: eq(challengeProgress.userId, userId),
                                },
                            },
                        },
                    },
                },
            },
        });

        // Process and normalize data
        const normalizedData = data.map((unit) => ({
            ...unit,
            lessons: unit.lessons.map((lesson) => ({
                ...lesson,
                challenges: lesson.challenges.map((challenge) => ({
                    ...challenge,
                    isCompleted: challenge.challengeProgress
                        ? challenge.challengeProgress.length > 0
                            ? challenge.challengeProgress.every((progress) => progress.completed)
                            : false
                        : false,
                })),
            })),
        }));

        return normalizedData;
    } catch (error) {
        console.error("Error fetching units:", error);
        return [];
    }
});

export const getCourses = cache(async () => {
    try {
        const data = await db.query.courses.findMany();
        return data;
    } catch (error) {
        console.error("Error fetching courses:", error);
        return [];
    }
});

export const getCourseById = cache(async (courseId: number) => {
    try {
        const data = await db.query.courses.findFirst({
            where: eq(courses.id, courseId),
            // TODO: Populate the lessons and units
        });
        return data;
    } catch (error) {
        console.error(`Error fetching course by ID ${courseId}:`, error);
        return null;
    }
});

export const getCourseProgress = cache(async () => {
    const { userId } = await auth();
    const userProgress = await getUserProgress();

    if (!userId || !userProgress?.activeCourseId) {
        return null;
    }

    const unitsInActiveCourse = await db.query.units.findMany({
        orderBy: (units, { asc }) => [asc(units.order)],
        where: eq(units.courseId, userProgress.activeCourseId),
        with: {
            lessons: {
                orderBy: (lessons, { asc }) => [asc(lessons.order)],
                with: {
                    unit: true,
                    challenges: {
                        with: {
                            challengeProgress: {
                                where: eq(challengeProgress.userId, userId),
                            },
                        },
                    },
                },
            },
        },
    });

    const firstUncompletedLesson = unitsInActiveCourse
        .flatMap((unit) => unit.lessons)
        .find((lesson) => {
            return lesson.challenges.some((challenge) => {
                return !challenge.challengeProgress || challenge.challengeProgress.length === 0;
            });
        });

    return {
        activeLesson: firstUncompletedLesson,
        activeLessonId: firstUncompletedLesson?.id,
    };
});

export const getLesson = cache(async (id?: number) => {
    const { userId } = await auth();
    const courseProgress = await getCourseProgress();

    const lessonId = id || courseProgress?.activeLessonId;

    if (!lessonId) {
        return null;
    }

    const data = await db.query.lessons.findFirst({
        where: eq(lessons.id, lessonId),
        with: {
            challenges: {
                orderBy: (challenges, { asc }) => [asc(challenges.order)],
                with: {
                    challengeOptions: true,
                    challengeProgress: {
                        where: eq(challengeProgress.userId, userId),
                    },
                },
            },
        },
    });

    if (!data || !data.challenges) {
        return null;
    }

    const normalizedChallenges = data.challenges.map((challenge) => {
        const completed =
            challenge.challengeProgress &&
            challenge.challengeProgress.length > 0 &&
            challenge.challengeProgress.every((progress) => progress.completed);

        return { ...challenge, completed };
    });

    return { ...data, challenges: normalizedChallenges };
});

export const getLessonPercentage = cache(async () => {
    const courseProgress = await getCourseProgress();

    if (!courseProgress?.activeLessonId) {
        return 0;
    }

    const lesson = await getLesson(courseProgress.activeLessonId);

    if (!lesson) {
        return 0;
    }

    const completedChallenges = lesson.challenges.filter((challenge) => challenge.completed);
    const percentage = Math.round((completedChallenges.length / lesson.challenges.length) * 100);

    return percentage;
});
