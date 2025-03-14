import { useState } from "react";
import useSubmissionWorkerTask from "../../../hooks/useSubmissionWorkerTask";
import LoadingPage from "../../../shared/LoadingPage";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";

const MySubmissions = () => {
  let { user } = useAuth();
  let axiosPrivate = useAxiosPrivate();

  const [itemPerPage, setitemPerPage] = useState(10);
  const [currentPage, setcurrentPage] = useState(1);

  let {
    data: submission_data,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["submission_data", user?.email, currentPage, itemPerPage],
    queryFn: async () => {
      let res = await axiosPrivate.get(
        `/submission_task/worker/${user?.email}?page=${
          currentPage - 1
        }&size=${itemPerPage}`
      );
      return res?.data;
    },
  });

  let submissions = submission_data?.data || [];
  const total_data = submission_data?.totalCount || 0;
  let total_page = Math.ceil(total_data / itemPerPage);

  if (isLoading) {
    return <LoadingPage></LoadingPage>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  let pages = [...Array(total_page).keys()];

  let handleItemPerPage = (e) => {
    let val = parseInt(e.target.value);
    setitemPerPage(val);
    setcurrentPage(1)
  };

  return (
    <div className="min-h-screen bg-gray-800 p-6 rounded-xl shadow-md">
      <h3 className="text-center text-3xl mb-3 font-medium text-gray-400">
        Total Submissions: {total_data}
      </h3>
      <div className="overflow-x-auto">
        <div className="hidden md:block">
          <table className="table">
            <thead>
              <tr>
                <th>No</th>
                <th>Title</th>
                <th>Details</th>
                <th>Payable Amount</th>
                <th>Submit Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {submissions.map((submission, i) => {
                const rowNumber = (currentPage - 1) * itemPerPage + i + 1;
                return (
                  <tr key={submission._id}>
                    <td>{rowNumber}</td>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle h-12 w-12">
                            <img
                              src={submission?.taskImage}
                              alt="Avatar Tailwind CSS Component"
                            />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">
                            {submission.task_title}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>{submission.task_details}</td>
                    <td>
                      <span className="text-lg font-bold">
                        {submission.payable_amount}
                      </span>
                    </td>
                    <td>{submission.submissionTime}</td>
                    <th>
                      <span
                        className={
                          submission.status == "pending"
                            ? "bg-orange-400 rounded-full text-center font-medium text-white px-3 py-1 capitalize"
                            : submission.status == "approved"
                            ? "bg-green-400 font-medium rounded-full text-center text-white px-2 py-1 capitalize"
                            : submission.status == "reject"
                            ? "bg-red-400 rounded-full text-center text-white px-5 font-medium py-1 capitalize"
                            : ""
                        }
                      >
                        {submission.status}
                      </span>
                    </th>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Mobile Card Layout */}
        <div className="block md:hidden">
          {submissions.map((submission, i) => (
            <div
              key={submission._id}
              className="card bg-base-100 shadow-md my-3 p-4 flex flex-col gap-3"
            >
              <div className="flex gap-4 items-center">
                <div className="avatar">
                  <div className="mask mask-squircle h-12 w-12">
                    <img src={submission?.taskImage} alt="Avatar" />
                  </div>
                </div>
                <div>
                  <div className="font-bold">{submission.task_title}</div>
                  <div className="text-sm text-gray-500">
                    {submission.task_details}
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <span className="text-lg font-bold">
                    {submission.payable_amount} coin
                  </span>
                  <div className="text-sm">{submission.submissionTime}</div>
                </div>
                <div className="mt-2 text-sm">
                  <span
                    className={
                      submission.status == "pending"
                        ? "bg-orange-400 rounded-full text-center font-medium text-white px-3 py-1 capitalize"
                        : submission.status == "approved"
                        ? "bg-green-400 font-medium rounded-full text-center text-white px-2 py-1 capitalize"
                        : submission.status == "reject"
                        ? "bg-red-400 rounded-full text-center text-white px-5 font-medium py-1 capitalize"
                        : ""
                    }
                  >
                    {submission.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="py-10 text-center space-x-2">

          <button
            className="py-2 px-4 rounded-xl bg-gray-900"
            onClick={() => setcurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          {pages.map((page, i) => (
            <button
              key={i}
              className={`py-2 px-4 rounded-xl ${
                currentPage === page + 1
                  ? "bg-blue-500 text-white"
                  : "bg-gray-900"
              }`}
              onClick={() => setcurrentPage(page + 1)}
            >
              {page + 1}
            </button>
          ))}

          <button
            className="py-2 px-4 rounded-xl bg-gray-900"
            onClick={() =>
              setcurrentPage((prev) => Math.min(prev + 1, total_page))
            }
            disabled={currentPage === total_page}
          >
            Next
          </button>
          <select
            className="select select-bordered"
            value={itemPerPage}
            onChange={handleItemPerPage}
          >
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default MySubmissions;
