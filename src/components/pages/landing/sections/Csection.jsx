import { motion } from "motion/react"
import { useEffect, useState } from "react"
import { useAppStore } from "@/store/appstore"

function CSection({ onOpenModal }) {
  const projects = [
    
    {
      id: "p1",
      title: "솔브케이 주식회사",
      period: "1 month (2024.10 – 2024.10)",
      desc: "기업 웹사이트를 퍼블리싱하고, IT 솔루션과 주요 서비스 정보를 웹 화면에 구현했습니다.",
      image: "./images/Csection/img1.png",
      tags: ["HTML", "CSS", "JavaScript", "swiper", "aos"],
      fontFamily: [{ name: "Pretendard", value: "Pretendard" }],
      colors: [
        { name: "Black", hex: "#0B0B0B" },
        { name: "Ivory", hex: "#C0C0C0" },
        { name: "Text", hex: "#FFFFFF" },
        { name: "Blue", hex: "#7DA4E7" },
        { name: "Yellow", hex: "#F9B311" },
      ],
      description:
        "IT 솔루션과 디지털 전환 서비스, GIS 솔루션 및 3D 디지털 콘텐츠를 소개하는 기업 웹사이트를 퍼블리싱했습니다. 서비스와 프로젝트 정보를 명확하게 전달하도록 화면을 구성하고, 다양한 디바이스 환경에 대응하는 반응형 레이아웃을 구현했습니다.",    
      modalImage: "./images/Csection/modal1.png",
      href: "https://solvek.co.kr/",
    },

    {
      id: "p2",
      title: "토끼런",
      period: "1 month (2024.11 – 2024.11)",
      desc: "웹 게임을 퍼블리싱하고, JavaScript를 활용해 게임 인터랙션과 화면 전환 기능을 구현했습니다.",
      image: "./images/Csection/img2.png",
      tags: ["HTML", "CSS", "JavaScript"],
      fontFamily: [{ name: "ChosunCentennial", value: "ChosunCentennial" }],
      colors: [
        { name: "Blue", hex: "#DCEBFA" },
        { name: "Primary Blue", hex: "#7EA3D8" },
        { name: "Light Blue", hex: "#C5D9F5" },
        { name: "Black", hex: "#20212A" },
        { name: "White", hex: "#FFFFFF" }
      ],
      description:
        "한국 전통문화 요소를 활용한 웹 게임을 퍼블리싱했습니다. JavaScript를 활용해 게임 인터랙션과 화면 전환 기능을 구현하고, 사용자가 게임을 순차적으로 진행할 수 있도록 구성했습니다.",      
      modalImage: "./images/Csection/modal2.png",
      href: "https://dmsquf4061.github.io/rabbit-run/",
    },
    {
      id: "p3",
      title: "제목",
      period: "1 month (2026.01 – 2026.02)",
      desc: "설명을 쓰세요",
      image: "./images/Csection/img3.png",
      tags: ["React", "Motion", "UI"],
      fontFamily: [{ name: "Pretendard", value: "Pretendard" }],
      colors: [
        { name: "Background", hex: "#0B0B0B" },
        { name: "Text", hex: "#FFFFFF" },
      ],
      description:
        "Improved usability by simplifying layout and enhancing scroll-based interactions for smoother user flow.",
      modalImage: "./images/Csection/modal3.png",
      href: "https://aid.mcee.go.kr/pos/",
    },
    {
      id: "p4",
      title: "개인 대시보드",
      period: "1 month (2026.01 – 2026.02)",
      desc: "취향과 일상을 기록하고 좋아하는 콘텐츠를 모아두는 개인용 반응형 웹페이지",
      image: "./images/Csection/img4.png",
      tags: ["HTML", "CSS", "JavaScript", "swiper", "React", "GSAP"],
      fontFamily: [{ name: "Pretendard", value: "Pretendard" }],
      colors: [
        { name: "Background", hex: "#D9D9D9" },
        { name: "Text", hex: "#222222" },
      ],
      description:
        "React를 활용해 메모 작성 및 수정, 이미지 컬렉션, 웹툰 캐러셀, 캘린더, 음악 플레이어, 테마 변경 기능을 갖춘 개인용 대시보드를 구현했습니다. Swiper를 활용해 콘텐츠 탐색과 슬라이드 인터랙션을 구현하고, GSAP으로 애니메이션 효과를 적용했으며, 데스크톱과 모바일 환경에 대응하는 반응형 레이아웃을 구성했습니다.",
      modalImage: "./images/Csection/modal4.png",
      href: "https://dmsquf4061.github.io/React01/",
    },
    {
      id: "p5",
      title: "KAT MACONIE 크림 토너 패드",
      period: "1 month (2026.01 – 2026.02)",
      desc: "제품 기획부터 상세페이지 디자인까지 전 과정을 진행하고, AI 이미지 생성 도구를 활용해 제품의 특성과 사용감을 시각적으로 표현했습니다.",
      image: "./images/Csection/img5.png",
      tags: ["Branding", "Product Design", "AI", "Visual Design"],
      fontFamily: [{ name: "Pretendard", value: "Pretendard" }],
      colors: [
        { name: "Background", hex: "#015fa5" },
        { name: "Blue", hex: "#0877C9" },
        { name: "Light Blue", hex: "#b2d2ed" },
        { name: "Gray", hex: "#efefef" },
        { name: "White", hex: "#fff" },
      ],
      description:
        "KAT MACONIE 크림 토너 패드의 제품 기획부터 상세페이지 디자인까지 전 과정을 진행했습니다. 제품의 핵심 가치인 수분 진정과 보습을 중심으로 콘텐츠 구조와 비주얼 방향을 설계하고, ChatGPT를 활용해 제품 연출 이미지와 제형 이미지를 제작했습니다. 블루 컬러를 중심으로 제품의 청량감과 보습감을 전달하고, 제품 특징과 성분 정보를 직관적으로 이해할 수 있도록 상세페이지를 구성했습니다.",
      modalImage: "./images/Csection/modal5.png",
      href: "#",
    },
    {
      id: "p6",
      title: "제목",
      period: "1 month (2026.01 – 2026.02)",
      desc: "설명을 쓰세요",
      image: "./images/Csection/img6.jpg",
      tags: ["React", "Motion", "UI"],
      fontFamily: [{ name: "Pretendard", value: "Pretendard" }],
      colors: [
        { name: "Background", hex: "#0B0B0B" },
        { name: "Text", hex: "#FFFFFF" },
      ],
      description:
        "Improved usability by simplifying layout and enhancing scroll-based interactions for smoother user flow.",
      modalImage: "./images/Csection/modal6.png",
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

  const title = "PROJECTS"
  const subtitle = "실무 경험을 바탕으로 완성한 프로젝트와 디자인을 담았습니다."

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
      ? "text-4xl"
      : width < 768
        ? "text-5xl"
        : "text-8xl"

  const titlePadding =
      width < 768
        ? "pt-20 pb-4 px-4"
        : width < 1024
          ? "pt-30 pb-6 px-6"
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
          className="mt-10 grid grid-cols-1 gap-4 md:gap-6 md:grid-cols-2 lg:grid-cols-3"
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