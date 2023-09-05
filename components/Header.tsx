import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import "./Header.scss";
import Link from "next/link";
import Image from "next/image";

export function Header() {
  return (
    <header>
      <div className="nav_left_links">
        <Image className="logo" src="/images/logo.jpg" alt="logo" width={1200} height={1200} />
        <div className="nav_links">
          <Link className="nav_links_link" href="/">Home</Link>
          <Link className="nav_links_link" href="#">Activities</Link>
          <Link className="nav_links_link" href="/workshops">Workshops</Link>
          <Link className="nav_links_link" href="#">Events</Link>
        </div>
      </div>
      <div className="nav_register_links">
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
