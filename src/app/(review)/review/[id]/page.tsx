import { GetReview } from "@/actions/review-action";
import RatingForm from "@/components/forms/rating-form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Calendar } from "lucide-react";

export default async function Review({ params }: { params: { id: string } }) {
  const reviewId = params.id;
  const review = await GetReview(reviewId);

  if (!review || review === null || review.id === null) {
    return <div>No Review Found</div>;
  }

  console.log(review.user?.profilepic);

  return (
    <div>
      <div className="container mx-auto px-4 py-8">
        <Card className="mb-8">image will come here.</Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <img src={review?.user?.profilepic} alt={review?.user?.firstname} className="rounded-full w-12 h-12"/>
                <div>
                  <CardTitle className="text-lg">
                    {review?.user?.firstname} {review?.user?.lastname}
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <p className="text-secondary-foreground">Avg Rating {review.averageRating}</p>
                  </div>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <h3 className="text-xl font-semibold mb-2">{review.coursename}</h3>
            <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {review.createdAt
                  ? new Date(review.createdAt).toLocaleDateString()
                  : "N/A"}
              </div>
            </div>
            <Separator className="my-4" />
            <p className="text-gray-700 leading-relaxed">
              {review.coursedescription}
            </p>
            <Separator className="my-4" />
            <div className="flex justify-between items-center">
              <Button variant="outline">Report abuse</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
