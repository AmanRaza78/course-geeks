"use server";
import { revalidatePath } from "next/cache";

export async function RevalidateUtils(reviewId: string ) {
  "use server";
  revalidatePath(`/review/${reviewId}`);
}
