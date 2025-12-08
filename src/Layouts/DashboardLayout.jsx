import React from "react";
import { Link, Outlet } from "react-router";
import logo from "../assets/life's_lessons_logo.png";
import { GoSidebarCollapse } from "react-icons/go";
import { IoHomeOutline } from "react-icons/io5";
import { LuSettings2 } from "react-icons/lu";
import { RiHeartAddFill, RiStickyNoteAddLine } from "react-icons/ri";
import { SiReaddotcv } from "react-icons/si";

const DashboardLayout = () => {
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Navbar */}
        <nav className="navbar w-full bg-base-white shadow-sm">
          <label
            htmlFor="my-drawer-4"
            aria-label="open sidebar"
            className="btn btn-square bg-gray-100 border-0 shadow"
          >
            {/* Sidebar toggle icon */}
            <GoSidebarCollapse size={30} />
          </label>
          <div className="px-4">
            <p className="text-secondary text-[18px] md:text-[22px] font-extrabold">
              Life's <span className="text-primary">Lessons </span> Dashboard
            </p>
          </div>
        </nav>
        {/* Page content here */}
        <Outlet />
      </div>

      <div className="drawer-side is-drawer-close:overflow-visible">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="flex min-h-full flex-col items-start bg-base-300 is-drawer-close:w-14 is-drawer-open:w-64">
          {/* Sidebar content here */}
          <ul className="menu w-full grow space-y-2">
            {/* List item */}
            {/* Dashboard drawer menu bar logo */}
            <li>
              <Link to="/">
                <img src={logo} alt="" className="w-10" />
              </Link>
            </li>
            {/* Dashboard Home */}
            <li>
              <Link
                to="/dashboard"
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Home Page"
              >
                {/* Home icon */}
                <IoHomeOutline size={18} />
                <span className="is-drawer-close:hidden">Home Page</span>
              </Link>
            </li>

            {/* Add Lesson  */}
            <li>
              <Link
                to="/dashboard/add-lesson"
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Add Lesson"
              >
                {/* Add Lesson icon */}
                <RiStickyNoteAddLine size={18} />

                <span className="is-drawer-close:hidden">Add Lesson</span>
              </Link>
            </li>

            {/* My Lesson  */}
            <li>
              <Link
                to="/dashboard/my-lessons"
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="My Lessons"
              >
                {/* My Lesson icon */}
                <SiReaddotcv size={18} />

                <span className="is-drawer-close:hidden">My Lessons</span>
              </Link>
            </li>

            {/* My Favorites  */}
            <li>
              <Link
                to="/dashboard/my-favorites"
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="My Favorites"
              >
                {/* My Lesson icon */}
                <RiHeartAddFill size={18} />

                <span className="is-drawer-close:hidden">My Favorites</span>
              </Link>
            </li>

            {/* Settings */}
            <li>
              <button
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Settings"
              >
                {/* Settings icon */}
                <LuSettings2 size={18} />

                <span className="is-drawer-close:hidden">Settings</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
