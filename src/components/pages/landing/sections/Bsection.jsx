import { motion } from "motion/react"
import { useEffect, useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useAppStore } from "@/store/appstore"

function BSection() {
  // 상단 타이틀 텍스트
  const text = "BSection"

  // 로딩 끝난 뒤에만 애니메이션 시작
  const isLoading = useAppStore((s) => s.isLoading)

  // 카드 데이터
  const cards = useMemo(
    () => [
      {
        id: 1,
        image: "./public/images/Bsection/img.jpg",
        title: "Project A",
        description: "프로젝트 A 설명입니다.",
        color: "bg-white",
      },
      {
        id: 2,
        image: "./public/images/Bsection/img.jpg",
        title: "Project B",
        description: "프로젝트 B 설명입니다.",
        color: "bg-white",
      },
      {
        id: 3,
        image: "./public/images/Bsection/img.jpg",
        title: "Project C",
        description: "프로젝트 C 설명입니다.",
        color: "bg-white",
      },
      {
        id: 4,
        image: "./public/images/Bsection/img.jpg",
        title: "Project D",
        description: "프로젝트 D 설명입니다.",
        color: "bg-white",
      },
      {
        id: 5,
        image: "./public/images/Bsection/img.jpg",
        title: "Project E",
        description: "프로젝트 E 설명입니다.",
        color: "bg-white",
      },
      {
        id: 6,
        image: "./public/images/Bsection/img.jpg",
        title: "Project F",
        description: "프로젝트 F 설명입니다.",
        color: "bg-white",
      },
      {
        id: 7,
        image: "./public/images/Bsection/img.jpg",
        title: "Project G",
        description: "프로젝트 G 설명입니다.",
        color: "bg-white",
      },
      {
        id: 8,
        image: "./public/images/Bsection/img.jpg",
        title: "Project H",
        description: "프로젝트 H 설명입니다.",
        color: "bg-white",
      },
    ],
    []
  )

  // 현재 가운데에 오는 카드 index
  const [active, setActive] = useState(0)

  // 현재 화면 너비 / 높이
  const [viewport, setViewport] = useState({
    width: 1200,
    height: 800,
  })

  // 반응형 계산용: 화면 크기 변경 감지
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

  // 이전 카드
  const handlePrev = () => {
    setActive((prev) => (prev - 1 + cards.length) % cards.length)
  }

  // 다음 카드
  const handleNext = () => {
    setActive((prev) => (prev + 1) % cards.length)
  }

  // 자동 회전
  useEffect(() => {
    if (isLoading) return

    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % cards.length)
    }, 2600)

    return () => clearInterval(timer)
  }, [isLoading, cards.length])

  // 모바일에서는 양옆 1장만,
  // 태블릿/PC에서는 양옆 2장까지 보이게
  const visibleRange = width < 768 ? 1 : 2

  // 캐러셀 전체 영역 너비
  const sceneW = Math.min(width * 0.9, 920)

  // 캐러셀 전체 영역 높이
  const sceneH = width < 640 ? 380 : width < 1024 ? 460 : 600

  // 카드 실제 너비
  const cardW = width < 640 ? 150 : width < 1024 ? 190 : 300

  // 카드 실제 높이
  const cardH =
    width < 640
      ? 240
      : width < 1024
        ? 310
        : height >= 980
          ? 470
          : height >= 880
            ? 360
            : 310

  // 카드가 좌우로 얼마나 퍼질지
  const radiusX =
    width < 640 ? sceneW * 0.26 : width < 1024 ? sceneW * 0.32 : sceneW * 0.38

  // 카드가 위아래로 얼마나 곡선을 그릴지
  const radiusY = width < 640 ? 20 : width < 1024 ? 28 : 34

  // 화살표 위치
  const arrowOffset = Math.max(12, sceneW * 0.06)

  // 타이틀 폰트 크기
  const titleClass =
    width < 640 ? "text-5xl" : width < 1024 ? "text-5xl" : "text-6xl"

  return (
    <div className="relative w-full h-full overflow-hidden bg-black text-white">
      {/* 상단 타이틀 */}
      <motion.div
        className={`absolute left-1/2 top-[12%] -translate-x-1/2 font-black italic tracking-tight ${titleClass}`}
        initial="hidden"
        animate={isLoading ? "hidden" : "show"}
        variants={{
          hidden: {},
          show: {
            transition: { delayChildren: 0.15, staggerChildren: 0.06 },
          },
        }}
      >
        {Array.from(text).map((ch, i) => (
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
            {ch}
          </motion.span>
        ))}
      </motion.div>

      {/* 카드가 도는 전체 씬 */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{
          width: sceneW,
          height: sceneH,
          perspective: 2200,
        }}
      >
        {cards.map((card, i) => {
          let offset = i - active

          if (offset > cards.length / 2) offset -= cards.length
          if (offset < -cards.length / 2) offset += cards.length

          const hidden = Math.abs(offset) > visibleRange
          const isCenter = offset === 0

          const step = 0.55
          const angle = offset * step

          const x = Math.sin(angle) * radiusX
          const y = (1 - Math.cos(angle)) * radiusY

          const scale =
            offset === 0 ? 1 : Math.abs(offset) === 1 ? 0.8 : 0.62

          const rotateY =
            offset === 0
              ? 0
              : Math.abs(offset) === 1
                ? -Math.sin(angle) * 38
                : -Math.sin(angle) * 56

          const blur =
            offset === 0 ? 0 : Math.abs(offset) === 1 ? 3 : 5

          const opacity =
            hidden ? 0 : offset === 0 ? 1 : Math.abs(offset) === 1 ? 0.86 : 0.5

          const zIndex =
            hidden ? 0 : offset === 0 ? 30 : Math.abs(offset) === 1 ? 20 : 10

          return (
            <motion.div
              key={card.id}
              className={`absolute left-1/2 top-1/2 overflow-hidden rounded-[28px] ${card.color}`}
              initial={false}
              animate={{
                x,
                y,
                scale,
                rotateY,
                opacity,
                filter: `blur(${blur}px)`,
                zIndex,
              }}
              transition={{
                duration: 1,
                ease: [0.22, 1, 0.36, 1],
              }}
              style={{
                width: cardW,
                height: cardH,
                translateX: "-50%",
                translateY: "-50%",
                transformStyle: "preserve-3d",
                transformOrigin: "center center",
                boxShadow: isCenter
                  ? "0 30px 80px rgba(255,255,255,0.14)"
                  : "0 16px 40px rgba(255,255,255,0.08)",
                pointerEvents: hidden ? "none" : "auto",
              }}
            >
              <div className="flex h-full w-full flex-col p-4">
                {/* 정사각형 이미지 */}
                <div className="aspect-square w-full overflow-hidden rounded-2xl bg-stone-200">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="h-full w-full object-cover"
                  />
                </div>

                {/* 텍스트 */}
                <div className="mt-4">
                  <h3 className="text-base font-bold text-black md:text-xl">
                    {card.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-black/70 md:text-base">
                    {card.description}
                  </p>
                </div>
              </div>
            </motion.div>
          )
        })}

        {/* 왼쪽 화살표 */}
        <Button
          type="button"
          onClick={handlePrev}
          variant="ghost"
          className="absolute top-1/2 z-[100] flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition hover:bg-white/20 cursor-pointer md:h-14 md:w-14 [&_svg]:!size-8 md:[&_svg]:!size-10"
          style={{ left: arrowOffset }}
          aria-label="이전 카드"
        >
          <ChevronLeft />
        </Button>

        {/* 오른쪽 화살표 */}
        <Button
          type="button"
          onClick={handleNext}
          variant="ghost"
          className="absolute top-1/2 z-[100] flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition hover:bg-white/20 cursor-pointer md:h-14 md:w-14 [&_svg]:!size-8 md:[&_svg]:!size-10"
          style={{ right: arrowOffset }}
          aria-label="다음 카드"
        >
          <ChevronRight />
        </Button>
      </div>
    </div>
  )
}

export default BSection