import Image from "next/image";
import React from "react";
import "../css/Location.css";
import useIsPhoneView from "../hooks/useIsPhoneView";

const LocationSection = () => {
  const isPhoneView = useIsPhoneView();

  return (
    <div id="location-section" className="location-section">
      <div className="top-container justify-center flex flex-col sm:flex-row">
        {isPhoneView ? (
          // ✅ Switched order for mobile view
          <>
            <div className="flex flex-col items-center text-center">
              <div className="title-church-image-container flex items-center justify-center w-full">
                <h1 className="title-where rotate-[-4deg]">
                  WHERE THE MAGIC <br /> IS GOING TO <br />
                  HAPPEN
                </h1>
              </div>
            </div>
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
            <div className="flex flex-col items-center text-center">
              <div>
                <h1 className="location-text">
                  Ceremony and reception will be <br /> held at Livaudais Hall
                  located <br /> at 2205 Second St <br />
                  New Orleans, LA 70113
                </h1>
              </div>
            </div>
          </>
        ) : (
          // ✅ Default order for larger screens
          <>
            <div className="flex flex-col items-center text-center">
              <div className="title-church-image-container flex items-center justify-center w-full">
                <h1 className="title-where rotate-[-4deg]">
                  WHERE THE MAGIC IS <br /> GOING TO HAPPEN
                </h1>
              </div>
              <div>
                <h1 className="location-text">
                  Ceremony and reception will be held at <br />
                  Livaudais Hall located at <br />
                  2205 Second St New Orleans,
                  <br /> LA 70113
                </h1>
              </div>
            </div>
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
          </>
        )}
      </div>

      <div className="bottom-container justify-center flex flex-row">
        <div className="bottle-image aspect-square overflow-hidden relative rounded-lg">
          <Image
            src="/bottle.png"
            alt="Hero Image"
            fill
            className="object-contain object-center"
            priority
            loading="eager"
          />
        </div>

        <div className="bottom-right">
          <h1 className="location-paragraph">
            There is a small private parking lot and ample street parking. But
            we recommend taking an uber, lyft, or taxi cab because the champagne
            will be flowing and drinking and driving is not cool.{" "}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default LocationSection;
