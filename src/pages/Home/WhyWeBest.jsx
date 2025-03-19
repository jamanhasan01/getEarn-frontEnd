import React from "react";
import Title from "../../components/Title";

const WhyWeBest = () => {
  const features = [
    {
      icon: "🎥",
      title: "Endless Video",
      description:
        " There’s always something to watch.",
    },
    {
      icon: "💰",
      title: "Earn Effortlessly",
      description: "Get rewarded for doing what you love—watching videos.",
    },
    {
      icon: "🌐",
      title: "Available Worldwide",
      description: "Join a global community of earners.",
    },
    {
      icon: "🛡️",
      title: "Safe & Secure",
      description: "Your data and earnings are always protected.",
    },
    {
      icon: "🚀",
      title: "Instant Payouts",
      description: "No waiting—get your rewards instantly.",
    },
  ];

  return (
    <section className="bg-white dark:bg-slate-900">
      <div className="container">
        <Title title={'Why We’re Your Best Choice'} subtitle={'Discover the features that make us stand out and start earning today!'}></Title>
        <div className="grid md:grid-cols-3 xl:grid-cols-5 gap-5">
          {features.map(( feature,i) => (
            <div className="border rounded-2xl p-2 text-center space-y-3 dark:bg-slate-950 bg-opacity-80" key={i}>
              <span className="text-6xl">{feature.icon}</span>
              <h3 className="text-2xl">{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyWeBest;
