"use client"

import { motion } from "motion/react"
import { useEffect, useState } from "react"
import { useAppStore } from "@/store/appStore"

function WorkSection() {
  const introDone = useAppStore((s) => s.introDone)

  // ✅ Work 섹션 "진입 시점"부터 애니메이션 시작 트리거
  const [play, setPlay] = useState(false)
  useEffect(() => {
    if (!introDone) return
    setPlay(false)
    const raf = requestAnimationFrame(() => setPlay(true))
    return () => cancelAnimationFrame(raf)
  }, [introDone])

  const state = play ? "show" : "hidden"
  const EASE = [0.22, 1, 0.36, 1]

  // ✅ HomeSection과 동일한 패턴(타이틀/서브타이틀)
  const title = "Work"
  const subtitle = "일부 프로젝트를 카드 형태로 정리했어요."

  // 타이틀 애니메이션 리듬(느리게)
  const delayChildren = 0.15
  const stagger = 0.12
  const letterDuration = 0.22

  // ✅ 타이틀 끝난 뒤 서브타이틀 시작
  const subtitleDelay = delayChildren + title.length * stagger + letterDuration

  // ✅ 그 다음 카드 시작(서브타이틀이 살짝 나온 뒤)
  const cardsDelay = subtitleDelay + 0.35

  const projects = [
    {
      id: "p1",
      title: "토끼런",
      desc: "명부전 기반 퍼즐/디펜스 + 맵 서비스로 이어지는 인터랙티브 콘텐츠",
      image: "/works/rabbitrun.jpg",
      tags: ["React", "Motion", "UI"],
      href: "#",
    },
    {
      id: "p2",
      title: "너의 별 (eBook)",
      desc: "페이지 타입별 이미지/영상/텍스트 조건 렌더링 + 애니메이션",
      image: "/works/yourstar.jpg",
      tags: ["JS", "Turn.js", "Animation"],
      href: "#",
    },
  ]

  // ✅ 카드 리스트(천천히)
  const listV = {
    hidden: {},
    show: {
      transition: {
        delayChildren: cardsDelay,
        staggerChildren: 0.22,
      },
    },
  }

  // ✅ 카드 자체
  const cardV = {
    hidden: { opacity: 0, y: 26 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
  }

  // ✅ 이미지 등장
  const imageV = {
    hidden: { opacity: 0, scale: 1.05 },
    show: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: EASE } },
  }

  return (
    <section className="w-full h-full bg-stone-100 text-amber-950">
      <div className="w-full h-full px-6 md:px-30 py-20 md:py-30">
        {/* ✅ 타이틀(글자) */}
        <motion.div
          className="text-5xl font-bold"
          initial="hidden"
          animate={state}
          variants={{
            hidden: {},
            show: { transition: { delayChildren, staggerChildren: stagger } },
          }}
        >
          {Array.from(title).map((ch, i) => (
            <motion.span
              key={`${ch}-${i}`}
              style={{ display: "inline-block" }}
              variants={{
                hidden: { opacity: 0, y: 12 },
                show: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: letterDuration, ease: EASE },
                },
              }}
            >
              {ch === " " ? "\u00A0" : ch}
            </motion.span>
          ))}
        </motion.div>

        {/* ✅ 서브타이틀(문장 통째로) */}
        <motion.div
          className="mt-3 text-base opacity-70"
          initial={{ opacity: 0, y: 12 }}
          animate={state === "show" ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{ duration: 0.45, delay: subtitleDelay, ease: EASE }}
        >
          {subtitle}
        </motion.div>

        {/* ✅ 카드 리스트(서브타이틀 이후 천천히) */}
        <motion.div
          className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 justify-center"
          initial="hidden"
          animate={state}
          variants={listV}
        >
          {projects.map((p) => (
            <motion.a
              key={p.id}
              href={p.href}
              variants={cardV}
              className="group relative block overflow-hidden rounded-2xl bg-white shadow-sm"
              style={{ willChange: "transform, opacity" }}
            >
              {/* 이미지 */}
              <motion.div
                variants={imageV}
                className="relative aspect-[1/1] w-full overflow-hidden"
              >
                <img
                  src={p.image}
                  alt={p.title}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </motion.div>

              {/* ✅ hover에서만 폰트 등장 */}
              <motion.div
                className="absolute inset-0 flex flex-col justify-end p-5"
                initial={{ opacity: 0, y: 14 }}
                whileHover={{ opacity: 1, y: 0 }}
                whileFocus={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease: EASE }}
                style={{
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.65), rgba(0,0,0,0))",
                  willChange: "transform, opacity",
                }}
              >
                <div className="text-white">
                  <div className="text-xl font-bold">{p.title}</div>
                  <div className="mt-2 text-sm opacity-85 leading-relaxed">
                    {p.desc}
                  </div>

                  {p.tags?.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {p.tags.map((t) => (
                        <span
                          key={t}
                          className="rounded-full bg-white/15 px-3 py-1 text-xs font-medium text-white"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default WorkSection