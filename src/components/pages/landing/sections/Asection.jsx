import { useEffect, useRef, useState } from "react"
import { motion } from "motion/react"
import { useAppStore } from "@/store/appstore"

export default function ASection() {
  const constraintsRef = useRef(null)
  const introDone = useAppStore((s) => s.introDone)

  const title = "ASection"
  const subtitle = "시안을 만드는 중입니다."

  const delayChildren = 0.15
  const stagger = 0.08
  const letterDuration = 0.18
  const subtitleDelay = delayChildren + title.length * stagger + letterDuration

  const [items, setItems] = useState([])

  useEffect(() => {
    const updateItems = () => {
      const vw = window.innerWidth
      const vh = window.innerHeight

      const size = vw < 640 ? 72 : vw < 768 ? 90 : 110
      const padding = 16

      const safeX = (ratio) => {
        const min = padding
        const max = vw - size - padding
        return Math.max(min, Math.min(max, vw * ratio))
      }

      const safeY = (ratio) => {
        const min = padding
        const max = vh - size - padding
        return Math.max(min, Math.min(max, vh * ratio))
      }

      setItems([
        { id: 1, src: "./images/Asection/img1.jpg", x: safeX(0.12), y: safeY(0.18) },
        { id: 2, src: "./images/Asection/img2.jpg", x: safeX(0.3), y: safeY(0.68) },
        { id: 3, src: "./images/Asection/img3.jpg", x: safeX(0.68), y: safeY(0.72) },
        { id: 4, src: "./images/Asection/img4.jpg", x: safeX(0.82), y: safeY(0.42) },
        { id: 5, src: "./images/Asection/img5.jpg", x: safeX(0.7), y: safeY(0.14) },
      ])
    }

    updateItems()
    window.addEventListener("resize", updateItems)
    return () => window.removeEventListener("resize", updateItems)
  }, [])

  return (
    <div className="relative w-full h-full overflow-hidden bg-[var(--primary)] text-[var(--secondary)] flex flex-col items-center justify-center gap-4">
      
      {/* 제목 */}
      <motion.div
        className="z-10 text-6xl font-black"
        initial="hidden"
        animate={introDone ? "show" : "hidden"}
        variants={{
          hidden: {},
          show: {
            transition: { delayChildren: 0.15, staggerChildren: 0.06 },
          },
        }}
      >
        {Array.from(title).map((ch, i) => (
          <motion.span
            key={`${ch}-${i}`}
            className="inline-block"
            variants={{
              hidden: { opacity: 0, y: 16 },
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
        className="z-10 text-xl font-normal opacity-80"
        initial={{ opacity: 0, y: 12 }}
        animate={introDone ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
        transition={{
          duration: 0.4,
          delay: subtitleDelay,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        {subtitle}
      </motion.div>

      {/* 드래그 이미지 */}
      <div ref={constraintsRef} className="absolute inset-0 overflow-hidden">
        {items.map((item) => (
          <motion.img
            key={item.id}
            src={item.src}
            drag
            dragConstraints={constraintsRef}
            dragElastic={0.12}
            dragMomentum={false}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{
              opacity: introDone ? 1 : 0,
              scale: introDone ? 1 : 0.9,
            }}
            whileHover={{
              scale: [1, 1.15, 1],   // ⭐ 커졌다가 작아짐
            }}
            whileTap={{
              scale: 0.92,
            }}
            transition={{
              duration: 0.35,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="absolute w-[72px] h-[72px] sm:w-[90px] sm:h-[90px] md:w-[110px] md:h-[110px] object-contain cursor-grab active:cursor-grabbing select-none"
            style={{
              left: item.x,
              top: item.y,
            }}
          />
        ))}
      </div>
    </div>
  )
}