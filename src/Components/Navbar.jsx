import React from "react";
import MyNavLink from "./MyNavLink";
import { Link } from "react-router";
import Container from "./Container";
import userIcon from "../assets/user.png";
import { LuLayoutDashboard, LuUser } from "react-icons/lu";
import { FaPlus } from "react-icons/fa6";
import { MdClose, MdLogout } from "react-icons/md";
import NavbarTop from "./NavbarTop";
import Logo from "./Logo";
import { CgMenuRightAlt } from "react-icons/cg";
import useAuth from "../Hooks/UseAuth";
import { toast } from "react-toastify";
import LoadingSpinner from "./LoadingSpinner";

const Navbar = () => {
  const { user, signOutUser, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }
  const handleSignOut = () => {
    signOutUser().then(() => {
      toast.success("Log out successfully");
    });
  };
  // Nav Links
  const links = (
    <>
      <li>
        <MyNavLink to="/">Home</MyNavLink>
      </li>
      <li>
        <MyNavLink to="add-lesson">Add Lesson</MyNavLink>
      </li>
      <li>
        <MyNavLink to="/public-lessons">Public Lessons</MyNavLink>
      </li>
      <li>
        <MyNavLink to="/upgrade-membership">Upgrade Membership</MyNavLink>
      </li>

      {user && (
        <>
          <li>
            <MyNavLink to="my-lessons">My Lessons</MyNavLink>
          </li>
        </>
      )}
    </>
  );

  return (
    <>
      <div className="shadow-sm md:py-0 bg-white ">
        <NavbarTop />
        <Container>
          <div className="w-full flex items-center justify-between py-2 px-0">
            {/* Nav Logo */}
            <div className=" flex items-center justify-start w-9/12 lg:w-3/12">
              <Logo />
            </div>

            {/* Nav Link for Desktop Device */}
            <div className="hidden lg:flex justify-end items-center gap-5">
              <ul className="menu menu-horizontal px-1 space-x-8">{links}</ul>
              <div>
                {user ? (
                  <div className="dropdown dropdown-end flex flex-col items-center">
                    <img
                      tabIndex={0}
                      src={user.photoURL ? user.photoURL : userIcon}
                      alt=""
                      className={`w-11 h-11 rounded-full bg-primary cursor-pointer ${
                        user.photoURL ? "p-0.5" : "p-2"
                      }`}
                    />
                    <div
                      tabIndex="-1"
                      className="menu dropdown-content bg-base-200 rounded-[5px] border-b-3 border-primary z-1 mt-15 w-60 p-5 shadow-sm text-white space-y-4"
                    >
                      {/* User Image and Name */}
                      <div className="flex gap-3 items-center mb-5">
                        <img
                          src={user.photoURL ? user.photoURL : userIcon}
                          alt=""
                          className="w-11 h-11  rounded-[5px] bg-primary cursor-pointer p-1"
                        />
                        <p className="max-w-[200px] truncate">
                          {user.displayName ? user.displayName : "Unknown"}
                        </p>
                      </div>

                      {/* Link for User */}
                      <div className="space-y-3">
                        <p className="profileItem">
                          <LuUser size={20} /> Profile
                        </p>
                        <p className="profileItem">
                          <LuLayoutDashboard size={18} /> Dashboard
                        </p>
                      </div>
                      {/* Logout Button */}
                      <button
                        onClick={handleSignOut}
                        className="btn bg-primary border-primary text-white hover:bg-transparent duration-300 fJost"
                      >
                        <MdLogout size={20} /> Logout
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="hidden lg:flex gap-4 ">
                    <Link
                      to="/login"
                      className="btn btn-outline text-primary border-primary hover:bg-primary hover:text-white duration-300 shadow-none"
                    >
                      Login
                    </Link>

                    <Link
                      to="/register"
                      className="btn bg-primary border-primary text-white hover:bg-transparent hover:text-primary duration-300 shadow-none"
                    >
                      Register
                    </Link>
                  </div>
                )}
              </div>
            </div>

            {/* Mobile devise Nav bar */}
            <div className="lg:hidden drawer drawer-end w-3/12 flex justify-end">
              <input
                id="my-drawer-5"
                type="checkbox"
                className="drawer-toggle"
              />

              {/* Page Content */}
              <div className="drawer-content">
                <label htmlFor="my-drawer-5" className="drawer-button ">
                  <CgMenuRightAlt size={35} color="#4681f7" />
                </label>
              </div>

              {/* Drawer Sidebar */}
              <div className="drawer-side">
                <label
                  htmlFor="my-drawer-5"
                  aria-label="close sidebar"
                  className="drawer-overlay"
                ></label>

                <ul className="menu bg-white min-h-full w-70 p-4 border-l-5 border-primary relative">
                  {/* Close button */}
                  <label
                    htmlFor="my-drawer-5"
                    className="btn btn-sm btn-circle absolute left-2 top-2"
                  >
                    <MdClose color="#ffffff" size={25} />
                  </label>

                  <div className="mt-12">
                    {/* Push menu items below close button */}
                    <ul className="menu menu-vertical px-1 space-y-5 mb-5">
                      {links}
                    </ul>
                    {/* User Dropdown */}
                    <div>
                      {user ? (
                        <div className="dropdown dropdown-start ">
                          <img
                            tabIndex={0}
                            src={user.photoURL ? user.photoURL : userIcon}
                            alt=""
                            className={`w-11 h-11 rounded-full bg-primary cursor-pointer ${
                              user.photoURL ? "p-0.5" : "p-2"
                            }`}
                          />
                          <div
                            tabIndex="-1"
                            className="menu dropdown-content bg-base-200 rounded-[5px] border-b-3 border-primary z-1 mt-5 w-60 p-5 shadow-sm text-white space-y-4"
                          >
                            {/* User Image and Name */}
                            <div className="flex gap-3 items-center mb-5">
                              <img
                                src={user.photoURL ? user.photoURL : userIcon}
                                alt=""
                                className="w-11 h-11  rounded-[5px] bg-primary cursor-pointer p-1"
                              />
                              <p className="max-w-[200px] truncate">
                                {user.displayName
                                  ? user.displayName
                                  : "Unknown"}
                              </p>
                            </div>

                            {/* Link for User */}
                            <div className="space-y-3">
                              <p className="profileItem">
                                <LuUser size={20} /> Profile
                              </p>
                              <p className="profileItem">
                                <LuLayoutDashboard size={18} /> Dashboard
                              </p>
                            </div>
                            {/* Logout Button */}
                            <button
                              onClick={handleSignOut}
                              className="btn bg-primary border-primary text-white hover:bg-transparent duration-300 fJost"
                            >
                              <MdLogout size={20} /> Logout
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex gap-4 ">
                          <Link
                            to="/login"
                            className="btn btn-outline text-primary border-primary hover:bg-primary hover:text-white duration-300 shadow-none"
                          >
                            Login
                          </Link>

                          <Link
                            to="/register"
                            className="btn bg-primary border-primary text-white hover:bg-transparent hover:text-primary duration-300 shadow-none"
                          >
                            Register
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                </ul>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Navbar;
