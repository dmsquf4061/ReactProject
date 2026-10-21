
import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { useAppStore } from "@/store/appstore";

const IMAGE_DATA = [
  { id: 1, src: "./images/Asection/img1.png", x: 8, y: 20, w: 18, rotate: -15 },
  { id: 2, src: "./images/Asection/img2.png", x: 25, y: 52, w: 14, rotate: 6 },
  { id: 3, src: "./images/Asection/img3.png", x: 70, y: 48, w: 12, rotate: 0 },
  { id: 4, src: "./images/Asection/img4.png", x: 80, y: 38, w: 10, rotate: 9 },
  { id: 5, src: "./images/Asection/img5.png", x: 28, y: 22, w: 18, rotate: 0 },
  { id: 6, src: "./images/Asection/img6.png", x: 10, y: 48, w: 22, rotate:  6},
  { id: 7, src: "./images/Asection/img7.png", x: 45, y: 25, w: 11, rotate: -7 },
  { id: 8, src: "./images/Asection/img8.png", x: 55, y: 15, w: 16, rotate: 0 },
  { id: 9, src: "./images/Asection/img9.png", x: 70, y: 22, w: 13, rotate: 6 },
  { id: 10, src: "./images/Asection/img10.png", x: 8, y: 40, w: 13, rotate: -4 },
  { id: 11, src: "./images/Asection/img11.png", x: 20, y: 20, w: 11, rotate: 5 },
  { id: 12, src: "./images/Asection/img12.png", x: 40, y: 50, w: 20, rotate: -5 },
];

export default function ASection() {
  const constraintsRef = useRef(null);
  const introDone = useAppStore((s) => s.introDone);
  const [viewport, setViewport] = useState({ width: 1200, height: 800 });

  useEffect(() => {
    const updateViewport = () => {
      setViewport({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    updateViewport();
    window.addEventListener("resize", updateViewport);

    return () => window.removeEventListener("resize", updateViewport);
  }, []);

  const { width: vw, height: vh } = viewport;
  const isMobile = vw < 640;
  const isTablet = vw >= 640 && vw < 1024;

  // 모바일은 2열에 가까운 분산 배치, 태블릿·데스크톱은 넓은 배치
  const mobilePositions = [
    { x: 5, y: 17, w: 34 },
    { x: 57, y: 19, w: 29 },
    { x: 8, y: 40, w: 27 },
    { x: 65, y: 43, w: 29 },
    { x: 37, y: 30, w: 27 },
    { x: 5, y: 65, w: 22 },
    { x: 38, y: 70, w: 23 },
    { x: 69, y: 68, w: 25 },
  ];

  const tabletPositions = [
    { x: 5, y: 20, w: 22 },
    { x: 26, y: 65, w: 17 },
    { x: 68, y: 64, w: 20 },
    { x: 83, y: 34, w: 13 },
    { x: 68, y: 10, w: 21 },
    { x: 5, y: 48, w: 13 },
    { x: 43, y: 77, w: 11 },
    { x: 86, y: 73, w: 12 },
  ];

  const desktopPositions = IMAGE_DATA;

  const positions = isMobile
    ? mobilePositions
    : isTablet
      ? tabletPositions
      : desktopPositions;

  const titleSize = isMobile
    ? "clamp(3.2rem, 13vw, 5.5rem)"
    : isTablet
      ? "clamp(6rem, 12vw, 9rem)"
      : "clamp(8rem, 15vw, 18.75rem)";

  return (
    <section className="relative h-full min-h-screen w-full overflow-hidden bg-[#151515] text-white">
      {/* 중앙 타이틀 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={
          introDone
            ? { opacity: 1, y: 0 }
            : { opacity: 0, y: 20 }
        }
        transition={{
          duration: 0.7,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="
          pointer-events-none absolute left-1/2 top-1/2 z-10
          w-max max-w-none -translate-x-1/2 -translate-y-1/2
          whitespace-nowrap font-normal leading-none
        "
        style={{
          fontSize: titleSize,
          transform: `translate(-50%, -50%) rotate(${isMobile ? 0 : 4}deg)`,
        }}
      >
        PORTFOLIO
      </motion.div>

      {/* 드래그 가능한 이미지 */}
      <div
        ref={constraintsRef}
        className="absolute inset-0 z-20 overflow-hidden"
      >
        {positions.map((pos, index) => {
          const item = IMAGE_DATA[index];

          return (
            <motion.img
              key={item.id}
              src={item.src}
              alt=""
              draggable={false}
              drag
              dragConstraints={constraintsRef}
              dragElastic={0.08}
              dragMomentum={false}
              dragSnapToOrigin
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{
                opacity: introDone ? 1 : 0,
                scale: introDone ? 1 : 0.85,
              }}
              whileHover={{ scale: 1.04, zIndex: 30 }}
              whileTap={{ scale: 0.97, zIndex: 30 }}
              transition={{
                duration: 0.35,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="
                absolute h-auto max-w-none object-contain
                cursor-grab select-none active:cursor-grabbing
                touch-none
              "
              style={{
                left: `${pos.x}%`,
                top: `${pos.y}%`,
                width: `${pos.w}%`,
                rotate: `${item.rotate}deg`,
                transform: "translate(-50%, -50%)",
              }}
            />
          );
        })}
      </div>

      {/* 하단 연도 */}
      <div className="absolute bottom-5 left-5 z-30 text-xs text-white/30 sm:bottom-8 sm:left-8 sm:text-base">
        WORKS 2024–2026
      </div>

      {/* 하단 슬로건 */}
      <div className="absolute bottom-5 right-5 z-30 text-right text-[10px] font-normal text-white/30 sm:bottom-8 sm:right-8 sm:text-sm md:text-base">
        <div>DESIGN WITH INTENTION.</div>
        <div>BUILT WITH PURPOSE.</div>
      </div>
    </section>
  );
}
