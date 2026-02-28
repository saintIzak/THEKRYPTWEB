import { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import { useIntersectionPaused } from '../../hooks/useIntersectionPaused';
import {
    VAULT_PRODUCTS, TILE_LAYOUT, PULSE_BADGES, PRODUCT_TILE_INDICES,
    type TileConfig, type ShapeVariant,
} from './vaultData';

// ── Shape tile styling ────────────────────────────────────────────────────────
const SHAPE_BG: Record<ShapeVariant, string> = {
    red: 'bg-gradient-to-br from-red-950 via-red-900/60 to-black',
    purple: 'bg-gradient-to-br from-violet-950 via-violet-900/50 to-black',
    dark: 'bg-gradient-to-br from-zinc-900 to-zinc-950',
    noise: 'bg-zinc-900',
};

const NOISE_SVG =
    "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

// ── Shape tile inner decoration ───────────────────────────────────────────────
function ShapeDecor({ variant }: { variant: ShapeVariant }) {
    if (variant === 'red') return (
        <>
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-red-500/10 blur-2xl" />
            </div>
            <span className="absolute bottom-2 right-2 text-[9px] font-black tracking-[0.3em] text-red-500/30 uppercase">KSh</span>
        </>
    );
    if (variant === 'purple') return (
        <>
            <div className="absolute top-3 left-3 w-4 h-4 border border-violet-500/30 rotate-45" />
            <div className="absolute bottom-3 right-3 w-2 h-2 rounded-full bg-violet-400/30" />
        </>
    );
    if (variant === 'noise') return (
        <div className="absolute inset-0 opacity-[0.15]" style={{ backgroundImage: NOISE_SVG }} />
    );
    // dark
    return (
        <div className="absolute inset-0 flex items-center justify-center opacity-10">
            <div className="w-8 h-8 rounded-full border border-white/40" />
            <div className="absolute w-4 h-4 rounded-full border border-white/20" />
        </div>
    );
}

// ── Props ─────────────────────────────────────────────────────────────────────
interface VaultMosaicBackgroundProps {
    isActive: boolean;
}

// ── Component ─────────────────────────────────────────────────────────────────
export default function VaultMosaicBackground({ isActive }: VaultMosaicBackgroundProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const tileRefs = useRef<(HTMLDivElement | null)[]>([]);
    const mouseRef = useRef({ x: 0, y: 0 });   // relative to container, px
    const rafRef = useRef<number>(0);

    const [hoveredTile, setHoveredTile] = useState<number | null>(null);
    const [pulsingTile, setPulsingTile] = useState<number | null>(null);
    const [pulseBadge, setPulseBadge] = useState('NEW DROP');

    const reducedMotion = usePrefersReducedMotion();
    const isPaused = useIntersectionPaused(containerRef);

    // ── Pointer tracking (no re-render) ───────────────────────────────────────
    const handlePointerMove = useCallback((e: PointerEvent) => {
        const c = containerRef.current;
        if (!c) return;
        const r = c.getBoundingClientRect();
        mouseRef.current = { x: e.clientX - r.left, y: e.clientY - r.top };
    }, []);

    useEffect(() => {
        const c = containerRef.current;
        if (!c) return;
        const resetMouse = () => {
            if (!containerRef.current) return;
            mouseRef.current = {
                x: containerRef.current.offsetWidth / 2,
                y: containerRef.current.offsetHeight / 2,
            };
        };
        c.addEventListener('pointermove', handlePointerMove, { passive: true });
        c.addEventListener('pointerleave', resetMouse);
        resetMouse();
        return () => {
            c.removeEventListener('pointermove', handlePointerMove);
            c.removeEventListener('pointerleave', resetMouse);
        };
    }, [handlePointerMove]);

    // ── RAF cursor-proximity loop ──────────────────────────────────────────────
    useEffect(() => {
        if (reducedMotion || isPaused) {
            tileRefs.current.forEach(t => {
                if (!t) return;
                t.style.transform = '';
                t.style.boxShadow = '';
                t.style.zIndex = '';
                const img = t.querySelector<HTMLImageElement>('img');
                if (img) img.style.transform = 'scale(1.05)';
            });
            cancelAnimationFrame(rafRef.current);
            return;
        }

        const RADIUS = 200; // px

        const loop = () => {
            const c = containerRef.current;
            if (!c) { rafRef.current = requestAnimationFrame(loop); return; }

            const { x: mx, y: my } = mouseRef.current;
            const cR = c.getBoundingClientRect();

            // Update spotlight CSS variables
            c.style.setProperty('--spot-x', `${((mx / c.offsetWidth) * 100).toFixed(1)}%`);
            c.style.setProperty('--spot-y', `${((my / c.offsetHeight) * 100).toFixed(1)}%`);

            // Batch reads
            const rects = tileRefs.current.map(t => t?.getBoundingClientRect() ?? null);

            // Batch writes
            tileRefs.current.forEach((tile, i) => {
                if (!tile || !rects[i]) return;
                const r = rects[i]!;

                const tx = r.left - cR.left + r.width / 2;
                const ty = r.top - cR.top + r.height / 2;
                const dx = mx - tx, dy = my - ty;
                const dist = Math.sqrt(dx * dx + dy * dy);
                const raw = Math.max(0, 1 - dist / RADIUS);
                const prox = raw * raw; // ease-in

                if (prox > 0.005) {
                    const lift = -(prox * 12).toFixed(2);
                    const scale = (1 + prox * 0.045).toFixed(4);
                    tile.style.transform = `translateY(${lift}px) scale(${scale})`;
                    tile.style.boxShadow = `0 ${(8 + prox * 24).toFixed(0)}px ${(20 + prox * 48).toFixed(0)}px rgba(220,38,38,${(prox * 0.45).toFixed(2)})`;
                    tile.style.zIndex = '8';

                    // Inner image parallax
                    const img = tile.querySelector<HTMLImageElement>('img');
                    if (img) {
                        const px = (-(dx / RADIUS) * 8 * prox).toFixed(2);
                        const py = (-(dy / RADIUS) * 8 * prox).toFixed(2);
                        img.style.transform = `scale(1.1) translate(${px}px,${py}px)`;
                    }
                } else {
                    tile.style.transform = 'translateY(0px) scale(1)';
                    tile.style.boxShadow = '';
                    tile.style.zIndex = '1';
                    const img = tile.querySelector<HTMLImageElement>('img');
                    if (img) img.style.transform = 'scale(1.05)';
                }
            });

            rafRef.current = requestAnimationFrame(loop);
        };

        rafRef.current = requestAnimationFrame(loop);
        return () => cancelAnimationFrame(rafRef.current);
    }, [reducedMotion, isPaused]);

    // ── Promo pulse (one tile at a time) ──────────────────────────────────────
    useEffect(() => {
        if (reducedMotion || isPaused) return;

        let clearTimer: ReturnType<typeof setTimeout>;

        const scheduleNext = (): ReturnType<typeof setTimeout> => {
            const delay = 3_000 + Math.random() * 3_000;
            return setTimeout(() => {
                const idx = PRODUCT_TILE_INDICES[Math.floor(Math.random() * PRODUCT_TILE_INDICES.length)];
                const badge = PULSE_BADGES[Math.floor(Math.random() * PULSE_BADGES.length)];
                setPulseBadge(badge);
                setPulsingTile(idx);
                clearTimer = setTimeout(() => {
                    setPulsingTile(null);
                    clearTimer = scheduleNext();
                }, 2_500);
            }, delay);
        };

        const first = setTimeout(() => {
            setPulseBadge(PULSE_BADGES[0]);
            setPulsingTile(PRODUCT_TILE_INDICES[0]);
            setTimeout(() => setPulsingTile(null), 2_500);
            clearTimer = scheduleNext();
        }, 2_000);

        return () => { clearTimeout(first); clearTimeout(clearTimer); };
    }, [reducedMotion, isPaused]);

    // ── Tile renderer ─────────────────────────────────────────────────────────
    const renderTile = (cfg: TileConfig, idx: number) => {
        const spanStyle: React.CSSProperties = {
            gridColumn: `span ${cfg.cols}`,
            gridRow: `span ${cfg.rows}`,
        };
        const isPulsing = pulsingTile === idx;
        const isHov = hoveredTile === idx;

        const base = `relative overflow-hidden rounded-lg border will-change-transform transition-[border-color] duration-300
            ${isPulsing ? 'border-red-500/70' : isHov ? 'border-white/15' : 'border-white/5'}`;

        // ── Shape tile ────────────────────────────────────────────────────────
        if (cfg.kind === 'shape') {
            return (
                <div
                    key={idx}
                    ref={el => { tileRefs.current[idx] = el; }}
                    className={`${base} ${SHAPE_BG[cfg.variant]}`}
                    style={spanStyle}
                    aria-hidden
                >
                    <ShapeDecor variant={cfg.variant} />
                </div>
            );
        }

        // ── Product tile ──────────────────────────────────────────────────────
        const product = VAULT_PRODUCTS[cfg.productIdx % VAULT_PRODUCTS.length];

        return (
            <div
                key={idx}
                ref={el => { tileRefs.current[idx] = el; }}
                className={`${base} cursor-pointer group`}
                style={spanStyle}
                onMouseEnter={() => setHoveredTile(idx)}
                onMouseLeave={() => setHoveredTile(null)}
            >
                {/* Product image */}
                <img
                    src={product.imageUrl}
                    alt={product.name}
                    loading="lazy"
                    draggable={false}
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{ transform: 'scale(1.05)', transition: 'none' }}
                />

                {/* Permanent bottom gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent pointer-events-none" />

                {/* Tag */}
                <div className="absolute top-2 left-2 z-10">
                    <span className="text-[8px] font-black uppercase tracking-widest bg-black/60 backdrop-blur-sm text-white/60 px-1.5 py-0.5">
                        {product.tag}
                    </span>
                </div>

                {/* Pulse badge */}
                {isPulsing && (
                    <div className="absolute top-2 right-2 z-20 animate-pulse">
                        <span className="text-[9px] font-black uppercase tracking-wider bg-red-600 text-white px-2 py-0.5 shadow-[0_0_12px_rgba(220,38,38,0.8)]">
                            {pulseBadge}
                        </span>
                    </div>
                )}

                {/* Pulsing ring */}
                {isPulsing && (
                    <div className="absolute inset-0 rounded-lg ring-1 ring-red-500/60 pointer-events-none animate-pulse" />
                )}

                {/* Hover info overlay */}
                <div className={`absolute inset-0 z-10 flex flex-col justify-end p-3 transition-opacity duration-300 bg-black/50 backdrop-blur-[2px] ${isHov ? 'opacity-100' : 'opacity-0'}`}>
                    <p className="text-[9px] font-black uppercase tracking-widest text-white/50 mb-0.5">{product.tag}</p>
                    <p className="text-xs font-black text-white leading-tight mb-1 line-clamp-1">{product.name}</p>
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-black text-red-400">
                            KSh {product.price.toLocaleString()}
                        </span>
                        <Link
                            to={product.href}
                            onClick={e => e.stopPropagation()}
                            className="flex items-center gap-1 bg-white/10 hover:bg-red-600 border border-white/10 hover:border-red-500 text-white px-2 py-1 text-[9px] font-black uppercase tracking-wider transition-all duration-200"
                        >
                            <ShoppingCart className="h-2.5 w-2.5" />
                            Shop
                        </Link>
                    </div>
                </div>
            </div>
        );
    };

    // ── Render ────────────────────────────────────────────────────────────────
    return (
        <div
            ref={containerRef}
            className="absolute inset-0 overflow-hidden"
            aria-hidden
            style={{
                ['--spot-x' as string]: '50%',
                ['--spot-y' as string]: '50%',
            }}
        >
            {/* Cursor spotlight */}
            <div
                className="absolute inset-0 z-10 pointer-events-none transition-opacity duration-300"
                style={{
                    background: `radial-gradient(circle 280px at var(--spot-x) var(--spot-y), rgba(220,38,38,0.07) 0%, transparent 70%)`,
                }}
            />

            {/* Mosaic grid */}
            <div
                className={`absolute inset-0 p-1 transition-all duration-700 ${isActive ? 'opacity-75 brightness-100' : 'opacity-35 brightness-50 blur-[1px]'}`}
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(4, 1fr)',
                    gridAutoRows: '1fr',
                    gap: '4px',
                    gridAutoFlow: 'dense',
                }}
            >
                {TILE_LAYOUT.map((cfg, idx) => renderTile(cfg, idx))}
            </div>

            {/* Top-to-bottom readability gradient (ensures hero text is readable) */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/70 z-20 pointer-events-none" />

            {/* Left edge fade (toward divider) */}
            <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-black/60 to-transparent z-20 pointer-events-none" />
        </div>
    );
}
