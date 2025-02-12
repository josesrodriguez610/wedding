import Image from "next/image";
import React from "react";
import "../css/StoryOfUs.css";
import useIsPhoneView from "../hooks/useIsPhoneView";

const StoryOfUsSection = () => {
  const isPhoneView = useIsPhoneView();
  return (
    <div className="story-of-us-section">
      <div className="story-of-us-container flex flex-column">
        {isPhoneView ? (
          <>
            <h1 className="story-of-us-title">STORY OF US</h1>
            <div className="story-of-us-left">
              <div className="top-right flex-1 flex items-center justify-center max-w-sm">
                <div className="square-church-image aspect-square overflow-hidden relative rounded-lg">
                  <Image
                    src="/Livaudais.jpg"
                    alt="Hero Image"
                    fill
                    className="object-cover object-center"
                    priority
                    loading="eager"
                  />
                </div>
              </div>
            </div>
            <div className="story-of-us-right">
              <p>
                The first time I saw him, we were at the same gate for a flight
                to Austin. I remember glancing over at him and thinking, Oh,
                wow, he's cute, how awesome would it be if he ended up sitting
                next to me?
              </p>
              <p>
                Well, he did. We started talking, and the rest, as they say, is
                history...
              </p>
              <p>
                Just kidding, we met while working at an Italian restaurant: one
                year of flirting, ten years of dating, one dog, and one home
                purchase later, we've finally decided to make it official.
              </p>
            </div>
          </>
        ) : (
          <>
            {" "}
            <div className="story-of-us-left">
              <div className="square-church-image aspect-square overflow-hidden relative rounded-lg">
                <Image
                  src="/Livaudais.jpg"
                  alt="Hero Image"
                  fill
                  className="object-cover object-center"
                  priority
                  loading="eager"
                />
              </div>
            </div>
            <div className="story-of-us-right">
              <h1 className="story-of-us-title">STORY OF US</h1>
              <p>
                The first time I saw him, we were at the same gate for a flight
                to Austin. I remember glancing over at him and thinking, Oh,
                wow, he's cute, how awesome would it be if he ended up sitting
                next to me?
              </p>
              <p>
                Well, he did. We started talking, and the rest, as they say, is
                history...
              </p>
              <p>
                Just kidding, we met while working at an Italian restaurant: one
                year of flirting, ten years of dating, one dog, and one home
                purchase later, we've finally decided to make it official.
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default StoryOfUsSection;
