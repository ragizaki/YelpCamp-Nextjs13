"use client";

import { useSession, signOut, signIn } from "next-auth/react";
import Link from "next/link";

export default function Header() {
  const { data: session, status } = useSession();
  return (
    <nav className="z-10 w-full items-center justify-between text-sm lg:flex">
      <div className="flex space-x-5">
        <p>Browse Camps</p>
        {status === "authenticated" && <Link href="/create">Create Camp</Link>}
      </div>
      {status === "authenticated" ? (
        <div className="flex space-x-3">
          <p>Signed in as {session?.user?.email}</p>
          <button
            onClick={() => signOut({ callbackUrl: "http://localhost:3000" })}
          >
            Logout
          </button>
        </div>
      ) : (
        <button onClick={() => signIn("google")}>Sign In</button>
      )}
    </nav>
  );
}
