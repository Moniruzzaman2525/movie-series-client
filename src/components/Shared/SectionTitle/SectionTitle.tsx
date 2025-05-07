import { motion } from "framer-motion";
interface SProps {
  text: string;
  subText: string;
}

const SectionTitle = ({ text, subText }: SProps) => {
  return (
    <div className="py-5 md:py-20  ">
      <div
        data-aos="fade-up"
        className="flex flex-col justify-center items-center border-b-4 border-gray-600 w-1/2 mx-auto pb-5"
      >
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1 }}
        >
          <p className="text-gray-100 text-lg font-bold">{subText}</p>
          <h1 className="text-3xl md:text-5xl font-bold text-gray-100">{text}</h1>
        </motion.button>
      </div>
    </div>
  );
};

export default SectionTitle;
