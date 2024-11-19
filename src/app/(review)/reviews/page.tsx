import { GetReviews } from "@/actions/review-action";
import FilterSheet from "@/components/filter-sheet";
import Pagination from "@/components/pagination";
import ReviewCard from "@/components/review-card";
import SearchBar from "@/components/search-bar";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Reviews({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  const { count, reviewsWithAvgRating } = await GetReviews(searchParams);
  return (
    <div className="container mx-auto flex flex-col gap-y-4 px-4">
      <div className="mt-4 flex flex-col gap-y-4">
      <SearchBar />
      <div className="w-fit">
      <FilterSheet/>
      </div>
      
      </div>
      <main className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {reviewsWithAvgRating.map((review) => (
          <ReviewCard
            key={review.id}
            reviewId={review.id}
            reviewerName={review.user.firstname}
            reviewerAvatar={review.user.profilepic}
            rating={review.averageRating}
            date={review.createdAt}
            reviewText={review.coursedescription}
            courseName={review.coursename}
            courseCategory={review.category}
            price={review.courseprice}
          />
        ))}
      </main>
      <div className="mt-20">
        <Pagination totalPages={Math.ceil(count / 10)} />
      </div>
    </div>
  );
}
