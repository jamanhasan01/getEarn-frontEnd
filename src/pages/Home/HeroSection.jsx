import React from "react";
import heroImg from "../../assets/heroImage.png";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <div className="">
      {" "}
      {/* Set parent background */}
      <div className="hero bg-secondary dark:bg-gray-800 pt-10">
        <div className="hero-content container flex-col lg:flex-row-reverse justify-between">
          <div className="flex sm:justify-start lg:justify-center items-center">
            <img
              src={heroImg}
              className="hidden md:block md:w-full md:max-w-sm rounded-badge  bg-transparent "
              alt="Hero"
            />
          </div>
          <div className="lg:w-1/2">
            <h1 className="text-5xl font-bold text-white leading-tight dark:text-secondary">
              Watch, Enjoy, and Earn Your Path to Earning Coins with Every
              Video!
            </h1>
            <p className="py-6 text-gray-700 font-semibold dark:text-gray-300">
              Welcome to GetEarn, the ultimate platform where you can watch
              exciting videos and get rewarded with coins! Every video you watch
              brings you closer to earning more, with endless opportunities to
              boost your earnings. Start watching today and turn your time into
              rewards!
            </p>
            <Link to={"/dashboard"}>
              <button className="btn bg-white text-secondary hover:bg-black hover:text-white dark:bg-secondary dark:text-white  border-none btn-primary">
                Get Started
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
