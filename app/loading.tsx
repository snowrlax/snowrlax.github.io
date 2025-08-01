"use client"
import { motion, Variants } from "framer-motion"
import { Button } from "@/components/ui/button"

const Loading = () => {
  // Animation variants for staggered children
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  }

  // Pulse animation for skeleton loaders
  const pulseVariants: Variants = {
    initial: { opacity: 0.6 },
    animate: {
      opacity: 1,
      transition: {
        duration: 1.5,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "reverse",
        ease: "easeInOut",
      },
    },
  }

  return (
    <motion.div className="w-full" initial="hidden" animate="show" variants={containerVariants}>
      <motion.div variants={itemVariants} className="w-full">
        <header
          className={`flex h-20 shrink-0 items-center px-7 md:px-48 bg-offwhite sticky top-0 z-10 backdrop-blur-sm bg-opacity-80`}
        >
          <nav className="flex justify-between items-center w-full gap-4 sm:gap-6">
            <div className="flex justify-center items-center">
              <motion.span
                id="navHeading"
                className="text-2xl py-2 font-extrabold"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                /Pranav
              </motion.span>

              <div className="hidden md:flex ml-6 space-x-2">
                <motion.a
                  href="#"
                  className="group inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-md text-center text-gray-600 font-semibold relative overflow-hidden"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Services
                  <motion.span
                    className="absolute bottom-0 left-0 h-0.5 w-0 bg-gray-600"
                    initial={{ width: 0 }}
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.a>
                <motion.a
                  href="#"
                  className="group inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-md text-center text-gray-600 font-semibold relative overflow-hidden"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  About
                  <motion.span
                    className="absolute bottom-0 left-0 h-0.5 w-0 bg-gray-600"
                    initial={{ width: 0 }}
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.a>
              </div>
            </div>
            <motion.button
              className="rounded-full bg-offwhite px-6 py-2 text-sm md:text-md font-semibold text-gray-600 border border-1 border-lightbrown hover:bg-gray-100 transition-colors"
              whileHover={{ scale: 1.05, boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)" }}
              whileTap={{ scale: 0.95 }}
            >
              Resume
            </motion.button>
          </nav>
        </header>

        <div className="flex flex-col md:flex-row w-full px-7 md:max-w-5xl mx-auto gap-7 md:gap-12 mt-10">
          <motion.div variants={itemVariants} className="w-full md:w-[50%]">
            <div className={`flex flex-col sticky top-32 `}>
              <motion.div
                className="rounded-full object-cover bg-gray-200 h-40 w-40 md:h-64 md:w-60"
                variants={pulseVariants}
                initial="initial"
                animate="animate"
                whileHover={{ scale: 1.02 }}
              />
              <motion.div variants={itemVariants} className="flex flex-col justify-center pt-7 gap-2">
                <motion.h1
                  id={"main-heading"}
                  className="text-4xl md:text-5xl text-semibold tracking-tight"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                >
                  I&apos;m <br /> Pranav Sonawane
                </motion.h1>
                <motion.p
                  className="text-base md:text-xl italic text-gray-600"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                >
                  <span className="bg-lightbrown text-black">Software Developer</span> based in <br />
                  Pune, India.
                </motion.p>
                <motion.div
                  className="flex w-24 mt-2"
                  initial={{ width: 0 }}
                  animate={{ width: "6rem" }}
                  transition={{ delay: 0.7, duration: 0.8 }}
                >
                  <div className="h-1 bg-gray-400 rounded-full w-full" />
                </motion.div>
              </motion.div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-col items-start w-full md:w-[50%]">
            <div className={`flex flex-col mb-12 md:mb-20 justify-between`}>
              <motion.p
                id="about"
                className="text-2xl md:text-4xl leading-snug pb-12 font-medium tracking-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                Passionate about creating great experiences for Web <br />
                Products
              </motion.p>
              <motion.div
                className="flex gap-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
              >
                <Button
                  className="rounded-full bg-black hover:bg-gray-800 px-6 py-6 text-sm font-medium text-white"
                  asChild
                >
                  <motion.a
                    href="#"
                    whileHover={{ scale: 1.05, boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.2)" }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Let&apos;s talk
                  </motion.a>
                </Button>
                <Button
                  variant="outline"
                  className="rounded-full bg-offwhite hover:bg-gray-100 px-6 py-6 text-sm font-medium text-black border border-lightbrown"
                  asChild
                >
                  <motion.a
                    href="#"
                    whileHover={{ scale: 1.05, boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)" }}
                    whileTap={{ scale: 0.95 }}
                  >
                    See my work
                  </motion.a>
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>

        <motion.div variants={itemVariants} className={`flex flex-col gap-3 mb-20 w-full max-w-5xl mx-auto px-7`}>
          <motion.span
            className="border-t border-lightbrown w-full pb-2"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ delay: 1, duration: 1 }}
          />
          <motion.h2
            className="text-2xl font-semibold pb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.8 }}
          >
            Work Experience
          </motion.h2>

          <motion.div
            className={`flex items-center justify-between rounded-full border border-lightbrown bg-white p-4 pr-8 hover:shadow-md transition-all duration-300`}
            whileHover={{ y: -5, boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            <div className="flex items-center gap-4">
              <motion.div
                className="flex justify-center items-center relative w-12 h-12 rounded-full bg-offwhite p-2"
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <motion.div
                  className="h-8 w-8 bg-gray-200 rounded-full"
                  variants={pulseVariants}
                  initial="initial"
                  animate="animate"
                />
              </motion.div>
              <div className="space-y-1">
                <motion.h3 className="text-xs md:text-lg font-normal w-40 md:w-60">
                  <motion.div
                    className="h-2.5 bg-gray-200 rounded-full"
                    variants={pulseVariants}
                    initial="initial"
                    animate="animate"
                  />
                </motion.h3>
                <motion.p className="text-xs md:text-lg font-bold space-y-1 w-40 md:w-60">
                  <motion.div
                    className="h-2 bg-gray-200 rounded-full"
                    variants={pulseVariants}
                    initial="initial"
                    animate="animate"
                  />
                  <motion.div
                    className="h-2 bg-gray-200 rounded-full"
                    variants={pulseVariants}
                    initial="initial"
                    animate="animate"
                  />
                </motion.p>
              </div>
            </div>
            <motion.p className="flex flex-col justify-center text-center text-xs md:text-sm text-gray-400 font-semibold w-24">
              <motion.div
                className="h-2 bg-gray-200 rounded-full mb-1"
                variants={pulseVariants}
                initial="initial"
                animate="animate"
              />
              <motion.div
                className="h-2 bg-gray-200 rounded-full"
                variants={pulseVariants}
                initial="initial"
                animate="animate"
              />
            </motion.p>
          </motion.div>
        </motion.div>

        <motion.div className="flex flex-col gap-2 max-w-5xl mx-auto px-7 mb-20" variants={itemVariants}>
          <motion.div
            className="h-2.5 bg-gray-200 rounded-full w-full"
            variants={pulseVariants}
            initial="initial"
            animate="animate"
          />
          <motion.div
            className="h-2 bg-gray-200 rounded-full w-3/4"
            variants={pulseVariants}
            initial="initial"
            animate="animate"
          />
          <motion.div
            className="h-2 bg-gray-200 rounded-full w-5/6"
            variants={pulseVariants}
            initial="initial"
            animate="animate"
          />
          <motion.div
            className="h-2 bg-gray-200 rounded-full w-2/3"
            variants={pulseVariants}
            initial="initial"
            animate="animate"
          />
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

export default Loading

