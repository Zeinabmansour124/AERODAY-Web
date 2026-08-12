import React, { useRef, useEffect, useState, useCallback, MouseEvent } from "react";

// Import des images
import im1 from "../../../assets/images/50.jpg";
import im2 from "../../../assets/images/40.jpg";
import im3 from "../../../assets/images/36.jpg";
import im4 from "../../../assets/images/35.jpg";
import im5 from "../../../assets/images/34.jpg";
import im6 from "../../../assets/images/33.jpg";
import im7 from "../../../assets/images/18.jpg";
import im8 from "../../../assets/images/17.jpg";
import im9 from "../../../assets/images/16.jpeg";
import im10 from "../../../assets/images/19.jpeg";
import im11 from "../../../assets/images/20.jpeg";
import im12 from "../../../assets/images/22.jpg";
import im13 from "../../../assets/images/30.jpg";
import im14 from "../../../assets/images/31.jpg";
import im15 from "../../../assets/images/32.jpg";
import im16 from "../../../assets/images/15.jpeg";
import im17 from "../../../assets/images/14.jpeg";
import im18 from "../../../assets/images/13.jpeg";
import im19 from "../../../assets/images/12.jpeg";
import im20 from "../../../assets/images/11.jpeg";
import im21 from "../../../assets/images/10.jpeg";
import im22 from "../../../assets/images/9.jpeg";
import im23 from "../../../assets/images/8.jpeg";
import im24 from "../../../assets/images/7.jpeg";
import im25 from "../../../assets/images/6.jpeg";
import im26 from "../../../assets/images/5.jpg";
import im27 from "../../../assets/images/4.jpg";
import im28 from "../../../assets/images/3.jpg";
import im29 from "../../../assets/images/1.jpg";
import im30 from "../../../assets/images/2.jpg";

// ============================================================
//  TYPES
// ============================================================
interface Star {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  twinkle: number;
  twinkleSpeed: number;
}

interface Trail {
  x: number;
  y: number;
  angle: number;
  speed: number;
  radius: number;
  length: number;
  opacity: number;
}

interface ImageItem {
  src: string;
}

// ============================================================
//  STYLES
// ============================================================
const styles = {
  canvas: {
    position: "absolute" as const,
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: 0,
  },
  section: {
    position: "relative" as const,
    width: "100%",
    minHeight: "400px",
    background: "linear-gradient(180deg, #030712 0%, #0f172a 40%, #1e1b4b 70%, #0f172a 100%)",
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden" as const,
    padding: "20px 0",
  },
  container: {
    position: "relative" as const,
    zIndex: 1,
    width: "100%",
    maxWidth: "1200px",
  },
  title: {
    textAlign: "center" as const,
    color: "#F4F5F7",
    fontSize: "clamp(22px, 3vw, 36px)",
    fontWeight: 500,
    marginBottom: "20px",
    letterSpacing: "-0.01em",
  },
  carouselWrapper: {
    position: "relative" as const,
    width: "100%",
    height: "380px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    perspective: "1200px",
    overflow: "hidden" as const,
    userSelect: "none" as const,
  },
  slide: {
    position: "absolute" as const,
    width: "280px",
    height: "190px",
    borderRadius: "16px",
    overflow: "hidden" as const,
    transformStyle: "preserve-3d" as const,
  },
  slideImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover" as const,
    pointerEvents: "none" as const,
  },
  navButton: {
    position: "absolute" as const,
    top: "50%",
    transform: "translateY(-50%)",
    zIndex: 20,
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    border: "1px solid rgba(255,255,255,0.2)",
    background: "rgba(0,0,0,0.3)",
    color: "#fff",
    fontSize: "18px",
    cursor: "pointer",
    backdropFilter: "blur(4px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.2s ease",
  },
  navButtonLeft: {
    left: "20px",
  },
  navButtonRight: {
    right: "20px",
  },
  dotsContainer: {
    position: "absolute" as const,
    bottom: "15px",
    display: "flex",
    gap: "8px",
    zIndex: 20,
  },
  dot: {
    height: "8px",
    borderRadius: "4px",
    border: "none",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
  dotActive: {
    width: "28px",
    background: "#06b6d4",
  },
  dotInactive: {
    width: "8px",
    background: "rgba(255,255,255,0.3)",
  },
  progressBar: {
    position: "absolute" as const,
    bottom: 0,
    left: 0,
    right: 0,
    height: "2px",
    background: "rgba(255,255,255,0.05)",
    zIndex: 20,
  },
  progressFill: {
    height: "100%",
    background: "linear-gradient(90deg, #06b6d4, #3b82f6)",
    borderRadius: "0 2px 2px 0",
  },
};

// ============================================================
//  AEROSPACE BACKGROUND — Constellation Canvas
// ============================================================
const AerospaceCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationRef = useRef<number | null>(null);
  const particlesRef = useRef<Star[]>([]);
  const trailsRef = useRef<Trail[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = (): void => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const STAR_COUNT = 100;
    const CONNECTION_DIST = 140;
    const stars: Star[] = [];

    for (let i = 0; i < STAR_COUNT; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.15,
        radius: Math.random() * 1.2 + 0.4,
        twinkle: Math.random() * Math.PI * 2,
        twinkleSpeed: Math.random() * 0.02 + 0.005,
      });
    }
    particlesRef.current = stars;

    const trails: Trail[] = [];
    for (let i = 0; i < 5; i++) {
      trails.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        angle: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.003 + 0.001,
        radius: Math.random() * 80 + 40,
        length: Math.random() * 60 + 30,
        opacity: Math.random() * 0.15 + 0.05,
      });
    }
    trailsRef.current = trails;

    const animate = (): void => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const W = canvas.width;
      const H = canvas.height;

      ctx.strokeStyle = "rgba(6, 182, 212, 0.03)";
      ctx.lineWidth = 0.5;
      for (let x = 0; x < W; x += 60) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, H);
        ctx.stroke();
      }
      for (let y = 0; y < H; y += 60) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(W, y);
        ctx.stroke();
      }

      trailsRef.current.forEach((trail) => {
        trail.angle += trail.speed;
        const cx = trail.x + Math.cos(trail.angle) * trail.radius;
        const cy = trail.y + Math.sin(trail.angle) * trail.radius * 0.4;
        const px = trail.x + Math.cos(trail.angle - 0.3) * trail.radius;
        const py = trail.y + Math.sin(trail.angle - 0.3) * trail.radius * 0.4;

        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.lineTo(cx, cy);
        ctx.strokeStyle = `rgba(6, 182, 212, ${trail.opacity})`;
        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(cx, cy, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(6, 182, 212, ${trail.opacity * 2})`;
        ctx.fill();
      });

      const p = particlesRef.current;
      for (let i = 0; i < p.length; i++) {
        p[i].x += p[i].vx;
        p[i].y += p[i].vy;
        p[i].twinkle += p[i].twinkleSpeed;

        if (p[i].x < 0) p[i].x = W;
        if (p[i].x > W) p[i].x = 0;
        if (p[i].y < 0) p[i].y = H;
        if (p[i].y > H) p[i].y = 0;

        const alpha = 0.3 + Math.sin(p[i].twinkle) * 0.25;
        ctx.beginPath();
        ctx.arc(p[i].x, p[i].y, p[i].radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(165, 200, 255, ${alpha})`;
        ctx.fill();
      }

      for (let i = 0; i < p.length; i++) {
        for (let j = i + 1; j < p.length; j++) {
          const dx = p[i].x - p[j].x;
          const dy = p[i].y - p[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECTION_DIST) {
            ctx.beginPath();
            ctx.moveTo(p[i].x, p[i].y);
            ctx.lineTo(p[j].x, p[j].y);
            const lineAlpha = 0.08 * (1 - dist / CONNECTION_DIST);
            ctx.strokeStyle = `rgba(100, 180, 255, ${lineAlpha})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return <canvas ref={canvasRef} style={styles.canvas} />;
};

// ============================================================
//  3D COVER FLOW CAROUSEL — Auto-play
// ============================================================
const images: ImageItem[] = [
  { src: im1 },
  { src: im2 },
  { src: im3 },
  { src: im4 },
  { src: im5 },
  { src: im6 },
  { src: im7 },
  { src: im8 },
  { src: im9 },
  { src: im10 },
  { src: im11 },
  { src: im12 },
  { src: im13 },
  { src: im14 },
  { src: im15 },
  { src: im16 },
  { src: im17 },
  { src: im18 },
  { src: im19 },
  { src: im20 },
  { src: im21 },
  { src: im22 },
  { src: im23 },
  { src: im24 },
  { src: im25 },
  { src: im26 },
  { src: im27 },
  { src: im28 },
  { src: im29 },
  { src: im30 },
];

const AUTOPLAY_DELAY = 2000; // Réduit à 2 secondes

interface SlideStyle {
  transform: string;
  opacity: number;
  zIndex: number;
  filter: string;
  transition: string;
}

const CoverFlowCarousel: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(3);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [startX, setStartX] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  const goTo = useCallback((index: number): void => {
    setActiveIndex((prev) => {
      if (index < 0) return images.length - 1;
      if (index >= images.length) return 0;
      return index;
    });
  }, []);

  const handlePrev = (): void => goTo(activeIndex - 1);
  const handleNext = (): void => goTo(activeIndex + 1);

  useEffect(() => {
    if (isPaused || isDragging) {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
      return;
    }
    autoPlayRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % images.length);
    }, AUTOPLAY_DELAY);

    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [isPaused, isDragging]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent): void => {
      if (e.key === "ArrowLeft") {
        goTo(activeIndex - 1);
        setIsPaused(true);
        setTimeout(() => setIsPaused(false), 5000);
      }
      if (e.key === "ArrowRight") {
        goTo(activeIndex + 1);
        setIsPaused(true);
        setTimeout(() => setIsPaused(false), 5000);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [activeIndex, goTo]);

  const handleMouseDown = (e: MouseEvent<HTMLDivElement>): void => {
    setIsDragging(true);
    setStartX(e.clientX);
    setIsPaused(true);
  };

  const handleMouseUp = (e: MouseEvent<HTMLDivElement>): void => {
    if (!isDragging) return;
    setIsDragging(false);
    const diff = e.clientX - startX;
    if (diff > 50) goTo(activeIndex - 1);
    else if (diff < -50) goTo(activeIndex + 1);
    setTimeout(() => setIsPaused(false), 3000);
  };

  const getSlideStyle = (index: number): SlideStyle => {
    const diff = index - activeIndex;
    const absD = Math.abs(diff);
    const isActive = diff === 0;

    let translateX = diff * 200;
    let translateZ = isActive ? 0 : -180 - absD * 70;
    let rotateY = diff * -25;
    let scale = isActive ? 1 : 0.7 - absD * 0.05;
    let opacity = isActive ? 1 : 0.4 - absD * 0.1;
    let zIndex = 10 - absD;
    let brightness = isActive ? "brightness(100%)" : `brightness(${60 - absD * 10}%)`;

    if (absD > 3) {
      opacity = 0;
      scale = 0.3;
    }

    return {
      transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
      opacity: Math.max(0, opacity),
      zIndex,
      filter: brightness,
      transition: "all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
    };
  };

  return (
    <div
      style={{
        ...styles.carouselWrapper,
        cursor: isDragging ? "grabbing" : "grab",
      }}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={() => { setIsDragging(false); setIsPaused(false); }}
      onMouseEnter={() => setIsPaused(true)}
    >
      {images.map((img, i) => (
        <div
          key={i}
          style={{
            ...styles.slide,
            boxShadow: i === activeIndex
              ? "0 25px 50px -12px rgba(0,0,0,0.5), 0 0 30px rgba(6,182,212,0.15)"
              : "0 10px 30px -10px rgba(0,0,0,0.3)",
            ...getSlideStyle(i),
          }}
        >
          <img
            src={img.src}
            alt={`Slide ${i + 1}`}
            style={styles.slideImage}
            draggable={false}
          />
        </div>
      ))}

      <button
        onClick={() => { handlePrev(); setIsPaused(true); setTimeout(() => setIsPaused(false), 5000); }}
        style={{
          ...styles.navButton,
          ...styles.navButtonLeft,
        }}
        onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(0,0,0,0.5)"; e.currentTarget.style.borderColor = "rgba(6,182,212,0.5)"; }}
        onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(0,0,0,0.3)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)"; }}
      >
        ‹
      </button>
      <button
        onClick={() => { handleNext(); setIsPaused(true); setTimeout(() => setIsPaused(false), 5000); }}
        style={{
          ...styles.navButton,
          ...styles.navButtonRight,
        }}
        onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(0,0,0,0.5)"; e.currentTarget.style.borderColor = "rgba(6,182,212,0.5)"; }}
        onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(0,0,0,0.3)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)"; }}
      >
        ›
      </button>

      <div style={styles.dotsContainer}>
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => { goTo(i); setIsPaused(true); setTimeout(() => setIsPaused(false), 5000); }}
            style={{
              ...styles.dot,
              ...(i === activeIndex ? styles.dotActive : styles.dotInactive),
            }}
          />
        ))}
      </div>

      <div style={styles.progressBar}>
        <div
          style={{
            ...styles.progressFill,
            width: isPaused ? "0%" : "100%",
            transition: isPaused ? "none" : `width ${AUTOPLAY_DELAY}ms linear`,
          }}
        />
      </div>
    </div>
  );
};

// ============================================================
//  MAIN SECTION — Aerospace Theme
// ============================================================
const AerospaceHeroSection: React.FC = () => {
  return (
    <section className="mb-5" style={styles.section}>
      <AerospaceCanvas />

      <div style={styles.container}>
        <h2 style={styles.title}>
          Editions Précédente
        </h2>
        
        <CoverFlowCarousel />
      </div>
    </section>
  );
};

export default AerospaceHeroSection;