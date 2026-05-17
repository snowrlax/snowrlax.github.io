"use client"

import { images } from "@/public"
import { motion, useInView, useMotionValue, useTransform } from "framer-motion"
import Image from "next/image"
import { useRef, ReactNode, useEffect, useState } from "react"
import dynamic from "next/dynamic"

interface AnimeBackgroundProps {
  children: ReactNode
  className?: string
}

const AnimeBackground = ({ children, className = "" }: AnimeBackgroundProps) => {
  // Mouse position tracking
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Floating animation value
  const floatingY = useMotionValue(0)

  // Window dimensions
  const [windowWidth, setWindowWidth] = useState(0)
  const [windowHeight, setWindowHeight] = useState(0)

  // Refs for each element
  const spiritedRef = useRef(null)
  const trainRef = useRef(null)
  const grannyRef = useRef(null)
  const animeRef = useRef(null)
  const ratAndBirdRef = useRef(null)
  const ponyoRef = useRef(null)
  const itsumiRef = useRef(null)
  const punpunRef = useRef(null)
  const momoRef = useRef(null)

  // Check if elements are in view
  const spiritedInView = useInView(spiritedRef, { once: true, amount: 0.2 })
  const trainInView = useInView(trainRef, { once: true, amount: 0.2 })
  const grannyInView = useInView(grannyRef, { once: true, amount: 0.2 })
  const animeInView = useInView(animeRef, { once: true, amount: 0.2 })
  const ratAndBirdInView = useInView(ratAndBirdRef, { once: true, amount: 0.2 })
  const ponyoInView = useInView(ponyoRef, { once: true, amount: 0.2 })
  const itsumiInView = useInView(itsumiRef, { once: true, amount: 0.2 })
  const punpunInView = useInView(punpunRef, { once: true, amount: 0.2 })
  const momoInView = useInView(momoRef, { once: true, amount: 0.2 })

  // Mouse move handler
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      mouseX.set(event.clientX)
      mouseY.set(event.clientY)
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [mouseX, mouseY])

  // Window resize handler
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
      setWindowHeight(window.innerHeight)
    }

    handleResize() // Set initial values
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Floating animation
  useEffect(() => {
    const animate = () => {
      floatingY.set(Math.sin(Date.now() / 1000) * 10)
      requestAnimationFrame(animate)
    }
    animate()
  }, [])

  // Transform values for each element
  const spiritedX = useTransform(mouseX, [0, window.innerWidth], [-20, 20])
  const spiritedY = useTransform(mouseY, [0, window.innerHeight], [-10, 10])

  const trainX = useTransform(mouseX, [0, window.innerWidth], [-10, 10])
  const trainY = useTransform(mouseY, [0, window.innerHeight], [-10, 10])

  const grannyX = useTransform(mouseX, [0, window.innerWidth], [-10, 10])
  const grannyY = useTransform(mouseY, [0, window.innerHeight], [-10, 10])

  const animeX = useTransform(mouseX, [0, window.innerWidth], [-10, 10])
  const animeY = useTransform(mouseY, [0, window.innerHeight], [-10, 10])

  const ratAndBirdX = useTransform(mouseX, [0, window.innerWidth], [-20, 20])
  const ratAndBirdY = useTransform(mouseY, [0, window.innerHeight], [-10, 10])

  const ponyoX = useTransform(mouseX, [0, window.innerWidth], [-10, 10])
  const ponyoY = useTransform(mouseY, [0, window.innerHeight], [-10, 10])

  const itsumiX = useTransform(mouseX, [0, window.innerWidth], [-20, 20])
  const itsumiY = useTransform(mouseY, [0, window.innerHeight], [-10, 10])

  const punpunX = useTransform(mouseX, [0, window.innerWidth], [-20, 20])
  const punpunY = useTransform(mouseY, [0, window.innerHeight], [-10, 10])

  const momoX = useTransform(mouseX, [0, window.innerWidth], [-20, 20])
  const momoY = useTransform(mouseY, [0, window.innerHeight], [-10, 10])

  // Combined variants for fade in and hover
  const elementVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 0.9,
      scale: 1,
      transition: { duration: 0.8, delay: 0.2 }
    },
    hover: {
      scale: 1.1,
      rotate: 5,
      transition: { duration: 0.2 }
    }
  }

  return (
    <div className={`relative w-full md:mb-24 ${className} hidden lg:block`}>
      {/* Content */}
      <div className="relative pt-24">
        {children}
      </div>

      {/* Anime Elements */}
      <div className="absolute inset-0 pointer-events-none z-10">
        {/* Spirited Away Tattoo */}
        <motion.div
          ref={spiritedRef}
          className="absolute top-4 left-1/4 w-40 h-40 opacity-80 cursor-pointer"
          variants={elementVariants}
          initial="hidden"
          animate={spiritedInView ? "visible" : "hidden"}
          whileHover="hover"
          style={{
            x: spiritedX,
            // y: useTransform([spiritedY, floatingY], (values: number[]) => values[0] + values[1])
            y: floatingY
          }}
        >
          <Image
            src={images.sootSprits}
            style={{
              filter: "drop-shadow(0 0 10px rgba(0, 0, 0, 0.3))"
            }}
            alt="Spirited Away Tattoo"
            fill
            className="object-contain"
            priority
          />
        </motion.div>

        {/* Chihiro's Train Tickets */}
        <motion.div
          ref={trainRef}
          className="absolute -bottom-10 left-1/4 w-28 h-28 opacity-90 cursor-pointer"
          variants={elementVariants}
          initial="hidden"
          animate={trainInView ? "visible" : "hidden"}
          whileHover="hover"
          style={{
            x: trainX,
            // y: useTransform([trainY, floatingY], (values: number[]) => values[0] + values[1])
            y: floatingY
          }}
        >
          <Image
            src={images.chihiro}
            style={{
              filter: "drop-shadow(0 0 10px rgba(0, 0, 0, 0.3))"
            }}
            alt="Chihiro's Train Tickets"
            fill
            className="object-contain"
          />
        </motion.div>

        {/* Turbo Granny */}
        <motion.div
          ref={grannyRef}
          className="absolute top-1/4 left-4 w-36 h-36 opacity-100 cursor-pointer"
          variants={elementVariants}
          initial="hidden"
          animate={grannyInView ? "visible" : "hidden"}
          whileHover="hover"
          style={{
            x: grannyX,
            // y: useTransform([grannyY, floatingY], (values: number[]) => values[0] + values[1])
            y: floatingY
          }}
        >
          <Image
            src={images.turboGranny}
            alt="Turbo Granny"
            fill
            className="object-contain"
          />
        </motion.div>

        {/* Rat and bird */}
        <motion.div
          ref={ratAndBirdRef}
          className="absolute top-4 right-1/4 w-48 h-48 opacity-80 cursor-pointer"
          variants={elementVariants}
          initial="hidden"
          animate={ratAndBirdInView ? "visible" : "hidden"}
          whileHover="hover"
          style={{
            x: ratAndBirdX,
            // y: useTransform([ratAndBirdY, floatingY], (values: number[]) => values[0] + values[1])
            y: floatingY
          }}
        >
          <Image
            src={images.ratAndBird}
            style={{
              filter: "drop-shadow(0 0 10px rgba(0, 0, 0, 0.1))"
            }}
            alt="Rat and Bird"
            fill
            className="object-contain"
          />
        </motion.div>

        {/* Pochita */}
        <motion.div
          ref={animeRef}
          className="absolute top-1/4 right-4 w-32 h-32 opacity-80 cursor-pointer"
          variants={elementVariants}
          initial="hidden"
          animate={animeInView ? "visible" : "hidden"}
          whileHover="hover"
          style={{
            x: animeX,
            // y: useTransform([animeY, floatingY], (values: number[]) => values[0] + values[1])
            y: floatingY
          }}
        >
          <Image
            src={images.pochita}
            style={{
              filter: "drop-shadow(0 0 10px rgba(0, 0, 0, 0.3))"
            }}
            alt="Anime Element"
            fill
            className="object-contain"
          />
        </motion.div>

        {/* Ponyo */}
        <motion.div
          ref={ponyoRef}
          className="absolute top-10 right-1/2 w-24 h-24 opacity-80 cursor-pointer"
          variants={elementVariants}
          initial="hidden"
          animate={ponyoInView ? "visible" : "hidden"}
          whileHover="hover"
          style={{
            x: ponyoX,
            // y: useTransform([ponyoY, floatingY], (values: number[]) => values[0] + values[1])
            y: floatingY
          }}
        >
          <Image
            src={images.ponyo}
            alt="Ponyo"
            fill
            className="object-contain"
          />
        </motion.div>

        {/* Itsumi */}
        <motion.div
          ref={itsumiRef}
          className="absolute -bottom-20 left-10 w-40 h-40 opacity-80 cursor-pointer"
          variants={elementVariants}
          initial="hidden"
          animate={itsumiInView ? "visible" : "hidden"}
          whileHover="hover"
          style={{
            x: itsumiX,
            // y: useTransform([itsumiY, floatingY], (values: number[]) => values[0] + values[1])
            y: floatingY
          }}
        >
          <Image
            src={images.itsumi}
            style={{
              filter: "drop-shadow(0 0 10px rgba(0, 0, 0, 0.3))"
            }}
            alt="Itsumi"
            fill
            className="object-contain"
          />
        </motion.div>

        {/* Punpun */}
        <motion.div
          ref={punpunRef}
          className="absolute -bottom-14 right-20 w-44 h-44 opacity-80 cursor-pointer"
          variants={elementVariants}
          initial="hidden"
          animate={punpunInView ? "visible" : "hidden"}
          whileHover="hover"
          style={{
            x: punpunX,
            // y: useTransform([punpunY, floatingY], (values: number[]) => values[0] + values[1])
            y: floatingY
          }}
        >
          <Image
            src={images.punpun}
            style={{
              filter: "drop-shadow(0 0 10px rgba(0, 0, 0, 0.2))"
            }}
            alt="Punpun"
            fill
            className="object-contain"
          />
        </motion.div>

        {/* Momo */}
        <motion.div
          ref={momoRef}
          className="absolute -bottom-10 left-1/2 w-40 h-40 opacity-80 cursor-pointer"
          variants={elementVariants}
          initial="hidden"
          animate={momoInView ? "visible" : "hidden"}
          whileHover="hover"
          style={{
            x: momoX,
            // y: useTransform([momoY, floatingY], (values: number[]) => values[0] + values[1])
            y: floatingY
          }}
        >
          <Image
            src={images.momo}
            style={{
              filter: "drop-shadow(0 0 10px rgba(0, 0, 0, 0.3))"
            }}
            alt="Momo"
            fill
            className="object-contain"
          />
        </motion.div>
      </div>
    </div>
  )
}

// Export with dynamic import and no SSR
export default dynamic(() => Promise.resolve(AnimeBackground), { ssr: false }) 