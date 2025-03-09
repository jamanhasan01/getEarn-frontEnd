import SubmissionWorkerTask from "../../../components/SubmissionWorkerTask";
import useSubmission from "../../../hooks/useSubmission";
import LoadingPage from "../../../shared/LoadingPage";

const MySubmissions = () => {
  let [submission_data, isLoading] = SubmissionWorkerTask();
  if (isLoading) {
    return <LoadingPage></LoadingPage>;
  }

  return (
    <div className="min-h-screen bg-gray-800 p-6 rounded-xl shadow-md">
      <h3 className="text-center text-3xl mb-3 font-medium text-gray-400">
        Total Submissions
      </h3>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Details</th>
              <th>payable_amount</th>
              <th>Submit Date</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}

            {submission_data?.map((submission, i) => (
              <tr key={submission._id}>
                <td>{i + 1}</td>
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
                      <div className="font-bold">{submission.task_title}</div>
                    </div>
                  </div>
                </td>
                <td>{submission.task_details}</td>
                <td>
                  <span className=" text-lg font-bold">
                    {submission.payable_amount}
                  </span>
                </td>

                <td>{submission.submissionTime}</td>
                <th>
                  <span
                    className={
                      submission.status == "pending"
                        ? "bg-orange-400 rounded-full text-center  font-medium text-white px-3 py-1 capitalize"
                        : submission.status == "approved"
                        ? "bg-green-400  font-medium rounded-full text-center text-white px-2 py-1 capitalize"
                        : submission.status == "reject"
                        ? "bg-red-400 rounded-full text-center text-white px-5 font-medium py-1 capitalize"
                        : ""
                    }
                  >
                    {submission.status}
                  </span>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MySubmissions;
