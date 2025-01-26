"use client";

import { useState } from "react";
import RSVPSearch from "./components/RSVPSearch";
import RSVPConfirmation from "./components/RSVPConfirmation";

type RSVP = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  partyId: string;
};

export default function Page() {
  const [data, setData] = useState<{ rsvp: RSVP; partyMembers: RSVP[] } | null>(
    null
  );

  return (
    <>
      {data ? (
        <RSVPConfirmation rsvp={data.rsvp} partyMembers={data.partyMembers} />
      ) : (
        <RSVPSearch onRSVPFound={(data) => setData(data)} />
      )}
    </>
  );
}
