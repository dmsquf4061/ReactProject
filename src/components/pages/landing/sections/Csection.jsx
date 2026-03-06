import { motion } from "motion/react"
import { useAppStore } from "@/store/appstore"

function CSection() {
  const text = "CSection"

  // 로딩 끝난 뒤에만 텍스트 애니메이션 시작
  const isLoading = useAppStore((s) => s.isLoading)

  return (
    <div className="w-full h-full bg-stone-100 text-amber-950 text-4xl font-bold flex items-center justify-center">
      <motion.div
        // 섹션이 렌더된 다음 텍스트가 등장
        initial="hidden"
        animate="show"
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
            style={{ display: "inline-block" }}
            variants={{
              hidden: { opacity: 0, y: 16 },
              show: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.22, ease: [0.22, 1, 0.36, 1] },
              },
            }}
          >
            {ch}
          </motion.span>
        ))}
      </motion.div>
    </div>
  )
}

export default CSection