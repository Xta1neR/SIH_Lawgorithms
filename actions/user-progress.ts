"use server";

import { getCourseById, getUserProgress } from "@/db/queries";
import { userProgress } from "@/db/schema";
import { auth, currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import db from "@/db/drizzle"; // Assuming you have a drizzle instance for db operations
import { eq } from "drizzle-orm";

export const upsertUserProgress = async (courseId: number) => {
    const { userId } = await auth();
    const user = await currentUser();

    if (!userId || !user) {
        throw new Error("Unauthorized");
    }

    const course = await getCourseById(courseId);

    if (!course) {
        throw new Error("No such Course");
    }

    // Fetch existing user progress
    const existingUserProgress = await getUserProgress();

    // If user progress already exists, update it
    if (existingUserProgress) {
        await db
            .update(userProgress)
            .set({
                activeCourseId: courseId,
                userName: user.firstName || "User",
                userImageSrc: user.imageUrl || "/2.png",
            })
            .where(eq(userProgress.userId, userId));

        // Revalidate and redirect after updating
        revalidatePath("/courses");
        revalidatePath("/learn");
        return redirect("/learn");
    }

    // Insert new user progress if it doesn't exist
    await db.insert(userProgress).values({
        userId,
        activeCourseId: courseId,
        userName: user.firstName || "User",
        userImageSrc: user.imageUrl || "/2.png",
    });

    // Revalidate and redirect after inserting
    revalidatePath("/courses");
    revalidatePath("/learn");
    return redirect("/learn");
};
