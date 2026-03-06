import { motion, AnimatePresence } from "motion/react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const TABS = [
  { id: "A", label: "A" },
  { id: "B", label: "B" },
  { id: "C", label: "C" },
  { id: "D", label: "D" },
]

export default function Gnb({ active = "A", onChange, show = true }) {
  const handle = (id) => {
    onChange?.(id)
  }

  return (
    <AnimatePresence>
      {show && (
        <motion.nav
          key="pill-nav"
          initial={{
            opacity: 0,
            //y: 14,
          }}
          animate={{
            opacity: 1,
            //y: 0,
          }}
          exit={{
            opacity: 0,
            //y: 14,
          }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="fixed left-1/2 bottom-8 -translate-x-1/2 z-[2000]"
          style={{ willChange: "transform, opacity" }}
        >
          {/* 바깥 래퍼: 그림자 담당 */}
          <div
            style={{
              boxShadow: "0 2px 6px rgba(0,0,0,0.35)",
              borderRadius: 9999,
            }}
          >
            {/* 안쪽 pill: 가운데서 열리고, 다시 가운데로 접히며 사라짐 */}
            <motion.div
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
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              style={{ willChange: "clip-path, opacity" }}
              className={cn(
                "flex items-center gap-1 rounded-full p-1",
                "bg-white/10 backdrop-blur-md ring-1 ring-white/10",
                "overflow-hidden"
              )}
            >
              {TABS.map((t) => {
                const isActive = t.id === active

                return (
                  <div key={t.id} className="relative">
                    {isActive && (
                      <motion.div
                        layoutId="active-pill"
                        className="absolute inset-0 rounded-full bg-[var(--primary)]"
                        transition={{
                          type: "tween",
                          duration: 0.35,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                      />
                    )}

                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => handle(t.id)}
                      className={cn(
                        "relative z-[1] h-10 rounded-full px-5",
                        "text-[14px] font-normal cursor-pointer",
                        "hover:bg-transparent",
                        isActive
                          ? "text-white"
                          : "text-[var(--muted)] hover:text-white"
                      )}
                    >
                      {t.label}
                    </Button>
                  </div>
                )
              })}
            </motion.div>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  )
}