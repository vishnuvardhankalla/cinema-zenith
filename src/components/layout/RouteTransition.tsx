import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface RouteTransitionProps {
  children: ReactNode;
}

export const RouteTransition = ({ children }: RouteTransitionProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.18 }}
    >
      {children}
    </motion.div>
  );
};