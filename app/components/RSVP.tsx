"use client";

import Image from "next/image";

export default function RSVP() {
  return (
    <div className="w-full flex flex-col sm:flex-row justify-center items-center">
      {/* Image Section */}
      <div className="w-[80%] sm:w-[500px] h-[140px] sm:h-[270px] relative overflow-hidden border-2 border-[var(--top-background)] rounded-md shadow-2xl flex ">
        <Image
          src="/portugal.jpg"
          alt="Portugal"
          layout="fill"
          objectFit="cover"
          loading="eager"
        />
      </div>
      {/* Text Section */}
      <div className="flex flex-col items-center sm:items-start justify-center text-center sm:text-left space-y-4 sm:space-y-6 pt-4 sm:px-16">
        <h2 className="text-[18px] sm:text-[24px] text-[var(--top-background)]">
          We'd like to share a night of dancing, <br />
          dinner, and drinks with 100 of our
          <br /> closest friends and family.
        </h2>
        <div className="border-r border-gray-500]">
          <button className="px-20 py-2 border border-[var(--top-background)] text-[var(--top-background)] text-sm sm:text-base font-medium hover:bg-[var(--top-background)] hover:text-white transition ">
            RSVP
          </button>
        </div>
      </div>
    </div>
  );
}
