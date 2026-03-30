import GamifiedSection from '../components/GamifiedSection';
import { HqHero } from '../components/hq/HqHero';
import { LiveUpdatesStrip } from '../components/hq/LiveUpdatesStrip';
import { UpcomingEvents } from '../components/hq/UpcomingEvents';
import { NewDrops } from '../components/hq/NewDrops';
import { FeaturedSpotlight } from '../components/hq/FeaturedSpotlight';
import { HqAnnouncements } from '../components/hq/HqAnnouncements';
import { CommunityActivity } from '../components/hq/CommunityActivity';
import { WeeklySchedule } from '../components/hq/WeeklySchedule';
import { QuickActions } from '../components/hq/QuickActions';

export default function TheHQ() {
    return (
        <div className="min-h-screen bg-black text-white pt-20 pb-20 overflow-hidden">

            {/* Ambient Background depth for the entire page */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:64px_64px]" />
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[1000px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-900/20 via-black/0 to-transparent blur-3xl" />
            </div>

            {/* 1. HERO SECTION */}
            <HqHero />

            {/* 2. LIVE UPDATES STRIP */}
            <LiveUpdatesStrip />

            {/* MAIN CONTENT CONTAINER */}
            <GamifiedSection className="w-full sm:container mx-auto px-4 sm:px-6 relative z-10">

                {/* 3. UPCOMING EVENTS */}
                <UpcomingEvents />

                {/* 4. NEW LANDED PRODUCTS / DROPS */}
                <NewDrops />

            </GamifiedSection>

            {/* 5. FEATURED SPOTLIGHT BANNER (Full width breakout) */}
            <div className="relative z-10">
                <FeaturedSpotlight />
            </div>

            {/* RETURN TO CONTAINER */}
            <GamifiedSection className="w-full sm:container mx-auto px-4 sm:px-6 relative z-10">

                {/* 6. ANNOUNCEMENTS / BRAND INTEL */}
                <HqAnnouncements />

                {/* 7. COMMUNITY ACTIVITY / SOCIAL PROOF */}
                <CommunityActivity />

                {/* 8. WEEKLY SCHEDULE */}
                <WeeklySchedule />

                {/* 9. QUICK ACTIONS / CTAs */}
                <QuickActions />

            </GamifiedSection>

        </div>
    );
}
