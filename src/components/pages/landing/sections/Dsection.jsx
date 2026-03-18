import { motion } from "motion/react"
import { useEffect, useRef, useState } from "react"

function DSection() {
  const text = "DSection"

  const [pos, setPos] = useState({ x: -9999, y: -9999 })
  const [showSpotlight, setShowSpotlight] = useState(false)

  const touchTimerRef = useRef(null)

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
    return () => {
      if (touchTimerRef.current) {
        clearTimeout(touchTimerRef.current)
        touchTimerRef.current = null
      }
    }
  }, [])

  const width = viewport.width

  const titleClass =
    width < 360 ? "text-4xl" : width < 768 ? "text-5xl" : "text-8xl"

  const titlePadding =
    width < 768
      ? "pt-20 pb-6"
      : width < 1024
        ? "pt-30 pb-6"
        : "pt-50 pb-10"

  const titleDelay = 0.15
  const titleStagger = 0.06
  const titleDuration = 0.22
  const spotlightDelay =
    titleDelay + (text.length - 1) * titleStagger + titleDuration

  const glowSize =
    width < 640
      ? 220
      : width < 768
        ? 280
        : width < 1024
          ? 340
          : 400

  const glowHalf = glowSize / 2

  const spotlightRadius =
    width < 640
      ? 130
      : width < 768
        ? 160
        : width < 1024
          ? 200
          : 240

  const handleMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()

    setPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
    setShowSpotlight(true)
  }

  const handleLeave = () => {
    setPos({ x: -9999, y: -9999 })
    setShowSpotlight(false)
  }

  const clearSpotlight = () => {
    if (touchTimerRef.current) {
      clearTimeout(touchTimerRef.current)
      touchTimerRef.current = null
    }

    setShowSpotlight(false)
    setPos({ x: -9999, y: -9999 })
  }

  const handleTouchSpotlight = (e) => {
    const touch = e.touches[0]
    if (!touch) return

    const rect = e.currentTarget.getBoundingClientRect()

    setPos({
      x: touch.clientX - rect.left,
      y: touch.clientY - rect.top,
    })
    setShowSpotlight(true)

    if (touchTimerRef.current) {
      clearTimeout(touchTimerRef.current)
    }

    touchTimerRef.current = setTimeout(() => {
      clearSpotlight()
    }, 350)
  }

  const handleTouchEnd = () => {
    if (touchTimerRef.current) {
      clearTimeout(touchTimerRef.current)
    }

    touchTimerRef.current = setTimeout(() => {
      clearSpotlight()
    }, 180)
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

  return (
    <section className="w-full h-full bg-[var(--primary)] text-[var(--secondary)] overflow-y-auto scroll-hidden">
      <div className={`${titlePadding} w-full`}>
        <motion.div
          className={`${titleClass} font-black leading-none`}
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: {
              transition: {
                delayChildren: titleDelay,
                staggerChildren: titleStagger,
              },
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
                    duration: titleDuration,
                    ease: [0.22, 1, 0.36, 1],
                  },
                },
              }}
            >
              {ch}
            </motion.span>
          ))}
        </motion.div>

        <motion.div
          className="relative flex flex-col items-center justify-center w-full min-h-screen overflow-hidden"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.4,
            delay: spotlightDelay,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <div
            className="relative w-full md:max-w-[1328px]"
            onMouseMove={handleMove}
            onMouseLeave={handleLeave}
            onTouchStart={handleTouchSpotlight}
            onTouchEnd={handleTouchEnd}
            onTouchCancel={clearSpotlight}
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

        <motion.div
          className="w-full flex flex-col gap-3 md:gap-4"
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: {
              transition: {
                delayChildren: spotlightDelay + 0.15,
                staggerChildren: 0.06,
              },
            },
          }}
        >
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 18 },
              show: {
                opacity: 1,
                y: 0,
                transition: {
                  duration: 0.35,
                  ease: [0.22, 1, 0.36, 1],
                },
              },
            }}
            className="brandlogoCarousel flex flex-nowrap w-full overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]"
          >
            <ul className="flex flex-shrink-0 gap-3 md:gap-4 pr-3 md:pr-4">
              {slides[0].map((item) => (
                <li
                  key={item.id}
                  className="flex-shrink-0 w-[150px] sm:w-[200px] md:w-[250px] lg:w-[300px] overflow-hidden rounded-sm md:rounded-lg"
                >
                  <img
                    className="block w-full h-full object-cover"
                    src={item.image}
                    alt={item.title}
                  />
                </li>
              ))}
            </ul>

            <ul className="flex flex-shrink-0 gap-3 md:gap-4 pr-3 md:pr-4" aria-hidden>
              {slides[0].map((item) => (
                <li
                  key={`copy-${item.id}`}
                  className="flex-shrink-0 w-[150px] sm:w-[200px] md:w-[250px] lg:w-[300px] overflow-hidden rounded-sm md:rounded-lg"
                >
                  <img
                    className="block w-full h-full object-cover"
                    src={item.image}
                    alt=""
                  />
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            variants={{
              hidden: { opacity: 0, y: 18 },
              show: {
                opacity: 1,
                y: 0,
                transition: {
                  duration: 0.35,
                  ease: [0.22, 1, 0.36, 1],
                },
              },
            }}
            className="brandlogoCarousel reverse flex flex-nowrap w-full overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]"
          >
            <ul className="flex flex-shrink-0 gap-3 md:gap-4 pr-3 md:pr-4">
              {slides[1].map((item) => (
                <li
                  key={item.id}
                  className="flex-shrink-0 w-[150px] sm:w-[200px] md:w-[250px] lg:w-[300px] overflow-hidden rounded-sm md:rounded-lg"
                >
                  <img
                    className="block w-full h-full object-cover"
                    src={item.image}
                    alt={item.title}
                  />
                </li>
              ))}
            </ul>

            <ul className="flex flex-shrink-0 gap-3 md:gap-4 pr-3 md:pr-4" aria-hidden>
              {slides[1].map((item) => (
                <li
                  key={`copy-${item.id}`}
                  className="flex-shrink-0 w-[150px] sm:w-[200px] md:w-[250px] lg:w-[300px] overflow-hidden rounded-sm md:rounded-lg"
                >
                  <img
                    className="block w-full h-full object-cover"
                    src={item.image}
                    alt=""
                  />
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default DSection