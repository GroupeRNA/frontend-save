import { useEffect } from "react";
import { useInView } from 'react-intersection-observer';
import { motion, useAnimation } from 'framer-motion';


export const FeatureCard = ({ icon, title, description, delay, onClick }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <motion.div  ref={ref} initial="hidden" animate={controls} variants={{ visible: { opacity: 1, y: 0 }, hidden: { opacity: 0, y: 50 } }} transition={{ duration: 0.5, delay }} className="bg-indigo-900 p-10 lg:scale-105 rounded-2xl border border-purple-500 shadow-md hover:shadow-lg transition-all hover:-translate-y-2 backdrop-blur-sm cursor-pointer" onClick={onClick}>
      <div className="flex justify-center mb-4">
        <div className="bg-blue-100 p-4 rounded-full">
          {icon}
        </div>
      </div>
      <h3 className="text-2xl font-bold mb-3 text-green-500">{title}</h3>
      <p className="text-gray-400 text-xl">
        {description}
      </p>
    </motion.div>
  );
};

