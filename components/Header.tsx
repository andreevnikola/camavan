import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import "./Header.css";
import Link from "next/link";

export function Header() {
  return (
    <header>
      <h2>IAK HEADER BRATTT</h2>
      <Link href="/events">edinsvenia link yuka</Link>
      <SignedOut>
        <SignInButton afterSignInUrl="/" afterSignUpUrl="/" mode="modal">
          <a className="btn max-md:text-xs">Sign In</a>
        </SignInButton>
        <SignUpButton afterSignInUrl="/" afterSignUpUrl="/" mode="modal">
          <a className="btn btn-primary max-md:text-xs">Register</a>
        </SignUpButton>
      </SignedOut>
      <SignedIn>
        <UserButton afterSignOutUrl="/" />
      </SignedIn>
    </header>
  );
}
