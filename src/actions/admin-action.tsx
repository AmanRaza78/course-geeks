"use server"

import prisma from "@/lib/db"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { redirect } from "next/navigation"


export async function GetReviewsAdmin(searchParams: Record<string, string>) {

    const {getUser} = getKindeServerSession()
    const user = await getUser()

    if(!user){
        return redirect("/api/auth/login")
    }

    const { page, query, category, courseprovider, courseprice } = searchParams;
  
    const filters:any = {}
  
    if (category) filters.category = category;
    if (courseprovider) filters.courseprovider = courseprovider;
    if (courseprice) filters.courseprice = Number(courseprice);
  
    if (query) {
      filters.OR = [
        { category: { contains: query, mode: "insensitive" } },
        { coursename: { contains: query, mode: "insensitive" } },
      ];
    }
  
    const [count, reviews, avgRatings, likeDislikeCounts] = await prisma.$transaction([
      prisma.review.count({
        where: filters,
      }),
      prisma.review.findMany({
        where: filters,
        take: 10,
        skip: page ? (Number(page) - 1) * 10 : 0,
        select: {
          id: true,
          coursename: true,
          coursedescription: true,
          user: {
            select: {
              firstname: true,
              lastname: true,
              profilepic: true,
            },
          },
          createdAt: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      }),
      prisma.rating.groupBy({
        by: ["reviewId"],
        _avg: {
          ratingValue: true,
        },
        orderBy: {
          reviewId: "asc",
        },
      }),
      prisma.like.groupBy({
        by: ["reviewId", "type"],
        _count: {
          type: true,
        },
        orderBy: {
          reviewId: "asc",
        },
      }),
    ]);
  
    interface LikeDislikeCount {
      reviewId: string;
      type: "LIKE" | "DISLIKE";
      _count: {
        type: number;
      };
    }
  
    const typedLikeDislikeCounts = likeDislikeCounts as LikeDislikeCount[];
  
    const reviewsWithDetails = reviews.map((review) => {
      const avgRatingEntry = avgRatings.find((r) => r.reviewId === review.id);
      const avgRating = avgRatingEntry?._avg?.ratingValue ?? 0;
  
      const likeCount = typedLikeDislikeCounts.find(
        (ld) => ld.reviewId === review.id && ld.type === "LIKE"
      )?._count.type ?? 0;
  
      const dislikeCount = typedLikeDislikeCounts.find(
        (ld) => ld.reviewId === review.id && ld.type === "DISLIKE"
      )?._count.type ?? 0;
  
      return {
        ...review,
        averageRating: avgRating,
      };
    });
  
    return { count, reviewsWithDetails };
  }

export async function getStats(){
    const {getUser} = getKindeServerSession()
    const user = await getUser()

    if(!user){
        return redirect("/api/auth/login")
    }

    const usercount = await prisma.user.count();
    const reviewcount = await prisma.review.count();

    return {
        usercount,
        reviewcount,
    } 
}