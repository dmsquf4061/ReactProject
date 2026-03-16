import { motion } from "motion/react"
import { useEffect, useState } from "react"

function DSection() {
  const text = "DSection"
  const [pos, setPos] = useState({ x: -9999, y: -9999 })

  const slides = [
    [
      { id: 1, image: "./public/images/Dsection/img1.jpg", title: "제목 1", desc: "설명 1" },
      { id: 2, image: "./public/images/Dsection/img2.jpg", title: "제목 2", desc: "설명 2" },
      { id: 3, image: "./public/images/Dsection/img3.jpg", title: "제목 3", desc: "설명 3" },
      { id: 4, image: "./public/images/Dsection/img4.jpg", title: "제목 4", desc: "설명 4" },
      { id: 5, image: "./public/images/Dsection/img5.jpg", title: "제목 5", desc: "설명 5" },
      { id: 6, image: "./public/images/Dsection/img6.jpg", title: "제목 6", desc: "설명 6" },
      { id: 7, image: "./public/images/Dsection/img7.jpg", title: "제목 7", desc: "설명 7" },
      { id: 8, image: "./public/images/Dsection/img8.jpg", title: "제목 8", desc: "설명 8" },
      { id: 9, image: "./public/images/Dsection/img9.jpg", title: "제목 9", desc: "설명 9" },
      { id: 10, image: "./public/images/Dsection/img10.jpg", title: "제목 10", desc: "설명 10" },
    ],
    [
      { id: 1, image: "./public/images/Dsection/img1.jpg", title: "제목 1", desc: "설명 1" },
      { id: 2, image: "./public/images/Dsection/img2.jpg", title: "제목 2", desc: "설명 2" },
      { id: 3, image: "./public/images/Dsection/img3.jpg", title: "제목 3", desc: "설명 3" },
      { id: 4, image: "./public/images/Dsection/img4.jpg", title: "제목 4", desc: "설명 4" },
      { id: 5, image: "./public/images/Dsection/img5.jpg", title: "제목 5", desc: "설명 5" },
      { id: 6, image: "./public/images/Dsection/img6.jpg", title: "제목 6", desc: "설명 6" },
      { id: 7, image: "./public/images/Dsection/img7.jpg", title: "제목 7", desc: "설명 7" },
      { id: 8, image: "./public/images/Dsection/img8.jpg", title: "제목 8", desc: "설명 8" },
      { id: 9, image: "./public/images/Dsection/img9.jpg", title: "제목 9", desc: "설명 9" },
      { id: 10, image: "./public/images/Dsection/img10.jpg", title: "제목 10", desc: "설명 10" },
    ],
  ]

  const sentence = `
dkanadjfksjflksjflkjflksjfjslkfjsklfjslkjflskjflsjflsdkjflksjflksdjlkfjdslffsjfkdsljflksjflsjfldjflskjflsjflkdsjflsjlkjflksjfslkjflk
dkanadjfksjflksjflkjflksjfjslkfjsklfjslkjflskjflsjflsdkjflksjflksdjlkfjdslffsjfkdsljflksjflsjfldjflskjflsjflkdsjflsjlkjflksjfslkjflk
dkanadjfksjflksjflkjflksjfjslkfjsklfjslkjflskjflsjflsdkjflksjflksdjlkfjdslffsjfkdsljflksjflsjfldjflskjflsjflkdsjflsjlkjflksjfslkjflk
dkanadjfksjflksjflkjflksjfjslkfjsklfjslkjflskjflsjflsdkjflksjflksdjlkfjdslffsjfkdsljflksjflsjfldjflskjflsjflkdsjflsjlkjflksjfslkjflk
dkanadjfksjflksjflkjflksjfjslkfjsklfjslkjflskjflsjflsdkjflksjflksdjlkfjdslffsjfkdsljflksjflsjfldjflskjflsjflkdsjflsjlkjflksjfslkjflk
`.trim()

  const handleMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  const handleLeave = () => {
    setPos({ x: -9999, y: -9999 })
  }

  const spotlightMask = `radial-gradient(
    circle 240px at ${pos.x}px ${pos.y}px,
    rgba(0,0,0,1) 0%,
    rgba(0,0,0,0.95) 38%,
    rgba(0,0,0,0.75) 58%,
    rgba(0,0,0,0.45) 76%,
    rgba(0,0,0,0.18) 90%,
    rgba(0,0,0,0) 100%
  )`
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

  const width = viewport.width
  const height = viewport.height
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
    <section className="w-full h-full bg-[var(--primary)] text-[var(--secondary)] overflow-y-auto scroll-hidden">
      <div className={`${titlePadding} w-full`}>
        {/* 타이틀 */}
        <motion.div
          className={`${titleClass} font-black leading-none`}
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: {
              transition: { delayChildren: 0.15, staggerChildren: 0.06 },
            },
          }}
        >
          {Array.from(text).map((ch, i) => (
            <motion.span
              key={i}
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
              {ch}
            </motion.span>
          ))}
        </motion.div>

        {/* spotlight 텍스트 영역 */}
        <motion.div
          className="relative flex flex-col items-center justify-center w-full min-h-screen overflow-hidden"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          <div
            className="relative w-full"
            onMouseMove={handleMove}
            onMouseLeave={handleLeave}
          >
            {/* 배경 glow */}
            <div
              className="pointer-events-none absolute rounded-full bg-amber-300/50 blur-[20px]"
              style={{
                width: "440px",
                height: "440px",
                left: `${pos.x - 220}px`,
                top: `${pos.y - 220}px`,
              }}
            />

            {/* 기본 텍스트 */}
            <div className="relative text-[var(--secondary)]/20 text-base leading-[1.45] sm:text-lg md:text-2xl lg:text-3xl xl:text-4xl break-all whitespace-pre-wrap">
              {sentence}
            </div>

            {/* spotlight 안쪽 텍스트 */}
            <div
              className="pointer-events-none absolute inset-0 text-[var(--primary)] text-base leading-[1.45] sm:text-lg md:text-2xl lg:text-3xl xl:text-4xl break-all whitespace-pre-wrap"
              style={{
                WebkitMaskImage: spotlightMask,
                maskImage: spotlightMask,
                WebkitMaskRepeat: "no-repeat",
                maskRepeat: "no-repeat",
              }}
            >
              {sentence}
            </div>
          </div>
        </motion.div>

        {/* 슬라이드 영역 */}
        <motion.div
          className="w-full flex flex-col gap-4 rotate-6"
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: {
              transition: { delayChildren: 0.15, staggerChildren: 0.06 },
            },
          }}
        >
          {/* 첫 번째 줄 */}
          <div className="brandlogoCarousel flex flex-nowrap w-full overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
            <ul className="flex flex-shrink-0 gap-4 pr-4">
              {slides[0].map((item) => (
                <li
                  key={item.id}
                  className="flex-shrink-0 w-[180px] sm:w-[220px] md:w-[260px] lg:w-[300px] overflow-hidden rounded-sm md:rounded-lg"
                >
                  <img
                    className="block w-full h-full object-cover"
                    src={item.image}
                    alt={item.title}
                  />
                </li>
              ))}
            </ul>

            <ul className="flex flex-shrink-0 gap-4 pr-4" aria-hidden>
              {slides[0].map((item) => (
                <li
                  key={`copy-${item.id}`}
                  className="flex-shrink-0 w-[180px] sm:w-[220px] md:w-[260px] lg:w-[300px] overflow-hidden rounded-sm md:rounded-lg"
                >
                  <img
                    className="block w-full h-full object-cover"
                    src={item.image}
                    alt=""
                  />
                </li>
              ))}
            </ul>
          </div>

          {/* 두 번째 줄 */}
          <div className="brandlogoCarousel reverse flex flex-nowrap w-full overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
            <ul className="flex flex-shrink-0 gap-4 pr-4">
              {slides[1].map((item) => (
                <li
                  key={item.id}
                  className="flex-shrink-0 w-[180px] sm:w-[220px] md:w-[260px] lg:w-[300px] overflow-hidden rounded-sm md:rounded-lg"
                >
                  <img
                    className="block w-full h-full object-cover"
                    src={item.image}
                    alt={item.title}
                  />
                </li>
              ))}
            </ul>

            <ul className="flex flex-shrink-0 gap-4 pr-4" aria-hidden>
              {slides[1].map((item) => (
                <li
                  key={`copy-${item.id}`}
                  className="flex-shrink-0 w-[180px] sm:w-[220px] md:w-[260px] lg:w-[300px] overflow-hidden rounded-sm md:rounded-lg"
                >
                  <img
                    className="block w-full h-full object-cover"
                    src={item.image}
                    alt=""
                  />
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default DSection