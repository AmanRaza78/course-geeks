import Link from "next/link";
import {
  RegisterLink,
  LoginLink,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { Button } from "../ui/button";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { BookOpen } from "lucide-react";

export default async function Navbar() {
  const { isAuthenticated } = getKindeServerSession();
  const isLoggedIn = await isAuthenticated();
  return (
    <header className="px-4 lg:px-6 h-14 flex items-center border-b">
      <Link className="flex items-center justify-center" href="#">
        <BookOpen className="h-6 w-6 text-primary" />
        <span className="ml-2 text-2xl font-bold text-primary">
          Course Geeks
        </span>
      </Link>
      <nav className="ml-auto flex items-center gap-4 sm:gap-6">
        <Link
          className="text-sm font-medium hover:underline underline-offset-4"
          href="#"
        >
          Home
        </Link>
        <Link
          className="text-sm font-medium hover:underline underline-offset-4"
          href="#"
        >
          Courses
        </Link>
        <Link
          className="text-sm font-medium hover:underline underline-offset-4"
          href="#"
        >
          Reviews
        </Link>
        <Link
          className="text-sm font-medium hover:underline underline-offset-4"
          href="#"
        >
          About
        </Link>
        {isLoggedIn ? (
          <LogoutLink>
            <Button>Logout</Button>
          </LogoutLink>
        ) : (
          <>
            <LoginLink>
              <Button>Login</Button>
            </LoginLink>
            <RegisterLink>
              <Button>Register</Button>
            </RegisterLink>
          </>
        )}
      </nav>
    </header>
  );
}
