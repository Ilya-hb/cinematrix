import React from "react";
import Link from "next/link";

interface MobileMenuProps {
  visible?: boolean;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ visible }) => {
  if (!visible) {
    return null;
  }
  return (
    <div className="bg-black w-56 absolute top-14 py-5 flex-col border-2 border-gray-800 flex cursor-pointer">
      <div className="flex flex-col gap-4">
        <Link href={`/`} passHref>
          <div className="px-3 text-center text-white hover:underline">
            Home
          </div>
        </Link>

        <div className="px-3 text-center text-white hover:underline">
          Favorites
        </div>
        <div className="px-3 text-center text-white hover:underline">Films</div>
        <div className="px-3 text-center text-white hover:underline">
          New & Popular
        </div>
        <div className="px-3 text-center text-white hover:underline">Quiz</div>
      </div>
    </div>
  );
};

export default MobileMenu;
