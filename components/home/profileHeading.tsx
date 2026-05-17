import Image from "next/image";
import React from "react";
import LiveNow from "../shared/liveNow";
import DiscordIcon from "@/icons/discord";
import TwitterIcon from "@/icons/twitter";
import GithubIcon from "@/icons/github";
import { FaDiscord, FaGithub, FaLocationArrow, FaMapPin, FaMoneyBill, FaMoneyBill1Wave, FaXTwitter } from "react-icons/fa6";
import {
  DiscordUrl,
  GithubProfileUrl,
  ProfileImage,
  XProfileUrl,
} from "@/data/data";
import Link from "next/link";
import { LocateIcon, MapPin } from "lucide-react";

const ProfileHeading = ({ className }: { className?: string }) => {
  return (
    <div className={`flex flex-col sticky top-12 py-8 md:py-12 ${className}`}>
      <Image
        src={
          ProfileImage ||
          "https://i.pinimg.com/474x/69/56/f7/6956f7a4f805108af3f87c8bc5a600c1.jpg"
        }
        alt="Picture of Pranav"
        width={200}
        height={200}
        className="rounded-full object-cover h-44 w-44"
        unoptimized
      />
      <div className="flex flex-col justify-center pt-7 gap-2">
        <div className="flex flex-col">
          <h1 id={"main-heading"} className="text-4xl md:text-5xl text-semibold">
            Pranav <br /> Sonawane
          </h1>
          <div className="flex pt-4 gap-4">
            <div className="flex gap-2 items-center">
              <FaLocationArrow className="w-5 h-5 text-gray-500" />
              <p className="text-base md:text-lg text-gray-500">
                India
              </p>
            </div>
            <div className="flex gap-2 items-center">
              <FaMoneyBill1Wave className="w-5 h-5 text-gray-500" />
              <p className="text-base md:text-lg text-gray-500">
                $0 - $1000 MRR
              </p>
            </div>
          </div>
          <div className="pt-4">
            <p id={"secondary-heading"} className="text-base text-gray-500">
              SWE trying to earn first $1 Online
            </p>
          </div>
        </div>


        {/* <p className="text-base md:text-xl italic text-gray-600">
          <span className="bg-lightbrown text-black">Software Developer</span> based in <br />
          Pune, India.
        </p> */}
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
