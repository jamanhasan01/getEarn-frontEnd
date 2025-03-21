import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { useQuery } from "@tanstack/react-query";
import LoadingPage from "../../../shared/LoadingPage";
import { MdDeleteForever } from "react-icons/md";
import { RxUpdate } from "react-icons/rx";
import Swal from "sweetalert2";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import default_avatar from "../../../assets/default_avatar.jpg";
import useCoins from "../../../hooks/useCoins";
import { toast } from "react-toastify";

const ManageUsers = () => {
  let axiosPrivate = useAxiosPrivate();
  const [userId, setuserId] = useState(null);
  let navigate = useNavigate();

  // this funtion for user data fetch
  let {
    data: users = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      let res = await axiosPrivate("/users", {
        headers: {
          authorization: `bearar ${localStorage.getItem("access-token")}`,
        },
      });
      return res.data;
    },
  });

  // this is for delete user
  let handleDeleteUser = async (id) => {

    try {
      let { data } = await axiosPrivate.delete(`/users/${id}`);
      if (data.deletedCount > 0) {
        refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `data have been deleted`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
     toast.error(error.message);
    }
  };

  // this function for show modal only
  let handleShowModal = (id) => {
    setuserId(id);
    document.getElementById("my_modal_3").showModal();
  };

  // this funtion for update user role
  let handleUpdateRole = async (e) => {
    e.preventDefault();
    let updateRole = e.target.role.value;
    try {
      let { data } = await axiosPrivate.patch(`/users/admin/${userId}`, {
        updateRole,
      });

      if (data.modifiedCount > 0) {
        refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Update role successfully",
          showConfirmButton: false,
          timer: 1500,
        });

        navigate("/dashboard/admin/manageusers");
      }
    } catch (error) {
     toast.error(error);
    }
  };

  if (isLoading) {
    return <LoadingPage></LoadingPage>;
  }

  return (
    <section className="p-6">
      <h1 className="text-2xl font-bold text-center mb-6">
        Manage Users ({users.length})
      </h1>

      {/* Mobile View - Cards */}
      <div className="block md:hidden space-y-4">
        {users.map((user, idx) => (
          <div key={user._id} className="p-4 bg-gray-700 rounded-lg shadow-lg">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16">
                <img
                  className="w-10 h-10 bg-cover rounded-badge border-2 border-gray-500"
                  src={user?.photo || default_avatar} // Default image if no URL is provided
                  alt="User Avatar"
                  onError={(e) => {
                    e.target.onerror = null; // Prevent infinite loop
                    e.target.src = default_avatar; // Replace with your default image URL
                  }}
                />
              </div>
              <div>
                <h2 className="text-lg font-bold">{user?.name}</h2>
                <p className="text-sm text-gray-300">{user?.email}</p>
                <p className="text-sm text-gray-400">Role: {user?.role}</p>
                <p className="text-sm text-gray-400">Coins: {user?.coins}</p>
              </div>
            </div>
            <div className="mt-3 flex justify-between items-center">
              <span className="text-sm">User #{idx + 1}</span>
              <div className="text-2xl space-x-3">
                <button
                  onClick={() => handleDeleteUser(user._id)}
                  className="text-red-500 hover:text-red-700 transition duration-200"
                >
                  <MdDeleteForever />
                </button>
                <button
                  onClick={() => handleShowModal(user._id)}
                  className="text-blue-400 hover:text-blue-600 transition duration-200"
                >
                  <RxUpdate />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop View - Table */}
      <div className="hidden md:block overflow-x-auto overflow-y-auto">
        <table className="table-auto w-full text-center text-white border-collapse">
          <thead>
            <tr className="bg-gray-800 text-sm md:text-base">
              <th className="p-2">No</th>
              <th className="p-2">Photo</th>
              <th className="p-2">Name</th>
              <th className="p-2">Email</th>
              <th className="p-2">Role</th>
              <th className="p-2">Coins</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, idx) => (
              <tr
                key={user._id}
                className="hover:bg-gray-700 text-sm md:text-base"
              >
                <td className="p-2">{idx + 1}</td>
                <td className="p-2">
                  <div className="mask mask-squircle h-12 w-12">
                    <img
                      className="w-10 h-10 bg-cover rounded-badge border-2 border-gray-500"
                      src={user?.photo || default_avatar} // Default image if no URL is provided
                      alt="User Avatar"
                      onError={(e) => {
                        e.target.onerror = null; // Prevent infinite loop
                        e.target.src = default_avatar; // Replace with your default image URL
                      }}
                    />
                  </div>
                </td>
                <td className="p-2">{user?.name}</td>
                <td className="p-2">{user?.email}</td>
                <td className="p-2">{user?.role}</td>
                <td className="p-2">{user?.coins}</td>
                <td className="p-2 text-xl flex items-center gap-2 justify-center">
                  <button
                    onClick={() => handleDeleteUser(user._id)}
                    className="text-red-500 hover:text-red-700 transition duration-200"
                  >
                    <MdDeleteForever />
                  </button>
                  <button
                    onClick={() => handleShowModal(user._id)}
                    className="text-blue-400 hover:text-blue-600 transition duration-200"
                  >
                    <RxUpdate />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for Updating User Role */}
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form method="dialog" className="text-right text-2xl mb-3">
            <button>X</button>
            <h1 className="text-2xl text-center mb-4">Update User Role</h1>
          </form>
          <form onSubmit={handleUpdateRole}>
            <select
              className="input input-bordered w-full my-2"
              defaultValue={users.role}
              name="role"
            >
              <option value="admin">Admin</option>
              <option value="buyer">Buyer</option>
              <option value="worker">Worker</option>
            </select>
            <button className="w-full button bg-[#7480ff]">Submit</button>
          </form>
        </div>
      </dialog>
    </section>
  );
};

export default ManageUsers;
