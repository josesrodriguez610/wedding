"use client";

import { useState, useEffect } from "react";

type RSVP = {
  id: number;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  partyId: string;
  notes: string | null;
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

  const [nameUpdates, setNameUpdates] = useState<Record<number, string>>(() =>
    partyMembers.reduce(
      (acc, member) => ({
        ...acc,
        [member.id]:
          member.firstName && member.lastName
            ? `${member.firstName} ${member.lastName}`
            : "", // Combine first and last name or leave empty
      }),
      {} as Record<number, string>
    )
  );

  const [note, setNote] = useState(""); // State for shared notes

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

  const handleNameChange = (id: number, value: string) => {
    setNameUpdates((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = () => {
    // Split names into first and last name before submission
    const splitNames = Object.entries(nameUpdates).reduce(
      (acc, [id, fullName]) => {
        const [firstName = "", ...lastNameParts] = fullName.trim().split(" ");
        acc[parseInt(id)] = {
          firstName,
          lastName: lastNameParts.join(" "),
        };
        return acc;
      },
      {} as Record<number, { firstName: string; lastName: string }>
    );

    console.log("Form submitted with data:", {
      goingStatus,
      emailUpdates,
      nameUpdates: splitNames,
      note,
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
      className="flex items-center justify-center min-h-screen"
    >
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-semibold text-center mb-2 text-gray-800">
          Confirm Your RSVP
        </h1>
        <h2 className="text-center text-gray-500 mb-6">
          Wedding Date: Saturday October 04, 2025
        </h2>

        {/* Party Members */}
        <h3 className="text-lg font-semibold text-gray-700 border-b-2 border-black pb-2">
          Party Members
        </h3>
        <div className="space-y-6 mt-4">
          {sortedPartyMembers.map((member, index) => (
            <div
              key={member.id}
              className={`flex flex-col gap-2 pb-4 flex flex-col gap-2 p-4 bg-white rounded-lg shadow-md border border-gray-200 ${
                index === sortedPartyMembers.length - 1
                  ? "border-b border-black"
                  : ""
              }`}
            >
              {/* Name Input or Display */}
              <div className="flex flex-col gap-2">
                {member.firstName && member.lastName ? (
                  <p className="text-md font-medium text-gray-700 font-semibold">
                    {member.firstName} {member.lastName}
                  </p>
                ) : (
                  <>
                    <label
                      htmlFor={`fullName-${member.id}`}
                      className="text-sm text-gray-500"
                    >
                      Type guest full name
                    </label>
                    <input
                      id={`fullName-${member.id}`}
                      type="text"
                      value={nameUpdates[member.id]}
                      onChange={(e) =>
                        handleNameChange(member.id, e.target.value)
                      }
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter full name"
                    />
                  </>
                )}
              </div>

              {/* Going/Not Going Buttons */}
              <div className="flex items-center justify-between">
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
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
