"use client"

import { ProfileImage } from "@/data/data";
import DiscordIcon from "@/icons/discord";
import GithubIcon from "@/icons/github";
import TwitterIcon from "@/icons/twitter";
import Image from "next/image";
import React, { useState } from "react";
import Link from "next/link";
import EmojiContactForm from "../shared/EmojiContactForm";
import { AnimatePresence } from "framer-motion";

const Footer = ({ className }: { className?: string }) => {
  const [showContactForm, setShowContactForm] = useState(false);

  return (
    <section className={`bg-offwhite md:p-12 ${className}`}>
      <div className="flex flex-col md:flex-row justify-between md:p-12 rounded-3xl rounded-bl-none rounded-br-none md:rounded-full bg-black text-white">
        <div className="flex flex-col p-7 md:flex-row items-center">
          <div className="flex md:flex-row items-center gap-7 md:gap-12">
            <Image
              src={
                ProfileImage ||
                "https://i.pinimg.com/474x/69/56/f7/6956f7a4f805108af3f87c8bc5a600c1.jpg"
              }
              alt="Picture of the author"
              width={100}
              height={80}
              className="rounded-full"
              unoptimized
            />
            <div className="flex flex-col justify-center gap-2">
              <div className="flex flex-col gap-2 p-7">
                <div className="flex flex-col">
                  <h2 className="text-xl md:text-3xl font-semibold">
                    I&apos;m Pranav Sonawane
                  </h2>
                  <p className="text-sm md:text-base italic text-gray-300">
                    <span className="bg-lightbrown text-black">Software Developer</span> based in <br />Pune, India
                  </p>
                </div>
                <div className="flex gap-4 py-2">
                  <span className="">
                    <GithubIcon dark={true} />
                  </span>
                  <span className="">
                    <TwitterIcon dark={true} />
                  </span>
                  <span className="">
                    <DiscordIcon dark={true} />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="hidden md:flex justify-center items-center gap-8 px-4 text-gray-400">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <Link href="/about" className="hover:text-white transition-colors">About</Link>
          <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
        </div>

        <div className="flex justify-center items-center relative py-12 md:py-0 md:mb-0 px-4">
          <button
            className="flex text-center justify-center rounded-full w-[90%] bg-white py-4 px-6 text-sm md:text-md text-black font-semibold hover:bg-gray-100 transition-colors text-nowrap"
            onClick={() => setShowContactForm(true)}
          >
            Send Me a Haiku
          </button>
        </div>
      </div>

      <AnimatePresence>
        {showContactForm && (
          <EmojiContactForm onClose={() => setShowContactForm(false)} />
        )}
      </AnimatePresence>
    </section>
  );
};

export default Footer;
