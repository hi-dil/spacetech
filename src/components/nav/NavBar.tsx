"use client";

import { useContext } from "react";
import { NavLogo } from "./NavLogo";
import { UserNav } from "./UserNav";
import { useAuthContext } from "@/app/context/AuthContext";
import Link from "next/link";

export default function NavBar() {
  const {user} = useAuthContext();

  return (
    <nav className="flex h-16 items-center px-4">
      <NavLogo className="mx-6" />
      <div className="ml-auto flex items-center space-x-4">
        {user ? <UserNav /> : (
          <Link
            href="/login"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
