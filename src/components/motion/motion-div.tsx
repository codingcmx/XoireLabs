"use client";

import { motion, type HTMLMotionProps } from "framer-motion";

type MotionDivProps = HTMLMotionProps<"div">;

const MotionDiv: React.FC<MotionDivProps> = ({ children, ...props }) => {
  return <motion.div {...props}>{children}</motion.div>;
};

export default MotionDiv;
