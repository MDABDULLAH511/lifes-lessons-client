import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { FiRefreshCcw } from "react-icons/fi";
import { FaTrashCan } from "react-icons/fa6";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { Link } from "react-router";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [roleFilter, setRoleFilter] = useState("");

  // Load Users data
  const { refetch, data: users = [] } = useQuery({
    queryKey: ["users", roleFilter],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/users", {
        params: {
          role: roleFilter,
        },
      });
      return res.data;
    },
  });

  // Handle change user role
  const handleToggleRole = (email, currentRole) => {
    const newRole = currentRole === "admin" ? "user" : "admin";

    Swal.fire({
      title: "Are you sure?",
      text:
        newRole === "admin"
          ? "This user will gain admin access!"
          : "This admin will be downgraded to user!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, continue",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.patch("/admin/users/role", {
          email,
          role: newRole,
        });

        if (res.data.modifiedCount) {
          Swal.fire("Updated!", `Role changed to ${newRole}`, "success");
          refetch();
        }
      }
    });
  };

  // Delete user
  const handleDeleteUser = (email) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This will delete the user permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.delete(`/admin/users/${email}`);

        if (res.data.userDeleted) {
          toast.success("User deleted successfully!");
          refetch();
        }
      }
    });
  };

  // Reset filters
  const handleResetFilters = () => {
    setRoleFilter("");
  };

  return (
    <div className="bg-accent/5 m-2 md:m-15 p-2 md:p-10 rounded-xl">
      {/* Page Title */}
      <div className="text-center mb-10 lg:w-8/12 mx-auto">
        <h2 className="font-bold text-xl md:text-4xl">Manage Users</h2>
        <p className="font-semibold my-3">
          View all registered users, promote them to admin, or delete accounts
          if needed.
        </p>
        <h4 className="text-xl font-semibold">
          Total Users:{" "}
          <span className="numberFont font-bold text-white mx-2 h-5 w-5 bg-primary px-2 rounded-sm">
            {users.length}
          </span>
        </h4>
      </div>

      {/* Filters */}
      <div className="flex gap-4 max-w-2xl mb-10">
        <select
          className="select w-full"
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
        >
          <option value="">All Roles</option>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>

        {roleFilter && (
          <button
            onClick={handleResetFilters}
            className="flex items-center gap-2 cursor-pointer px-5 py-2 rounded-md border text-sm font-medium transition-all duration-200 bg-[#eef5f3] border-[#d9e7e3] hover:bg-[#e7f0ff] hover:border-[#4582f3] hover:text-[#4582f3]"
          >
            <FiRefreshCcw size={14} />
            Reset
          </button>
        )}
      </div>

      {/* Users Table */}
      <div className="overflow-x-auto">
        <table className="table table-zebra my-custom-zebra">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Total Lessons</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((userItem, i) => (
              <tr key={i}>
                <th>{i + 1}</th>

                <td>
                  <Link
                    to={`/profile/${userItem.email}`}
                    className="hover:underline"
                  >
                    {userItem.displayName || "Unknown"}
                  </Link>
                </td>

                <td>{userItem.email}</td>
                <td className="capitalize">{userItem.role}</td>
                <td className="numberFont">{userItem.totalLessons || 0}</td>
                <td className="flex gap-3">
                  {/*Change Admin tole*/}
                  <button
                    onClick={() =>
                      handleToggleRole(userItem.email, userItem.role)
                    }
                    className={`py-1 px-3 tooltip text-white rounded-sm cursor-pointer ${
                      userItem.role === "admin"
                        ? "bg-[#e60007]"
                        : "bg-[#02a952]"
                    }`}
                    data-tip={
                      userItem.role === "admin"
                        ? "Demote to User"
                        : "Promote to Admin"
                    }
                  >
                    {userItem.role === "admin" ? "Demote" : "Promote"}
                  </button>

                  {/* Delete */}
                  <button
                    onClick={() => handleDeleteUser(userItem.email)}
                    className="tooltip cursor-pointer"
                    data-tip="Delete User"
                  >
                    <FaTrashCan />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
