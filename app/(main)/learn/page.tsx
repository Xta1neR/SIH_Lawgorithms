import React from 'react';
import { StickyWrapper } from '@/components/StickyWrapper';
import { FeedWrapper } from '@/components/FeedWrapper';
import { Header } from './header';
import { getUnits, getUserProgress } from '@/db/queries';
import { redirect } from 'next/navigation';
import { UserProgress } from '@/components/UserProgress';
import Unit from './unit';

const LearnPage = async () => {
  try {
    const [userProgress, units] = await Promise.all([
      getUserProgress(),
      getUnits(),
    ]);

    if (!userProgress || !userProgress.activeCourse) {
      redirect('/courses');
      return null;
    }

    return (
      <div className='flex flex-row-reverse gap-[48px] px-6'>
        <StickyWrapper>
          <UserProgress
            activeCourse={{ title: userProgress.activeCourse.title, imageSrc: userProgress.activeCourse.imageSrc }}
            hearts={userProgress.hearts}
            points={userProgress.points}
            hasActiveSubscription={false}
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
                  activeLesson={undefined}
                  activeLessonPercentage={0}
                />
            </div>
          ))}
        </FeedWrapper>
      </div>
    );
  } catch (error) {
    console.error("Error loading LearnPage data:", error);
    // Handle or display error message
    return <div>Error loading page content.</div>;
  }
};

export default LearnPage;
