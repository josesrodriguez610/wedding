import Image from "next/image";
import React from "react";
import "../css/Registry.css";

const page = () => {
  return (
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
            do so. We truly don't want (or need) anything more from you than
            your Saturday night.
          </p>
          <p>
            But if you're stubborn and still want to give more, then you can
            contribute to our honeymoon fund here. We're going to sunny London
            and we'd love any tips or recommendations if you have any.
          </p>
        </div>
      </div>
    </div>
  );
};

export default page;
