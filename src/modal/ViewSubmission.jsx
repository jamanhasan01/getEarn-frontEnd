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


console.log(buyer_email);

  const handleModelClose = () => {
    setsubmissionDetails({});
    setshowModel(false);
  };
  useEffect(() => {
    document.body.style.overflow = showModel ? "hidden" : "";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showModel]);
  return (
    <div>
      {showModel && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm px-4">
          {/* Modal Container */}
          <div className="relative w-full max-w-lg rounded-lg bg-white shadow-xl md:max-w-4xl max-h-[90vh] overflow-y-auto">
            
            {/* Close Button */}
            <button 
              onClick={handleModelClose}
              className="absolute right-3 top-3 text-2xl text-gray-500 hover:text-gray-700"
            >
              &times;
            </button>

            {/* Modal Content (Scrollable) */}
            <div className="p-5">
              {/* Title */}
              <h2 className="text-xl font-bold text-gray-800 md:text-2xl text-center mb-4">
                {task_title}
              </h2>

              {/* Content */}
              <div className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  {/* Image Section */}
                  <div className="space-y-2">
                    <img 
                      src={submissionImage} 
                      alt="Submission" 
                      className="h-48 w-full rounded-lg object-cover md:h-64"
                    />
                    <div className="rounded-lg bg-gray-50 p-4">
                      <h3 className="mb-2 text-lg font-semibold">Task Details</h3>
                      <p className="text-gray-600 text-sm">{task_details}</p>
                    </div>
                  </div>

                  {/* Info Section */}
                  <div className="space-y-4">
                    {/* Worker Info */}
                    <div className="flex items-center space-x-4">
                      <img 
                        src={worker_photo} 
                        alt={worker_name}
                        className="h-10 w-10 rounded-full object-cover md:h-12 md:w-12"
                      />
                      <div>
                        <h4 className="font-semibold text-sm md:text-base">{worker_name}</h4>
                        <p className="text-xs text-gray-500 md:text-sm">{worker_email}</p>
                      </div>
                    </div>

                    {/* Info Grid */}
                    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
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
            </div> {/* End of Scrollable Content */}
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
    <div className="rounded-lg bg-gray-50 p-3 text-sm">
      <p className="font-medium text-gray-500">{title}</p>
      <p className={`mt-1 font-semibold ${statusColor ? statusColors[value.toLowerCase()] : "text-gray-800"}`}>
        {value}
      </p>
    </div>
  );
};

export default ViewSubmission;
