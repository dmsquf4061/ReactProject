import { useRef } from "react"
import { motion } from "motion/react"
import { useAppStore } from "@/store/appstore"

export default function ASection() {
  const constraintsRef = useRef(null)

  const constraints = {
    width: 300,
    height: 300,
    backgroundColor: "var(--hue-1-transparent)",
    borderRadius: 10,
  }

  const box = {
    width: 100,
    height: 100,
    backgroundColor: "#ff0088",
    borderRadius: 10,
  }

  const introDone = useAppStore((s) => s.introDone)

  const title = "ASection"
  const subtitle = "시안을 만드는 중입니다."

  const delayChildren = 0.15
  const stagger = 0.08
  const letterDuration = 0.18

  const subtitleDelay = delayChildren + title.length * stagger + letterDuration

  return (
    <div className="w-full h-full bg-stone-900 text-white flex flex-col items-center justify-center gap-4">
      <motion.div
        className="text-5xl font-bold"
        initial="hidden"
        animate={introDone ? "show" : "hidden"}
        variants={{
          hidden: {},
          show: {
            transition: {
              delayChildren,
              staggerChildren: stagger,
            },
          },
        }}
      >
        {Array.from(title).map((ch, i) => (
          <motion.span
            key={`${ch}-${i}`}
            style={{ display: "inline-block" }}
            variants={{
              hidden: { opacity: 0, y: 10 },
              show: {
                opacity: 1,
                y: 0,
                transition: {
                  duration: letterDuration,
                  ease: [0.22, 1, 0.36, 1],
                },
              },
            }}
          >
            {ch === " " ? "\u00A0" : ch}
          </motion.span>
        ))}
      </motion.div>

      <motion.div
        className="text-xl font-normal opacity-80"
        initial={{ opacity: 0, y: 12 }}
        animate={introDone ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
        transition={{
          duration: 0.4,
          delay: subtitleDelay,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        {subtitle}
      </motion.div>

      <motion.div ref={constraintsRef} 
        className="w-screen h-screen absolute"
      >
        <motion.img
          src="./public/images/Asection/img.jpg"
          drag
          dragConstraints={constraintsRef}
          style={{ x: 200, y: 150 }}
          dragElastic={0.2}
          className="w-[100px] h-[100px] object-contain cursor-grab active:cursor-grabbing"
        />
        <motion.img
          src="./public/images/Asection/img.jpg"
          drag
          dragConstraints={constraintsRef}
          style={{ x: 500, y: 500 }}
          dragElastic={0.2}
          className="w-[100px] h-[100px] object-contain cursor-grab active:cursor-grabbing"
        />
        <motion.img
          src="./public/images/Asection/img.jpg"
          drag
          dragConstraints={constraintsRef}
          style={{ x: 1000, y: 600 }}
          dragElastic={0.2}
          className="w-[100px] h-[100px] object-contain cursor-grab active:cursor-grabbing"
        />      
        <motion.img
            src="./public/images/Asection/img.jpg"
            drag
            dragConstraints={constraintsRef}
            style={{ x: 1200, y: 400 }}
            dragElastic={0.2}
            className="w-[100px] h-[100px] object-contain cursor-grab active:cursor-grabbing"
        />
        <motion.img
            src="./public/images/Asection/img.jpg"
            drag
            dragConstraints={constraintsRef}
            style={{ x: 1000, y: 200 }}
            dragElastic={0.2}
            className="w-[100px] h-[100px] object-contain cursor-grab active:cursor-grabbing"
        />
      </motion.div>
    </div>
  )
}