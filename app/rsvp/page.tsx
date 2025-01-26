"use client";

import { useState } from "react";
import RSVPSearch from "./components/RSVPSearch";
import RSVPConfirmation from "./components/RSVPConfirmation";
import ThankYou from "./components/ThankYou";
import { useRouter } from "next/navigation";

type RSVP = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  going: boolean;
  partyId: string;
};

export default function Page() {
  const [step, setStep] = useState<"search" | "confirmation" | "thank-you">(
    "search"
  );
  const [data, setData] = useState<{ rsvp: RSVP; partyMembers: RSVP[] } | null>(
    null
  );

  const router = useRouter();

  const handleRSVPSubmit = () => {
    setStep("thank-you"); // Move to the thank-you message
    setTimeout(() => {
      setStep("search"); // Redirect back to the search step after 4 seconds
      setData(null); // Clear data for a fresh search
      router.push("/"); // Use Next.js router to navigate to home
    }, 4000);
  };

  return (
    <>
      {step === "search" && (
        <RSVPSearch
          onRSVPFound={(data) => {
            setData(data);
            setStep("confirmation"); // Move to the confirmation step
          }}
        />
      )}
      {step === "confirmation" && data && (
        <RSVPConfirmation
          rsvp={data.rsvp}
          partyMembers={data.partyMembers}
          onSubmit={handleRSVPSubmit} // Handle submission and transition to thank-you
        />
      )}
      {step === "thank-you" && <ThankYou />}
    </>
  );
}
