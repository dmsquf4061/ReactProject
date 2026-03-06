import { useMemo, useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { useAppStore } from "@/store/appstore"

import LoadingIntro from "./loadingintro"
import Gnb from "../common/gnb"

import ASection from "./sections/Asection"
import BSection from "./sections/Bsection"
import CSection from "./sections/Csection"
import DSection from "./sections/Dsection"

import BModal from "./modal/Bmodal/modal"

export default function Landing() {
  const isLoading = useAppStore((s) => s.isLoading)

  const [active, setActive] = useState("A")
  const [tick, setTick] = useState(0)

  // ✅ B 모달 상태
  const [isBModalOpen, setIsBModalOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState(null)

  const SECTIONS = useMemo(
    () => ({
      A: ASection,
      B: BSection,
      C: CSection,
      D: DSection,
    }),
    []
  )

  const ActiveSection = SECTIONS[active] ?? ASection

  const D_Y = 0.62
  const D_SCALE = 0.5
  const EASE = [0.22, 1, 0.36, 1]

  const handleNavChange = (id) => {
    setActive(id)
    setTick((t) => t + 1)

    // ✅ 섹션 이동 시 모달 닫기
    setIsBModalOpen(false)
    setSelectedProject(null)
  }

  // ✅ BSection에서 카드 클릭 시 호출
  const handleOpenBModal = (project) => {
    setSelectedProject(project)
    setIsBModalOpen(true)
  }

  // ✅ 모달 닫기
  const handleCloseBModal = () => {
    setIsBModalOpen(false)
    setSelectedProject(null)
  }

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
    zIndex: 10,
  }

  const sectionTransition = isLoading
    ? {
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
      {/* 로딩 인트로 */}
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

      {/* 모달이 열리면 GNB 숨김 */}
      <Gnb
        show={!isLoading && !isBModalOpen}
        active={active}
        onChange={handleNavChange}
      />

      <main className="relative min-h-screen">
        <AnimatePresence mode="sync" initial={false}>
          <motion.section
            key={`${active}-${tick}`}
            className="absolute inset-0 h-screen"
            style={{
              transformOrigin: "50% 80%",
              overflow: "hidden",
              willChange: "transform, opacity",
            }}
            initial={sectionInitial}
            animate={sectionAnimate}
            exit={sectionExit}
            transition={sectionTransition}
          >
            {/* B 섹션일 때만 onOpenModal 전달 */}
            {active === "B" ? (
              <BSection onOpenModal={handleOpenBModal} />
            ) : (
              <ActiveSection />
            )}
          </motion.section>

          {/* dim */}
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

      {/* B 모달 */}
      <BModal
        open={isBModalOpen}
        project={selectedProject}
        onClose={handleCloseBModal}
      />
    </>
  )
}