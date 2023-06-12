import React from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";

interface MobileMenuProps {
  visible?: boolean;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ visible }) => {
  if (!visible) {
    return null;
  }
  return (
    <div className="bg-black w-56 absolute top-14 left-10 py-5 flex-col border-2 border-gray-800 flex cursor-pointer">
      <div className="flex flex-col gap-4">
        <Link href={`/`} passHref>
          <div className="px-3 text-center text-white hover:underline">
            Home
          </div>
        </Link>
        <Link href={`/favorites`} passHref>
          <div className="px-3 text-center text-white hover:underline">
            Favorites
          </div>
        </Link>
        <Link href={`/people`} passHref>
          <div className="px-3 text-center text-white hover:underline">
            People
          </div>
        </Link>
        <Link href={`/search`} passHref>
          {" "}
          <div className="px-3 text-center text-white hover:underline">
            Search
          </div>
        </Link>
        <Link href={`/quiz`} passHref>
          <div className="px-3 text-center text-white hover:underline">
            Quiz
          </div>
        </Link>
        <div
          onClick={() => signOut()}
          className="px-3 text-center text-white hover:underline"
        >
          Sign Out
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
