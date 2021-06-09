import React, { useRef } from "react";
import { Fragment } from "react";
import { Popover, Transition, Menu } from "@headlessui/react";
import {
  InformationCircleIcon,
  MenuIcon,
  PhoneIcon,
  XIcon,
  UserCircleIcon,
  LogoutIcon,
  ClipboardListIcon,
} from "@heroicons/react/outline";
import LogoWhite from "../../assets/img/LogoWhite.png";
import Logo from "../../assets/img/Logo.png";

const menu = [
  {
    name: "Laporan Saya",
    description: "Laporan Saya.",
    icon: ClipboardListIcon,
  },
  {
    name: "Tentang Kami",
    description: "Tentang kami.",
    icon: InformationCircleIcon,
  },
  {
    name: "Kontak Kami",
    description: "Kontak kami.",
    icon: PhoneIcon,
  },
];

const logout = (props) => {
  const appState = {
    isLoggedIn: false,
    user: {},
  };
  localStorage.setItem("appState", JSON.stringify(appState));
  props.history.push("/");
  window.location.reload();
};

const HeaderUser = (props) => {
  const profileButtonRef = useRef(null);

  let isLanding = window.location.href === "http://localhost:3000/" ? true : false;
  console.log(props);

  return (
    <Popover className="relative z-50">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 font-sans">
            <div className="flex justify-between items-center py-4 md:justify-start ">
              <div className="flex justify-start">
                <div>
                  <img
                    onClick={() => props.history.push("/")}
                    className="cursor-pointer h-8"
                    alt="Logo"
                    src={isLanding ? LogoWhite : Logo}
                  />
                </div>
                <div className=" hidden md:flex text-sm ml-4 space-x-4">
                  <div
                    onClick={() => props.history.push(`/profile/${props.userdata.username}`)}
                    className={`cursor-pointer font-medium my-auto  ${
                      isLanding ? "text-white" : "text-gray-400"
                    } hover:text-gray-900`}>
                    LAPORAN SAYA
                  </div>
                  <div
                    onClick={() => props.history.push("/about-us")}
                    className={`cursor-pointer font-medium my-auto ${
                      isLanding ? "text-white" : "text-gray-400"
                    }  hover:text-gray-900`}>
                    TENTANG KAMI
                  </div>
                  <div
                    onClick={() => props.history.push("/contact-us")}
                    className={`cursor-pointer font-medium my-auto ${
                      isLanding ? "text-white" : "text-gray-400"
                    } hover:text-gray-900`}>
                    KONTAK KAMI
                  </div>
                </div>
              </div>
              <div className="-mr-2 -my-2 flex flex-1 justify-end items-center lg:-mr-0 lg:-my-0">
                <div className="hidden md:flex">
                  <Menu as="div">
                    {({ open }) => (
                      <>
                        <div className="flex items-center space-x-2">
                          <Menu.Button
                            ref={profileButtonRef}
                            className="bg-white outline-none focus:outline-none rounded-full">
                            <UserCircleIcon className="h-8 w-8" />
                          </Menu.Button>
                          <span
                            onClick={() => profileButtonRef.current.click()}
                            className={`cursor-pointer truncate ${isLanding ? "text-white" : "text-dark"} `}>
                            {props.userdata.username}
                          </span>
                        </div>
                        <Transition
                          show={open}
                          enter="transition duration-200 ease-out"
                          enterFrom="opacity-0"
                          enterTo="opacity-100"
                          leave="transition duration-100 ease-out"
                          leaveFrom="opacity-200"
                          leaveTo="opacity-0">
                          <Menu.Items
                            static
                            as="ul"
                            className="absolute right-8 w-48 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg focus:outline-none">
                            <div className="px-1 py-2 space-y-2">
                              <Menu.Item>
                                {({ active }) => (
                                  <button
                                    onClick={() => props.history.push(`/profile/${props.userdata.username}`)}
                                    className={`${
                                      active ? "bg-violet-500 text-primary" : "text-gray-900"
                                    } group flex rounded-md items-center w-full px-2 py-2 text-sm focus:outline-none`}>
                                    <UserCircleIcon className="w-5 h-5 mr-2" aria-hidden="true" />
                                    Profile
                                  </button>
                                )}
                              </Menu.Item>
                              <Menu.Item>
                                {({ active }) => (
                                  <button
                                    onClick={() => logout(props)}
                                    className={`${
                                      active ? "bg-violet-500 text-primary" : "text-gray-900"
                                    } group flex rounded-md items-center w-full px-2 py-2 text-sm focus:outline-none`}>
                                    <LogoutIcon className="w-5 h-5 mr-2" aria-hidden="true" />
                                    Logout
                                  </button>
                                )}
                              </Menu.Item>
                            </div>
                          </Menu.Items>
                        </Transition>
                      </>
                    )}
                  </Menu>
                </div>
                <div className="md:hidden">
                  <Popover.Button
                    className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 
                hover:text-gray-500 hover:bg-gray-100 focus:outline-none transition ">
                    <span className="sr-only">Open menu</span>
                    <MenuIcon className="h-6 w-6" aria-hidden="true" />
                  </Popover.Button>
                </div>
              </div>
            </div>
          </div>

          <Transition
            show={open}
            as={Fragment}
            enter="duration-200 ease-out"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="duration-100 ease-in"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95">
            <Popover.Panel
              focus
              static
              className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden">
              <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-100">
                <div className="pt-5 pb-6 px-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-gray-500 font-bold">Laporan Pengaduan Masyarakat</span>
                    </div>
                    <div className="-mr-2">
                      <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-white hover:bg-primary focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary transition">
                        <XIcon className="h-6 w-6" aria-hidden="true" />
                      </Popover.Button>
                    </div>
                  </div>
                  <div className="mt-6">
                    <nav className="grid gap-y-8">
                      {menu.map((item) => (
                        <div
                          key={item.name}
                          onClick={() =>
                            item.name === "Tentang Kami"
                              ? props.history.push("/about-us")
                              : item.name === "Laporan Saya"
                              ? props.history.push(`/profile/${props.userdata.username}`)
                              : props.history.push("/about-us")
                          }
                          className="-m-3 p-3 cursor-pointer flex items-center rounded-md hover:bg-gray-100">
                          <item.icon className="flex-shrink-0 h-6 w-6 text-primary" aria-hidden="true" />
                          <span className="ml-3 text-base font-medium text-gray-900">{item.name}</span>
                        </div>
                      ))}
                    </nav>
                  </div>
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
};

export default HeaderUser;
