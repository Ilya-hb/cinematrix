import React, { useEffect } from "react";
import NavbarItem from "./NavbarItem";
import { FaChevronDown } from "react-icons/fa";
import { BsSearch } from "react-icons/bs";
import MobileMenu from "./MobileMenu";
import AccountMenu from "./AccountMenu";
import { useState, useCallback } from "react";
import useCurrentUser from "@/hooks/useCurrentUser";

export default function Navbar() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [showBackground, setShowBackground] = useState(false);
  const { data: user } = useCurrentUser();
  const toggleMobileMenu = useCallback(() => {
    setShowMobileMenu((current) => !current);
  }, []);
  const toggleAccountMenu = useCallback(() => {
    setShowAccountMenu((current) => !current);
  }, []);
  console.log(user?.name);

  const TOP_OFFSET = 40;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= TOP_OFFSET) {
        setShowBackground(true);
      } else {
        setShowBackground(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav className="w-full fixed z-40 text-white mb-16">
      <div
        className={`min-[0px]:justify-between
        lg:justify-normal
        px-4
        md:px-16
        py-6
        flex
        flex-row
        items-center
        transition
        duration-500
        ${showBackground ? "bg-zinc-900 bg-opacity-90" : ""}
      `}
      >
        <img
          src="/images/red-logo.svg"
          className="h-7 cursor-pointer"
          alt="Logo"
        />
        <div className="flex-row ml-8 gap-7 hidden lg:flex">
          <NavbarItem label="Home" />
          <NavbarItem label="Series" />
          <NavbarItem label="Films" />
          <NavbarItem label="New & Popular" />
          <NavbarItem label="My List" />
        </div>
        <div
          onClick={toggleMobileMenu}
          className="lg:hidden flex flex-row items-center gap-2 ml-8 cursor:pointer"
        >
          <p className="text-white cursor-pointer">Browse</p>
          <FaChevronDown
            className={`text-white transition cursor-pointer ${
              showMobileMenu ? "rotate-180" : "rotate-0"
            }`}
          />
          <MobileMenu visible={showMobileMenu} />
        </div>
        <div className="flex flex-row ml-auto gap-10 items-center">
          <div className="text-gray-200 hover:text-gray-300 cursor-pointer transition">
            <BsSearch className="text-xl" />
          </div>

          <div
            onClick={toggleAccountMenu}
            className="flex flex-row items-center cursor-pointer gap-2 relative"
          >
            <div className="w-10 h-10 lg:w-10 lg:h-10 rounded-lg overflow-hidden">
              <img src="/images/user.png" alt="avatar" />
            </div>
            <div>{user?.name}</div>
            <FaChevronDown
              className={`text-white transition ${
                showAccountMenu ? "rotate-180" : "rotate-0"
              }`}
            />
            <AccountMenu visible={showAccountMenu} />
          </div>
        </div>
      </div>
    </nav>
  );
}