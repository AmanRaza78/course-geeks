"use client";
import StarRating from "@/components/star-rating";
import SubmitButton from "@/components/submit-button";
import { PostRating, type State } from "@/actions/review-action";

import { Card } from "@/components/ui/card";
import { useFormState } from "react-dom";
import { useEffect } from "react";
import { toast } from "sonner";
export default function RatingForm({ reviewId }: { reviewId: string }) {
  const initalState: State = { message: "", status: undefined };
  const [state, formAction] = useFormState(PostRating, initalState);

  useEffect(() => {
    if (state?.status === "success") {
      toast.success(state.message);
    } else if (state?.status === "error") {
      toast.error(state.message);
    }
  }, [state]);
  return (
    <form action={formAction}>
      <input type="hidden" name="reviewId" value={reviewId} />
      <Card className="p-2 mb-2 flex flex-col items-center gap-y-2">
        <StarRating />
        <SubmitButton text="Submit" />
      </Card>
    </form>
  );
}
