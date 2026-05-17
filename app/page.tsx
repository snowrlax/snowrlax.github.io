"use client"

import { useRef, Suspense, lazy } from "react"
import { motion, useScroll, useInView, useSpring } from "framer-motion"
import About from "@/components/home/about"
// Import only the components needed for initial render
import SmallCard from "@/components/cards/card1"
// Dynamically import components that aren't needed immediately
const MediumCard = lazy(() => import("@/components/cards/card2"))
const CardWithImage = lazy(() => import("@/components/cards/card3"))
import Section from "@/components/shared/customSection"
import ProfileHeading from "@/components/home/profileHeading"
import { ExpericeData, MyProjects, RecognitionData, whatIDoData } from "@/data/data"
import AnimeBackground from "@/components/home/animeBackground"
import Footer from "@/components/layout/footer"

// Simple loading fallback component
const LoadingFallback = () => <div className="w-full h-20 bg-gray-100 animate-pulse rounded-lg"></div>

export default function Home() {
  // Refs for scroll animations
  const experienceRef = useRef(null)
  const recognitionRef = useRef(null)
  const whatIDoRef = useRef(null)
  const projectsRef = useRef(null)

  // Check if sections are in view
  const experienceInView = useInView(experienceRef, { once: true, amount: 0.2 })
  const recognitionInView = useInView(recognitionRef, { once: true, amount: 0.2 })
  const whatIDoInView = useInView(whatIDoRef, { once: true, amount: 0.2 })
  const projectsInView = useInView(projectsRef, { once: true, amount: 0.1 })

  // Scroll progress for parallax effects
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  }

  const cardContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 50,
        damping: 8,
      },
    },
  }

  const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 60,
        damping: 12,
      },
    },
  }

  return (
    <motion.main
      className="flex flex-col items-center min-h-screen bg-offwhite/95 relative z-10 selection:bg-lightbrown selection:text-gray-800"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Progress bar */}
      {/* <motion.div className="fixed top-0 left-0 right-0 h-1 bg-black z-40 origin-left" style={{ scaleX }} /> */}

      <div className="flex flex-col lg:flex-row w-full px-7 lg:max-w-6xl lg:gap-12">
        <div
          className="w-full lg:w-[30%]"
        >
          <ProfileHeading />
        </div>

        <div className="flex flex-col items-center w-full lg:w-[65%] lg:pt-24">
          {/* <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 20,
              delay: 0.1,
            }}
          >
            <About />
          </motion.div> */}

          {/* Working Experience */}
          {/* <motion.div
            ref={experienceRef}
            variants={sectionVariants}
            initial="hidden"
            animate={experienceInView ? "visible" : "hidden"}
            className="w-full"
          >
            <Section linebreak={false}>
              <motion.h2 className="text-2xl font-semibold pb-4" variants={itemVariants}>
                Work Experience
              </motion.h2>

              <motion.div variants={cardContainerVariants} className="space-y-4">
                {ExpericeData.map((data, index) => (
                  <motion.div
                    key={data.id}
                    variants={cardVariants}
                    className="rounded-full"
                    whileHover={{
                      y: -5,
                      boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.05)",
                      transition: { duration: 0.2 },
                    }}
                    custom={index}
                  >
                    <SmallCard data={data} />
                  </motion.div>
                ))}
              </motion.div>
            </Section>
          </motion.div> */}

          {/* Awards & Recognition */}
          {/* <motion.div
            ref={recognitionRef}
            variants={sectionVariants}
            initial="hidden"
            animate={recognitionInView ? "visible" : "hidden"}
            className="w-full"
          >
            <Section>
              <motion.h2 className="text-2xl font-semibold pb-4" variants={itemVariants}>
                Awards & Recognition
              </motion.h2>

              <motion.div variants={cardContainerVariants} className="space-y-4">
                {RecognitionData.map((data, index) => (
                  <motion.div
                    key={data.id}
                    variants={cardVariants}
                    className="rounded-full"
                    whileHover={{
                      y: -5,
                      boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.05)",
                      transition: { duration: 0.2 },
                    }}
                    custom={index}
                  >
                    <SmallCard data={data} />
                  </motion.div>
                ))}
              </motion.div>
            </Section>
          </motion.div> */}

          {/* What i do */}
          {/* <motion.div
            ref={whatIDoRef}
            variants={sectionVariants}
            initial="hidden"
            animate={whatIDoInView ? "visible" : "hidden"}
            className="w-full"
          >
            <Section>
              <motion.h2 className="text-2xl font-semibold pb-4" variants={itemVariants}>
                What I Do
              </motion.h2>

              <Suspense fallback={<LoadingFallback />}>
                <motion.div variants={cardContainerVariants} className="space-y-4">
                  {whatIDoData.map((data, index) => (
                    <motion.div
                      key={data.id}
                      variants={cardVariants}
                      className="rounded-3xl"
                      whileHover={{
                        y: -5,
                        boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.05)",
                        scale: 1.01,
                        transition: { duration: 0.2 },
                      }}
                      custom={index}
                    >
                      <MediumCard data={data} />
                    </motion.div>
                  ))}
                </motion.div>
              </Suspense>
            </Section>
          </motion.div> */}

          {/* Projects */}
          <motion.div
            ref={projectsRef}
            variants={sectionVariants}
            initial="hidden"
            animate={projectsInView ? "visible" : "hidden"}
            className="w-full"
          >
            <Section linebreak={false}>
              <div className="flex flex-col lg:py-4">
                <motion.h2 className="text-2xl text-gray-800 font-semibold " variants={itemVariants}>
                  Projects
                </motion.h2>
                <motion.p className="text-gray-500">
                  Built in my spare time
                </motion.p>
              </div>

              <Suspense fallback={<LoadingFallback />}>
                <motion.div variants={cardContainerVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {MyProjects.map((data, index) => (
                    <motion.div
                      key={data.id}
                      variants={cardVariants}
                      className="rounded-3xl"
                      whileHover={{
                        y: -8,
                        boxShadow: "0px 15px 30px rgba(0, 0, 0, 0.1)",
                        scale: 1.02,
                        transition: { duration: 0.3 },
                      }}
                      custom={index}
                    >
                      <CardWithImage data={data} />
                    </motion.div>
                  ))}
                </motion.div>
              </Suspense>
            </Section>
          </motion.div>
        </div>
      </div>

      {/* Anime Background Section */}
      <AnimeBackground>

        {/* Footer */}
        <Footer />

      </AnimeBackground>

      <Footer className="block lg:hidden" />

    </motion.main>
  )
}

