import { motion } from "motion/react";

interface SProps {
  text: string;
  subText: string;
}

const SectionTitle = ({ text, subText }: SProps) => {
  return (
    <div className="my-5 md:my-20  ">
      <div
        data-aos="fade-up"
        className="flex flex-col justify-center items-center"
      >
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1 }}
        >
          <p className="text-gray-400 text-lg font-bold">{subText}</p>
          <h1 className="text-3xl md:text-5xl font-bold">{text}</h1>
        </motion.button>
      </div>
    </div>
  );
};

export default SectionTitle;
