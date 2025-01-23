"use client";

import Image from "next/image";

export default function Registry() {
  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-4xl flex flex-col sm:flex-row justify-center items-center">
        {/* Text Section */}
        <div className="flex flex-col items-center sm:items-start justify-center text-center sm:text-left space-y-4 sm:space-y-6 pt-4 sm:px-16">
          <h2 className="text-[18px] sm:text-[24px] text-[var(--top-background)]">
            Your presence is the best present! We know life is hard, and busy,
            and that weekends are always too short so we truly appreciate you
            taking the time to spend the day with us. We really don’t want
            anything more from you than your Saturday night.
          </h2>
          <div className="border-r border-gray-500">
            <button className="px-20 py-2 border border-[var(--top-background)] text-[var(--top-background)] text-sm sm:text-base font-medium hover:bg-[var(--top-background)] hover:text-white transition">
              Registry
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
