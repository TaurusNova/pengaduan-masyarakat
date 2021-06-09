import { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import { InformationCircleIcon, MenuIcon, PhoneIcon, XIcon } from "@heroicons/react/outline";
import Logo from "../../assets/img/Logo.png";

const menu = [
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

export default function Header(props) {
  let isInHome = window.location.href === "http://localhost:3000/" ? true : false;

  return (
    <Popover className="relative z-50">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 font-sans">
            <div className="flex justify-between items-center py-4 md:justify-start md:space-x-10">
              <div className="flex  justify-start items-center lg:w-0 lg:flex-1">
                <div>
                  <img onClick={() => props.history.push("/")} className="cursor-pointer h-8" alt="Logo" src={Logo} />
                </div>
                <div className="hidden md:flex h-full items-center text-sm ml-4">
                  <div
                    onClick={() => props.history.push("/about-us")}
                    className="cursor-pointer font-medium my-auto text-gray-500 hover:text-gray-900">
                    TENTANG KAMI
                  </div>
                  <div
                    onClick={() => props.history.push("/contact-us")}
                    className="cursor-pointer font-medium my-auto ml-2 text-gray-500 hover:text-gray-900">
                    KONTAK KAMI
                  </div>
                </div>
              </div>
              <div className="-mr-2 -my-2 md:hidden">
                <Popover.Button
                  className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 
                hover:text-gray-500 hover:bg-gray-100 focus:outline-none transition ">
                  <span className="sr-only">Open menu</span>
                  <MenuIcon className="h-6 w-6" aria-hidden="true" />
                </Popover.Button>
              </div>
              <div className="hidden md:flex space-x-8 items-center justify-end md:flex-1 lg:w-0">
                <div
                  onClick={() => props.history.push("/login")}
                  className={`${
                    isInHome ? "lg:text-white" : ""
                  }  cursor-pointer whitespace-nowrap text-sm font-medium text-gray-500 hover:text-gray-900`}>
                  MASUK
                </div>
                <div
                  onClick={() => props.history.push("/register")}
                  className={`${
                    isInHome ? "lg:text-primary lg:bg-white lg:hover:scale-110" : ""
                  }  cursor-pointer whitespace-nowrap inline-flex items-center justify-center px-4 py-2 rounded-sm shadow-sm text-sm font-medium text-white bg-primary transform transition`}>
                  DAFTAR
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
                      <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-white hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-red-500 transition">
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
                              : props.history.push("/contact-us")
                          }
                          className="-m-3 p-3 cursor-pointer flex items-center rounded-md hover:bg-gray-100">
                          <item.icon className="flex-shrink-0 h-6 w-6 text-primary" aria-hidden="true" />
                          <span className="ml-3 text-base font-medium text-gray-900">{item.name}</span>
                        </div>
                      ))}
                    </nav>
                  </div>
                </div>
                <div className="py-6 px-5 space-y-6">
                  <div
                    onClick={() => props.history.push("/register")}
                    className="cursor-pointer w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-red-500 hover:bg-red-600 transition">
                    Daftar
                  </div>
                  <p className="mt-6 text-center text-base font-medium text-gray-500">
                    Sudah memiliki akun?{" "}
                    <span
                      onClick={() => props.history.push("/login")}
                      className="cursor-pointer text-red-400 hover:text-red-600 transition">
                      Masuk
                    </span>
                  </p>
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
}
