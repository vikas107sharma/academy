import React, { Suspense, lazy } from 'react';
import { getCategories } from '@/components/utils/queries';
import getCoursesByCategory from '../actions/getCourses';

const Categories = lazy(() => import('@/components/custom/Categories'));
const CourseCard = lazy(() => import('@/components/courses/CourseCard'));

export default async function Home() {
  const categories = await getCategories();
  const courses = await getCoursesByCategory(null);

  return (
    <div className="md:mt-5 md:px-10 xl:px-16 pb-16">
      <Suspense fallback={<div>Loading Categories...</div>}>
        <Categories categories={categories} selectedCategory={null} />
      </Suspense>
      <div className="flex flex-wrap gap-7 justify-center">
        <Suspense fallback={<div>Loading Courses...</div>}>
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </Suspense>
      </div>
    </div>
  );
}
