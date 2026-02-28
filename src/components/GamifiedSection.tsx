import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface GamifiedSectionProps {
    children: ReactNode;
    className?: string;
    id?: string;
    delay?: number;
    hideBrackets?: boolean;
}

const GamifiedSection = ({ children, className = "", id = "", delay = 0, hideBrackets = false }: GamifiedSectionProps) => {
    return (
        <motion.section
            id={id}
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{
                duration: 0.3,
                ease: [0.22, 1, 0.36, 1],
                delay,
                opacity: { duration: 0.2 },
                scale: { duration: 0.4, type: "spring", stiffness: 150 }
            }}
            className={`relative ${className}`}
        >
            {/* Animated HUD Brackets */}
            {!hideBrackets && (
                <>
                    <motion.div
                        initial={{ width: 0, height: 0, opacity: 0 }}
                        whileInView={{ width: '60px', height: '60px', opacity: 1 }}
                        transition={{ duration: 0.3, delay: delay + 0.05, ease: "circOut" }}
                        className="absolute top-0 left-0 border-t-2 border-l-2 border-red-600/60 pointer-events-none z-30"
                    />
                    <motion.div
                        initial={{ width: 0, height: 0, opacity: 0 }}
                        whileInView={{ width: '60px', height: '60px', opacity: 1 }}
                        transition={{ duration: 0.3, delay: delay + 0.05, ease: "circOut" }}
                        className="absolute bottom-0 right-0 border-b-2 border-r-2 border-red-600/60 pointer-events-none z-30"
                    />
                </>
            )}

            {/* Tactical Scan Effect on entry */}
            <motion.div
                initial={{ top: 0, height: 0, opacity: 0 }}
                whileInView={{
                    top: ['0%', '100%'],
                    height: ['0%', '20%', '0%'],
                    opacity: [0, 0.2, 0]
                }}
                transition={{ duration: 0.6, delay: delay + 0.1, ease: "easeInOut" }}
                className="absolute inset-x-0 bg-gradient-to-b from-transparent via-red-600/30 to-transparent pointer-events-none z-20"
            />

            {/* Subtle Grid Background for the section */}
            <div
                className="absolute inset-0 bg-[linear-gradient(rgba(220,38,38,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(220,38,38,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none -z-10"
                style={{ maskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)' }}
            />

            {children}
        </motion.section>
    );
};

export default GamifiedSection;
