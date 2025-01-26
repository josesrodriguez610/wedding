"use client";

import { useEffect, useState } from "react";

type RSVP = {
  id: number;
  firstName: string;
  lastName: string;
  email: string | null; // Email can be null if not provided
  partyId: string;
};

type RSVPConfirmationProps = {
  rsvp: RSVP; // The RSVP of the current user
  partyMembers: RSVP[]; // All members of the same party
};

export default function RSVPConfirmation({
  rsvp,
  partyMembers,
}: RSVPConfirmationProps) {
  const [goingStatus, setGoingStatus] = useState<
    Record<number, boolean | null>
  >(() =>
    partyMembers.reduce(
      (acc, member) => ({ ...acc, [member.id]: null }),
      {} as Record<number, boolean | null>
    )
  );

  const [emailUpdates, setEmailUpdates] = useState<Record<number, string>>(() =>
    partyMembers.reduce(
      (acc, member) => ({ ...acc, [member.id]: member.email || "" }),
      {} as Record<number, string>
    )
  );

  const [note, setNote] = useState(""); // State for the note

  // Pre-fill the note from the first user's notes if it exists
  useEffect(() => {
    if (partyMembers.length > 0 && partyMembers[0].notes) {
      setNote(partyMembers[0].notes);
    }
  }, [partyMembers]);

  const handleToggle = (id: number, status: boolean) => {
    setGoingStatus((prev) => ({
      ...prev,
      [id]: status,
    }));
  };

  const handleEmailChange = (
    id: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setEmailUpdates((prev) => ({
      ...prev,
      [id]: e.target.value,
    }));
  };

  const handleSubmit = () => {
    console.log("Form submitted with data:", {
      goingStatus,
      emailUpdates,
    });
    // Submit the data to your backend
  };

  // Ensure the searched user is displayed first
  const sortedPartyMembers = [
    rsvp, // First member is the searched user
    ...partyMembers.filter((member) => member.id !== rsvp.id), // Exclude the searched user from the remaining list
  ];

  return (
    <div
      id="confirmation-component"
      className="flex items-center justify-center min-h-screen "
    >
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-semibold text-center mb-2 text-gray-800">
          Confirm Your RSVP
        </h1>
        <h2 className="text-center text-gray-500 mb-6">
          Wedding Date: Saturday October 04, 2025
        </h2>

        {/* Party Members */}
        <h3 className="text-lg font-semibold text-gray-700 border-b border-black pb-2 mb-4">
          Party Members
        </h3>
        <div className="space-y-6">
          {sortedPartyMembers.map((member, index) => (
            <div
              key={member.id}
              className={`flex flex-col gap-2 pb-4 ${
                index === sortedPartyMembers.length - 1
                  ? "border-b border-black"
                  : ""
              }`}
            >
              {/* Name and Going/Not Going Buttons */}
              <div className="flex items-center justify-between">
                <p className="text-md font-medium text-gray-700 font-semibold">
                  {member.firstName} {member.lastName}
                </p>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => handleToggle(member.id, true)}
                    className={`px-4 py-2 rounded-lg transition duration-200 ${
                      goingStatus[member.id] === true
                        ? "bg-green-500 text-white"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                  >
                    Going
                  </button>
                  <button
                    onClick={() => handleToggle(member.id, false)}
                    className={`px-4 py-2 rounded-lg transition duration-200 ${
                      goingStatus[member.id] === false
                        ? "bg-red-500 text-white"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                  >
                    Not Going
                  </button>
                </div>
              </div>
              {/* Email Input */}
              <div className="flex flex-col">
                <label
                  htmlFor={`email-${member.id}`}
                  className="text-sm text-gray-500"
                >
                  Email (optional)
                </label>
                <input
                  id={`email-${member.id}`}
                  type="email"
                  value={emailUpdates[member.id] || ""}
                  onChange={(e) => handleEmailChange(member.id, e)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter email address"
                />
              </div>
            </div>
          ))}
        </div>
        {/* Note Input */}
        <div className="mt-6">
          <label className="block text-gray-700 mb-2">
            Leave a note for the couple
          </label>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
            placeholder="Enter your message here"
          />
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition duration-200 mt-6"
        >
          Submit
        </button>
      </div>
    </div>
  );
}
