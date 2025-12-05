"use client";

import { SiGithub, SiOrcid } from "@icons-pack/react-simple-icons";
import { Mail } from "lucide-react";
import {
    AnimatePresence,
    motion,
    useMotionValue,
    useScroll,
    useSpring,
    useTransform,
} from "motion/react";
import type React from "react";
import { useEffect, useRef, useState } from "react";

const Particles = () => {
    const [particles, setParticles] = useState<
        Array<{
            id: number;
            x: number;
            y: number;
            delay: number;
            size: number;
            color: string;
        }>
    >([]);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkMobile();
        window.addEventListener("resize", checkMobile);

        const particleCount = isMobile ? 4 : 15;
        const colors = ["#60a5fa", "#a78bfa", "#38bdf8", "#06b6d4"];
        const newParticles = Array.from({ length: particleCount }, (_, i) => ({
            id: i,
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            delay: Math.random() * 8,
            size: Math.random() * 2 + 0.5,
            color: colors[Math.floor(Math.random() * colors.length)],
        }));
        setParticles(newParticles);

        return () => window.removeEventListener("resize", checkMobile);
    }, [isMobile]);

    return (
        <div className="fixed inset-0 pointer-events-none z-0">
            {particles.map((particle) => (
                <motion.div
                    key={particle.id}
                    className="absolute rounded-full"
                    style={{
                        width: particle.size,
                        height: particle.size,
                        backgroundColor: particle.color,
                        boxShadow: `0 0 ${particle.size * 4}px ${particle.color}80`,
                    }}
                    initial={{ x: particle.x, y: particle.y, opacity: 0 }}
                    animate={{
                        x: [
                            particle.x,
                            particle.x + (isMobile ? 40 : 80),
                            particle.x - (isMobile ? 30 : 60),
                            particle.x,
                        ],
                        y: [
                            particle.y,
                            particle.y - (isMobile ? 40 : 80),
                            particle.y + (isMobile ? 30 : 60),
                            particle.y,
                        ],
                        opacity: [0, 0.7, 0.4, 0],
                    }}
                    transition={{
                        duration: isMobile ? 25 : 20,
                        repeat: Number.POSITIVE_INFINITY,
                        delay: particle.delay,
                        ease: "linear",
                    }}
                />
            ))}
        </div>
    );
};

const Flare = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        setIsMobile(window.innerWidth < 768);
        if (isMobile) return;

        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [isMobile]);

    if (isMobile) return null;

    return (
        <>
            {/* Main lens flare glow */}
            <motion.div
                className="fixed w-96 h-96 pointer-events-none z-0"
                style={{
                    left: mousePosition.x - 192,
                    top: mousePosition.y - 192,
                    background:
                        "radial-gradient(circle, rgba(168, 85, 247, 0.1) 0%, transparent 70%)",
                }}
                animate={{
                    opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                }}
            />

            {/* Secondary lens flare rings */}
            <motion.div
                className="fixed pointer-events-none z-0"
                style={{
                    left: mousePosition.x,
                    top: mousePosition.y,
                }}
            >
                {[1, 2, 3].map((ring) => (
                    <motion.div
                        key={ring}
                        className="absolute"
                        style={{
                            width: ring * 100,
                            height: ring * 100,
                            left: -(ring * 50),
                            top: -(ring * 50),
                            border: `1px solid rgba(168, 85, 247, ${0.2 - ring * 0.05})`,
                            borderRadius: "50%",
                        }}
                        animate={{
                            scale: [1, 1 + ring * 0.1, 1],
                            opacity: [0.3, 0.1, 0.3],
                        }}
                        transition={{
                            duration: 4 + ring,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "easeInOut",
                        }}
                    />
                ))}
            </motion.div>
        </>
    );
};

const Glyph = ({ delay }: { delay: number }) => {
    return (
        <motion.svg
            width="64"
            height="64"
            viewBox="0 0 64 64"
            className="absolute opacity-5 pointer-events-none"
            animate={{
                rotate: 360,
                opacity: [0.05, 0.15, 0.05],
            }}
            transition={{
                duration: 20 + delay * 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
            }}
        >
            <title>Glyph</title>
            {/* Hexagon glyph */}
            <polygon
                points="32,6 58,18 58,46 32,58 6,46 6,18"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
            />
            {/* Inner circle */}
            <circle
                cx="32"
                cy="32"
                r="12"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
            />
            {/* Radial lines */}
            {Array.from({ length: 6 }).map((_, i) => {
                const angle = (i * 60 * Math.PI) / 180;
                const x1 = 32 + 12 * Math.cos(angle);
                const y1 = 32 + 12 * Math.sin(angle);
                const x2 = 32 + 28 * Math.cos(angle);
                const y2 = 32 + 28 * Math.sin(angle);
                return (
                    <motion.line
                        key={i}
                        x1={x1}
                        y1={y1}
                        x2={x2}
                        y2={y2}
                        stroke="currentColor"
                        strokeWidth="0.5"
                    />
                );
            })}
        </motion.svg>
    );
};

const MorphShape = () => {
    const shapes = [
        "M50,10 Q90,30 70,60 Q40,85 10,60 Q10,30 50,10", // Amorphous blob
        "M32,8 L56,20 L60,48 L32,56 L4,48 L8,20 Z", // Hexagon variant
        "M50,10 L90,50 L50,90 L10,50 Z", // Diamond
        "M32,15 Q55,15 58,32 Q55,50 32,50 Q10,50 10,32 Q10,15 32,15", // Oval
    ];
    const [currentShape, setCurrentShape] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentShape((prev) => (prev + 1) % shapes.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="fixed top-20 right-4 md:right-20 w-20 h-20 md:w-32 md:h-32 opacity-10 pointer-events-none hidden sm:block">
            <svg width="100%" height="100%" viewBox="0 0 100 100">
                <title>Shape</title>
                <motion.path
                    d={shapes[currentShape]}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="0.8"
                    className="text-purple-400"
                    animate={{ d: shapes[currentShape] }}
                    transition={{ duration: 3, ease: [0.25, 0.46, 0.45, 0.94] }}
                />
                <motion.path
                    d={shapes[currentShape]}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="text-purple-400 blur-sm"
                    opacity={0.3}
                    animate={{ d: shapes[currentShape] }}
                    transition={{ duration: 3, ease: [0.25, 0.46, 0.45, 0.94] }}
                />
            </svg>
        </div>
    );
};

const MagneticCursor = ({ children }: { children: React.ReactNode }) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const springX = useSpring(x, { stiffness: 300, damping: 30 });
    const springY = useSpring(y, { stiffness: 300, damping: 30 });
    const [isHovered, setIsHovered] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        setIsMobile(window.innerWidth < 768);
    }, []);

    return (
        <motion.div
            onMouseMove={(e) => {
                if (isMobile) return;
                const rect = e.currentTarget.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;
                x.set((e.clientX - centerX) * 0.15);
                y.set((e.clientY - centerY) * 0.15);
            }}
            onMouseEnter={() => !isMobile && setIsHovered(true)}
            onMouseLeave={() => {
                if (!isMobile) {
                    x.set(0);
                    y.set(0);
                    setIsHovered(false);
                }
            }}
            style={{ x: isMobile ? 0 : springX, y: isMobile ? 0 : springY }}
            className="relative"
        >
            <AnimatePresence>
                {isHovered && !isMobile && (
                    <>
                        <motion.div
                            className="absolute inset-0 rounded-full border border-purple-400/40 pointer-events-none"
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 2, opacity: [0, 0.6, 0] }}
                            exit={{ scale: 0, opacity: 0 }}
                            transition={{ duration: 1, ease: "easeOut" }}
                        />
                        <motion.div
                            className="absolute inset-0 rounded-full border border-cyan-400/20 pointer-events-none"
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1.3, opacity: [0, 0.4, 0] }}
                            exit={{ scale: 0, opacity: 0 }}
                            transition={{ duration: 1.2, ease: "easeOut" }}
                        />
                    </>
                )}
            </AnimatePresence>
            {children}
        </motion.div>
    );
};

const MorphingText = ({
    texts,
    className,
}: {
    texts: string[];
    className?: string;
}) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isGlitching, setIsGlitching] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setIsGlitching(true);
            setTimeout(() => {
                setCurrentIndex((prev) => (prev + 1) % texts.length);
                setIsGlitching(false);
            }, 200);
        }, 4000);
        return () => clearInterval(interval);
    }, [texts.length]);

    return (
        <div className={className}>
            <AnimatePresence mode="wait">
                <motion.span
                    key={currentIndex}
                    initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
                    animate={{
                        opacity: 1,
                        y: 0,
                        filter: "blur(0px)",
                        x: isGlitching ? [0, -3, 3, -2, 0] : 0,
                    }}
                    exit={{ opacity: 0, y: -20, filter: "blur(6px)" }}
                    transition={{
                        duration: 0.8,
                        ease: [0.25, 0.46, 0.45, 0.94],
                        x: { duration: 0.25, repeat: isGlitching ? 3 : 0 },
                    }}
                    className={
                        isGlitching
                            ? "bg-linear-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent"
                            : ""
                    }
                >
                    {texts[currentIndex]}
                </motion.span>
            </AnimatePresence>
        </div>
    );
};

const PerspectiveText = ({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isMobile, setIsMobile] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setIsMobile(window.innerWidth < 768);
    }, []);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!ref.current || isMobile) return;
        const rect = ref.current.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
        const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
        setMousePosition({ x: x * 20, y: y * 20 });
    };

    return (
        <motion.div
            ref={ref}
            className={className}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => !isMobile && setMousePosition({ x: 0, y: 0 })}
            style={{
                perspective: isMobile ? "none" : "1000px",
            }}
        >
            <motion.div
                animate={
                    isMobile
                        ? {}
                        : {
                              rotateX: -mousePosition.y,
                              rotateY: mousePosition.x,
                          }
                }
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                style={{
                    transformStyle: isMobile ? "flat" : "preserve-3d",
                }}
            >
                {children}
            </motion.div>
        </motion.div>
    );
};

const WaveText = ({ text }: { text: string }) => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        setIsMobile(window.innerWidth < 768);
    }, []);

    return (
        <>
            {text.split("").map((char, index) => (
                <motion.span
                    key={index.toString()}
                    animate={{
                        y: [0, isMobile ? -5 : -12, 0],
                    }}
                    transition={{
                        duration: 2.5,
                        repeat: Number.POSITIVE_INFINITY,
                        delay: index * 0.12,
                        ease: "easeInOut",
                    }}
                >
                    {char === " " ? "\u00A0" : char}
                </motion.span>
            ))}
        </>
    );
};

const TypingAnimation = ({
    text,
    className,
}: {
    text: string;
    className?: string;
}) => {
    const [displayedText, setDisplayedText] = useState("");
    const [isTypingComplete, setIsTypingComplete] = useState(false);

    useEffect(() => {
        let currentIndex = 0;
        let timeout: NodeJS.Timeout;

        const typeCharacter = () => {
            if (currentIndex <= text.length) {
                setDisplayedText(text.slice(0, currentIndex));
                currentIndex++;
                timeout = setTimeout(typeCharacter, 30);
            } else {
                setIsTypingComplete(true);
            }
        };

        typeCharacter();

        return () => clearTimeout(timeout);
    }, [text]);

    return (
        <div className={className}>
            {displayedText}
            <motion.span
                className="inline-block ml-0.5 w-0.5 h-5 sm:h-6 bg-linear-to-b from-cyan-400 to-purple-400"
                animate={
                    !isTypingComplete ? { opacity: [1, 0] } : { opacity: 0 }
                }
                transition={{
                    duration: 0.6,
                    repeat: Number.POSITIVE_INFINITY,
                }}
            />
        </div>
    );
};

const GlowEffect = ({ delay }: { delay: number }) => {
    const colors = [
        "rgba(168, 85, 247, 0.15)",
        "rgba(34, 211, 238, 0.15)",
        "rgba(139, 92, 246, 0.15)",
    ];

    return (
        <motion.div
            className="absolute inset-0 pointer-events-none opacity-10 blur-3xl"
            style={{
                background: colors[delay % colors.length],
            }}
            animate={{
                opacity: [0.08, 0.15, 0.08],
                scale: [1, 1.1, 1],
            }}
            transition={{
                duration: 8 + delay * 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
            }}
        />
    );
};

export default function Home() {
    const { scrollYProgress } = useScroll();
    const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
    const y2 = useTransform(scrollYProgress, [0, 1], [0, -200]);
    const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.3], [1, 0.95]);

    const rotateX = useTransform(scrollYProgress, [0, 1], [0, 360]);
    const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener("resize", checkMobile);

        const handleMouseMove = (e: MouseEvent) => {
            if (!isMobile) {
                mouseX.set(e.clientX);
                mouseY.set(e.clientY);
            }
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("resize", checkMobile);
        };
    }, [mouseX, mouseY, isMobile]);

    return (
        <div className="min-h-screen bg-slate-950 font-mono relative">
            <Particles />
            <Flare />
            <MorphShape />

            <Glyph delay={0} />
            <div className="fixed bottom-32 left-12 w-16 h-16 text-purple-400 hidden sm:block">
                <Glyph delay={2} />
            </div>
            <div className="fixed bottom-40 right-20 w-20 h-20 text-cyan-400 hidden md:block">
                <Glyph delay={4} />
            </div>

            <motion.div
                className="fixed inset-0 opacity-5 pointer-events-none"
                style={{
                    background: `conic-gradient(from ${rotateX}deg, rgba(168, 85, 247, 0.1), rgba(34, 211, 238, 0.1), transparent)`,
                    y: backgroundY,
                }}
            />

            <motion.nav
                className="fixed top-0 w-full z-50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
            >
                <motion.div
                    className="absolute inset-0 bg-slate-950/80 backdrop-blur-md border-b border-purple-500/10"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{
                        duration: 1.2,
                        ease: [0.25, 0.46, 0.45, 0.94],
                    }}
                    style={{ originX: 0 }}
                />
                <div className="relative max-w-4xl mx-auto px-4 sm:px-8 py-4 sm:py-6">
                    <div className="flex justify-between items-center">
                        <MagneticCursor>
                            <motion.div
                                className="text-sm font-medium bg-linear-to-r from-purple-300 via-cyan-300 to-purple-300 bg-clip-text text-transparent"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                whileHover={{ scale: 1.05 }}
                            >
                                <WaveText text="j3z" />
                            </motion.div>
                        </MagneticCursor>
                        <motion.div
                            className="flex gap-4 sm:gap-8 text-sm"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                        >
                            {["about", "work"].map((item, index) => (
                                <MagneticCursor key={item}>
                                    <motion.a
                                        href={`#${item}`}
                                        className="text-slate-400 hover:text-cyan-300 transition-colors duration-300 relative"
                                        whileHover={{ scale: 1.1 }}
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{
                                            duration: 0.6,
                                            delay: 0.6 + index * 0.1,
                                        }}
                                    >
                                        {item}
                                        <motion.div
                                            className="absolute -bottom-1 left-0 h-px bg-linear-to-r from-cyan-400 to-purple-400"
                                            initial={{ width: 0 }}
                                            whileHover={{ width: "100%" }}
                                            transition={{ duration: 0.3 }}
                                        />
                                    </motion.a>
                                </MagneticCursor>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </motion.nav>

            <section className="pt-24 sm:pt-32 pb-16 sm:pb-20 px-4 sm:px-8 relative">
                {!isMobile && (
                    <>
                        <motion.div
                            className="absolute inset-0 pointer-events-none"
                            style={{
                                background: `radial-gradient(600px circle at ${mouseX}px ${mouseY}px, rgba(168, 85, 247, 0.08), transparent 40%)`,
                            }}
                        />
                        <motion.div
                            className="absolute inset-0 pointer-events-none"
                            style={{
                                background: `radial-gradient(300px circle at ${mouseX}px ${mouseY}px, rgba(34, 211, 238, 0.06), transparent 60%)`,
                            }}
                        />
                    </>
                )}

                <div className="max-w-4xl mx-auto relative">
                    <motion.div
                        className="space-y-8 sm:space-y-12"
                        variants={{
                            animate: {
                                transition: {
                                    staggerChildren: 0.15,
                                },
                            },
                        }}
                        initial="initial"
                        animate="animate"
                    >
                        <motion.div style={{ y: y1, opacity, scale }}>
                            <PerspectiveText className="text-3xl sm:text-5xl md:text-7xl font-light leading-tight">
                                <motion.h1>
                                    {"jez".split("").map((letter, index) => (
                                        <motion.span
                                            key={index}
                                            initial={{ opacity: 0, y: 50 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{
                                                duration: 0.6,
                                                delay: index * 0.05,
                                            }}
                                            className="inline-block bg-linear-to-r from-slate-100 to-slate-50 bg-clip-text text-transparent"
                                            whileHover={{
                                                scale: 1.2,
                                                color: "#38bdf8",
                                                textShadow:
                                                    "0 0 20px rgba(56, 189, 248, 0.8)",
                                            }}
                                        >
                                            {letter === " " ? "\u00A0" : letter}
                                        </motion.span>
                                    ))}
                                </motion.h1>
                            </PerspectiveText>
                        </motion.div>

                        <motion.div style={{ y: y2 }}>
                            <MorphingText
                                texts={[
                                    "future statistician",
                                    "honkai: star rail player",
                                    "sleepyhead",
                                    "rustacean",
                                    "isko",
                                ]}
                                className="text-sm sm:text-base md:text-lg text-slate-100 font-light"
                            />
                        </motion.div>

                        <motion.div
                            className="text-xs sm:text-sm md:text-base text-slate-200 font-light max-w-3xl leading-relaxed"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 1 }}
                        >
                            <TypingAnimation
                                text="a bs stat student at up diliman. trailblazing into the imperfect tomorrow."
                                className="text-xs sm:text-sm md:text-base text-slate-200 font-light"
                            />
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            <section
                id="about"
                className="py-16 sm:py-20 px-4 sm:px-8 relative"
            >
                <GlowEffect delay={0} />
                <div className="max-w-4xl mx-auto relative z-10">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 1 }}
                        viewport={{ once: true, margin: "-100px" }}
                        className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-12 md:gap-16"
                    >
                        {[
                            {
                                title: "about",
                                content:
                                    "currently unwrapping problems. constantly negotiating with the borrow checker to create things that are as beautiful as they are bulletproof.",
                                delay: 0.2,
                            },
                            {
                                title: "skills",
                                items: [
                                    { label: "rust" },
                                    { label: "javascript" },
                                    { label: "typescript" },
                                    { label: "web development" },
                                    { label: "R" },
                                    { label: "python" },
                                ],
                                delay: 0.4,
                            },
                            {
                                title: "interests",
                                items: [
                                    { label: "honkai: star rail" },
                                    { label: "statistics" },
                                    { label: "data science" },
                                    { label: "kpop" },
                                ],
                                delay: 0.3,
                            },
                            {
                                title: "contact",
                                content: "links",
                                delay: 0.6,
                            },
                        ].map((section, _) => (
                            <motion.div
                                key={section.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{
                                    duration: 0.8,
                                    delay: section.delay,
                                }}
                                viewport={{ once: true }}
                                className="group"
                            >
                                <motion.h2
                                    className="text-xs sm:text-sm font-medium bg-linear-to-r from-cyan-200 to-purple-200 bg-clip-text text-transparent mb-4 sm:mb-6 relative"
                                    whileHover={{
                                        x: 4,
                                        rotateY: isMobile ? 0 : 5,
                                        scale: 1.05,
                                    }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 400,
                                        damping: 25,
                                    }}
                                    style={{
                                        transformStyle: isMobile
                                            ? "flat"
                                            : "preserve-3d",
                                    }}
                                >
                                    {section.title}
                                    <motion.div
                                        className="absolute -left-2 top-0 w-1 h-full bg-linear-to-b from-cyan-400 to-purple-400"
                                        initial={{ scaleY: 0 }}
                                        whileInView={{ scaleY: 1 }}
                                        transition={{
                                            duration: 0.6,
                                            delay: section.delay + 0.2,
                                        }}
                                        style={{ originY: 0 }}
                                    />
                                </motion.h2>

                                {section.title === "contact" ? (
                                    <div className="space-y-3">
                                        {[
                                            {
                                                icon: Mail,
                                                label: "email",
                                                href: "mailto:mail@j3z.dev",
                                            },
                                            {
                                                icon: SiGithub,
                                                label: "github",
                                                href: "https://github.com/jzeuzs",
                                            },
                                            {
                                                icon: SiOrcid,
                                                label: "orcid",
                                                href: "https://orcid.org/0009-0001-4302-7946",
                                            },
                                        ].map((contact, contactIndex) => (
                                            <MagneticCursor key={contact.label}>
                                                <motion.a
                                                    href={contact.href}
                                                    className="flex items-center gap-3 text-xs sm:text-sm text-slate-300 hover:text-cyan-300 transition-colors duration-300 group"
                                                    initial={{
                                                        opacity: 0,
                                                        x: -20,
                                                    }}
                                                    whileInView={{
                                                        opacity: 1,
                                                        x: 0,
                                                    }}
                                                    transition={{
                                                        duration: 0.6,
                                                        delay:
                                                            section.delay +
                                                            0.3 +
                                                            contactIndex * 0.1,
                                                    }}
                                                    viewport={{ once: true }}
                                                    whileHover={{
                                                        x: 4,
                                                        scale: 1.02,
                                                    }}
                                                >
                                                    <motion.div
                                                        whileHover={{
                                                            rotate: 360,
                                                            scale: 1.2,
                                                        }}
                                                        transition={{
                                                            duration: 0.6,
                                                        }}
                                                    >
                                                        <contact.icon className="w-4 h-4" />
                                                    </motion.div>
                                                    {contact.label}
                                                </motion.a>
                                            </MagneticCursor>
                                        ))}
                                    </div>
                                ) : "items" in section ? (
                                    <div className="flex flex-wrap gap-2">
                                        {section.items?.map(
                                            (item, itemIndex) => (
                                                <motion.div
                                                    key={item.label}
                                                    className="relative overflow-hidden"
                                                    initial={{
                                                        opacity: 0,
                                                        scale: 0.8,
                                                    }}
                                                    whileInView={{
                                                        opacity: 1,
                                                        scale: 1,
                                                    }}
                                                    transition={{
                                                        duration: 0.5,
                                                        delay:
                                                            section.delay +
                                                            0.3 +
                                                            itemIndex * 0.05,
                                                    }}
                                                    viewport={{ once: true }}
                                                >
                                                    <motion.div
                                                        className="px-3 py-1.5 rounded-full bg-slate-900/50 border border-slate-800 text-xs text-slate-300 font-light cursor-default"
                                                        whileHover={{
                                                            borderColor:
                                                                "#38bdf8",
                                                            backgroundColor:
                                                                "rgba(56, 189, 248, 0.15)",
                                                        }}
                                                        transition={{
                                                            duration: 0.3,
                                                        }}
                                                    >
                                                        <span>
                                                            {item.label}
                                                        </span>
                                                        <motion.div
                                                            className="absolute bottom-0 left-0 h-px w-0 group-hover:w-full bg-linear-to-r from-cyan-400 to-purple-400"
                                                            transition={{
                                                                duration: 0.3,
                                                            }}
                                                        />
                                                    </motion.div>
                                                </motion.div>
                                            ),
                                        )}
                                    </div>
                                ) : (
                                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                                        {section.content as string}
                                    </p>
                                )}
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            <section id="work" className="py-16 sm:py-20 px-4 sm:px-8 relative">
                <GlowEffect delay={3} />
                <div className="max-w-4xl mx-auto relative z-10">
                    <motion.h2
                        className="text-xs sm:text-sm font-medium bg-linear-to-r from-cyan-200 to-purple-200 bg-clip-text text-transparent mb-8 sm:mb-12 relative"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <motion.span
                            initial={{ width: 0 }}
                            whileInView={{ width: "100%" }}
                            transition={{ duration: 1, delay: 0.5 }}
                            className="absolute -bottom-2 left-0 h-px bg-linear-to-r from-cyan-400 via-purple-400 to-transparent"
                        />
                        selected work
                    </motion.h2>

                    <motion.div
                        className="space-y-8 sm:space-y-12"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 1 }}
                        viewport={{ once: true }}
                    >
                        {[
                            {
                                title: "website-screenshot",
                                description:
                                    "📸 website screenshots as a service",
                                github: "https://github.com/jzeuzs/website-screenshot",
                                languages: ["rust"],
                                tech: "actix-web, chromedriver, redis",
                            },
                            {
                                title: "normality",
                                description:
                                    "a Rust crate for assessing the normality of a data sample",
                                github: "https://github.com/jzeuzs/normality",
                                languages: ["rust"],
                                tech: "shapiro-wilk test, etc.",
                            },
                            {
                                title: "thread-amount",
                                description:
                                    "get the amount of threads in the current process",
                                github: "https://github.com/jzeuzs/thread-amount",
                                languages: ["rust"],
                                tech: "os syscalls",
                            },
                        ].map((project, index) => (
                            <MagneticCursor key={project.title}>
                                <motion.div
                                    className="group cursor-pointer relative overflow-hidden"
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{
                                        duration: 0.8,
                                        delay: index * 0.1,
                                    }}
                                    viewport={{ once: true }}
                                    whileHover={{ x: isMobile ? 0 : 8 }}
                                >
                                    <motion.div
                                        className="absolute inset-0 bg-linear-to-r from-purple-500/10 to-transparent"
                                        initial={{ x: "-100%" }}
                                        whileHover={{ x: "0%" }}
                                        transition={{
                                            duration: 0.6,
                                            ease: "easeOut",
                                        }}
                                    />
                                    <motion.div
                                        className="absolute inset-0 bg-linear-to-r from-transparent via-cyan-400/10 to-transparent"
                                        initial={{ x: "-100%" }}
                                        whileHover={{ x: "100%" }}
                                        transition={{
                                            duration: 1,
                                            ease: "easeOut",
                                            delay: 0.2,
                                        }}
                                    />

                                    <div className="relative flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4 py-6 border-b border-purple-500/20">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-4 mb-2">
                                                <motion.h3
                                                    className="text-sm sm:text-base font-medium text-slate-100 group-hover:text-cyan-300 transition-colors duration-300"
                                                    whileHover={{
                                                        scale: 1.02,
                                                        rotateX: isMobile
                                                            ? 0
                                                            : 5,
                                                    }}
                                                    style={{
                                                        transformStyle: isMobile
                                                            ? "flat"
                                                            : "preserve-3d",
                                                    }}
                                                >
                                                    {project.title}
                                                </motion.h3>
                                                <motion.a
                                                    href={project.github}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="pointer-events-auto"
                                                >
                                                    <SiGithub className="w-4 h-4 text-slate-400 group-hover:text-cyan-400 transition-colors duration-300 hover:scale-110" />
                                                </motion.a>
                                            </div>
                                            <motion.p
                                                className="text-xs sm:text-sm text-slate-300 font-light mb-2"
                                                initial={{ opacity: 0.7 }}
                                                whileHover={{ opacity: 1 }}
                                                transition={{ duration: 0.3 }}
                                            >
                                                {project.description}
                                            </motion.p>
                                            <div className="flex flex-wrap gap-2 mb-2">
                                                {project.languages.map(
                                                    (lang) => (
                                                        <motion.span
                                                            key={lang}
                                                            className="text-xs px-2 py-1 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-400/20 font-light"
                                                            whileHover={{
                                                                backgroundColor:
                                                                    "rgba(34, 211, 238, 0.2)",
                                                                scale: 1.05,
                                                            }}
                                                            transition={{
                                                                duration: 0.2,
                                                            }}
                                                        >
                                                            {lang}
                                                        </motion.span>
                                                    ),
                                                )}
                                            </div>
                                            <motion.p
                                                className="text-xs text-slate-400 font-light"
                                                initial={{ opacity: 0.5 }}
                                                whileHover={{ opacity: 0.8 }}
                                                transition={{ duration: 0.3 }}
                                            >
                                                {project.tech}
                                            </motion.p>
                                        </div>
                                    </div>
                                </motion.div>
                            </MagneticCursor>
                        ))}
                    </motion.div>
                </div>
            </section>

            <footer className="py-12 sm:py-16 px-4 sm:px-8 relative">
                <GlowEffect delay={6} />
                <motion.div
                    className="max-w-4xl mx-auto text-center relative z-10"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                    viewport={{ once: true }}
                >
                    <motion.div
                        className="absolute inset-0 pointer-events-none"
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                    >
                        <motion.div
                            className="absolute top-1/2 left-1/2 w-24 sm:w-32 h-px bg-linear-to-r from-transparent via-cyan-400/40 to-transparent transform -translate-x-1/2 -translate-y-1/2"
                            animate={{
                                opacity: [0.3, 0.8, 0.3],
                                scaleX: [1, 1.2, 1],
                            }}
                            transition={{
                                duration: 3,
                                repeat: Number.POSITIVE_INFINITY,
                                ease: "easeInOut",
                            }}
                        />
                    </motion.div>
                    <motion.p
                        className="text-xs text-slate-500 font-light relative z-10"
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        viewport={{ once: true }}
                    >
                        © 2025 jez • may this journey lead us starward
                    </motion.p>
                </motion.div>
            </footer>
        </div>
    );
}
