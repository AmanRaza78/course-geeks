"use client";
import StarRating from "../star-rating";
import SubmitButton from "../submit-button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";

export default function ReviewForm() {
  return (
    <form action="" method="post">
      <CardHeader>
        <CardTitle>
          Review the course you have taken with <span className="text-primary">Course Geeks</span>
        </CardTitle>
        <CardDescription>Note all fields are required*</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-y-10">
        <div className="flex flex-col gap-y-2">
          <Label htmlFor="name">Course Name</Label>
          <Input
            id="name"
            name="name"
            type="text"
            placeholder="Name of course eg. Python for beginners"
            minLength={3}
          />
        </div>

        <div className="flex flex-col gap-y-2">
          <Label htmlFor="name">Description</Label>
          <Textarea
            id="description"
            name="description"
            placeholder="Type here..."
            minLength={3}
            maxLength={2500}
          />
        </div>

        <div className="flex flex-col gap-y-2">
          <Label htmlFor="name">Category</Label>
          <Select name="category">
            <SelectTrigger className="w-full" id="color">
              <SelectValue placeholder="Select a Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Category</SelectLabel>
                <SelectItem value="frontend-development">
                  Frontend Development
                </SelectItem>
                <SelectItem value="backend-development">
                  Backend Development
                </SelectItem>
                <SelectItem value="full-stack-development">
                  Full Stack Development
                </SelectItem>
                <SelectItem value="android-development">
                  Andriod Development
                </SelectItem>
                <SelectItem value="ui-ux-design">UI/UX Design</SelectItem>
                <SelectItem value="data-science">Data Science</SelectItem>
                <SelectItem value="machine-learning">
                  Machine Learning
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-y-2">
        <Label htmlFor="name">Rating</Label>

          <Card>
            <StarRating/>
          </Card>
        </div>
      </CardContent>
      <CardFooter>
        <SubmitButton text="Post Review" />
      </CardFooter>
    </form>
  );
}
