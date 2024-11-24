"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "../ui/textarea";
import { PostReport, type ReportState } from "@/actions/review-action";
import { useFormState } from "react-dom";
import { useEffect } from "react";
import { toast } from "sonner";

export function ReportForm({ reviewId }: { reviewId: string }) {
  const initalState: ReportState = { message: "", status: undefined };
  const [state, formAction] = useFormState(PostReport, initalState);
  console.log(reviewId);

  useEffect(() => {
    if (state.status === "success") {
      toast.success(state.message);
    } else if (state.status === "error") {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Report</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Report Review</DialogTitle>
          <DialogDescription>
            Please tell us why you are reporting this review?.
          </DialogDescription>
        </DialogHeader>
        <form action={formAction}>
          <input type="hidden" name="reviewId" value={reviewId} />
          <div className="grid gap-4 py-4">
            <div className="flex flex-col gap-y-2 items-center">
              <Textarea
                id="reason"
                name="reason"
                placeholder="Enter your reason"
              />
              {state?.errors?.["reason"]?.[0] && (
                <p className="text-destructive">
                  {state?.errors?.["reason"]?.[0]}
                </p>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Submit</Button>
          </DialogFooter>
        </form>{" "}
      </DialogContent>
    </Dialog>
  );
}
