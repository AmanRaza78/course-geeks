import { GetReview } from "@/actions/review-action";
import RatingForm from "@/components/forms/rating-form";


export default async function Review({ params }: { params: { id: string } }) {
  const reviewId = params.id;
  console.log(reviewId);
  const review = await GetReview(reviewId);

  if(!review || review===null|| review.id === null){
    return <div>No Review Found</div>
  }

  return (
    <div>
        <h1>{review.coursename}</h1>
        <RatingForm reviewId={review.id}/>
    </div>
  );
}
