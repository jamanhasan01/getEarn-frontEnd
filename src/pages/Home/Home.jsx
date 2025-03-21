import HeroSection from "./HeroSection";
import MakeDifferent from "./MakeDifferent";
import Testimonial from "./Testimonial";
import TopBuyer from "./TopBuyer";
import TopWorker from "./TopWorker";
import WhyWeBest from "./WhyWeBest";

import { motion } from "framer-motion";
const Home = () => {

  return (
    <div >
 
      <motion.section
        initial={{ opacity: 0, y: 100 }} 
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }} 
      >
        <HeroSection />
      </motion.section>


      <motion.section
        initial={{ opacity: 0, x: -100 }} 
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.5 }} 
      >
        <TopWorker />
      </motion.section>

      
      <motion.section
        initial={{ opacity: 0, x: 100 }} 
        whileInView={{ opacity: 1, x: 0 }} 
        transition={{ duration: 1, delay: 0.5 }}
      >
        <TopBuyer />
      </motion.section>

      <motion.section
        initial={{ opacity: 0, scale: 0.8 }} 
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <Testimonial />
      </motion.section>

   
      <motion.section
        initial={{ opacity: 0, y: 50 }} 
        whileInView={{ opacity: 1, y: 0 }} 
        transition={{ duration: 1, delay: 0.5 }} 
      >
        <MakeDifferent />
      </motion.section>


      <motion.section
        initial={{ opacity: 0, scale: 2 }}
        whileInView={{ opacity: 1, scale: 1 }} 
        transition={{ duration: 1, delay: 0.5 }} 
      >
        <WhyWeBest />
      </motion.section>
    </div>
  );
};

export default Home;
