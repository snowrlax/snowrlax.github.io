import Image from "next/image";
import React from "react";
import LiveNow from "../shared/liveNow";
import DiscordIcon from "@/icons/discord";
import TwitterIcon from "@/icons/twitter";
import GithubIcon from "@/icons/github";
import { FaDiscord, FaGithub, FaXTwitter } from "react-icons/fa6";
import {
  DiscordUrl,
  GithubProfileUrl,
  ProfileImage,
  XProfileUrl,
} from "@/data/data";
import Link from "next/link";

const ProfileHeading = ({ className }: { className?: string }) => {
  return (
    <div className={`flex flex-col sticky top-12 py-8 md:py-12 ${className}`}>
      <Image
        src={
          ProfileImage ||
          "https://i.pinimg.com/474x/69/56/f7/6956f7a4f805108af3f87c8bc5a600c1.jpg"
        }
        alt="Picture of the author"
        width={200}
        height={200}
        className="rounded-full object-cover h-40 w-40 md:h-72 md:w-64 border-4 border-gray-400"
        unoptimized
      />
      <div className="flex flex-col justify-center pt-7 gap-2">
        <h1 id={"main-heading"} className="text-4xl md:text-5xl text-semibold">
          I&apos;m <br /> Pranav Sonawane
        </h1>
        <p className="text-base md:text-xl italic text-gray-600">
          <span className="bg-lightbrown text-black">Software Developer</span> based in <br />
          Pune, India.
        </p>
        <div className="flex gap-4 py-2">
          <Link href={GithubProfileUrl} target={"_blank"}>
            <FaGithub className="w-6 h-6" />
          </Link>
          <Link href={XProfileUrl} target={"_blank"}>
            <FaXTwitter className="w-6 h-6" />
          </Link>
          <Link href={DiscordUrl} target={"_blank"}>
            <FaDiscord className="w-6 h-6 text-indigo-500" />
          </Link>
        </div>
        <div className="flex">
          <LiveNow />
        </div>
      </div>
    </div>
  );
};

export default ProfileHeading;
