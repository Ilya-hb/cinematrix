import React from "react";

interface NavbarItemProps {
  label: string;
  className: string;
  onClick?: () => void;
}

const NavbarItem: React.FC<NavbarItemProps> = ({
  label,
  onClick,
  className,
}) => {
  
  return (
    <div
      className={`relative cursor-pointer hover:text-gray-300 transition text-xl ${
        className === "active" ? "active-link font-semibold" : "text-white"
      }`}
      onClick={onClick}
    >
      {label}
    </div>
  );
};

export default NavbarItem;
