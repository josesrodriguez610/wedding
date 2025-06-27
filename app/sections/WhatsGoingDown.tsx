import Image from "next/image";
import React, { useEffect, useState } from "react";
import "../css/StoryOfUs.css";
import useIsPhoneView from "../hooks/useIsPhoneView";
import "../css/WhatsGoingDown.css";
import ScrollArrow from "../rsvp/components/ScrollArrow";

const WhatsGoingDown = () => {
  const [showArrow, setShowArrow] = useState(false);
  const isPhoneView = useIsPhoneView();

  useEffect(() => {
    setShowArrow(true);
  }, []);

  return (
    <div id="whatsGoingOn" className="story-of-us-section">
      <div className="story-of-us-container flex flex-column">
        <div className="story-of-us-left">
          <div className="square-whats-image aspect-square overflow-hidden relative rounded-lg">
            <div className="visiting-left-copy">
              <div className="image-width-visiting aspect-square overflow-hidden rounded-lg whats-image">
                <Image
                  src="/whatsgoingon.png"
                  alt="Hero Image"
                  fill
                  className="object-contain"
                  priority
                  loading="eager"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="whats-right">
          <div className="visiting-data-title">
            <h1>October 3, 2025</h1>
            <hr className="border-t-2 border-[#114734] my-2 w-full" />
            <p className="whats-data-title">
              4:00 - 7:00 PM &nbsp;&nbsp; Family Social (Optional)
            </p>
          </div>
          <div className="visiting-data-title">
            <div className="visiting-data-title">
              <h1>October 4, 2025</h1>
              <hr className="border-t-2 border-[#114734] my-2 w-full" />
              <p className="whats-data-title">
                <strong>5:00 PM</strong> &nbsp;&nbsp; Wedding Ceremony
              </p>
              <hr className="border-t-2 border-[#114734] my-2 w-full" />
              <p className="whats-data-title">
                <strong>5:30 PM</strong> &nbsp;&nbsp; Cocktail Hour
              </p>
              <hr className="border-t-2 border-[#114734] my-2 w-full" />
              <p className="whats-data-title">
                <strong>6:30 PM</strong> &nbsp;&nbsp; Buffet & Boogie
              </p>
            </div>
          </div>
          <div className="visiting-data-title">
            <div className="visiting-data-title">
              <h1>October 6, 2025</h1>
              <hr className="border-t-2 border-[#114734] my-2 w-full" />
              <p className="whats-data-title">
                <p>
                  <strong>01:00 PM</strong> &nbsp;&nbsp; Sergio’s Birthday Bash
                  (Optional)
                </p>
              </p>
            </div>
          </div>
        </div>
      </div>{" "}
      {!isPhoneView && showArrow && (
        <div className="location-arrow absolute bottom-8 left-0 right-0 flex justify-center">
          <ScrollArrow targetId="visiting" />
        </div>
      )}
    </div>
  );
};

export default WhatsGoingDown;
