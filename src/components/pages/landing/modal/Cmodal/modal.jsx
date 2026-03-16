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
    }, [open, isClosing])

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
    const height = viewport.height
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
            ? "pt-30 pb-0 px-7"
            : "pt-50 pb-0 px-10"

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
                    className="w-full overflow-hidden bg-[var(--primary)] shadow-xl"
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
                        className="h-full w-full flex flex-col overflow-y-auto p-6"
                        onWheel={handleContentWheel}
                    >
                        
                        <div className="flex flex-col w-full gap-5">
                            <h2 className={`${titlePadding} ${titleClass} w-full`}>
                            {project.title}
                            </h2>
                            <p className="mt-2 text-sm leading-relaxed text-[var(--secondary)]">
                            {project.desc}
                            </p>
                        </div>

                        <div className="mt-6 overflow-hidden rounded-xl">
                        <img
                            src={project.image}
                            alt={project.title}
                            className="w-full object-cover"
                        />
                        </div>

                        {project.tags?.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-2">
                            {project.tags.map((tag) => (
                            <span
                                key={tag}
                                className="rounded-full bg-[var(--primary)] px-3 py-1 text-sm text-[var(--primary)]"
                            >
                                {tag}
                            </span>
                            ))}
                        </div>
                        )}

                        <div className="h-[800px]" />

                        <div className="mt-10 flex justify-center">
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
                                        style={{ willChange: "clip-path, opacity, transform" }}
                                        type="button"
                                        onClick={handleClose}
                                        className="absolute bottom-8 w-[200px] cursor-pointer rounded-full bg-[var(--primary)] px-5 py-3 text-sm text-white transition-colors duration-200 hover:bg-stone-800"
                                        >
                                        닫기
                                    </motion.button>
                                )}
                            </AnimatePresence>
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