"use client";
import { User } from "@/app/types/user";
import React, { useEffect, useState } from "react";

const Analytics = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filter, setFilter] = useState<"true" | "false" | "null">("true");

  useEffect(() => {
    async function fetchRsvpCounts() {
      try {
        const queryParam = filter === "null" ? "" : `?going=${filter}`;
        const response = await fetch(`/api/rsvp/bygoing${queryParam}`);
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching RSVP counts:", error);
      }
    }

    fetchRsvpCounts();
  }, [filter]);

  return (
    <div className="roboto-font min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white flex flex-col py-10 px-4">
      <h2 className="p-2">Analytics!</h2>

      {/* Filter Buttons */}
      <div className="flex gap-4 p-2">
        <button
          onClick={() => setFilter("true")}
          className="px-4 py-2 bg-green-600 rounded"
        >
          Going
        </button>
        <button
          onClick={() => setFilter("false")}
          className="px-4 py-2 bg-red-600 rounded"
        >
          Not Going
        </button>
        <button
          onClick={() => setFilter("null")}
          className="px-4 py-2 bg-yellow-600 rounded"
        >
          No Response
        </button>
      </div>

      <h2 className="p-2">Number of users: {users.length}</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="py-3 px-4 text-left">ID</th>
              <th className="py-3 px-4 text-left">First Name</th>
              <th className="py-3 px-4 text-left">Last Name</th>
              <th className="py-3 px-4 text-left">Email</th>
              <th className="py-3 px-4 text-left">Going</th>
              <th className="py-3 px-4 text-left">PartyId</th>
            </tr>
          </thead>
          <tbody className="text-black">
            {users.length > 0 ? (
              users.map((user, index) => (
                <tr
                  key={user.id}
                  className={`border-b ${
                    index % 2 === 0 ? "bg-gray-100" : "bg-gray-50"
                  }`}
                >
                  <td className="py-3 px-4">{user.id}</td>
                  <td className="py-3 px-4">{user.firstName}</td>
                  <td className="py-3 px-4">{user.lastName}</td>
                  <td className="py-3 px-4">{user.email}</td>
                  <td className="py-3 px-4">
                    {user.going === true
                      ? "Yes"
                      : user.going === false
                      ? "No"
                      : "N/A"}
                  </td>
                  <td className="py-3 px-4">{user.partyId}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center py-4">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Analytics;
