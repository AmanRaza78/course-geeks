"use client";

import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useRef } from "react";
import SubmitButton from "../submit-button";
import { createComment } from "@/actions/review-action";

interface iAppPorps {
    reviewId: string;
}

export default function CommentForm({ reviewId }: iAppPorps) {
  const ref = useRef<HTMLFormElement>(null);
  return (
    <form
      className="mt-5"
      action={async (formData) => {
        await createComment(formData);
        ref.current?.reset();
      }}
      ref={ref}
    >
      <input type="hidden" name="reviewId" value={reviewId} />
      <Label>Comment right here</Label>
      <Textarea
        placeholder="What are your thoughts?"
        className="w-full mt-1 mb-2"
        name="comment"
      />
      <SubmitButton text="Comment" />
    </form>
  );
}