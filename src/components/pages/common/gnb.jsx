
import { motion, AnimatePresence } from "motion/react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const TABS = [
  { id: "A", label: "A" },
  { id: "B", label: "B" },
  { id: "C", label: "C" },
  { id: "D", label: "D" },
];

export default function Gnb({
  active = "A",
  onChange,
  show = true,
  isProjectDetail = false,
}) {
  const handle = (id) => {
    onChange?.(id);
  };

  // C 탭의 프로젝트 목록에서만 검정색 로고
  const isDarkLogo = active === "C" && !isProjectDetail;

  return (
    <>
      {/* 고정 로고 */}
      <motion.div
        className={cn(
          "fixed left-5 top-5 sm:left-8 sm:top-8 z-[2001]",
          "transition-colors duration-300",
          isDarkLogo ? "text-black" : "text-white"
        )}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.45 }}
      >
        <span className="text-xl sm:text-3xl font-semibold tracking-tight">
          THE B
        </span>
      </motion.div>

      {/* 하단 GNB */}
      <AnimatePresence>
        {show && (
          <motion.nav
            key="pill-nav"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.45,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              fixed left-1/2 bottom-8
              -translate-x-1/2 z-[2000]
            "
            style={{ willChange: "transform, opacity" }}
          >
            {/* 그림자 */}
            <div
              className="rounded-full"
              style={{
                boxShadow: "0 2px 6px rgba(0,0,0,0.35)",
              }}
            >
              {/* 펼침 애니메이션 */}
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
                transition={{
                  duration: 0.5,
                  ease: [0.22, 1, 0.36, 1],
                }}
                style={{
                  willChange: "clip-path, opacity",
                }}
                className={cn(
                  "flex items-center gap-1",
                  "rounded-full p-1 overflow-hidden",
                  "bg-white/10 backdrop-blur-md",
                  "ring-1 ring-white/10"
                )}
              >
                {TABS.map((tab) => {
                  const isActive = tab.id === active;

                  return (
                    <div key={tab.id} className="relative">
                      {isActive && (
                        <motion.div
                          layoutId="active-pill"
                          className="
                            absolute inset-0
                            rounded-full
                            bg-[var(--primary)]
                          "
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
                        onClick={() => handle(tab.id)}
                        className={cn(
                          "relative z-[1]",
                          "h-10 rounded-full px-5",
                          "text-[14px] font-normal",
                          "cursor-pointer",
                          "transition-all duration-200",
                          isActive
                            ? "text-white hover:text-white hover:bg-transparent"
                            : "text-[var(--muted)] hover:text-[var(--primary)] hover:bg-transparent"
                        )}
                      >
                        {tab.label}
                      </Button>
                    </div>
                  );
                })}
              </motion.div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
