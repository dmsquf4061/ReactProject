import { AnimatePresence, motion, useScroll, useTransform } from "motion/react"
import { useEffect, useMemo, useRef, useState } from "react"

function DSection() {
  const text = "DSection"

  const [pos, setPos] = useState({ x: -9999, y: -9999 })
  const [showSpotlight, setShowSpotlight] = useState(false)

  const [formState, setFormState] = useState({
    name: "",
    replyTo: "",
    message: "",
  })

  const touchTimerRef = useRef(null)
  const scrollContainerRef = useRef(null)
  const imageSectionRef = useRef(null)
  const spotlightRef = useRef(null)

  const slides = [
    [
      { id: 1, image: "./images/Dsection/img1.jpg", title: "제목 1", desc: "설명 1" },
      { id: 2, image: "./images/Dsection/img2.jpg", title: "제목 2", desc: "설명 2" },
      { id: 3, image: "./images/Dsection/img3.jpg", title: "제목 3", desc: "설명 3" },
      { id: 4, image: "./images/Dsection/img4.jpg", title: "제목 4", desc: "설명 4" },
      { id: 5, image: "./images/Dsection/img5.jpg", title: "제목 5", desc: "설명 5" },
      { id: 6, image: "./images/Dsection/img6.jpg", title: "제목 6", desc: "설명 6" },
      { id: 7, image: "./images/Dsection/img7.jpg", title: "제목 7", desc: "설명 7" },
      { id: 8, image: "./images/Dsection/img8.jpg", title: "제목 8", desc: "설명 8" },
      { id: 9, image: "./images/Dsection/img9.jpg", title: "제목 9", desc: "설명 9" },
      { id: 10, image: "./images/Dsection/img10.jpg", title: "제목 10", desc: "설명 10" },
    ],
    [
      { id: 1, image: "./images/Dsection/img1.jpg", title: "제목 1", desc: "설명 1" },
      { id: 2, image: "./images/Dsection/img2.jpg", title: "제목 2", desc: "설명 2" },
      { id: 3, image: "./images/Dsection/img3.jpg", title: "제목 3", desc: "설명 3" },
      { id: 4, image: "./images/Dsection/img4.jpg", title: "제목 4", desc: "설명 4" },
      { id: 5, image: "./images/Dsection/img5.jpg", title: "제목 5", desc: "설명 5" },
      { id: 6, image: "./images/Dsection/img6.jpg", title: "제목 6", desc: "설명 6" },
      { id: 7, image: "./images/Dsection/img7.jpg", title: "제목 7", desc: "설명 7" },
      { id: 8, image: "./images/Dsection/img8.jpg", title: "제목 8", desc: "설명 8" },
      { id: 9, image: "./images/Dsection/img9.jpg", title: "제목 9", desc: "설명 9" },
      { id: 10, image: "./images/Dsection/img10.jpg", title: "제목 10", desc: "설명 10" },
    ],
  ]

  const sentence = `
여기는 내가 원하는 대로 줄을 나눌 수 있습니다.
엔터를 치면 그대로 줄바꿈이 유지됩니다.

여기는 한 줄 비운 문단입니다.

이런 식으로 자유롭게 텍스트를 구성할 수 있습니다.
`.trim()

  const [viewportSize, setViewportSize] = useState({ width: 1200, height: 800 })

  useEffect(() => {
    const onResize = () => {
      setViewportSize({ width: window.innerWidth, height: window.innerHeight })
    }
    onResize()
    window.addEventListener("resize", onResize)
    return () => window.removeEventListener("resize", onResize)
  }, [])

  useEffect(() => {
    return () => {
      if (touchTimerRef.current) {
        clearTimeout(touchTimerRef.current)
        touchTimerRef.current = null
      }
    }
  }, [])

  useEffect(() => {
    const el = spotlightRef.current
    if (!el) return

    const onTouchStart = (e) => {
      const touch = e.touches[0]
      if (!touch) return
      const rect = el.getBoundingClientRect()
      setPos({ x: touch.clientX - rect.left, y: touch.clientY - rect.top })
      setShowSpotlight(true)
      if (touchTimerRef.current) clearTimeout(touchTimerRef.current)
      touchTimerRef.current = setTimeout(() => {
        setShowSpotlight(false)
        setPos({ x: -9999, y: -9999 })
      }, 350)
    }

    const onTouchEnd = () => {
      if (touchTimerRef.current) clearTimeout(touchTimerRef.current)
      touchTimerRef.current = setTimeout(() => {
        setShowSpotlight(false)
        setPos({ x: -9999, y: -9999 })
      }, 180)
    }

    const onTouchCancel = () => {
      if (touchTimerRef.current) {
        clearTimeout(touchTimerRef.current)
        touchTimerRef.current = null
      }
      setShowSpotlight(false)
      setPos({ x: -9999, y: -9999 })
    }

    el.addEventListener("touchstart", onTouchStart, { passive: true })
    el.addEventListener("touchend", onTouchEnd, { passive: true })
    el.addEventListener("touchcancel", onTouchCancel, { passive: true })

    return () => {
      el.removeEventListener("touchstart", onTouchStart)
      el.removeEventListener("touchend", onTouchEnd)
      el.removeEventListener("touchcancel", onTouchCancel)
    }
  }, [])

  const width = viewportSize.width

  const titleClass =
    width < 360 ? "text-4xl" : width < 768 ? "text-5xl" : "text-6xl"

  const titlePadding =
    width < 768 ? "pt-20 pb-6" : width < 1024 ? "pt-30 pb-6" : "pt-50 pb-10"

  const titleDelay = 0.15
  const titleStagger = 0.06
  const titleDuration = 0.22

  const glowSize =
    width < 640 ? 220 : width < 768 ? 280 : width < 1024 ? 340 : 400

  const glowHalf = glowSize / 2

  const spotlightRadius =
    width < 640 ? 130 : width < 768 ? 160 : width < 1024 ? 200 : 240

  const handleMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top })
    setShowSpotlight(true)
  }

  const handleLeave = () => {
    setPos({ x: -9999, y: -9999 })
    setShowSpotlight(false)
  }

  const spotlightMask = `radial-gradient(
    circle ${spotlightRadius}px at ${pos.x}px ${pos.y}px,
    rgba(0,0,0,1) 0%,
    rgba(0,0,0,0.95) 38%,
    rgba(0,0,0,0.75) 58%,
    rgba(0,0,0,0.45) 76%,
    rgba(0,0,0,0.18) 90%,
    rgba(0,0,0,0) 100%
  )`

  const { scrollYProgress } = useScroll({
    container: scrollContainerRef,
    target: imageSectionRef,
    offset: ["start end", "end start"],
  })

 const imageScale = useTransform(
  scrollYProgress,
  [0, 0.5, 0.8, 1],
  [1, 1, 2.5, 4]
)
  const imageOpacity = useTransform(scrollYProgress, [0, 0.5, 0.7, 1], [1, 1, 0, 0])
const imageRadius = useTransform(
  imageScale,
  [1.1, 1.7],
  [40, 0]
)
  const overlayTextOpacity = useTransform(scrollYProgress, [0.5, 0.7, 1], [0, 1, 1])
  // const overlayTextY = useTransform(scrollYProgress, [0.5, 0.7, 1], [40, 0, 0])

  const handleFormChange = (e) => {
    const { name, value } = e.target
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  const isFormComplete = useMemo(() => {
    return (
      formState.name.trim() !== "" &&
      formState.replyTo.trim() !== "" &&
      formState.message.trim() !== ""
    )
  }, [formState])

  return (
    <section
      ref={scrollContainerRef}
      className="w-full h-[100svh] bg-[var(--primary)] text-[var(--secondary)] overflow-y-auto overflow-x-hidden scroll-hidden overscroll-y-none touch-pan-y"
      style={{
        WebkitOverflowScrolling: "touch",
        overscrollBehaviorY: "none",
        touchAction: "pan-y",
      }}
    >
      <style>{`
        input:-webkit-autofill,
        input:-webkit-autofill:hover,
        input:-webkit-autofill:focus,
        textarea:-webkit-autofill,
        textarea:-webkit-autofill:hover,
        textarea:-webkit-autofill:focus {
          -webkit-box-shadow: 0 0 0 1000px #0b0b0b inset !important;
          -webkit-text-fill-color: #ffffff !important;
          caret-color: #ffffff !important;
          border-radius: 0 !important;
          transition: background-color 9999s ease-out 0s;
        }
      `}</style>

      <div className={`${titlePadding} w-full flex flex-col gap-20`}>

        {/* ── 타이틀 ── */}
        <motion.div
          className={`${titleClass} font-black leading-none`}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.45 }}
          variants={{
            hidden: {},
            show: {
              transition: { delayChildren: titleDelay, staggerChildren: titleStagger },
            },
          }}
        >
          {Array.from(text).map((ch, i) => (
            <motion.span
              key={i}
              className="inline-block"
              variants={{
                hidden: { opacity: 0, y: 18 },
                show: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: titleDuration, ease: [0.22, 1, 0.36, 1] },
                },
              }}
            >
              {ch}
            </motion.span>
          ))}
        </motion.div>

        {/* ── 이미지 확대/투명도 섹션 ── */}
        {/* ✅ 핵심 수정: 부모에 flex + items-center로 수평 중앙 정렬 컨텍스트 생성 */}
        <section
          ref={imageSectionRef}
          className="relative h-[180vh] md:h-[300vh] w-full flex flex-col items-center"
        >
          {/* ✅ sticky div에 max-w-[1280px] 추가 → 1280px 이상에서 이미지 폭 고정 */}
          <div className="sticky top-0 h-screen w-full overflow-hidden">

            {/* 오버레이 텍스트 */}
            <motion.div
              style={{ opacity: overlayTextOpacity, }}
              className="absolute inset-0 z-0 flex items-center justify-center px-6 text-center"
            >
              <div className="max-w-5xl">
                <p className="text-3xl font-black md:text-6xl lg:text-7xl text-[var(--secondary)]">
                  DSection
                </p>
                <p className="mt-4 text-sm md:text-lg lg:text-xl text-[var(--secondary)]/80 whitespace-pre-wrap break-keep">
                  {sentence}
                </p>
              </div>
            </motion.div>

            {/* 확대/축소 이미지 */}
<motion.div
  style={{ scale: imageScale, opacity: imageOpacity }}
  className="absolute inset-0 z-10 flex items-center justify-center"
>
  <motion.div
    style={{ borderRadius: imageRadius }}
    className="w-[1280px] aspect-[16/9] overflow-hidden"
  >
    <img
      src="./images/Dsection/img1.jpg"
      alt="대표 이미지"
      className="w-full h-full object-cover"
      draggable="false"
    />
  </motion.div>
</motion.div>
          </div>
        </section>

        {/* ── 스포트라이트 텍스트 ── */}
        <motion.div
          className="relative flex flex-col items-center justify-center w-full min-h-screen overflow-hidden"
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.25 }}
          variants={{
            hidden: { opacity: 0, y: 70, scale: 0.96 },
            show: {
              opacity: 1,
              y: 0,
              scale: [0.96, 1.02, 1],
              transition: { staggerChildren: 0.12, duration: 0.65, ease: [0.22, 1, 0.36, 1] },
            },
          }}
        >
          <div
            ref={spotlightRef}
            className="relative w-full md:max-w-[1280px]"
            onMouseMove={handleMove}
            onMouseLeave={handleLeave}
          >
            <div
              className="pointer-events-none absolute rounded-full bg-white blur-[5px] md:blur-[15px] transition-opacity duration-150"
              style={{
                width: `${glowSize}px`,
                height: `${glowSize}px`,
                left: `${pos.x - glowHalf}px`,
                top: `${pos.y - glowHalf}px`,
                opacity: showSpotlight ? 1 : 0,
              }}
            />
            <div className="relative text-[var(--secondary)]/20 text-base leading-[1.45] sm:text-lg md:text-2xl lg:text-3xl xl:text-4xl whitespace-pre-wrap break-keep">
              {sentence}
            </div>
            <div
              className="pointer-events-none absolute inset-0 text-[var(--primary)] text-base leading-[1.45] sm:text-lg md:text-2xl lg:text-3xl xl:text-4xl whitespace-pre-wrap break-keep transition-opacity duration-150"
              style={{
                WebkitMaskImage: spotlightMask,
                maskImage: spotlightMask,
                WebkitMaskRepeat: "no-repeat",
                maskRepeat: "no-repeat",
                opacity: showSpotlight ? 1 : 0,
              }}
            >
              {sentence}
            </div>
          </div>
        </motion.div>

        {/* ── 캐러셀 ── */}
        <motion.div
          className="w-full flex flex-col gap-3 md:gap-4"
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.2 }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.12 } },
          }}
        >
          {/* 첫 번째 줄 */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 90, scale: 0.94 },
              show: {
                opacity: 1,
                y: 0,
                scale: [0.94, 1.03, 1],
                transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
              },
            }}
            className="rotate-10 brandlogoCarousel flex flex-nowrap w-full overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]"
          >
            <ul className="flex flex-shrink-0 gap-3 md:gap-4 pr-3 md:pr-4">
              {slides[0].map((item) => (
                <li key={item.id} className="flex-shrink-0 w-[150px] sm:w-[200px] md:w-[250px] lg:w-[300px] overflow-hidden rounded-sm md:rounded-lg">
                  <img className="block w-full h-full object-cover" src={item.image} alt={item.title} draggable="false" />
                </li>
              ))}
            </ul>
            <ul className="flex flex-shrink-0 gap-3 md:gap-4 pr-3 md:pr-4" aria-hidden>
              {slides[0].map((item) => (
                <li key={`copy-${item.id}`} className="flex-shrink-0 w-[150px] sm:w-[200px] md:w-[250px] lg:w-[300px] overflow-hidden rounded-sm md:rounded-lg">
                  <img className="block w-full h-full object-cover" src={item.image} alt={item.title} draggable="false" />
                </li>
              ))}
            </ul>
          </motion.div>

          {/* 두 번째 줄 */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 90, scale: 0.94 },
              show: {
                opacity: 1,
                y: 0,
                scale: [0.94, 1.03, 1],
                transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
              },
            }}
            className="-rotate-10 brandlogoCarousel reverse flex flex-nowrap w-full overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]"
          >
            <ul className="flex flex-shrink-0 gap-3 md:gap-4 pr-3 md:pr-4">
              {slides[1].map((item) => (
                <li key={item.id} className="flex-shrink-0 w-[150px] sm:w-[200px] md:w-[250px] lg:w-[300px] overflow-hidden rounded-sm md:rounded-lg">
                  <img className="block w-full h-full object-cover" src={item.image} alt={item.title} draggable="false" />
                </li>
              ))}
            </ul>
            <ul className="flex flex-shrink-0 gap-3 md:gap-4 pr-3 md:pr-4" aria-hidden>
              {slides[1].map((item) => (
                <li key={`copy-${item.id}`} className="flex-shrink-0 w-[150px] sm:w-[200px] md:w-[250px] lg:w-[300px] overflow-hidden rounded-sm md:rounded-lg">
                  <img className="block w-full h-full object-cover" src={item.image} alt={item.title} draggable="false" />
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

      </div>

      {/* ── Contact 섹션 ── */}
      <section className="w-full min-h-screen flex flex-col justify-center">
        <motion.div
          className="mx-auto flex w-full md:max-w-[1280px] px-4 md:px-6 flex-col justify-center gap-16 md:gap-20"
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.15 }}
          variants={{
            hidden: { opacity: 0, y: 60 },
            show: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
            },
          }}
        >
          <div className="flex flex-col gap-4 md:gap-5">
            <h2 className={`w-full ${titleClass} font-black leading-none`}>
              Contact
            </h2>
          </div>

          <div>
            <motion.div
              variants={{
                hidden: { opacity: 0, x: 30 },
                show: {
                  opacity: 1,
                  x: 0,
                  transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.2 },
                },
              }}
              className="mx-auto w-full text-left"
            >
              <div className="mt-4 h-px border-t border-t-[var(--muted)]" />

              <div className="border-b border-[var(--muted)] py-4">
                <div className="mb-2 text-xs text-[var(--muted)]">Name</div>
                <input
                  type="text"
                  name="name"
                  value={formState.name}
                  onChange={handleFormChange}
                  placeholder="Your name"
                  autoComplete="name"
                  className="w-full appearance-none border-0 bg-transparent text-sm text-white placeholder:text-[var(--muted)] focus:outline-none md:text-base"
                  style={{ backgroundColor: "transparent" }}
                />
              </div>

              <div className="border-b border-[var(--muted)] py-4">
                <div className="mb-2 text-xs text-[var(--muted)]">Email</div>
                <input
                  type="email"
                  name="replyTo"
                  value={formState.replyTo}
                  onChange={handleFormChange}
                  placeholder="your@email.com"
                  autoComplete="email"
                  className="w-full appearance-none border-0 bg-transparent text-sm text-white placeholder:text-[var(--muted)] focus:outline-none md:text-base"
                  style={{ backgroundColor: "transparent" }}
                />
              </div>

              <div className="border-b border-[var(--muted)] py-4">
                <div className="mb-2 text-xs text-[var(--muted)]">Message</div>
                <textarea
                  name="message"
                  value={formState.message}
                  onChange={handleFormChange}
                  placeholder="Write your message..."
                  rows={6}
                  className="w-full resize-none appearance-none border-0 bg-transparent text-sm text-white placeholder:text-[var(--muted)] focus:outline-none md:text-base"
                  style={{ backgroundColor: "transparent" }}
                />
              </div>

              <AnimatePresence mode="wait">
                {isFormComplete && (
                  <motion.div
                    key="contact-button-wrap"
                    className="mt-10 flex justify-center pb-10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <motion.button
                      type="button"
                      initial={{
                        opacity: 0,
                        clipPath: "inset(0 50% 0 50% round 50px)",
                      }}
                      animate={{
                        opacity: 1,
                        clipPath: "inset(0 0% 0 0% round 50px)",
                      }}
                      exit={{
                        opacity: 0,
                        clipPath: "inset(0 50% 0 50% round 50px)",
                      }}
                      transition={{
                        duration: 0.3,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      style={{ willChange: "clip-path, opacity, transform" }}
                      className="w-[200px] cursor-pointer rounded-full bg-white px-5 py-3 text-sm text-[var(--primary)] transition-colors duration-200 hover:bg-[var(--muted)] hover:text-white"
                    >
                      보내기
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>

            </motion.div>
          </div>
        </motion.div>
      </section>

    </section>
  )
}

export default DSection