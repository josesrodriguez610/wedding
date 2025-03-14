"use client";

import { RSVP } from "@/app/types/rsvp";
import { useState } from "react";

// type RSVP = {
//   id: number;
//   firstName: string;
//   lastName: string;
//   email: string;
//   going: boolean; // Ensure this is required
//   partyId: string;
//   notes: string | null; // Match type with RSVPData
// };

type RSVPSearchProps = {
  onRSVPFound: (data: { rsvp: RSVP; partyMembers: RSVP[] }) => void; // Pass both RSVP and party members
};

export default function RSVPSearch({ onRSVPFound }: RSVPSearchProps) {
  const [fullName, setFullName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSearch() {
    setLoading(true);
    setError(""); // Reset error

    try {
      const response = await fetch("/api/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fullName }),
      });

      if (!response.ok) {
        const { message } = await response.json();
        if (response.status === 404) {
          setError("RSVP not found."); // Show RSVP not found message
        } else {
          throw new Error(message || "Error fetching data.");
        }
        return;
      }

      const rsvp = await response.json();

      // Fetch all party members using the partyId
      const partyResponse = await fetch(`/api/party/${rsvp.partyId}`);
      if (!partyResponse.ok) {
        throw new Error("Failed to fetch party members.");
      }

      const partyMembers = await partyResponse.json();
      onRSVPFound({ rsvp, partyMembers }); // Pass RSVP and all party members to parent
    } catch (err) {
      setError((err as Error).message); // Assert the error type
    } finally {
      setLoading(false); // Set loading to false once the search is complete
    }
  }

  return (
    <div
      id="search-component"
      className="flex items-center justify-center min-h-screen "
    >
      <div className="shadow-md rounded-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-semibold text-center mb-6 text-[var(--top-text-color)]">
          Find Your RSVP
        </h1>
        <div className="mb-4 font-[var(--roboto)]">
          <input
            type="text"
            placeholder="Enter your full name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="input-global w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex max-w-sm rounded-xl border border-[var(--top-text-color)] p-0.5 shadow-lg">
          <button
            onClick={handleSearch}
            className={`flex-1 font-bold text-xl bg-white px-6 py-3 rounded-xl text-[var(--top-text-color)] ${
              loading || !fullName.trim() ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading || !fullName.trim()} // Disable if loading or input is empty
          >
            {loading ? "Searching..." : "Search"}
          </button>
        </div>

        {loading && (
          <div className="mt-4 text-center">
            <p className="text-gray-500">Loading...</p>
            {/* Optionally, you can add a spinner icon */}
            <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-blue-500 mx-auto mt-2"></div>
          </div>
        )}

        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
      </div>
    </div>
  );
}
