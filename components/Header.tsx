"use client";

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
import { useState } from "react";

export function Header() {
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
  return (
    <>
      <header id="header">
        <div className="desktop-navigation-menu">
          <div className="nav_left_links">
            <Image
              className="logo"
              src="/images/logo.jpg"
              alt="logo"
              width={1200}
              height={1200}
            />
            <div className="nav_links">
              <Link className="nav_links_link" href="/">
                Начало
              </Link>
              <Link className="nav_links_link" href="/about-us">
                За нас
              </Link>
              <Link className="nav_links_link" href="/workshops">
                Работилници
              </Link>
              <Link className="nav_links_link" href="/events">
                Събития
              </Link>
            </div>
          </div>
          <div className="nav_register_links">
            <SignedOut>
              <SignInButton afterSignInUrl="/" afterSignUpUrl="/" mode="modal">
                <a className="btn max-md:text-xs">Влез</a>
              </SignInButton>
              <SignUpButton afterSignInUrl="/" afterSignUpUrl="/" mode="modal">
                <a className="btn btn-primary max-md:text-xs">Регистрирай се</a>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
          </div>
        </div>
        <div className="mobile-navigation-menu">
          <Image
            className="logo"
            src="/images/logo.jpg"
            alt="logo"
            width={1200}
            height={1200}
          />
          <a
            id="btn-hamburger"
            className={`hamburger-menu ${isHamburgerOpen ? "open" : ""}`}
            onClick={() => {
              setIsHamburgerOpen(!isHamburgerOpen);
            }}
          >
            <span></span>
            <span></span>
            <span></span>
          </a>
          <div
            className={`mobile-nav-links ${
              isHamburgerOpen ? "mobile-nav-links-opened" : ""
            }`}
          >
            <Link className="nav_links_link" href="/">
              Начало
            </Link>
            <Link className="nav_links_link" href="/about-us">
              За нас
            </Link>
            <Link className="nav_links_link" href="/workshops">
              Работилници
            </Link>
            <Link className="nav_links_link" href="/events">
              Събития
            </Link>
            <SignedOut>
              <SignInButton afterSignInUrl="/" afterSignUpUrl="/" mode="modal">
                <a className="btn max-md:text-xs">Влез</a>
              </SignInButton>
              <SignUpButton afterSignInUrl="/" afterSignUpUrl="/" mode="modal">
                <a className="btn btn-primary max-md:text-xs">Регистрирай се</a>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
          </div>
        </div>
      </header>
    </>
  );
}
