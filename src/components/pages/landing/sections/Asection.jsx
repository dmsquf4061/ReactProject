import { useEffect, useRef, useState } from "react"
import { motion } from "motion/react"
import { useAppStore } from "@/store/appstore"

export default function ASection() {
  const constraintsRef = useRef(null)
  const introDone = useAppStore((s) => s.introDone)

  const title = "PORTFOLIO"
  const subtitle = "디자인과 구현을 함께하는 웹디자이너 고은별입니다."

  const delayChildren = 0.15
  const stagger = 0.08
  const letterDuration = 0.18

  const subtitleDelay =
    delayChildren + title.length * stagger + letterDuration

  const [items, setItems] = useState([])

  useEffect(() => {
    const updateItems = () => {
      const vw = window.innerWidth
      const vh = window.innerHeight

      // 화면 크기에 따라 전체 이미지 크기 조절
      const responsiveScale =
        vw < 640 ? 0.55 :
        vw < 1024 ? 0.75 :
        1

      setItems([
        {
          id: 1,
          src: "./images/Asection/img1.png", // 코드 글라스
          x: vw * 0.08,
          y: vh * 0.11,
          width: 330 * responsiveScale, // 230 → 330
        },
        {
          id: 2,
          src: "./images/Asection/img2.png", // 실버 오브젝트
          x: vw * 0.25,
          y: vh * 0.66,
          width: 180 * responsiveScale,
        },
        {
          id: 3,
          src: "./images/Asection/img3.png", // Figma
          x: vw * 0.68,
          y: vh * 0.68,
          width: 220 * responsiveScale,
        },
        {
          id: 4,
          src: "./images/Asection/img4.png", // </> 키캡
          x: vw * 0.83,
          y: vh * 0.38,
          width: 180 * responsiveScale,
        },
        {
          id: 5,
          src: "./images/Asection/img5.png", // Design and Code 종이
          x: vw * 0.67,
          y: vh * 0.08,
          width: 280 * responsiveScale,
        },

        // 추가 오브젝트
        {
          id: 6,
          src: "./images/Asection/img6.png",
          x: vw * 0.08,
          y: vh * 0.48,
          width: 130 * responsiveScale,
        },
        {
          id: 7,
          src: "./images/Asection/img7.png",
          x: vw * 0.43,
          y: vh * 0.76,
          width: 110 * responsiveScale,
        },
        {
          id: 8,
          src: "./images/Asection/img8.png",
          x: vw * 0.88,
          y: vh * 0.72,
          width: 140 * responsiveScale,
        },
      ])
    }

    updateItems()

    window.addEventListener("resize", updateItems)

    return () => {
      window.removeEventListener("resize", updateItems)
    }
  }, [])

  return (
    <div
      className="
        relative
        w-full
        h-full
        overflow-hidden
        bg-[var(--primary)]
        text-[var(--secondary)]
        flex
        flex-col
        items-center
        justify-center
        gap-4
      "
    >

      {/* 제목 */}
      <motion.div
        className="
          relative
          z-20
          text-4xl
          sm:text-5xl
          md:text-6xl
          font-black
          tracking-[0.025em]
          pointer-events-none
        "
        initial="hidden"
        animate={introDone ? "show" : "hidden"}
        variants={{
          hidden: {},
          show: {
            transition: {
              delayChildren: 0.15,
              staggerChildren: 0.06,
            },
          },
        }}
      >
        {Array.from(title).map((ch, i) => (
          <motion.span
            key={`${ch}-${i}`}
            className="inline-block"
            variants={{
              hidden: {
                opacity: 0,
                y: 16,
              },

              show: {
                opacity: 1,
                y: 0,

                transition: {
                  duration: 0.22,
                  ease: [0.22, 1, 0.36, 1],
                },
              },
            }}
          >
            {ch === " " ? "\u00A0" : ch}
          </motion.span>
        ))}
      </motion.div>


      {/* 서브타이틀 */}
      <motion.div
        className="
          relative
          z-20
          text-sm
          sm:text-base
          md:text-xl
          font-normal
          pointer-events-none
        "
        initial={{
          opacity: 0,
          y: 12,
        }}
        animate={
          introDone
            ? {
                opacity: 0.8,
                y: 0,
              }
            : {
                opacity: 0,
                y: 12,
              }
        }
        transition={{
          duration: 0.4,
          delay: subtitleDelay,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        {subtitle}
      </motion.div>


      {/* 드래그 이미지 */}
      <div
        ref={constraintsRef}
        className="absolute inset-0 overflow-hidden"
      >
        {items.map((item) => (
          <motion.img
            key={item.id}
            src={item.src}

            drag
            dragConstraints={constraintsRef}
            dragElastic={0.12}
            dragMomentum={false}

            initial={{
              opacity: 0,
              scale: 0.85,
            }}

            animate={{
              opacity: introDone ? 1 : 0,
              scale: introDone ? 1 : 0.85,
            }}

            whileHover={{
              scale: 1.08,
              zIndex: 30,
            }}

            whileTap={{
              scale: 0.95,
              zIndex: 30,
            }}

            transition={{
              duration: 0.35,
              ease: [0.22, 1, 0.36, 1],
            }}

            className="
              absolute
              h-auto
              object-contain
              cursor-grab
              active:cursor-grabbing
              select-none
              touch-none
            "

            style={{
              left: item.x,
              top: item.y,

              // ⭐ 여기서 각 이미지 크기 적용
              width: item.width,
            }}
          />
        ))}
      </div>
    </div>
  )
}