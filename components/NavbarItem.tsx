import React from "react";

interface NavbarItemProps {
  label: string;
  onClick?: () => void;
}

const NavbarItem: React.FC<NavbarItemProps> = ({ label, onClick }) => {
  return (
    <div
      className="text-white cursor-pointer hover:text-gray-300 transition text-xl"
      onClick={onClick}
    >
      {label}
    </div>
  );
};

export default NavbarItem;
