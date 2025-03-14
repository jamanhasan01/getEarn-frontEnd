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
        "https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D",
      quote:
        "Finding skilled workers has never been easier. The process is smooth, and I always get my tasks done quickly!",
    },
    {
      id: 3,
      name: "Michael R.",
      photo:
        "https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D",
      quote:
        "I’ve completed over 100 tasks and climbed the leaderboard! The opportunities to earn are endless.",
    },
    {
      id: 4,
      name: "Emma W.",
      photo:
        "https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D",
      quote:
        "Managing projects has never been easier! The platform connects me with reliable workers every time.",
    },
    {
      id: 5,
      name: "David L.",
      photo:
        "https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D",
      quote:
        "MicTask is the best platform for freelancers! I love the flexibility and the steady flow of tasks.",
    },
  ];

  return (
    <section className="bg-white dark:bg-gray-900 py-12">
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
              className="p-6 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-md rounded-xl !w-80"
            >
              <div className="flex flex-col items-center text-center">
                <img
                  src={testimonial.photo}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full mb-4 border-2 border-orange-400 dark:border-orange-600"
                />
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                  {testimonial.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mt-2">
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