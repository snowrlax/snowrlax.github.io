'use client'

import Image from "next/image";
import React from "react";
import Bubble from "../shared/bubble";
import { defaultImageSrc } from "@/data/data";
import { ArrowUpRight } from "lucide-react";
import { motion, useInView } from "framer-motion"
import { useRef } from "react";
import Link from "next/link";


type Props = {
  className?: string;
  data: {
    id: number;
    title: string;
    desc: string;
    techStack: string[];
    image: string;
    liveUrl: string;
    githubUrl: string;
  };
};

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

const CardWithImage: React.FC<Props> = (props: Props) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={cardRef}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={sectionVariants}
      // initial={{ opacity: 0, y: 100 }}
      whileHover={{ backgroundColor: "#FEFEFE" }}
      transition={{ duration: 0.2 }}
      className={`flex flex-col items-center h-full justify-between gap-3 rounded-2xl border border-lightbrown bg-white p-3 overflow-hidden ${props.className}`}
    >
      <Image
        src={props.data.image || defaultImageSrc}
        alt={props.data.title}
        width={100}
        height={100}
        className="rounded-xl w-full bg-lightbrown object-cover"
        blurDataURL={defaultImageSrc}
        placeholder="blur"
        unoptimized
      />
      <div className="flex flex-col gap-1 w-full">
        <Link href={props.data.liveUrl || props.data.githubUrl} target="_blank">
          <div className="flex">
            <motion.h3 whileHover={{ scale: 1.02 }} className="text-lg font-semibold hover:underline underline-offset-2 decoration-gray-400">
              {props.data.title}
            </motion.h3>
            {(props.data.liveUrl || props.data.githubUrl) && (
              <ArrowUpRight className="w-4 h-4 text-gray-400 ml-1" />
            )}
          </div>
        </Link>
        <div className="flex flex-wrap gap-2 w-full">
          {props.data.techStack.map((tech, index) => (
            <Bubble key={index} name={tech} />
          ))}
        </div>
        <motion.p initial={{ opacity: 0.8 }} whileHover={{ opacity: 1 }} className="text-xs line-clamp-2 text-gray-400">{props.data.desc}</motion.p>
      </div>
    </motion.div>
  );
};

export default CardWithImage;
