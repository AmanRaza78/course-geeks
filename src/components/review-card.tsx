"use client";
import { Star, ThumbsUp, ThumbsDown, Bookmark } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "./ui/badge";
import Link from "next/link";
import { LikeReview, type LikeState } from "@/actions/review-action";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { toast } from "sonner";

interface ReviewCardProps {
  reviewId: string;
  reviewerName: string;
  reviewerAvatar: string;
  rating: number;
  date: Date;
  reviewText: string;
  courseName: string;
  courseCategory: string;
  price: number;
  initialLikes: number;
  initialDislikes: number;
  courseprovider: string;
}

export default function ReviewCard({
  reviewerName,
  reviewerAvatar,
  rating,
  date,
  reviewText,
  courseName,
  courseCategory,
  courseprovider,
  price,
  reviewId,
  initialDislikes,
  initialLikes,
}: ReviewCardProps) {
  const maxRating = 5;

  const renderStar = (index: number) => {
    if (index < Math.floor(rating)) {
      return (
        <Star key={index} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
      );
    } else if (index === Math.floor(rating) && rating % 1 !== 0) {
      return (
        <span key={index} className="relative">
          <Star className="w-5 h-5 text-gray-300" />
          <Star
            className="w-5 h-5 text-yellow-400 fill-yellow-400 absolute top-0 left-0"
            style={{ clipPath: "inset(0 50% 0 0)" }}
          />
        </span>
      );
    } else {
      return <Star key={index} className="w-5 h-5 text-gray-300" />;
    }
  };

  const [likesCount, setLikesCount] = useState<number | null | undefined>(initialLikes);
  const [dislikesCount, setDislikesCount] = useState<number | null | undefined>(initialDislikes);
  const initalState: LikeState = { message: "", status: undefined };

  const [state, formAction] = useFormState(LikeReview, initalState);
  const [type, setType] = useState("");

  useEffect(() => {
    if (state.status === "success") {
      setLikesCount(state.likeCount);
      setDislikesCount(state.dislikeCount)
      toast.success(state.message);
    } else if (state.status === "error") {
      toast.error("Opps!! Something Went Wrong");
    }
  }, [state]);


  return (
    <Card className="w-full max-w-2xl">
      <CardHeader className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src={reviewerAvatar} alt={reviewerName} />
              <AvatarFallback>
                {reviewerName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <h3 className="text-lg font-semibold">{reviewerName}</h3>
              <div className="flex items-center">
                <div
                  className="flex"
                  aria-label={`Rating: ${rating} out of 5 stars`}
                >
                  {[...Array(maxRating)].map((_, i) => renderStar(i))}
                </div>
                <span className="ml-2 text-sm text-muted-foreground">
                  {new Date(date).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
          <Button
            variant="outline"
            size="icon"
            aria-label="Bookmark this review"
          >
            <Bookmark className="h-4 w-4" />
          </Button>
        </div>
        <div className="bg-muted p-4 rounded-lg space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold">{courseName}</h4>
            <Badge variant="secondary">{courseCategory}</Badge>
          </div>
          <p className="text-sm font-medium">Rs.{price.toFixed(2)}</p>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-y-2">
        <p className="text-sm text-gray-600 dark:text-gray-300">{reviewText}</p>
        <div className="w-fit">
          <Link href={`/review/${reviewId}`}>
            <Button>View</Button>
          </Link>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <form action={formAction}>
          <div className="text-sm text-muted-foreground">
            Was this review helpful?
          </div>
          <div className="flex gap-4">
            <input type="hidden" name="reviewId" value={reviewId} />
            <input type="hidden" name="type" value={type} />
            <Button
              variant="outline"
              onClick={() => setType("LIKE")}
              type="submit"
              size="sm"
              className="flex items-center gap-2"
            >
              <ThumbsUp className="w-4 h-4" />
              <span>Yes {likesCount}</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setType("DISLIKE")}
              type="submit"
              className="flex items-center gap-2"
            >
              <ThumbsDown className="w-4 h-4" />
              <span>No {dislikesCount}</span>
            </Button>
          </div>
        </form>
      </CardFooter>
    </Card>
  );
}
