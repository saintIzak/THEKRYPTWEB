import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { ReactNode, useEffect, useState } from 'react';

interface PageTransitionProps {
    children: ReactNode;
}

const PageTransition = ({ children }: PageTransitionProps) => {
    const location = useLocation();
    const [isFirstMount, setIsFirstMount] = useState(true);

    useEffect(() => {
        setIsFirstMount(false);
    }, []);

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={location.pathname}
                initial={isFirstMount ? {} : { opacity: 0, filter: 'brightness(2) blur(10px)' }}
                animate={{ opacity: 1, filter: 'brightness(1) blur(0px)' }}
                exit={{ opacity: 0, filter: 'brightness(0.5) blur(10px)' }}
                transition={{
                    duration: 0.2,
                    ease: [0.22, 1, 0.36, 1]
                }}
                className="relative"
            >
                {/* High-Speed Digital Shutter Effect */}
                <motion.div
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: [0, 1, 0] }}
                    exit={{ scaleY: [0, 1, 0] }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    className="fixed inset-0 z-[1000] pointer-events-none bg-red-600 origin-top"
                    style={{ mixBlendMode: 'overlay' }}
                />

                {/* Tactical Scanline during transition */}
                <motion.div
                    initial={{ top: '-100%' }}
                    animate={{ top: ['-100%', '100%'] }}
                    exit={{ top: ['-100%', '100%'] }}
                    transition={{ duration: 0.2, ease: "linear" }}
                    className="fixed left-0 right-0 h-2 bg-red-600/50 blur-sm z-[1001] pointer-events-none"
                />

                {/* Noise Texture Overlay (Persistent) */}
                <div className="fixed inset-0 z-[998] pointer-events-none opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />

                {children}
            </motion.div>
        </AnimatePresence>
    );
};

export default PageTransition;
