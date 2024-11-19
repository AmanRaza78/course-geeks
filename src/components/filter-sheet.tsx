import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import prisma from "@/lib/db";
import { redirect } from "next/navigation";
import { ReviewValidationSchema } from "@/lib/validation";

async function FilterReviews(formData: FormData) {
  "use server";
  const values = Object.fromEntries(formData.entries())
  const {category,courseprice,courseprovider} = ReviewValidationSchema.parse(values)
  const searchParams = new URLSearchParams({
    ...(category && {category}),
    ...(courseprice && {courseprice}),
    ...(courseprovider && {courseprovider})
  });

  redirect(`/reviews?${searchParams.toString()}`)

}

export default async function FilterSheet() {
  const distinctCategory = (await prisma.review
    .findMany({
      select: {
        category: true,
      },
      distinct: ["category"],
    })
    .then((category) =>
        category.map(({ category }) => category).filter(Boolean)
    )) as string[];

  const distinctProvider = (await prisma.review
    .findMany({
      select: {
        courseprovider: true,
      },
      distinct: ["courseprovider"],
    })
    .then((courseprovider) =>
        courseprovider.map(({ courseprovider }) => courseprovider).filter(Boolean)
    )) as string[];

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Filters</Button>
      </SheetTrigger>
      <SheetContent>
        <form action={FilterReviews}>
          <SheetHeader>
            <SheetTitle>Filter Results</SheetTitle>
          </SheetHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="category">Category</Label>
              <Select name="category">
                <SelectTrigger id="category" className="col-span-3">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
 
                <SelectContent>
                  {distinctCategory.map((category) => (
                    <SelectItem value={category} key={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="courseprovider">Course Provider</Label>
              <Select name="courseprovider">
                <SelectTrigger id="courseprovider" className="col-span-3">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>

                <SelectContent>
                  {distinctProvider.map((courseprovider) => (
                    <SelectItem value={courseprovider} key={courseprovider}>
                      {courseprovider}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="courseprice">Course Price</Label>
              <Input id="courseprice" name="courseprice" className="col-span-3" />
            </div>
          </div>
          <SheetFooter>
            <SheetClose asChild>
              <Button type="submit">Filter</Button>
            </SheetClose>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}
