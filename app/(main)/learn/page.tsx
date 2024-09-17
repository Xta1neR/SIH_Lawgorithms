import React from 'react';
import { StickyWrapper } from '@/components/StickyWrapper';
import { FeedWrapper } from '@/components/FeedWrapper';
import { Header } from './header';
import { getCourseProgress, getLessonPercentage, getUnits, getUserProgress } from '@/db/queries';
import { redirect } from 'next/navigation';
import { UserProgress } from '@/components/UserProgress';
import Unit from './unit';

const LearnPage = async () => {

  try {
    // Fetch all data concurrently
    const [userProgress, units, courseProgress, lessonPercentage] = await Promise.all([
      getUserProgress(),        // Call functions directly inside Promise.all
      getUnits(),
      getCourseProgress(),
      getLessonPercentage(),
    ]);

    // If no active course, redirect to courses page
    if (!userProgress || !userProgress.activeCourse) {
      redirect('/courses');
      return null;
    }

    return (
      <div className='flex flex-row-reverse gap-[48px] px-6'>
        <StickyWrapper>
          <UserProgress
            activeCourse={{
              title: userProgress.activeCourse.title,
              imageSrc: userProgress.activeCourse.imageSrc
            }}
            hearts={userProgress.hearts}
            points={userProgress.points}
            hasActiveSubscription={false} // Use correct value for subscription
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
                activeLesson={courseProgress?.activeLesson} // Make sure courseProgress is defined
                activeLessonPercentage={lessonPercentage || 0} // Fallback to 0 if undefined
              />
            </div>
          ))}
        </FeedWrapper>
      </div>
    );
  } catch (error) {
    console.error("Error loading LearnPage data:", error);
    // Display error message to the user
    return <div>Error loading page content.</div>;
  }
};

export default LearnPage;
