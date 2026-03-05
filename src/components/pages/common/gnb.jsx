import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const TABS = [
  { id: "home", label: "Home" },
  { id: "work", label: "Work" },
  { id: "archive", label: "Archive" },
  { id: "about", label: "About" },
]

export default function Gnb({ onChange, show = true }) {
  const [active, setActive] = useState("home")

  const handle = (id) => {
    setActive(id)
    onChange?.(id)
  }

  return (
    <AnimatePresence>
      {show && (
        <motion.nav
          key="pill-nav"
          initial={{ opacity: 0, y: 14, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: 14, filter: "blur(6px)" }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="fixed left-1/2 bottom-8 -translate-x-1/2 z-[2000]"
        >
          {/* ✅ 1) 바깥 래퍼: 그림자 담당 (clip-path 없음) */}
          <div
            style={{
              boxShadow: "0 2px 6px rgba(0,0,0,0.35)",
              borderRadius: 9999,
            }}
          >
            {/* ✅ 2) 안쪽: clip-path로 펼침 담당 */}
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
                          ? "text-[var(--muted-foreground)], hover:text-white"
                          : "text-[var(--muted)]"
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