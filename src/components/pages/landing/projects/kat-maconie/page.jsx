
import { motion } from "motion/react"
import { Link } from "react-router-dom"
import { ArrowLeft, ArrowUpRight } from "lucide-react"

const images = [
  "/ReactProject/images/Csection/projects/Artboard1.png",
  "/ReactProject/images/Csection/projects/Artboard2.png",
  "/ReactProject/images/Csection/projects/Artboard3.png",
  "/ReactProject/images/Csection/projects/Artboard4.png",
]

function KatMaconiePage() {
  return (
    <main className="w-full h-full overflow-y-auto bg-[#f3f3f3] text-[#171717]">


      {/* 프로젝트 인트로 */}
      <section className="px-6 md:px-12 pt-20 pb-16 md:pt-32 md:pb-24">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >

          <h1 className="text-4xl md:text-7xl font-black tracking-tight leading-tight">
            KAT MACONIE
            <br />
            CREAM TONER PAD
          </h1>

          
        </motion.div>
      </section>

      {/* 프로젝트 상세 이미지 */}
      <section className="px-4 md:px-6 pb-20">

        <div className="max-w-[1200px] mx-auto flex flex-col gap-4 md:gap-8">

          {images.map((image, index) => (
            <motion.div
              key={image}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.05 }}
              transition={{
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="w-full overflow-hidden"
            >
              <img
                src={image}
                alt={`KAT MACONIE project detail ${index + 1}`}
                className="block w-full h-auto"
                loading={index === 0 ? "eager" : "lazy"}
              />
            </motion.div>
          ))}

        </div>
      </section>


    </main>
  )
}

export default KatMaconiePage
