"use client"
import { PostRating } from "@/actions/review-action";
import StarRating from "@/components/star-rating";
import SubmitButton from "@/components/submit-button";
import { Card } from "@/components/ui/card";
export default function RatingForm({reviewId}:{reviewId:string}) {
  return (
    <form action={PostRating}>
        <input type="hidden" name="reviewId" value={reviewId} />
      <Card>
        <StarRating />
      </Card>
      <SubmitButton text="Submit"/>
    </form>
  );
}