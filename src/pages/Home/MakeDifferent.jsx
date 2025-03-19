import React from "react";
import Title from "../../components/Title";
import made_differrent from '../../assets/make_different.jpg'

const MakeDifferent = () => {
  return (
    <section className=" bg-zinc-100 dark:bg-black">
      <div className="container">
        <Title
          title={"What Makes Us Different"}
          subtitle={
            "Watch videos, earn coins instantly, and enjoy a seamless, rewarding experience. With low payout thresholds, exclusive rewards, and a user-friendly platform, we make earning as easy as pressing play. Start watching, start earning!"
          }
        ></Title>
        <div className=" grid  md:grid-cols-2 gap-5 items-center">
          <div>
            <img className="rounded-2xl w-full  border-2  border-secondary border-dashed p-2" src={made_differrent} alt="" />
          </div>
          <div>
            <ul className="flex flex-col gap-6">
              <li>
                🚀 <strong>Instant Payouts:</strong> Get paid instantly—no
                waiting, no delays.
              </li>
              <li>
                🌍 <strong>Global Opportunities:</strong> Earn from anywhere in
                the world.
              </li>
              <li>
                🎮 <strong>Gamified Experience:</strong> Level up, earn badges,
                and climb the leaderboard.
              </li>
              <li>
                💎 <strong>Exclusive Rewards:</strong> Access special tasks and
                bonuses.
              </li>
              <li>
                🤝 <strong>Transparent & Fair:</strong> No hidden fees, just
                honest earning.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MakeDifferent;
