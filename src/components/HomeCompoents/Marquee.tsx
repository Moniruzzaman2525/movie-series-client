"use client";

import { ThreeDMarquee } from "../ui/3d-marquww";

export function ThreeDMarqueeDemo() {
  const images = [
    "https://i.ibb.co/ycxWDDPW/jordan-tan-Ez1-PYe-J35w-E-unsplash.jpg",
    "https://i.ibb.co/XrBS1t9r/shruti-deo-9ya6-PUGNl-GI-unsplash.jpg",
    "https://i.ibb.co/p6JZXw3/olena-babinets-83-RTVTFo-Orw-unsplash.jpg",
    "https://assets.aceternity.com/cloudinary_bkp/Tooltip_luwy44.png",
    "https://i.ibb.co/PZxw3ff/dat-nguyen-c-IN4-rto-UIM-unsplash.jpg",
    "https://i.ibb.co/6Jvz0qPC/mike-yukhtenko-wfh8d-Dl-NFOk-unsplash.jpg",
  ];

  return (
    <div className="w-full   rounded-3xl bg-gray-950/5 ring-1 ring-neutral-700/10 dark:bg-neutral-800">
      <ThreeDMarquee images={images} />
    </div>
  );
}
