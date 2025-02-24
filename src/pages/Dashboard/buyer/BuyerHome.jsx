import SubmissionTask from "../../../components/SubmissionTask";


const BuyerHome = () => {
  return (
    <section>
      <div>
        <h2 className="text-2xl font-semibold">States</h2>
        <div>----------------------------</div>
      </div>
      <div>
        <h2 className="text-2xl font-semibold">Task To Review</h2>
        <SubmissionTask/>
      </div>
    </section>
  );
};

export default BuyerHome;
