import React from "react";
import { signOut } from "next-auth/react";
import { FiLogOut } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";

interface AccountMenuProps {
  visible?: boolean;
}

const AccountMenu: React.FC<AccountMenuProps> = ({ visible }) => {
  if (!visible) {
    return null;
  }
  return (
    <>
      <div className="bg-black w-56 absolute top-14 right-0 py-5 flex-col border-2 border-gray-800 flex">
        <div className="flex flex-col gap-3">
          <div className="px-3 group/item flex flex-row justify-center gap-3 items-center w-full">
            <CgProfile className="text-xl" />
            <p className="text-white group-hover/item:underline">Profile</p>
          </div>
          <hr className="bg-gray-600 border-0 h-px my-4" />
          <div
            onClick={() => {
              signOut();
            }}
            className="px-3 group/item flex flex-row justify-center gap-3 items-center w-full"
          >
            <FiLogOut className="text-xl inline-block"/>
            <p className="text-white group-hover/item:underline">Sign Out</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountMenu;
