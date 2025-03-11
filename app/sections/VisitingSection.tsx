import Image from "next/image";
import React from "react";
import "../css/StoryOfUs.css";
import useIsPhoneView from "../hooks/useIsPhoneView";
import "../css/Visiting.css";

const visitingData = [
  {
    title: "Inn at the Old Jail",
    message:
      "Boutique hotel in a refurbished jail. Close to City Park and great coffee shops. Great for those who want a unique and relaxed vibe.",
  },
  {
    title: "Hotel Monteleone",
    message:
      "Join the likes of Truman Capote, Anne Rice, and John Grisham by staying at this classic French Quarter hotel. Sip a cocktail at the rotating carousel bar or lounge at the rooftop pool.",
  },
  {
    title: "Hotel St. Vincent",
    message:
      "Right on Magazine Street, this place is a vibe. Close walking distance to many cafes, shops, and restaurants.",
  },
];

const VisitingSection = () => {
  const isPhoneView = useIsPhoneView();
  return (
    <div id="visiting" className="story-of-us-section">
      <div className="story-of-us-container flex flex-column">
        {isPhoneView ? (
          <>
            <div className="visiting-title-left rotate-[-4deg] text-center pt-10">
              <h1>VISITING?</h1>
            </div>
            <div className="visiting-sub-title text-center">
              <h1>
                Here are a few of our <br />
                recommended hotels:
              </h1>
            </div>
            <div className="story-of-us-right">
              {visitingData.map((data, index) => (
                <>
                  <div key={index}>
                    <h3 className="visiting-data-title">{data.title}</h3>
                    <p className="visiting-data-message">{data.message}</p>
                  </div>
                </>
              ))}
              <>
                <div className="image-width-visiting aspect-square overflow-hidden relative rounded-lg">
                  <Image
                    src="/visiting-image.png"
                    alt="Hero Image"
                    fill
                    className="object-contain object-center"
                    priority
                    loading="eager"
                  />
                </div>
              </>
            </div>
          </>
        ) : (
          <>
            <div className="story-of-us-left">
              <div className="square-church-image aspect-square overflow-hidden relative rounded-lg">
                <div className="visiting-left-copy">
                  <div>
                    <h3 className="visiting-title-left rotate-[-4deg]">
                      VISITING?
                    </h3>
                  </div>

                  <div className="image-width-visiting aspect-square overflow-hidden rounded-lg">
                    <Image
                      src="/visiting-image.png"
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
            <div className="visiting-right">
              <div className="visiting-sub-title">
                <h1>
                  Here are a few of our <br />
                  recommended hotels:
                </h1>
              </div>
              {visitingData.map((data, index) => (
                <>
                  <div key={index}>
                    <h3 className="visiting-data-title">{data.title}</h3>
                    <p className="visiting-data-message">{data.message}</p>
                  </div>
                </>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default VisitingSection;
