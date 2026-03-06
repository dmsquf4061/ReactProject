import {
  animate,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useTransform,
} from "motion/react"
import { useEffect, useState } from "react"
import { useAppStore } from "@/store/appstore"

export default function LoadingIntro() {
  const finishLoading = useAppStore((state) => state.finishLoading)

  // 숫자 카운트(0→100)
  const count = useMotionValue(0)
  const rounded = useTransform(count, (v) => Math.round(v))
  const display = useTransform(rounded, (v) => String(v).padStart(3, "0"))

  const [text, setText] = useState("000")
  const [done, setDone] = useState(false)

  useMotionValueEvent(display, "change", (v) => setText(v))

  useEffect(() => {
    let mounted = true

    const run = async () => {
      await animate(count, 98, { duration: 2.6, ease: "linear" })
      await animate(count, 99, { duration: 0.3, ease: "linear" })
      await new Promise((r) => setTimeout(r, 120))
      await animate(count, 100, { duration: 0.35, ease: "easeOut" })

      if (!mounted) return
      // ✅ 100이 되는 "그 순간"부터: 배경 진해지고 위로 올라가는 퇴장 시작
      setDone(true)
    }

    run()
    return () => {
      mounted = false
    }
  }, [count])

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      /**
       * ✅ 기본: 화면 고정
       * ✅ done=true: 위로 슬라이드하며 사라짐
       */
      initial={{ y: 0, opacity: 1 }}
      animate={done ? { y: "-100%", opacity: 1 } : { y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: "easeInOut" }}
      /**
       * ✅ 슬라이드 퇴장이 끝난 "그 순간" 전역 로딩 종료
       */
      onAnimationComplete={() => {
        if (done) finishLoading()
      }}
      style={{ boxShadow: "0 30px 60px rgba(0,0,0,0.35)" }}
    >
      {/* ✅ 배경: done 되는 순간 더 불투명(진하게) */}
      <motion.div
        className="absolute inset-0 bg-[var(--primary)]"
        initial={{ opacity: 0.9 }}
        animate={{ opacity: done ? 1 : 0.9 }}
        transition={{ duration: 0.18, ease: "linear" }}
      />

      {/* 숫자 */}
      <pre
        className="relative text-[150px] text-[var(--foreground)] font-bold tabular-nums"
        style={{ fontFamily: "Pretendard" }}
      >
        {text}
      </pre>
    </motion.div>
  )
}