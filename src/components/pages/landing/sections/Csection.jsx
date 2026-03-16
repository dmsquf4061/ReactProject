import { motion } from "motion/react"
import { useEffect, useState } from "react"
import { useAppStore } from "@/store/appstore"

function CSection({ onOpenModal }) {
  const projects = [
    {
      id: "p1",
      title: "제목",
      desc: "설명을 쓰세요",
      image: "./images/Csection/img1.jpg",
      tags: ["React", "Motion", "UI"],
      href: "#",
    },
    {
      id: "p2",
      title: "제목",
      desc: "설명을 쓰세요",
      image: "./images/Csection/img2.jpg",
      tags: ["JS", "Turn.js", "Animation"],
      href: "#",
    },
    {
      id: "p3",
      title: "제목",
      desc: "설명을 쓰세요",
      image: "./images/Csection/img3.jpg",
      tags: ["React", "Motion", "UI"],
      href: "#",
    },
    {
      id: "p4",
      title: "제목",
      desc: "설명을 쓰세요",
      image: "./images/Csection/img4.jpg",
      tags: ["JS", "Turn.js", "Animation"],
      href: "#",
    },
    {
      id: "p5",
      title: "제목",
      desc: "설명을 쓰세요",
      image: "./images/Csection/img5.jpg",
      tags: ["React", "Motion", "UI"],
      href: "#",
    },
    {
      id: "p6",
      title: "제목",
      desc: "설명을 쓰세요",
      image: "./images/Csection/img6.jpg",
      tags: ["JS", "Turn.js", "Animation"],
      href: "#",
    },
  ]

  const introDone = useAppStore((s) => s.introDone)
  const [play, setPlay] = useState(false)

  const [viewport, setViewport] = useState({
    width: 1200,
    height: 800,
  })

  useEffect(() => {
    const onResize = () => {
      setViewport({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    onResize()
    window.addEventListener("resize", onResize)
    return () => window.removeEventListener("resize", onResize)
  }, [])

  useEffect(() => {
    if (!introDone) return
    setPlay(false)
    const raf = requestAnimationFrame(() => setPlay(true))
    return () => cancelAnimationFrame(raf)
  }, [introDone])

  const width = viewport.width
  const height = viewport.height

  const state = play ? "show" : "hidden"
  const EASE = [0.22, 1, 0.36, 1]

  const title = "Csection"
  const subtitle = "일부 프로젝트를 카드 형태로 정리했어요."

  const delayChildren = 0.15
  const stagger = 0.08
  const letterDuration = 0.18
  const subtitleDelay = delayChildren + title.length * stagger + letterDuration
  const cardsDelay = subtitleDelay + 0.3

  const listV = {
    hidden: {},
    show: {
      transition: {
        delayChildren: cardsDelay,
        staggerChildren: 0.22,
      },
    },
  }

  const cardV = {
    hidden: { opacity: 0, y: 26 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: EASE },
    },
  }

  const imageV = {
    hidden: { opacity: 0, scale: 1.05 },
    show: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8, ease: EASE },
    },
  }

  const titleClass =
    width < 360
      ? "text-5xl"
      : width < 768
        ? "text-5xl"
        : "text-8xl"

  const titlePadding =
      width < 768
        ? "pt-20 pb-6 px-6"
        : width < 1024
          ? "pt-30 pb-7 px-7"
          : "pt-50 pb-10 px-10"

  return (
    <section className="w-full h-full bg-stone-100 text-[var(--primary)] overflow-y-auto scroll-hidden">
      <div className={`${titlePadding} w-full`}>
        {/* 타이틀 */}
        <motion.div
          className={`${titleClass} font-black leading-none`}
          initial="hidden"
          animate={state}
          variants={{
            hidden: {},
            show: {
              transition: { delayChildren, staggerChildren: 0.06 },
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
                    ease: EASE,
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
          className="mt-3 text-sm opacity-70 md:text-base"
          initial={{ opacity: 0, y: 12 }}
          animate={state === "show" ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{ duration: 0.4, delay: subtitleDelay, ease: EASE }}
        >
          {subtitle}
        </motion.div>

        {/* 카드 리스트 */}
        <motion.div
          className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
          initial="hidden"
          animate={state}
          variants={listV}
        >
          {projects.map((p) => (
            <motion.button
              key={p.id}
              type="button"
              onClick={() => onOpenModal?.(p)}
              variants={cardV}
              className="group relative block overflow-hidden rounded-2xl bg-[var(--secondary)] shadow-sm cursor-pointer text-left"
              style={{ willChange: "transform, opacity" }}
            >
              {/* 이미지 */}
              <motion.div
                variants={imageV}
                className="relative aspect-square w-full overflow-hidden"
              >
                <img
                  src={p.image}
                  alt={p.title}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </motion.div>

              {/* hover 텍스트 */}
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
                <div className="text-[var(--secondary)]">
                  <div className="text-xl font-bold">{p.title}</div>
                  <div className="mt-2 text-sm leading-relaxed opacity-85">
                    {p.desc}
                  </div>

                  {p.tags?.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {p.tags.map((t) => (
                        <span
                          key={t}
                          className="rounded-full bg-white/15 px-3 py-1 text-xs font-medium text-[var(--secondary)]"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            </motion.button>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default CSection