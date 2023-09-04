import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import "./Header.css";
import Link from "next/link";
import Image from "next/image";

export function Header() {
  return (
    <header>
      <Image className="logo" src="/images/branding/logo.jpg" alt="logo" width={1200} height={1200} />
      <div className="nav_links">
        <Link href="#">Home</Link>
        <Link href="#">Activities</Link>
        <Link href="#">Events</Link>
        <Link href="#">Events</Link>
      </div>
      <div className="nav_links register_links">
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
      </div>
    </header>
  );
}
