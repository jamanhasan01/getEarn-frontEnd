import React from "react";
import Title from "../../components/Title";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

const Testimonial = () => {
  const testimonials = [
    {
      id: 1,
      name: "John D.",
      photo:
        "https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D",
      quote:
        "MicTask has been a game-changer! I can work flexibly and earn coins easily. Payments are always on time!",
    },
    {
      id: 2,
      name: "Sarah K.",
      photo:
        "https://media.istockphoto.com/id/1437816897/photo/business-woman-manager-or-human-resources-portrait-for-career-success-company-we-are-hiring.jpg?b=1&s=612x612&w=0&k=20&c=hEPh7-WEAqHTHdQtPrfEN9-yYCiPGKvD32VZ5lcL6SU=",
      quote:
        "Finding skilled workers has never been easier. The process is smooth, and I always get my tasks done quickly!",
    },
    {
      id: 3,
      name: "Michael R.",
      photo:
        "https://media.istockphoto.com/id/1682296067/photo/happy-studio-portrait-or-professional-man-real-estate-agent-or-asian-businessman-smile-for.jpg?s=612x612&w=0&k=20&c=9zbG2-9fl741fbTWw5fNgcEEe4ll-JegrGlQQ6m54rg=",
      quote:
        "I’ve completed over 100 tasks and climbed the leaderboard! The opportunities to earn are endless.",
    },
    {
      id: 4,
      name: "Emma W.",
      photo:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyW2MAFrFnfa_bT1jSttLbmvfotJcqQyCCGg&s",
      quote:
        "Managing projects has never been easier! The platform connects me with reliable workers every time.",
    },
    {
      id: 5,
      name: "David L.",
      photo:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bWFsZSUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D",
      quote:
        "MicTask is the best platform for freelancers! I love the flexibility and the steady flow of tasks.",
    },
  ];

  return (
    <section className="bg-white dark:bg-gray-900 ">
      <div className="container mx-auto px-4">
        <Title
          title="What Our Users Say"
          subtitle="See what our Top Workers & Buyers have to say about their experience with MicTask!"
        />

        {/* Swiper Slider */}
        <Swiper
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={"auto"}
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
          pagination={true}
          modules={[EffectCoverflow, Pagination]}
          className="mySwiper"
        >
          {testimonials.map((testimonial) => (
            <SwiperSlide
              key={testimonial.id}
              className="p-6  border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-md rounded-xl !w-80"
            >
              <div className="flex flex-col items-center text-center">
                <img
                  src={testimonial.photo}
                  alt={testimonial.name}
                  className="w-36 h-36 rounded-full mb-4 border-2 border-orange-400 dark:border-orange-600"
                />
                <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
                  {testimonial.name}
                </h3>
                <p className="text-gray-600 text-sm font-semibold dark:text-secondary mt-2">
                  {testimonial.quote}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Testimonial;
