import { db } from "@/lib/db";
import { clerkClient } from "@clerk/nextjs/server";

export const getCategories = async () =>
  await db.category.findMany({
    orderBy: {
      name: "asc",
    },
    include: {
      subCategories: {
        orderBy: {
          name: "asc",
        },
      },
    },
  });

export async function getCourse(courseId: string) {
  return db.course.findUnique({
    where: {
      id: courseId,
      isPublished: true,
    },
    include: {
      sections: {
        where: {
          isPublished: true,
        },
      },
    },
  });
}

export async function getSection(sectionId: string, courseId: string) {
  const section = await db.section.findUnique({
    where: {
      id: sectionId,
      courseId,
      isPublished: true,
    },
  });
}

export async function getInstructor(instructorId: string) {
  return clerkClient.users.getUser(instructorId);
}

export async function getLevel(levelId: string) {
  return db.level.findUnique({
    where: {
      id: levelId,
    },
  });
}
