import { AnimatePresence, motion } from "motion/react"
import { useEffect, useRef, useState } from "react"

function WorkModal({ open, project, onClose }) {
  const EASE = [0.22, 1, 0.36, 1]

  const [full, setFull] = useState(false)
  const contentRef = useRef(null)

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""

    if (!open) {
      setFull(false)
      if (contentRef.current) {
        contentRef.current.scrollTop = 0
      }
    }

    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  useEffect(() => {
    if (!open) return

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose?.()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [open, onClose])

  const handleWheel = (e) => {
    if (!full && e.deltaY > 0) {
      e.preventDefault()
      setFull(true)
    }
  }

  const handleContentWheel = (e) => {
    const el = contentRef.current
    if (!el) return

    const isAtTop = el.scrollTop <= 0
    const isScrollingUp = e.deltaY < 0

    if (full && isAtTop && isScrollingUp) {
      e.preventDefault()
      setFull(false)
    }
  }

  return (
    <AnimatePresence>
      {open && project && (
        <motion.div
          className="fixed w-full inset-0 z-[999] bg-black/60"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <motion.div
            className="absolute inset-0 flex items-end justify-center"
            onClick={(e) => e.stopPropagation()}
            animate={{
              paddingLeft: full ? 0 : 40,
              paddingRight: full ? 0 : 40,
            }}
            onWheel={handleWheel}
          >
            <motion.div
              className="w-full bg-white shadow-xl overflow-hidden"
              initial={{
                opacity: 0,
                y: 120,
                scale: 0.96,
                height: "90vh",
                borderTopLeftRadius: 16,
                borderTopRightRadius: 16,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
                height: full ? "100vh" : "90vh",
                borderTopLeftRadius: full ? 0 : 16,
                borderTopRightRadius: full ? 0 : 16,
              }}
              exit={{
                opacity: 0,
                y: 80,
                scale: 0.96,
                height: "90vh",
                borderTopLeftRadius: 16,
                borderTopRightRadius: 16,
              }}
              transition={{ duration: 0.35, ease: EASE }}
            >
              <div
                ref={contentRef}
                className="w-full h-full overflow-y-auto p-6"
                onWheel={handleContentWheel}
              >
                {/* 상단 */}
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-bold text-stone-900">
                      {project.title}
                    </h2>
                    <p className="mt-2 text-sm leading-relaxed text-stone-600">
                      {project.desc}
                    </p>
                  </div>
                </div>

                {/* 이미지 */}
                <div className="mt-6 overflow-hidden rounded-xl">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full object-cover"
                  />
                </div>

                {/* 태그 */}
                {project.tags?.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-stone-100 px-3 py-1 text-sm text-stone-700"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* 테스트용 */}
                <div className="h-[800px]" />

                {/* 하단 닫기 버튼 */}
                <div className="mt-10 flex justify-center">
                    <motion.button
                        initial={{
                        opacity: 0,
                        clipPath: "inset(0 50% 0 50% round 999px)",
                        }}
                        animate={{
                        opacity: 1,
                        clipPath: "inset(0 0% 0 0% round 999px)",
                        }}
                        exit={{
                        opacity: 0,
                        clipPath: "inset(0 50% 0 50% round 999px)",
                        }}
                        transition={{
                        duration: 0.5,
                        ease: [0.22, 1, 0.36, 1],
                        }}
                        style={{ willChange: "clip-path, opacity" }}
                        type="button"
                        onClick={onClose}
                        className="absolute bottom-8 w-[200px] cursor-pointer rounded-full bg-[var(--primary)] px-5 py-3 text-sm text-white transition-all duration-300 ease-out hover:bg-stone-800"
                    >
                        닫기
                    </motion.button>
                    </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default WorkModal