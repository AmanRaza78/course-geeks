"use client";
import { PostReview, type State } from "@/actions/review-action";
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
import { useFormState } from "react-dom";
import { useEffect, useState } from "react";
import { UploadDropzone } from "@/lib/uploadthings";
import { toast } from "sonner";

export default function ReviewForm() {
  const initalState: State = { message: "", status: undefined };
  const [state, formAction] = useFormState(PostReview, initalState);
  const [images, setImages] = useState<null | string>(null);

  useEffect(() => {
    if (state.status === "success") {
      toast.success(state.message);
    } else if (state.status === "error") {
      toast.error(state.message);
    }
  }, [state]);
  return (
    <form action={formAction}>
      <CardHeader>
        <CardTitle>
          Review the course you have taken with{" "}
          <span className="text-primary">Course Geeks</span>
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
          {state?.errors?.["name"]?.[0] && (
            <p className="text-destructive">{state?.errors?.["name"]?.[0]}</p>
          )}
        </div>

        <div className="flex flex-col gap-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            name="description"
            placeholder="Type here..."
            minLength={10}
            maxLength={2500}
          />
          {state?.errors?.["description"]?.[0] && (
            <p className="text-destructive">
              {state?.errors?.["description"]?.[0]}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-y-2">
          <Label htmlFor="category">Category</Label>
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
          {state?.errors?.["category"]?.[0] && (
            <p className="text-destructive">
              {state?.errors?.["category"]?.[0]}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-y-2">
          <Label htmlFor="provider">Course Provider</Label>
          <Select name="provider">
            <SelectTrigger className="w-full" id="color">
              <SelectValue placeholder="Select Course Provider" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Providers</SelectLabel>
                <SelectItem value="coursera">
                  Coursera
                </SelectItem>
                <SelectItem value="udemy">
                  Udemy
                </SelectItem>
                <SelectItem value="edureka">
                  Edureka
                </SelectItem>
                <SelectItem value="coding-ninjas">
                  Coding Ninjas
                </SelectItem>
                <SelectItem value="internshala">Intenshala</SelectItem>
                <SelectItem value="freecodecamp">Freecodecamp</SelectItem>
                <SelectItem value="codecademy">
                  Codecademy
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          {state?.errors?.["provider"]?.[0] && (
            <p className="text-destructive">
              {state?.errors?.["provider"]?.[0]}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-y-2">
          <Label htmlFor="price">Price</Label>
          <Input
            id="price"
            name="price"
            type="number"
            placeholder="Enter Price in Rupees"
            minLength={3}
          />
          {state?.errors?.["price"]?.[0] && (
            <p className="text-destructive">{state?.errors?.["price"]?.[0]}</p>
          )}
        </div>

        <div className="flex flex-col gap-y-2">
          <Label htmlFor="rating">Rating</Label>
          <Card>
            <StarRating />
          </Card>
          {state?.errors?.["rating"]?.[0] && (
            <p className="text-destructive">{state?.errors?.["rating"]?.[0]}</p>
          )}
        </div>

        <div className="flex flex-col gap-y-2">
          <input type="hidden" name="image" value={JSON.stringify(images)} />
          <Label htmlFor="image">Course Certification</Label>
          <UploadDropzone
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
              setImages(res[0].url);
              toast.success("Your images have been uploaded");
            }}
            onUploadError={(error: Error) => {
              toast.error("Something went wrong, try again");
            }}
          />
          {state?.errors?.["image"]?.[0] && (
            <p className="text-destructive">{state?.errors?.["image"]?.[0]}</p>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <SubmitButton text="Post Review" />
      </CardFooter>
    </form>
  );
}
