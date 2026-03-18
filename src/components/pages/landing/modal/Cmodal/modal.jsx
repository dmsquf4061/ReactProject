import { AnimatePresence, motion } from "motion/react"
import { useEffect, useRef, useState } from "react"

function CModal({ open, project, onClose }) {
  const EASE = [0.22, 1, 0.36, 1]

  const [full, setFull] = useState(false)
  const [isClosing, setIsClosing] = useState(false)
  const contentRef = useRef(null)

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""

    if (!open) {
      setFull(false)
      setIsClosing(false)

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
        handleClose()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [open])

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

  const handleClose = () => {
    if (isClosing) return
    setIsClosing(true)
  }

  const handleBackdropClose = () => {
    handleClose()
  }

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

  const titleClass =
    width < 360
      ? "text-5xl"
      : width < 768
      ? "text-5xl"
      : "text-8xl"

  const titlePadding =
    width < 768
      ? "pt-20 pb-0 px-6"
      : width < 1024
      ? "pt-30 pb-0 px-6"
      : "pt-50 pb-0 px-10"

  const font = project?.fontFamily?.[0]
  const colors = project?.colors ?? []

  return (
    <AnimatePresence>
      {open && project && (
        <motion.div
          className="fixed inset-0 z-[999] w-full bg-[var(--primary)]/80"
          onClick={handleBackdropClose}
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
            transition={{ duration: 0.35, ease: EASE }}
            onWheel={handleWheel}
          >
            <motion.div
              className="w-full overflow-hidden bg-[var(--primary)] shadow-xl flex flex-col items-center"
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
                className="w-full h-full scroll-hidden overflow-y-auto flex justify-center"
                ref={contentRef}
                onWheel={handleContentWheel}
              >
                <div
                    className="h-full w-full md:max-w-[1328px] flex flex-col px-4 md:px-6 gap-10"
                >
                    <div className="flex flex-col w-full gap-4 md:gap-5">
                        <h2 className={`${titlePadding} ${titleClass} w-full`}>
                            {project.title}
                        </h2>

                        <p className="text-md leading-relaxed text-[var(--muted)] px-6 md:px-10">
                            {project.period}
                        </p>
                        {project.tags?.length > 0 && (
                            <div className="flex flex-wrap justify-center gap-2">
                                {project.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="rounded-full bg-white px-3 py-1 text-sm text-[var(--primary)]"
                                >
                                    {tag}
                                </span>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="w-full md:h-[800px] flex justify-center">
                    <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover rounded-xl"
                    />
                    </div>

                    {/* CONCEPT */}
                    <div className="mt-10 text-left">
                        <h2 className="text-sm sm:text-[18px] text-white">
                            CONCEPT
                        </h2>
                        <div className="mt-4 h-px border-t border-t-[var(--muted)]" />
                        <p className="mt-6 max-w-2xl text-sm text-[var(--muted)]">
                            {project.desc}
                        </p>
                    </div>

                    {/* TYPOGRAPHY + COLOR PALETTE */}
                    <div className="grid grid-cols-1 text-left md:grid-cols-2 gap-4 md:gap-6">
                        {/* TYPOGRAPHY */}
                        <div>
                            <h2 className="text-sm sm:text-[18px] text-white">
                            TYPOGRAPHY
                            </h2>
                            <div className="mt-4 h-px border-t border-t-[var(--muted)]" />

                            <div className="mt-10 text-[var(--muted)]">
                                <p
                                    className="text-4xl mb-6"
                                    style={{ fontFamily: font?.value || "inherit" }}
                                >
                                    {font?.name ?? "Typography"}
                                </p>

                                <p
                                    className="text-sm mb-2 text-[var(--muted)]"
                                    style={{ fontFamily: font?.value || "inherit" }}
                                >
                                    가나다라마바사아자차카타파하
                                </p>

                                <p
                                    className="text-sm text-[var(--muted)]"
                                    style={{ fontFamily: font?.value || "inherit" }}
                                >
                                    ABCDEFGHIJKLMNOPQRSTUVWXYZ
                                </p>
                            </div>
                        </div>

                        {/* COLOR PALETTE */}
                        <div>
                            <h2 className="text-sm sm:text-[18px] text-white">
                            COLOR PALETTE
                            </h2>
                            <div className="mt-4 h-px border-t border-t-[var(--muted)]" />

                            <ul className="mt-10 flex gap-6 flex-wrap">
                                {colors.slice(0, 2).map((color, index) => (
                                    <li key={`${color.hex}-${index}`} className="relative group">
                                        <div
                                            className="w-20 h-20 rounded-lg cursor-pointer border border-[var(--muted)]"
                                            style={{ backgroundColor: color.hex }}
                                        />

                                        <div className="absolute inset-0 flex items-center justify-center text-xs font-medium text-white bg-[var(--muted)]/70 backdrop-blur-sm opacity-0 transition-opacity duration-200 group-hover:opacity-100 pointer-events-none rounded-lg">
                                            {color.hex}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* PROCESS */}
                    <div className="text-left">
                        <h2 className="text-sm sm:text-[18px] text-white">
                            PROCESS & SOLUTIONS
                        </h2>
                        <div className="mt-4 h-px border-t border-t-[var(--muted)]" />
                        <p className="mt-6 max-w-2xl text-sm text-[var(--muted)]">
                            {project.description}
                        </p>
                    </div>

                    <div className="mt-10 flex justify-center pb-10">
                        <AnimatePresence
                            mode="wait"
                            onExitComplete={() => {
                            if (isClosing) onClose?.()
                            }}
                        >
                            {!isClosing && (
                            <motion.button
                                key="close-button"
                                initial={{
                                opacity: 0,
                                clipPath: "inset(0 50% 0 50% round 0px)",
                                }}
                                animate={{
                                opacity: 1,
                                clipPath: "inset(0 0% 0 0% round 50px)",
                                }}
                                exit={{
                                opacity: 0,
                                clipPath: "inset(0 50% 0 50% round 0px)",
                                }}
                                transition={{
                                duration: 0.3,
                                ease: [0.22, 1, 0.36, 1],
                                }}
                                style={{
                                    willChange: "clip-path, opacity, transform",
                                }}
                                type="button"
                                onClick={handleClose}
                                className="absolute bottom-8 w-[200px] cursor-pointer rounded-full bg-white hover:bg-[var(--muted)] px-5 py-3 text-sm text-[var(--primary)] hover:text-white transition-colors duration-200"
                            >
                                닫기
                            </motion.button>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default CModal