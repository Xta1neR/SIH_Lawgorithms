import { boolean, integer, pgEnum, pgTable, serial, text } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";


// Define the 'courses' table
export const courses = pgTable("courses", {
    id: serial("id").primaryKey(), // Primary key for courses
    title: text("title").notNull(), // Course title
    imageSrc: text("image_src").notNull(), // Course image source
});

//Define the 'courses Relation' table
export const coursesRelations = relations(courses, ({ many }) => ({
    units: many(units),
}));

//Define the 'Units' table
export const units = pgTable("units", {
    id: serial("id").primaryKey(),
    title: text("title").notNull(),
    description: text("description").notNull(),
    courseId: integer("course_id").notNull().references(() => courses.id, { onDelete: "cascade" }),
    order: integer("order").notNull(),
});

//Define Unit Relations
export const unitsRelations = relations(units, ({ many, one }) => ({
    course: one(courses, {
        fields: [units.courseId],
        references: [courses.id],
    }),
    lessons: many(lessons),
}));

// Defines the lessons tables
export const lessons = pgTable("lessons", {
    id: serial("id").primaryKey(),
    title: text("title").notNull(),
    description: text("description").notNull(),
    unitId: integer("unit_id").notNull().references(() => units.id, { onDelete: "cascade" }),
    order: integer("order").notNull(),
});

//Define Lesson Relations tables
export const lessonsRelations = relations(lessons, ({ many, one }) => ({
    unit: one(units, {
        fields: [lessons.unitId],
        references: [units.id],
    }),
    challenges: many(challenges),
}));

// Define ChallengesEnum table
export const challengesEnum = pgEnum("type", ["SELECT", "ASSIST"]);

// Define Challenges table
export const challenges = pgTable("challenges", {
    id: serial("id").primaryKey(),
    lessonId: integer("lesson_id").notNull().references(() => lessons.id, { onDelete: "cascade" }),
    type: challengesEnum("type").notNull(),
    question: text("question").notNull(),
    order: integer("order").notNull(),
});

// Define Challenges Relations
export const challengesRelations = relations(challenges, ({ one, many }) => ({
    lesson: one(lessons, {
        fields: [challenges.lessonId],
        references: [lessons.id],
    }),
    challengeOptions: many(challengeOptions),
    challengeProgress: many(challengeProgress),
}))

// Define ChallengeOptions table
export const challengeOptions = pgTable("challengeOptions", {
    id: serial("id").primaryKey(),
    challengeId: integer("challenge_id").notNull().references(() => challenges.id, { onDelete: "cascade" }),
    text: text("text").notNull(),
    correct: boolean("correct").notNull(),
    imageSrc: text("image_src"),
    audioSrc: text("audio_src")
});

// Define ChallengeOptions Relations table
export const challengeOptionsRelations = relations(challengeOptions, ({ one }) => ({
    challenge: one(challenges, {
        fields: [challengeOptions.challengeId],
        references: [challenges.id],
    }),
}));

//Define ChallengeProgress table
export const challengeProgress = pgTable("challengeProgress", {
    id: serial("id").primaryKey(),
    userId: text("user_id").notNull(),
    challengeId: integer("challenge_id").notNull().references(() => challenges.id, { onDelete: "cascade" }),
    completed: boolean("completed").notNull().default(false),
});

//Define ChallengeProgress Relations
export const challengeProgressRelations = relations(challengeProgress, ({ one }) => ({
    challenge: one(challenges, {
        fields: [challengeProgress.challengeId],
        references: [challenges.id],
    }),
}));

// Define the 'userProgress' table
export const userProgress = pgTable("user_progress", {
    userId: text("user_id").primaryKey(), 
    userName: text("user_name").notNull().default("User"),
    userImageSrc: text("user_image_src").notNull().default("/2.png"),
    activeCourseId: integer("active_course_id").references(() => courses.id, { onDelete: "cascade" }),
    hearts: integer("hearts").notNull().default(5), 
    points: integer("points").notNull().default(0),
});

// Define relations after the tables
export const courseRelations = relations(courses, ({ many }) => ({
    userProgress: many(userProgress),
}));

export const userProgressRelations = relations(userProgress, ({ one }) => ({
    activeCourse: one(courses, {
        fields: [userProgress.activeCourseId],
        references: [courses.id],
    }),
}));
