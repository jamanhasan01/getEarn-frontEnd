import { useEffect } from "react";

const ViewSubmission = ({ showModel, setshowModel, submissionDetails, setsubmissionDetails }) => {
  const {
    buyer_email,
    completion_date,
    payable_amount,
    required_workers,
    status,
    submissionImage,
    submissionTime,
    taskId,
    taskImage,
    task_details,
    task_title,
    worker_email,
    worker_name,
    worker_photo
  } = submissionDetails;

  useEffect(() => {
    document.body.style.overflow = showModel ? "hidden" : "auto";
  }, [showModel]);

  const handleModelClose = () => {
    setsubmissionDetails({});
    setshowModel(false);
  };

  return (
    <div>
      {showModel && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm">
          <div className="fixed left-1/2 top-1/2 w-11/12 max-w-4xl -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-6 shadow-xl">
            <div className="flex justify-between border-b pb-3">
              <h2 className="text-2xl font-bold text-gray-800">{task_title}</h2>
              <button 
                onClick={handleModelClose}
                className="text-2xl text-gray-500 hover:text-gray-700"
              >
                &times;
              </button>
            </div>

            <div className="mt-4 space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <img 
                    src={submissionImage} 
                    alt="Submission" 
                    className="h-64 w-full rounded-lg object-cover"
                  />
                  <div className="rounded-lg bg-gray-50 p-4">
                    <h3 className="mb-2 text-lg font-semibold">Task Details</h3>
                    <p className="text-gray-600">{task_details}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <img 
                      src={worker_photo} 
                      alt={worker_name}
                      className="h-12 w-12 rounded-full object-cover"
                    />
                    <div>
                      <h4 className="font-semibold">{worker_name}</h4>
                      <p className="text-sm text-gray-500">{worker_email}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <InfoBox title="Status" value={status} statusColor />
                    <InfoBox title="Payment Amount" value={`$${payable_amount}`} />
                    <InfoBox title="Completion Date" value={new Date(completion_date).toLocaleDateString()} />
                    <InfoBox title="Required Workers" value={required_workers} />
                    <InfoBox title="Buyer Email" value={buyer_email} />
                    <InfoBox title="Submission Time" value={new Date(submissionTime).toLocaleString()} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Helper component for information boxes
const InfoBox = ({ title, value, statusColor }) => {
  const statusColors = {
    pending: "bg-yellow-100 text-yellow-800",
    completed: "bg-green-100 text-green-800",
    rejected: "bg-red-100 text-red-800",
  };

  return (
    <div className="rounded-lg bg-gray-50 p-3">
      <p className="text-sm font-medium text-gray-500">{title}</p>
      <p className={`mt-1 text-sm ${statusColor ? statusColors[value.toLowerCase()] : "text-gray-800"}`}>
        {value}
      </p>
    </div>
  );
};

export default ViewSubmission;