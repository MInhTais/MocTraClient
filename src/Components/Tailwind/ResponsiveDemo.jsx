import React, { useState } from "react";
import { FaWindowClose, FaBars } from "react-icons/fa";
export default function ResponsiveDemo() {
  //We will use react hooks for toggling the menu
  const [isSideMenuOpen, setisSideMenuOpen] = useState(false);

  const showSideMenu = () => {
    isSideMenuOpen ? setisSideMenuOpen(false) : setisSideMenuOpen(true);
  };

  return (
    <div className="fixed w-full h-20 bg-green-400 text-gray-200 flex flex-row flex-wrap justify-between items-center">
      <div className="p-5 flex flex-row">
        <div className="brand-logo text-sm font-bold px-2">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full" viewBox="0 0 24 24">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
      </svg>
        </div>
        <ul className="hidden lg:flex lg:flex-row flex-wrap text-xl font-bold
         items-stretch space-x-3 lg:justify-center ml-10">
          <li className="flex px-2">
            <a
              href="#"
              className="flex items-center px-4 -mb-1 border-b-2 border-transparent text-green-600 hover:border-green-600"
            >
              Home
            </a>
          </li>
          <li className="flex px-2">
            <a
              href="#"
              className="flex items-center px-4 -mb-1 border-b-2 border-transparent text-green-600 hover:border-green-600"
            >
              Profile
            </a>
          </li>
          <li className="flex px-2">
            <a
              href="#"
              className="flex items-center px-4 -mb-1 border-b-2 border-transparent text-green-600 hover:border-green-600"
            >
              Settings
            </a>
          </li>
        </ul>
      </div>

      <button
        onClick={() => {
          showSideMenu();
        }}
        className="lg:hidden menu-button"
      >
        {isSideMenuOpen ? (
          <FaWindowClose className="w-8 h-8" />
        ) : (
          <FaBars className="w-8 h-8" />
        )}
      </button>
      {isSideMenuOpen ? SideMenu() : ""}
    </div>
  );
}

function SideMenu() {
  return (
    <div className="fixed h-screen w-1/2 sm:w-1/4 lg:hidden bg-green-500 top-20 p-0">
      <ul className="menu-list flex flex-col text-xs font-bold">
        <li className="menu-list-item py-2 hover:bg-white hover:text-green-700">
          <a href="#">Home</a>
        </li>
        <li className="menu-list-item py-2 hover:bg-white hover:text-green-700">
          <a href="#">Profile</a>
        </li>
        <li className="menu-list-item py-2 hover:bg-white hover:text-green-700">
          <a href="#">Settings</a>
        </li>
      </ul>
    </div>
  );
}
