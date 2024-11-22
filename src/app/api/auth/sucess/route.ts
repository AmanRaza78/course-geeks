import prisma from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";

export async function GET() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || !user.id || user === null) {
    throw new Error("Something went wrong!!");
  }

  const dbuser = await prisma.user.findUnique({
    where: {
      id: user.id,
    },
  });

  if (!dbuser) {
    await prisma.user.create({
      data: {
        id: user.id,
        firstname: user.given_name || "",
        lastname: user.family_name || "",
        email: user.email || "",
        profilepic: user.picture || "",
      },
    });
  }

  return NextResponse.redirect("http://localhost:3000/profile");
}
