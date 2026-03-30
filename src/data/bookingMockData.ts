import { Monitor, Gamepad2, PlaySquare, Shield } from 'lucide-react';
import fifaImg from '../assets/images/fifa-bg.png';
import mkImg from '../assets/images/mortalcombat.jpg';
import gtaImg from '../assets/images/gta5-bg.png';
import spidermanImg from '../assets/images/fortnite-bg.png'; // substituting spiderman with fortnite
import codImg from '../assets/images/warzone-bg.png';
import forzaImg from '../assets/images/carracing.jpg';
import { ElementType } from 'react';

// Pricing config based on rules
export const PRICING_RULES = {
    fifa: { ratePerMin: 70 / 6, label: "70 / 6 min" },
    vr: { ratePerMin: 200 / 5, label: "200 / 5 min" },
    defaultConsole: { ratePerMin: 50 / 5, label: "50 / 5 min" },
    defaultXbox: { ratePerMin: 50 / 5, label: "50 / 5 min" }
};

export type StationType = 'ps5' | 'xbox' | 'simulator' | 'vr';

export interface StationCategory {
    id: StationType;
    name: string;
    icon: ElementType;
    totalSlots: number;
    slots: StationSlot[];
    basePriceLabel: string;
    color: string;
}

export interface StationSlot {
    id: string;
    name: string;
    status: 'available' | 'busy';
}

export const STATION_CATEGORIES: StationCategory[] = [
    {
        id: 'ps5',
        name: 'PS5 Station',
        icon: Monitor,
        totalSlots: 4,
        basePriceLabel: 'from KSH 50/5min',
        color: 'blue-500',
        slots: [
            { id: 'ps5-1', name: 'PS5 Station 1', status: 'available' },
            { id: 'ps5-2', name: 'PS5 Station 2', status: 'available' },
            { id: 'ps5-3', name: 'PS5 Station 3', status: 'busy' },
            { id: 'ps5-4', name: 'PS5 Station 4', status: 'available' },
        ]
    },
    {
        id: 'xbox',
        name: 'Xbox Series X',
        icon: Gamepad2,
        totalSlots: 1,
        basePriceLabel: 'KSH 50/5min',
        color: 'green-500',
        slots: [
            { id: 'xbox-1', name: 'Xbox Station', status: 'available' },
        ]
    },
    {
        id: 'simulator',
        name: 'Racing Simulator',
        icon: PlaySquare,
        totalSlots: 1,
        basePriceLabel: 'KSH 50/5min',
        color: 'red-500',
        slots: [
            { id: 'sim-1', name: 'Sim Rig', status: 'busy' },
        ]
    },
    {
        id: 'vr',
        name: 'VR Experience',
        icon: Shield,
        totalSlots: 1,
        basePriceLabel: 'KSH 200/5min',
        color: 'purple-500',
        slots: [
            { id: 'vr-1', name: 'VR Rig', status: 'available' },
        ]
    }
];

export interface ArcadeGame {
    id: string;
    name: string;
    image: string;
    pricingRule: keyof typeof PRICING_RULES;
    supportedStations: StationType[];
}

export const ARCADE_GAMES: ArcadeGame[] = [
    {
        id: 'fifa26',
        name: 'EA Sports FC 26',
        image: fifaImg,
        pricingRule: 'fifa',
        supportedStations: ['ps5', 'xbox']
    },
    {
        id: 'mk1',
        name: 'Mortal Kombat 1',
        image: mkImg,
        pricingRule: 'defaultConsole',
        supportedStations: ['ps5', 'xbox']
    },
    {
        id: 'gta6',
        name: 'GTA VI',
        image: gtaImg,
        pricingRule: 'defaultConsole',
        supportedStations: ['ps5', 'xbox']
    },
    {
        id: 'spiderman',
        name: 'Spider-Man 2',
        image: spidermanImg,
        pricingRule: 'defaultConsole',
        supportedStations: ['ps5']
    },
    {
        id: 'cod',
        name: 'Call of Duty: BO6',
        image: codImg,
        pricingRule: 'defaultConsole',
        supportedStations: ['ps5', 'xbox']
    },
    {
        id: 'forza',
        name: 'Forza Horizon 5',
        image: forzaImg,
        pricingRule: 'defaultConsole',
        supportedStations: ['xbox', 'simulator']
    },
    {
        id: 'gt7',
        name: 'Gran Turismo 7',
        image: forzaImg, // reuse sim image for now
        pricingRule: 'defaultConsole',
        supportedStations: ['ps5', 'simulator']
    },
    {
        id: 'beatsaber',
        name: 'Beat Saber VR',
        image: codImg, // placeholder
        pricingRule: 'vr',
        supportedStations: ['vr']
    },
    {
        id: 'halflifealyx',
        name: 'Half-Life: Alyx',
        image: spidermanImg, // placeholder
        pricingRule: 'vr',
        supportedStations: ['vr']
    }
];

// Mock availability for "Schedule Picker"
// Format: Date string -> Time string -> boolean (available)
export const MOCK_AVAILABILITY = {
    // This will be handled dynamically in the component to avoid hardcoding exact dates
};
