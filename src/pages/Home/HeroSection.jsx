import React from "react";
import heroImg from "../../assets/heroImage.png";

const HeroSection = () => {
  return (
    <div className="">
      {" "}
      {/* Set parent background */}
      <div className="hero bg-white dark:bg-gray-800">
        <div className="hero-content container flex-col lg:flex-row-reverse justify-between">
          <div className="flex sm:justify-start lg:justify-center items-center">
            <img
              src={heroImg}
              className="hidden md:block md:w-full md:max-w-sm rounded-lg shadow-2xl bg-secondary dark:bg-white/60"
              alt="Hero"
            />
          </div>
          <div className="lg:w-1/2">
            <h1 className="text-5xl font-bold text-secondary dark:text-white">
              Get Work Done, Earn More The Future of Microtasks is Here!
            </h1>
            <p className="py-6 text-gray-700 font-semibold dark:text-gray-300">
              Welcome to MicTask, the ultimate platform where businesses and
              freelancers connect seamlessly! Whether you’re looking to hire
              skilled workers or earn by completing tasks, we’ve got you
              covered.
            </p>
            <button className="btn bg-secondary  text-white border-none btn-primary">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
