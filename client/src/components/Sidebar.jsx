import React from "react";
import Logo from "../icons/logo";
import SettingsIcon from "../icons/SettingsIcon";
import { Link } from "react-router-dom";
import CustomerSupportIcon from "../icons/CustomerSupportIcon";
import BillIcon from "../icons/BillIcon";

export default function Sidebar() {
  return (
    <div class="xl:rounded-r transform xl:translate-x-0 flex items-start w-full sm:w-64 bg-gray-900 flex-col h-screen justify-between">
      <div className="w-full">
        <div class="flex justify-start p-6 items-center space-x-3 w-full">
          <Logo />
          <p class="text-2xl leading-6 text-white">Devathon</p>
        </div>
        <div class="mt-6 flex flex-col justify-start items-center  pl-4 w-full space-y-3 pb-5 ">
          <Link
            to="/admin/manageAccounts"
            class="flex jusitfy-start items-center space-x-6 w-full focus:outline-none  focus:text-indigo-400  text-white rounded"
          >
            <CustomerSupportIcon />
            <p class="text-base leading-4 ">Customer Support</p>
          </Link>
          <Link
            to="/admin/bills"
            class="flex jusitfy-start items-center w-full space-x-6 focus:outline-none text-white focus:text-indigo-400  rounded"
          >
            <BillIcon />
            <p class="text-base leading-4 ">Bills</p>
          </Link>
        </div>
      </div>
      <Link
        to="/resident/profile"
        class=" flex justify-between items-center w-full px-6 py-4"
      >
        <div class="flex justify-center items-center  space-x-2">
          <div>
            <img
              class="rounded-full"
              src="https://i.ibb.co/L1LQtBm/Ellipse-1.png"
              alt="avatar"
            />
          </div>
          <div class="flex justify-start flex-col items-start">
            <p class="cursor-pointer text-sm leading-5 text-white">
              Alexis Enache
            </p>
            <p class="cursor-pointer text-xs leading-3 text-gray-300">
              alexis81@gmail.com
            </p>
          </div>
        </div>
        <SettingsIcon />
      </Link>
    </div>
  );
}
