import HeroSection from "./HeroSection";
import MakeDifferent from "./MakeDifferent";
import Testimonial from "./Testimonial";
import TopBuyer from "./TopBuyer";
import TopWorker from "./TopWorker";
import WhyWeBest from "./WhyWeBest";

const Home = () => {
  return (
    <div>
      <HeroSection></HeroSection>
      <TopWorker></TopWorker>
      <TopBuyer></TopBuyer>
      <Testimonial></Testimonial>
      <MakeDifferent></MakeDifferent>
      <WhyWeBest></WhyWeBest>
    </div>
  );
};

export default Home;
