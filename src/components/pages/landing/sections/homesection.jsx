"use client"

import { motion } from "motion/react"
import { useAppStore } from "@/store/appstore"

export default function HomeSection() {
  const introDone = useAppStore((s) => s.introDone)

  const title = "HomeSection"
  const subtitle = "프론트엔드 퍼블리셔 포트폴리오"

  const delayChildren = 0.15
  const stagger = 0.08
  const letterDuration = 0.18

  // ✅ 첫 줄 애니메이션 전체 시간
  const subtitleDelay = delayChildren + title.length * stagger + letterDuration

  return (
    <div className="w-full h-full bg-stone-900 text-white flex flex-col items-center justify-center gap-4">

      {/* 첫 번째 줄 (글자 애니메이션) */}
      <motion.div
        className="text-5xl font-bold"
        initial="hidden"
        animate={introDone ? "show" : "hidden"}
        variants={{
          hidden: {},
          show: {
            transition: {
              delayChildren,
              staggerChildren: stagger,
            },
          },
        }}
      >
        {Array.from(title).map((ch, i) => (
          <motion.span
            key={`${ch}-${i}`}
            style={{ display: "inline-block" }}
            variants={{
              hidden: { opacity: 0, y: 10 },
              show: {
                opacity: 1,
                y: 0,
                transition: {
                  duration: letterDuration,
                  ease: [0.22, 1, 0.36, 1],
                },
              },
            }}
          >
            {ch === " " ? "\u00A0" : ch}
          </motion.span>
        ))}
      </motion.div>

      {/* 두 번째 줄 (문장 전체 등장) */}
      <motion.div
        className="text-xl font-normal opacity-80"
        initial={{ opacity: 0, y: 12 }}
        animate={introDone ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
        transition={{
          duration: 0.4,
          delay: subtitleDelay, // ✅ 첫 줄 끝난 뒤 등장
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        {subtitle}
      </motion.div>

    </div>
  )
}