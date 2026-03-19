import { motion, useScroll, useTransform } from "motion/react"
import { useEffect, useRef, useState } from "react"

function DSection() {
  // 타이틀에 한 글자씩 뿌릴 텍스트
  const text = "DSection"

  // 스포트라이트 위치값
  const [pos, setPos] = useState({ x: -9999, y: -9999 })

  // 스포트라이트 표시 여부
  const [showSpotlight, setShowSpotlight] = useState(false)

  // 터치 후 잠깐 보였다가 사라지게 할 타이머
  const touchTimerRef = useRef(null)

  // 이 섹션 자체가 스크롤되는 컨테이너
  const scrollContainerRef = useRef(null)

  // 이미지 확대/투명도 효과를 걸 구간
  const imageSectionRef = useRef(null)

  // 캐러셀 이미지 데이터
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

  // 스포트라이트 아래 깔릴 문장
  const sentence = `
여기는 내가 원하는 대로 줄을 나눌 수 있습니다.
엔터를 치면 그대로 줄바꿈이 유지됩니다.

여기는 한 줄 비운 문단입니다.

이런 식으로 자유롭게 텍스트를 구성할 수 있습니다.
`.trim()

  // 화면 크기 저장용 state
  const [viewportSize, setViewportSize] = useState({
    width: 1200,
    height: 800,
  })

  // 화면 크기 바뀔 때 반응형 값 다시 계산
  useEffect(() => {
    const onResize = () => {
      setViewportSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    onResize()
    window.addEventListener("resize", onResize)
    return () => window.removeEventListener("resize", onResize)
  }, [])

  // 컴포넌트 사라질 때 터치 타이머 정리
  useEffect(() => {
    return () => {
      if (touchTimerRef.current) {
        clearTimeout(touchTimerRef.current)
        touchTimerRef.current = null
      }
    }
  }, [])

  const width = viewportSize.width

  // 타이틀 글자 크기 반응형
  const titleClass =
    width < 360 ? "text-4xl" : width < 768 ? "text-5xl" : "text-8xl"

  // 상단 여백 반응형
  const titlePadding =
    width < 768
      ? "pt-20 pb-6"
      : width < 1024
        ? "pt-30 pb-6"
        : "pt-50 pb-10"

  // 타이틀 한 글자씩 등장 타이밍
  const titleDelay = 0.15
  const titleStagger = 0.06
  const titleDuration = 0.22

  // 스포트라이트 빛 번짐 크기
  const glowSize =
    width < 640
      ? 220
      : width < 768
        ? 280
        : width < 1024
          ? 340
          : 400

  const glowHalf = glowSize / 2

  // 스포트라이트 원형 반경
  const spotlightRadius =
    width < 640
      ? 130
      : width < 768
        ? 160
        : width < 1024
          ? 200
          : 240

  // 마우스 움직일 때 스포트라이트 좌표 계산
  const handleMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()

    setPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
    setShowSpotlight(true)
  }

  // 마우스가 영역 밖으로 나가면 숨김
  const handleLeave = () => {
    setPos({ x: -9999, y: -9999 })
    setShowSpotlight(false)
  }

  // 스포트라이트 초기화
  const clearSpotlight = () => {
    if (touchTimerRef.current) {
      clearTimeout(touchTimerRef.current)
      touchTimerRef.current = null
    }

    setShowSpotlight(false)
    setPos({ x: -9999, y: -9999 })
  }

  // 터치 시작 시 스포트라이트 위치 표시
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

  // 터치 끝나면 약간 뒤에 스포트라이트 숨김
  const handleTouchEnd = () => {
    if (touchTimerRef.current) {
      clearTimeout(touchTimerRef.current)
    }

    touchTimerRef.current = setTimeout(() => {
      clearSpotlight()
    }, 180)
  }

  // 원형으로 텍스트가 드러나게 하는 마스크
  const spotlightMask = `radial-gradient(
    circle ${spotlightRadius}px at ${pos.x}px ${pos.y}px,
    rgba(0,0,0,1) 0%,
    rgba(0,0,0,0.95) 38%,
    rgba(0,0,0,0.75) 58%,
    rgba(0,0,0,0.45) 76%,
    rgba(0,0,0,0.18) 90%,
    rgba(0,0,0,0) 100%
  )`

  // 내부 스크롤 컨테이너 기준으로 이미지 섹션의 스크롤 진행값 계산
  const { scrollYProgress } = useScroll({
    container: scrollContainerRef,
    target: imageSectionRef,
    offset: ["start end", "end start"],
  })

  // 이미지가 먼저 화면에 꽉 차고, 그 뒤 더 커짐
  const imageScale = useTransform(
    scrollYProgress,
    [0.08, 0.5, 0.7, 1],
    [0.45, 1, 1.2, 1.2]
  )

  // 꽉 찬 뒤부터 사라지고, 마지막엔 0 상태 유지
  const imageOpacity = useTransform(
    scrollYProgress,
    [0, 0.5, 0.7, 1],
    [1, 1, 0, 0]
  )

  // 이미지 모서리가 둥글다가 꽉 차며 각지게
  const imageRadius = useTransform(scrollYProgress, [0.08, 0.5], [28, 0])

  // 이미지가 사라질 때 아래 텍스트가 나타나고 유지
  const overlayTextOpacity = useTransform(
    scrollYProgress,
    [0.5, 0.7, 1],
    [0, 1, 1]
  )

  // 텍스트가 아래에서 위로 살짝 올라오게
  const overlayTextY = useTransform(
    scrollYProgress,
    [0.5, 0.7, 1],
    [40, 0, 0]
  )

  return (
    <section
      ref={scrollContainerRef}
      className="w-full h-full bg-[var(--primary)] text-[var(--secondary)] overflow-y-auto scroll-hidden"
    >
      <div className={`${titlePadding} w-full`}>
        {/* 타이틀: 화면에 보일 때 한 글자씩 등장 */}
        <motion.div
          className={`${titleClass} font-black leading-none`}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.45 }}
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
                hidden: { opacity: 0, y: 18 },
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

        {/* 이미지 확대 + 투명도 전환 섹션 */}
        <section ref={imageSectionRef} className="relative h-[300vh] w-full">
          <div className="sticky top-0 h-screen w-full overflow-hidden">
            {/* 이미지 아래쪽에 숨어 있다가 드러나는 텍스트 */}
            <motion.div
              style={{
                opacity: overlayTextOpacity,
                y: overlayTextY,
              }}
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

            {/* 위에 덮인 이미지: 커지고 사라지면서 아래 글씨가 보이게 됨 */}
            <motion.div
              style={{
                scale: imageScale,
                opacity: imageOpacity,
                borderRadius: imageRadius,
              }}
              className="absolute inset-0 z-10 will-change-transform overflow-hidden"
            >
              <img
                src="./images/Dsection/img1.jpg"
                alt="대표 이미지"
                className="block h-full w-full object-cover"
              />
            </motion.div>
          </div>
        </section>

        {/* 스포트라이트 텍스트 영역 */}
        <motion.div
          className="flex justify-center relative w-full min-h-[70svh] md:min-h-[80svh] lg:min-h-screen py-12 md:py-20 lg:py-28 pb-40 md:pb-52 lg:pb-64 z-20"
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.25, root: scrollContainerRef }}
          variants={{
            hidden: { opacity: 0, y: 70, scale: 0.96 },
            show: {
              opacity: 1,
              y: 0,
              scale: [0.96, 1.02, 1],
              transition: {
                duration: 0.65,
                ease: [0.22, 1, 0.36, 1],
              },
            },
          }}
        >
          {/* 마우스 / 터치 기준 영역 */}
          <div
            className="relative w-full md:max-w-[1328px] px-4 md:px-6 z-20"
            onMouseMove={handleMove}
            onMouseLeave={handleLeave}
            onTouchStart={handleTouchSpotlight}
            onTouchEnd={handleTouchEnd}
            onTouchCancel={clearSpotlight}
          >
            {/* 마우스 위치를 따라다니는 빛 번짐 */}
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

            {/* 기본 문장: 연하게 깔리는 텍스트 */}
            <div className="relative text-[var(--secondary)]/20 text-base leading-[1.45] sm:text-lg md:text-2xl lg:text-3xl xl:text-4xl whitespace-pre-wrap break-keep">
              {sentence}
            </div>

            {/* 스포트라이트로만 선명하게 드러나는 텍스트 */}
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

        {/* 캐러셀 전체: 화면에 보일 때 한 줄씩 등장 */}
        <motion.div
          className="relative w-full flex flex-col gap-3 md:gap-4 mt-16 md:mt-24 lg:mt-32 z-10"
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.2, root: scrollContainerRef }}
          variants={{
            hidden: {},
            show: {
              transition: {
                staggerChildren: 0.12,
              },
            },
          }}
        >
          {/* 첫 번째 줄 캐러셀 */}
          <motion.div
            style={{ willChange: "transform" }}
            variants={{
              hidden: { opacity: 0, y: 90, scale: 0.94 },
              show: {
                opacity: 1,
                y: 0,
                scale: [0.94, 1.03, 1],
                transition: {
                  duration: 0.7,
                  ease: [0.22, 1, 0.36, 1],
                },
              },
            }}
            className="rotate-10 brandlogoCarousel flex flex-nowrap w-full overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]"
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

            {/* 무한 흐름처럼 보이게 같은 리스트를 한 번 더 복제 */}
            <ul className="flex flex-shrink-0 gap-3 md:gap-4 pr-3 md:pr-4" aria-hidden>
              {slides[0].map((item) => (
                <li
                  key={`copy-${item.id}`}
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
          </motion.div>

          {/* 두 번째 줄 캐러셀 */}
          <motion.div
            style={{ willChange: "transform" }}
            variants={{
              hidden: { opacity: 0, y: 90, scale: 0.94 },
              show: {
                opacity: 1,
                y: 0,
                scale: [0.94, 1.03, 1],
                transition: {
                  duration: 0.7,
                  ease: [0.22, 1, 0.36, 1],
                },
              },
            }}
            className="-rotate-10 brandlogoCarousel reverse flex flex-nowrap w-full overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]"
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

            {/* 무한 흐름처럼 보이게 같은 리스트를 한 번 더 복제 */}
            <ul className="flex flex-shrink-0 gap-3 md:gap-4 pr-3 md:pr-4" aria-hidden>
              {slides[1].map((item) => (
                <li
                  key={`copy-${item.id}`}
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
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default DSection