import React from 'react';
import { StickyWrapper } from '@/components/StickyWrapper';
import { FeedWrapper } from '@/components/FeedWrapper';
import { Header } from './header';
import { getCourseProgress, getLessonPercentage, getUnits, getUserProgress } from '@/db/queries';
import { redirect } from 'next/navigation';
import { UserProgress } from '@/components/UserProgress';
import Unit from './unit';

const LearnPage = async () => {
  // Fetch user progress first to determine if redirect is needed
  const userProgress = await getUserProgress();

  // If no active course, redirect to courses page
  if (!userProgress || !userProgress.activeCourse) {
    // Redirect must happen here, before rendering anything
    redirect('/courses');
  }

  try {
    // Fetch remaining data concurrently
    const [units, courseProgress, lessonPercentage] = await Promise.all([
      getUnits(),
      getCourseProgress(),
      getLessonPercentage(),
    ]);

    return (
      <div className='flex flex-row-reverse gap-[48px] px-6'>
        <StickyWrapper>
          <UserProgress
            activeCourse={{
              title: userProgress.activeCourse.title,
              imageSrc: userProgress.activeCourse.imageSrc,
            }}
            hearts={userProgress.hearts}
            points={userProgress.points}
            hasActiveSubscription={userProgress.hasActiveSubscription || false}
          />
        </StickyWrapper>
        <FeedWrapper>
          <Header title={userProgress.activeCourse.title} />
          {units.map((unit) => (
            <div key={unit.id} className='mb-10'>
              <Unit 
                id={unit.id}
                order={unit.order}
                title={unit.title}
                description={unit.description}
                lessons={unit.lessons}
                activeLesson={courseProgress?.activeLesson}
                activeLessonPercentage={lessonPercentage || 0}
              />
            </div>
          ))}
        </FeedWrapper>
      </div>
    );
  } catch (error) {
    console.error("Error loading LearnPage data:", error);
    return <div>Error loading page content. Please try again later.</div>;
  }
};

export default LearnPage;
