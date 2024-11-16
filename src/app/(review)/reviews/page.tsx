import { GetReviews } from "@/actions/review-action";
import Pagination from "@/components/pagination";
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
    <div>
        <SearchBar/>
      {reviewsWithAvgRating.map((review) => (
        <div key={review.id}>
          <h1>{review.coursename}</h1>
          <p>{review.coursedescription}</p>
          <p>Category: {review.category}</p>
          <p>Average Rating: {review.averageRating}</p>
          <Link href={`/review/${review.id}`}>
            <Button>View</Button>
          </Link>
        </div>
      ))}

      <div className="mt-20">
        <Pagination totalPages={Math.ceil(count / 10)} />
      </div>
    </div>
  );
}
