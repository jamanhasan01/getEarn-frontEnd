import useSubmission from "../../../hooks/useSubmission";

const WokerHome = () => {
  let [submission_data] = useSubmission();
  // Count pending submissions
  let pending_count = submission_data?.reduce((acc, item) => {
    return item.status == "pending" ? acc + 1 : acc;
  }, 0);

  let earn_count = submission_data?.reduce((acc, item) => {
    return item.status == "approved" ? acc + item.payable_amount : acc;
  }, 0);

  let approve_data=submission_data?.filter((item)=>item.status=='approved')
  console.log(approve_data);
  

  return (
    <seciton>
      <div className=" grid sm:grid-cols-2 md:grid-cols-3 gap-5">
        <div className=" border rounded-xl p-3">
          <h3 className="text-center text-2xl font-semibold">
            Total Submmitions
          </h3>
          <h2 className="text-center font-bold text-5xl">
            {submission_data?.length}
          </h2>
        </div>
        {/* -------- */}
        <div className=" border rounded-xl p-3 border-[#fb923c]">
          <h3 className="text-center text-2xl font-semibold text-[#fb923c]">
            Total Pending
          </h3>
          <h2 className="text-center font-bold text-5xl text-[#fb923c]">
            {" "}
            {pending_count}
          </h2>
        </div>
        {/* ------- */}
        <div className=" border rounded-xl p-3 border-[#4ade80]">
          <h3 className="text-center text-2xl font-semibold text-[#4ade80]">
            Total Earning
          </h3>
          <h2 className="text-center font-bold text-5xl text-[#4ade80]">
            {" "}
            {earn_count}
          </h2>
        </div>
      </div>

      {/* table data for show all approve data */}
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th className="text-center">Title</th>
              <th className="text-center">Buyer_Name</th>
              <th className="text-center">payable_amount</th>

              <th className="text-center">Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}

            {approve_data?.map((submission) => (
              <tr key={submission._id}>
                <td className="flex justify-center">
                  <div className="flex items-center gap-3 ">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src={submission?.taskImage}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold ">{submission.task_title}</div>
                    </div>
                  </div>
                </td>
                <td className="text-center">{submission.buyer_name}</td>
                <td className="text-center">
                  <span className=" text-lg font-bold ">
                    {submission.payable_amount}
                  </span>
                </td>

                <th className="text-center">
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
    </seciton>
  );
};

export default WokerHome;
