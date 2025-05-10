import React from "react";
import heroImg from "../../assets/heroImage.png";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <div className="">
      {/* Gradient background applied here */}
      <div 
        className="hero pt-10"
        style={{
     
          background: "linear-gradient(177deg, rgba(249, 115, 22, 1) 54%, rgba(255, 212, 184, 1) 100%)"
        }}
      >
        <div className="hero-content container flex-col lg:flex-row-reverse justify-between">
          <div className="flex sm:justify-start lg:justify-center items-center">
            <img
              src={heroImg}
              className="hidden md:block md:w-full md:max-w-sm rounded-badge bg-transparent"
              alt="Hero"
            />
          </div>
          <div className="lg:w-1/2">
            <h1 className="text-5xl font-bold text-white leading-tight">
              Watch, Enjoy, and Earn Your Path to Earning Coins with Every
              Video!
            </h1>
            <p className="py-6 text-white/95 font-semibold">
              Welcome to GetEarn, the ultimate platform where you can watch
              exciting videos and get rewarded with coins! Every video you watch
              brings you closer to earning more, with endless opportunities to
              boost your earnings. Start watching today and turn your time into
              rewards!
            </p>
            <Link to={"/dashboard"}>
              <button className="btn bg-white text-[#F97316] hover:bg-black hover:text-white border-none btn-primary">
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