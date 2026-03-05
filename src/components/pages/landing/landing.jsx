"use client"

import { useMemo, useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { useAppStore } from "@/store/appStore"

import LoadingIntro from "./loadingintro"
import Gnb from "../common/gnb"

import HomeSection from "./sections/homesection"
import WorkSection from "./sections/worksection"
import ArchiveSection from "./sections/archivesection"
import AboutSection from "./sections/aboutsection"

export default function Landing() {
  const isLoading = useAppStore((s) => s.isLoading)

  const [active, setActive] = useState("home")
  const [tick, setTick] = useState(0)

  const SECTIONS = useMemo(
    () => ({
      home: HomeSection,
      work: WorkSection,
      archive: ArchiveSection,
      about: AboutSection,
    }),
    []
  )
  const ActiveSection = SECTIONS[active] ?? HomeSection

  const D_Y = 0.62
  const D_SCALE = 0.5
  const EASE = [0.22, 1, 0.36, 1]

  const handleNavChange = (id) => {
    setActive(id)
    setTick((t) => t + 1)
  }

  // ✅ 첫 진입(로딩 중)에는 섹션이 "이미 완성 상태"로 깔려있게
  const sectionInitial = isLoading
    ? {
        y: "0%",
        scale: 1,
        opacity: 1,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        zIndex: 30,
      }
    : {
        y: "100%",
        scale: 1,
        opacity: 1,
        borderTopLeftRadius: 28,
        borderTopRightRadius: 28,
        zIndex: 30,
      }

  const sectionAnimate = {
    y: "0%",
    scale: 1,
    opacity: 1,
    borderTopLeftRadius: [28, 28, 0],
    borderTopRightRadius: [28, 28, 0],
    zIndex: 30,
  }

  const sectionExit = {
    y: "0%",
    scale: 0.88,
    opacity: 1,
    borderRadius: 28,
    zIndex: 10, // ✅ 기존 섹션은 아래에서 작아짐
  }

  const sectionTransition = isLoading
    ? {
        // ✅ 첫 진입은 움직임 없음(이미 깔려있게)
        y: { duration: 0 },
        scale: { duration: 0 },
        opacity: { duration: 0 },
      }
    : {
        y: { duration: D_Y, ease: EASE },
        scale: { duration: D_SCALE, ease: EASE },
        opacity: { duration: 0.22, ease: EASE },
      }

  return (
    <>
      {/* Loader: 위에서 덮고 있다가 투명해지며 사라짐 */}
      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div
            key="loader"
            className="fixed inset-0 z-[9999]"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <LoadingIntro />
          </motion.div>
        )}
      </AnimatePresence>

      <Gnb show={!isLoading} active={active} onChange={handleNavChange} />

      <main className="relative min-h-screen overflow-hidden">
        {/* 탭 전환은 sync로 exit/enter 동시 */}
        <AnimatePresence mode="sync" initial={false}>
          <motion.section
            key={`${active}-${tick}`}
            className="absolute inset-0 min-h-screen"
            style={{
              transformOrigin: "50% 80%",
              overflow: "hidden", // ✅ 라운드 공통 클리핑
              willChange: "transform, opacity",
            }}
            initial={sectionInitial}
            animate={sectionAnimate}
            exit={sectionExit}
            transition={sectionTransition}
          >
            <ActiveSection />
          </motion.section>

          {/* dim: exit(10) 위 / enter(30) 아래 */}
          <motion.div
            key={`dim-${active}-${tick}`}
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0 }}
            exit={{ opacity: 0.4 }}
            transition={isLoading ? { duration: 0 } : { duration: 0.25, ease: EASE }}
            style={{ background: "black", willChange: "opacity", zIndex: 20 }}
          />
        </AnimatePresence>
      </main>
    </>
  )
}