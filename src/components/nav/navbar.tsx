import Link from "next/link";
import {
  RegisterLink,
  LoginLink,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { Button } from "../ui/button";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export default async function Navbar() {
  const { isAuthenticated } = getKindeServerSession();
  const isLoggedIn = await isAuthenticated();
  return (
    <nav className="flex items-center justify-between p-4 bg-background">
      <div>
        <Link href="/">Course Geeks</Link>
      </div>
      <div>
        {isLoggedIn ? (
          <LogoutLink>Logout</LogoutLink>
        ) : (
          <>
            <RegisterLink>
              <Button>Sign-Up</Button>
            </RegisterLink>
            <LoginLink>
              <Button>Login</Button>
            </LoginLink>
          </>
        )}
      </div>
    </nav>
  );
}
