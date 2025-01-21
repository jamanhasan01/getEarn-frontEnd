import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { useQuery } from "@tanstack/react-query";
import LoadingPage from "../../../shared/LoadingPage";
import { MdDeleteForever } from "react-icons/md";
import { RxUpdate } from "react-icons/rx";
import Swal from "sweetalert2";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
      let res = await axiosPrivate("/users");
      return res.data;
    },
  });

  // this is for delete user
  let handleDeleteUser = async (id) => {
    console.log(id);

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
      console.log(error.message);
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

        navigate("/dashboard/manageusers");
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) {
    return <LoadingPage></LoadingPage>;
  }

  return (
    <section>
      <div className="p-10">
        <h1> ManageUsers ({users.length})</h1>

        <div>
          <div className="overflow-x-auto">
            <table className="table table-zebra text-center">
              {/* head */}
              <thead>
                <tr>
                  <th></th>
                  <th>photo</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Coin</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}
                {users.map((user, idx) => (
                  <tr key={user._id}>
                    <th>{idx + 1}</th>
                    <td className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img src={user.photo} />
                      </div>
                    </td>

                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td>{user.coins}</td>
                    <td className="text-2xl space-x-2">
                      <button onClick={() => handleDeleteUser(user._id)}>
                        <MdDeleteForever />
                      </button>
                      <button onClick={() => handleShowModal(user._id)}>
                        <RxUpdate />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* // =========================Modal============================= */}
      <div>
        <dialog id="my_modal_3" className="modal">
          <div className="modal-box">
            <form
              method="dialog"
              className=" text-right text-2xl mb-3"
              action=""
            >
              <div>
                <button>X</button>
                <h1 className="text-2xl text-center mb-4">Update User Role</h1>
              </div>
            </form>
            <form onSubmit={handleUpdateRole}>
              <select
                className=" input input-bordered w-full my-2"
                defaultValue={users.role}
                name="role"
              >
                <option value="admin">Admin</option>
                <option value="buyer">Buyer</option>
                <option value="worker">Worker</option>
              </select>
              <button className=" w-full button bg-[#7480ff]">Submit</button>
            </form>
          </div>
        </dialog>
      </div>
      ;
    </section>
  );
};

export default ManageUsers;
