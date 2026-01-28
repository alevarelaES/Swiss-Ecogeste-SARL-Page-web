import React from 'react';
import { motion } from 'motion/react';

interface RevealProps {
    children: React.ReactNode;
    delay?: number;
}

const Reveal: React.FC<RevealProps> = ({ children, delay = 0 }) => (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, delay, ease: "easeOut" }}
    >
        {children}
    </motion.div>
);

export default Reveal;

