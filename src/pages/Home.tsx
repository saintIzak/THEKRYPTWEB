import { useEffect } from 'react';
import SplitHero from '../components/landing/SplitHero';
import HowItWorks from '../components/landing/HowItWorks';
import Pricing from '../components/landing/Pricing';
import GamesGrid from '../components/landing/GamesGrid';
import Availability from '../components/landing/Availability';
import TestimonialsFAQ from '../components/landing/TestimonialsFAQ';
import LandingCTA from '../components/landing/LandingCTA';

export default function Home() {
    // Ensure no stale scroll position on mount
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'instant' });
    }, []);

    return (
        <div className="min-h-screen bg-black text-white overflow-x-hidden">
            {/* 1. Split Hero — full viewport, interactive panels */}
            <SplitHero />

            {/* 2. How it Works */}
            <HowItWorks />

            {/* 3. Packages & Pricing */}
            <Pricing />

            {/* 4. Games Grid */}
            <GamesGrid />

            {/* 5. Station Availability */}
            <Availability />

            {/* 6. Testimonials + FAQ */}
            <TestimonialsFAQ />

            {/* 7. Final CTA + Footer override */}
            <LandingCTA />
        </div>
    );
}
