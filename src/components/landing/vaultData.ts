// Vault product data — swap imageUrl to real assets when available
export interface VaultProduct {
    id: string;
    name: string;
    price: number;
    tag: string;
    imageUrl: string;
    href: string;
    badge?: string; // e.g. "NEW DROP", "-10%", "LIMITED"
}

export type ShapeVariant = 'red' | 'purple' | 'dark' | 'noise';

export type TileConfig =
    | { kind: 'product'; productIdx: number; cols: 1 | 2; rows: 1 | 2 }
    | { kind: 'shape'; variant: ShapeVariant; cols: 1; rows: 1 };

// ── Products ─────────────────────────────────────────────────────────────────
// Using Unsplash placeholders — replace imageUrl with local imports as needed
export const VAULT_PRODUCTS: VaultProduct[] = [
    {
        id: 'kb1', name: 'Razer BlackWidow V3', price: 8_500, tag: 'KEYBOARD',
        imageUrl: 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=600&q=75',
        href: '/shop', badge: 'NEW DROP',
    },
    {
        id: 'hs1', name: 'SteelSeries Arctis 7', price: 6_500, tag: 'HEADSET',
        imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=75',
        href: '/shop',
    },
    {
        id: 'ms1', name: 'Logitech G Pro X', price: 4_200, tag: 'MOUSE',
        imageUrl: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=400&q=75',
        href: '/shop',
    },
    {
        id: 'ctrl1', name: 'DualSense Controller', price: 7_800, tag: 'CONTROLLER',
        imageUrl: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400&q=75',
        href: '/shop', badge: 'LIMITED',
    },
    {
        id: 'vr1', name: 'Meta Quest 3', price: 45_000, tag: 'VR',
        imageUrl: 'https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?w=400&q=75',
        href: '/shop',
    },
    {
        id: 'mon1', name: 'BenQ 27" MOBA', price: 25_000, tag: 'MONITOR',
        imageUrl: 'https://images.unsplash.com/photo-1585792180666-f7347c490ee2?w=400&q=75',
        href: '/shop',
    },
    {
        id: 'hs2', name: 'HyperX Cloud Alpha', price: 5_500, tag: 'HEADSET',
        imageUrl: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&q=75',
        href: '/shop',
    },
    {
        id: 'ps5', name: 'PlayStation 5', price: 85_000, tag: 'CONSOLE',
        imageUrl: 'https://images.unsplash.com/photo-1607853202273-797f1c22a38e?w=600&q=75',
        href: '/shop', badge: '-10%',
    },
    {
        id: 'pad1', name: 'ASUS ROG Mousepad', price: 1_800, tag: 'ACCESSORY',
        imageUrl: 'https://images.unsplash.com/photo-1563297980-dcc494fcbfc1?w=400&q=75',
        href: '/shop',
    },
    {
        id: 'kb2', name: 'Corsair K100 RGB', price: 12_000, tag: 'KEYBOARD',
        imageUrl: 'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=400&q=75',
        href: '/shop', badge: 'JUST IN',
    },
    {
        id: 'chair1', name: 'SecretLab Titan', price: 55_000, tag: 'CHAIR',
        imageUrl: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=400&q=75',
        href: '/shop',
    },
    {
        id: 'cable1', name: 'Cable Mod Set', price: 2_200, tag: 'ACCESSORY',
        imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=75',
        href: '/shop',
    },
];

// ── Tile layout (6-col dense grid) ────────────────────────────────────────────
export const TILE_LAYOUT: TileConfig[] = [
    { kind: 'product', productIdx: 0, cols: 2, rows: 2 },  // Featured: Razer KB
    { kind: 'product', productIdx: 1, cols: 1, rows: 1 },
    { kind: 'shape', variant: 'red', cols: 1, rows: 1 },
    { kind: 'product', productIdx: 2, cols: 1, rows: 1 },
    { kind: 'product', productIdx: 3, cols: 1, rows: 1 },
    { kind: 'product', productIdx: 4, cols: 1, rows: 1 },
    { kind: 'shape', variant: 'purple', cols: 1, rows: 1 },
    { kind: 'product', productIdx: 5, cols: 1, rows: 1 },
    { kind: 'product', productIdx: 6, cols: 1, rows: 1 },
    { kind: 'product', productIdx: 7, cols: 2, rows: 2 },  // Featured: PS5
    { kind: 'shape', variant: 'noise', cols: 1, rows: 1 },
    { kind: 'product', productIdx: 8, cols: 1, rows: 1 },
    { kind: 'product', productIdx: 9, cols: 1, rows: 1 },
    { kind: 'shape', variant: 'dark', cols: 1, rows: 1 },
    { kind: 'product', productIdx: 10, cols: 1, rows: 1 },
    { kind: 'product', productIdx: 11, cols: 1, rows: 1 },
    { kind: 'product', productIdx: 4, cols: 1, rows: 1 },  // re-use VR
    { kind: 'shape', variant: 'red', cols: 1, rows: 1 },
    { kind: 'product', productIdx: 2, cols: 1, rows: 1 },
    { kind: 'product', productIdx: 6, cols: 1, rows: 1 },
];

export const PULSE_BADGES = ['NEW DROP', '−10%', 'LIMITED', 'JUST IN', 'HOT DEAL'];

// Indices of product tiles (for random pulse selection)
export const PRODUCT_TILE_INDICES = TILE_LAYOUT
    .map((t, i) => (t.kind === 'product' ? i : -1))
    .filter(i => i !== -1);
