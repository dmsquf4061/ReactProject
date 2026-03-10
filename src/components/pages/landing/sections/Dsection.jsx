import { motion } from "motion/react"

function DSection() {
  const text = "DSection"

  const slides = [
    [
      { id: 1, image: "./public/images/Dsection/img.jpg", title: "제목 1", desc: "설명 1" },
      { id: 2, image: "./public/images/Dsection/img.jpg", title: "제목 2", desc: "설명 2" },
      { id: 3, image: "./public/images/Dsection/img.jpg", title: "제목 3", desc: "설명 3" },
      { id: 4, image: "./public/images/Dsection/img.jpg", title: "제목 4", desc: "설명 4" },
      { id: 5, image: "./public/images/Dsection/img.jpg", title: "제목 5", desc: "설명 5" },
    ],
    [
      { id: 6, image: "./public/images/Dsection/img.jpg", title: "제목 6", desc: "설명 6" },
      { id: 7, image: "./public/images/Dsection/img.jpg", title: "제목 7", desc: "설명 7" },
      { id: 8, image: "./public/images/Dsection/img.jpg", title: "제목 8", desc: "설명 8" },
      { id: 9, image: "./public/images/Dsection/img.jpg", title: "제목 9", desc: "설명 9" },
      { id: 10, image: "./public/images/Dsection/img.jpg", title: "제목 10", desc: "설명 10" },
    ],
  ]

  return (
    <div className="w-full h-full bg-stone-100 flex flex-col items-center justify-center overflow-hidden">
      {/* 타이틀 */}
      <motion.div
        className="text-4xl font-bold mb-16"
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
            key={i}
            className="inline-block"
            variants={{
              hidden: { opacity: 0, y: 16 },
              show: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.22 },
              },
            }}
          >
            {ch}
          </motion.span>
        ))}
      </motion.div>

      <div className="w-full flex flex-col gap-6">
        {/* 첫 번째 줄 */}
        <div className="brandlogoCarousel w-full overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
          <div className="brandlogoTrack">
            <ul className="brandlogoList">
              {slides[0].map((item) => (
                <li
                  key={item.id}
                  className="flex items-center justify-center rounded-sm md:rounded-lg overflow-hidden"
                >
                  <img
                    className="w-[240px] block"
                    src={item.image}
                    alt={item.title}
                  />
                </li>
              ))}
            </ul>

            <ul className="brandlogoList" aria-hidden="true">
              {slides[0].map((item) => (
                <li
                  key={`copy-${item.id}`}
                  className="flex items-center justify-center rounded-sm md:rounded-lg overflow-hidden"
                >
                  <img
                    className="w-[240px] block"
                    src={item.image}
                    alt=""
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 두 번째 줄 */}
        <div className="brandlogoCarousel w-full overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
          <div className="brandlogoTrack brandlogoTrack--reverse">
            <ul className="brandlogoList">
              {slides[1].map((item) => (
                <li
                  key={item.id}
                  className="flex items-center justify-center rounded-sm md:rounded-lg overflow-hidden"
                >
                  <img
                    className="w-[240px] block"
                    src={item.image}
                    alt={item.title}
                  />
                </li>
              ))}
            </ul>

            <ul className="brandlogoList" aria-hidden="true">
              {slides[1].map((item) => (
                <li
                  key={`copy-${item.id}`}
                  className="flex items-center justify-center rounded-sm md:rounded-lg overflow-hidden"
                >
                  <img
                    className="w-[240px] block"
                    src={item.image}
                    alt=""
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DSection