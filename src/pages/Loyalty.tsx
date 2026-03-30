import GamifiedSection from '../components/GamifiedSection';
import { WalletDashboard } from '../components/quest/WalletDashboard';
import { RewardLadder } from '../components/quest/RewardLadder';
import { DailyMissions } from '../components/quest/DailyMissions';
import { WeeklyChallenges } from '../components/quest/WeeklyChallenges';
import { ReferralSection } from '../components/quest/ReferralSection';
import { SocialMissions } from '../components/quest/SocialMissions';
import { MemberTiers } from '../components/quest/MemberTiers';
import { LeaderboardBadges } from '../components/quest/LeaderboardBadges';
import { EventAccess } from '../components/quest/EventAccess';
import { TopUpPacks } from '../components/quest/TopUpPacks';

export default function Loyalty() {
    return (
        <div className="min-h-screen bg-black text-white pt-24 pb-20 overflow-hidden">

            {/* 
        Subtle global ambient background for the quest log 
        Creates a tactical, command-center depth
      */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:64px_64px]" />
                <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-red-900/5 to-transparent" />
            </div>

            <GamifiedSection className="w-full sm:container mx-auto px-4 sm:px-6 relative z-10 pt-4">

                {/* 1 & 2) HERO + TOP SUMMARY DASHBOARD */}
                <WalletDashboard />

                {/* 3) DAILY MISSIONS SECTION */}
                <DailyMissions />

                {/* 4) REFERRAL / INVITE SQUAD SECTION */}
                <ReferralSection />

                {/* 5) KRYPT COIN VALUE / REWARD LADDER */}
                <RewardLadder />

                {/* 6) WEEKLY CHALLENGES */}
                <WeeklyChallenges />

                {/* 7) MEMBER TIERS / STATUS SYSTEM */}
                <MemberTiers />

                {/* 8) LOCAL & SOCIAL OPERATIONS */}
                <SocialMissions />

                {/* 9) LEADERBOARD / BADGES */}
                <LeaderboardBadges />

                {/* 10) EVENT ACCESS / BRAND ACTIVATION */}
                <EventAccess />

                {/* 11) TOP-UP PACKS */}
                <TopUpPacks />

            </GamifiedSection>
        </div>
    );
}
