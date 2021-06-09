import React, { Fragment, useState } from "react";
import Footer from "../public/Footer";
import { Disclosure, Transition, Menu } from "@headlessui/react";
import {
  ChevronRightIcon,
  ClipboardListIcon,
  InformationCircleIcon,
  MenuIcon,
  LogoutIcon,
  UserGroupIcon,
} from "@heroicons/react/outline";
import ListUser from "./ListUser";
import AddUser from "./AddUser";
import DashboardOfficer from "./DashboardOfficer";
import AllComplaints from "./AllComplaint";
import ProcessComplaint from "./ProcessComplaint";
import DoneComplaint from "./DoneComplaint";

const logout = (props) => {
  const appState = {
    isLoggedIn: false,
    user: {},
  };
  localStorage.setItem("appState", JSON.stringify(appState));
  props.history.push("/");
};

const Officer = (props) => {
  const [barTitle, setBarTitle] = useState("dashboard");

  return (
    <Fragment>
      <div className="min-h-screen relative flex">
        <div className="flex flex-col w-80 bg-white border-r pb-12 border-gray-200 ">
          <div className="p-4">
            <h5 className="text-primary text-xl">Laporan Pengaduan Masyarakat</h5>
          </div>
          <div className="flex flex-col items-start space-y-2 text-sm pt-8 ">
            <button
              onClick={() => setBarTitle("dashboard")}
              className={`flex w-full outline-none focus:outline-none items-center justify-between py-2 px-4 border-l-2 hover:border-primary hover:text-primary 
                ${barTitle === "dashboard" ? "border-primary" : ""}`}>
              <div className={`flex space-x-4 ${barTitle === "dashboard" ? "text-primary" : ""}`}>
                <MenuIcon className="h-6 w-6" />
                <span>Dashboard</span>
              </div>
            </button>
            <Disclosure>
              {({ open }) => (
                <>
                  <Disclosure.Button className="flex w-full outline-none focus:outline-none items-center justify-between py-2 px-4 border-l-2 hover:border-primary hover:text-primary">
                    <div className="flex space-x-4">
                      <UserGroupIcon className="h-6 w-6" />
                      <span>User</span>
                    </div>
                    <ChevronRightIcon className={`${open ? "transform rotate-90 h-4 w-4" : "h-4 w-4"}`} />
                  </Disclosure.Button>
                  <Transition
                    show={open}
                    enter="transition duration-100 ease-out"
                    enterFrom="transform scale-95 opacity-0"
                    enterTo="transform scale-100 opacity-100"
                    leave="transition duration-75 ease-out"
                    leaveFrom="transform scale-100 opacity-100"
                    leaveTo="transform scale-95 opacity-0">
                    <Disclosure.Panel static className="px-14">
                      <button
                        onClick={() => setBarTitle("list-user")}
                        className="py-3 outline-none focus:outline-none hover:text-primary">
                        List User
                      </button>
                      <button
                        onClick={() => setBarTitle("tambah-user")}
                        className="py-3 outline-none focus:outline-none hover:text-primary">
                        Tambah User
                      </button>
                    </Disclosure.Panel>
                  </Transition>
                </>
              )}
            </Disclosure>
            <Disclosure>
              {({ open }) => (
                <>
                  <Disclosure.Button className="flex w-full outline-none focus:outline-none items-center justify-between py-2 px-4 border-l-2 hover:border-primary hover:text-primary">
                    <div className="flex space-x-4">
                      <ClipboardListIcon className="h-6 w-6" />
                      <span>Laporan</span>
                    </div>
                    <ChevronRightIcon className={`${open ? "transform rotate-90 h-4 w-4" : "h-4 w-4"}`} />
                  </Disclosure.Button>
                  <Transition
                    show={open}
                    enter="transition duration-100 ease-out"
                    enterFrom="transform scale-95 opacity-0"
                    enterTo="transform scale-100 opacity-100"
                    leave="transition duration-75 ease-out"
                    leaveFrom="transform scale-100 opacity-100"
                    leaveTo="transform scale-95 opacity-0">
                    <Disclosure.Panel static className="px-14">
                      <button
                        onClick={() => setBarTitle("laporan-semua")}
                        className="py-3 outline-none focus:outline-none hover:text-primary">
                        Laporan Semua
                      </button>
                      <button
                        onClick={() => setBarTitle("laporan-proses")}
                        className="py-3 outline-none focus:outline-none hover:text-primary">
                        Laporan Proses
                      </button>
                      <button
                        onClick={() => setBarTitle("laporan-selesai")}
                        className="py-3 outline-none focus:outline-none hover:text-primary">
                        Laporan Selesai
                      </button>
                    </Disclosure.Panel>
                  </Transition>
                </>
              )}
            </Disclosure>
            <button className="flex w-full outline-none focus:outline-none items-center justify-between py-2 px-4 border-l-2 hover:border-primary hover:text-primary">
              <div className="flex space-x-4">
                <InformationCircleIcon className="h-6 w-6" />
                <span>Panduan</span>
              </div>
            </button>
          </div>
        </div>
        <div className="flex-col flex bg-gray-50 w-full">
          <div className="flex justify-end bg-white w-full border-b border-gray-100 py-4 px-8 ">
            <Menu as="div">
              {({ open }) => (
                <>
                  <Menu.Button className="outline-none focus:outline-none bg-primary h-8 w-8 rounded-full p-4"></Menu.Button>
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
                        {/* <Menu.Item>
                          {({ active }) => (
                            <button
                              className={`${
                                active ? "bg-violet-500 text-primary" : "text-gray-900"
                              } group flex rounded-md items-center w-full px-2 py-2 text-sm`}>
                              <UserCircleIcon className="w-5 h-5 mr-2" aria-hidden="true" />
                              Profile
                            </button>
                          )}
                        </Menu.Item> */}
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={() => logout(props)}
                              className={`${
                                active ? "bg-violet-500 text-primary" : "text-gray-900"
                              } group flex rounded-md items-center w-full px-2 py-2 text-sm`}>
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
          <div className="p-8 pb-20">
            {barTitle === "dashboard" ? (
              <DashboardOfficer {...props} />
            ) : barTitle === "list-user" ? (
              <ListUser {...props} />
            ) : barTitle === "tambah-user" ? (
              <AddUser {...props} />
            ) : barTitle === "laporan-semua" ? (
              <AllComplaints {...props} />
            ) : barTitle === "laporan-proses" ? (
              <ProcessComplaint {...props} />
            ) : barTitle === "laporan-selesai" ? (
              <DoneComplaint {...props} />
            ) : null}
          </div>
        </div>
      </div>
      <Footer />
    </Fragment>
  );
};

export default Officer;
