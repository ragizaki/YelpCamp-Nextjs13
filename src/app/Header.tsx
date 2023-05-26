"use client";

import { useSession, signOut, signIn } from "next-auth/react";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNavOpen = () => {
    setIsNavOpen((prevState) => !prevState);
  };

  const closeNav = () => setIsNavOpen(false);

  const { data: session, status } = useSession();
  return (
    <div className="border-b-2 shadow-sm">
      <nav className="relative px-4 lg:px-12 py-4 flex justify-between items-center bg-white">
        <p className="text-xl font-bold">YelpCamp</p>
        <div className="lg:hidden">
          <button
            onClick={toggleNavOpen}
            className="navbar-burger flex items-center text-blue-600 p-3"
          >
            <svg
              className="block h-4 w-4 fill-current"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Mobile menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
            </svg>
          </button>
        </div>
        <ul className="hidden absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 lg:flex lg:mx-auto lg:items-center lg:w-auto lg:space-x-10">
          <li>
            <Link
              href="/"
              className="font-medium text-gray-800 hover:text-blue-700 transition ease-out"
            >
              Browse Campsites
            </Link>
          </li>
          <li>
            <Link
              href="/camps/create"
              className="font-medium text-gray-800 hover:text-blue-700 transition ease-out"
            >
              List a Campsite
            </Link>
          </li>
        </ul>
        {status === "authenticated" ? (
          <Link
            className="hidden lg:flex items-center space-x-3"
            href="/profile"
          >
            <Image
              src={session?.user?.image as string}
              alt={`${session?.user?.name} profile picture`}
              width={20}
              height={20}
              className="w-10 h-10 rounded-full"
            />
            <p>{session?.user?.name}</p>
          </Link>
        ) : (
          <button
            className="hidden lg:inline py-2 px-6 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded transition duration-200"
            onClick={() => signIn()}
          >
            Sign In
          </button>
        )}
      </nav>

      {/* Navbar menu on small screens */}
      <div className={`navbar-menu relative z-50 ${!isNavOpen && "hidden"}`}>
        <div className="navbar-backdrop fixed inset-0 bg-gray-800 opacity-25"></div>
        <nav className="fixed top-0 left-0 bottom-0 flex flex-col w-5/6 max-w-sm py-6 px-6 bg-white border-r overflow-y-auto">
          <div className="flex items-center mb-8">
            <p className="mr-auto text-xl font-bold leading-none">YelpCamp</p>
            <button onClick={() => setIsNavOpen(false)}>
              <svg
                className="h-6 w-6 text-gray-400 cursor-pointer hover:text-gray-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
          </div>
          <div>
            <ul>
              <li className="mb-1">
                <Link
                  className="block p-4 text-sm font-semibold text-gray-400 hover:bg-blue-50 hover:text-blue-600 rounded"
                  href="/"
                  onClick={closeNav}
                >
                  Browse Campsites
                </Link>
              </li>
              <li className="mb-1">
                <Link
                  className="block p-4 text-sm font-semibold text-gray-400 hover:bg-blue-50 hover:text-blue-600 rounded"
                  href="/camps/create"
                  onClick={closeNav}
                >
                  List a Campsite
                </Link>
              </li>
            </ul>
          </div>
          {status === "authenticated" ? (
            <button
              className="px-4 py-2 leading-loose text-xs text-center text-white font-semibold bg-blue-600 hover:bg-blue-700 rounded-lg"
              onClick={() => signIn("google")}
            >
              Logout
            </button>
          ) : (
            <button
              className="block px-4 py-3 leading-loose text-xs text-center text-white font-semibold bg-blue-600 hover:bg-blue-700 rounded-lg"
              onClick={() => signIn("google")}
            >
              Sign In
            </button>
          )}
        </nav>
      </div>
    </div>
  );
}
