"use client";

import Image from "next/image";
import { useState } from "react";
import "../css/Registry.css";
import Footer from "../components/Footer";

const Page = () => {
  const [isOpen, setIsOpen] = useState(false);

  // const handleVenmoRedirect = () => {
  //   const venmoAppLink =
  //     "venmo://paycharge?txn=pay&recipients=ashley-larsen-23";
  //   const venmoWebLink = "https://venmo.com/u/ashley-larsen-23";

  //   // Attempt to open Venmo app
  //   window.location.href = venmoAppLink;

  //   // Fallback to web after a delay (in case app doesn't open)
  //   setTimeout(() => {
  //     window.location.href = venmoWebLink;
  //   }, 1000);
  // };

  const handleVenmoRedirect = () => {
    const profileLink = "https://venmo.com/u/ashley-larsen-23";
    const paymentLink = "venmo://paycharge?txn=pay&recipients=ashley-larsen-23";

    // Open Venmo Profile in a new tab
    window.open(profileLink, "_blank");

    // Delay and then open the payment link
    setTimeout(() => {
      window.location.href = paymentLink;
    }, 2000);
  };

  return (
    <>
      <div className="registry-section-page">
        <div className="registry-section-container">
          <h1 className="registry-title">OUR REGISTRY</h1>
          <div className="square-registry-image aspect-square overflow-hidden relative rounded-lg">
            <Image
              src="/Registry-Image.png"
              alt="Hero Image"
              fill
              className="object-contain object-center"
              priority
              loading="eager"
            />
          </div>
          <div className="registry-paragraphs">
            <p className="font-bold">Your presence is the best present!</p>
            <p>
              We know life is hard, and busy, and that weekends are always too
              short so we truly appreciate you taking the time to spend your day
              with us-especially since we know that many of you are traveling to
              do so. We truly don&apos;t want (or need) anything more from you
              than your Saturday night.
            </p>
            <p>
              But if you&apos;re stubborn and still want to give more, then you
              can contribute to our honeymoon fund here. We&apos;re going to
              Greece and we&apos;d love any tips or recommendations if you have
              any.
            </p>
          </div>
        </div>
        <div className="payments">
          <div className="relative">
            <div className="flex max-w-sm rounded-xl border border-[var(--top-text-color)] p-0.5 shadow-lg">
              <button
                onClick={handleVenmoRedirect}
                className="flex-1 font-bold text-xl bg-white px-6 py-3 rounded-xl text-[var(--top-text-color)]"
              >
                By Venmo
              </button>
            </div>
            <span className="handle absolute roboto-font">
              @Ashley-Larsen-23
            </span>
          </div>

          <div className="flex max-w-sm rounded-xl border border-[var(--top-text-color)] p-0.5 shadow-lg">
            <button
              onClick={() => setIsOpen(true)}
              className="flex-1 font-bold text-xl bg-white px-6 py-3 rounded-xl text-[var(--top-text-color)]"
            >
              By Mail
            </button>
          </div>
        </div>
        {/* Popup (Modal) */}
        {isOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="modal-body bg-white rounded-xl p-6 shadow-xl max-w-md w-full border border-[var(--top-text-color)]">
              {/* Modal Title */}
              <h2 className="text-2xl font-bold text-[var(--top-text-color)] mb-4">
                Send by Mail
              </h2>

              {/* Modal Content */}
              <p className="roboto-font">Our address is</p>
              <p className="roboto-font font-bold">
                2435 Governor Nicholls street
                <br />
                New Orleans, LA 70119
              </p>

              <p className="roboto-font">
                You can also bring anything with you to the venue on October 4.
              </p>

              {/* Close Button */}
              <div className="text-right">
                <button
                  onClick={() => setIsOpen(false)}
                  className="mt-4 px-4 py-2 bg-[var(--top-text-color)] text-white font-bold rounded-lg"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Page;
