import { useState, useEffect, RefObject } from 'react';

/**
 * Returns true when the observed element is NOT intersecting the viewport.
 * Use to pause expensive animations when the section is off-screen.
 */
export function useIntersectionPaused(ref: RefObject<Element | null>): boolean {
    const [paused, setPaused] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => setPaused(!entry.isIntersecting),
            { threshold: 0 }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, [ref]);

    return paused;
}
