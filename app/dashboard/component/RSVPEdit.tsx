"use client";

import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Groups, User, EditingParty } from "@/app/types/user";

export default function RSVPEdit() {
  const defaultUser: User = {
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zipcode: "",
    phone: "",
    notes: "",
    going: null,
  };

  const [searchTerm, setSearchTerm] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingParty, setEditingParty] = useState<EditingParty | null>(null);
  const [newPartyUsers, setNewPartyUsers] = useState([{ ...defaultUser }]);
  const [groups, setGroups] = useState<Groups>({});

  const [rsvpCounts, setRsvpCounts] = useState({
    Going: 0,
    "Not Going": 0,
    "No Response": 0,
    Total: 0, // Add total count
  });

  // Fetch RSVP counts on component mount
  useEffect(() => {
    async function fetchRsvpCounts() {
      try {
        const response = await fetch("/api/rsvp/count");
        const data = await response.json();
        setRsvpCounts(data);
      } catch (error) {
        console.error("Error fetching RSVP counts:", error);
      }
    }

    fetchRsvpCounts();
  }, []);

  // Fetch RSVP groups
  useEffect(() => {
    fetch("/api/rsvp")
      .then((res) => res.json())
      .then(setGroups);
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const filteredGroups = Object.entries(groups).filter(([partyId, users]) =>
    users.some(
      (user) =>
        user.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.lastName?.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Open Create Party Modal
  const openCreateModal = () => {
    console.log(isCreateModalOpen);
    setIsCreateModalOpen(true);
    setIsEditModalOpen(false); // Ensure edit modal stays closed
  };

  const closeCreateModal = () => {
    setIsCreateModalOpen(false);
    setNewPartyUsers([{ ...defaultUser }]); // ✅ Resets "going" to null correctly
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setEditingParty(null); // ✅ Properly resets the editing state
  };

  // Open Edit Party Modal
  const openEditModal = (partyId: string) => {
    if (groups[partyId]) {
      setEditingParty({ partyId, users: [...groups[partyId]] });
      setIsEditModalOpen(true);
      setIsCreateModalOpen(false); // Ensure create modal stays closed
    }
  };

  const handleUserChange = (
    index: number,
    field: keyof User,
    value: string | boolean | null,
    isNewUser: boolean = true
  ) => {
    const users = isNewUser
      ? [...newPartyUsers]
      : [...(editingParty?.users || [])];

    if (!users[index]) return; // Prevent errors if the index is out of bounds

    users[index] = { ...users[index], [field]: value };

    if (isNewUser) {
      setNewPartyUsers(users);
    } else {
      setEditingParty((prev) => (prev ? { ...prev, users } : prev));
    }
  };

  // Handle user input changes dynamically (Edit Party)
  const handleEditUserChange = (
    index: number,
    field: keyof User,
    value: string | boolean | null
  ) => {
    setEditingParty((prevParty) => {
      if (!prevParty) return prevParty;
      const updatedUsers = [...prevParty.users];
      updatedUsers[index] = { ...updatedUsers[index], [field]: value };
      return { ...prevParty, users: updatedUsers };
    });
  };

  // Handle Update Party
  const handleUpdateParty = async () => {
    if (!editingParty) return;

    for (const user of editingParty.users) {
      if (user.id) {
        await fetch(`/api/rsvp/${user.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(user),
        });
      } else {
        await fetch("/api/rsvp", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...user, partyId: editingParty.partyId }),
        });
      }
    }

    fetch("/api/rsvp")
      .then((res) => res.json())
      .then(setGroups);

    setIsEditModalOpen(false);
  };

  const addNewUserField = () => {
    setNewPartyUsers((prevUsers) => {
      if (!Array.isArray(prevUsers)) return [{ ...defaultUser }]; // Ensure it's an array
      return [...prevUsers, { ...defaultUser }]; // Append new user correctly
    });
  };

  const addUserToEditingParty = () => {
    setEditingParty((prev) => {
      if (!prev) return prev; // Prevents errors if prev is null

      return {
        ...prev,
        users: [...prev.users, { ...defaultUser }],
      };
    });
  };

  // Handle Create Party
  const handleCreateParty = async () => {
    const partyId = uuidv4();
    for (const user of newPartyUsers) {
      await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...user, partyId }),
      });
    }

    fetch("/api/rsvp")
      .then((res) => res.json())
      .then(setGroups);

    setNewPartyUsers([{ ...defaultUser }]);
    setIsCreateModalOpen(false);
  };

  // 🛑 DELETE User from Party 🛑
  const handleDeleteUser = async (index: number, userId?: number) => {
    if (!editingParty) return;

    const updatedUsers = [...editingParty.users];
    updatedUsers.splice(index, 1); // Remove user from the array

    setEditingParty({ ...editingParty, users: updatedUsers });

    // If the user has an ID (exists in DB), send DELETE request
    if (userId) {
      await fetch(`/api/rsvp/${userId}`, {
        method: "DELETE",
      });
    }

    // Update groups after deleting user
    fetch("/api/rsvp")
      .then((res) => res.json())
      .then(setGroups);
  };

  useEffect(() => {
    if (isEditModalOpen || isCreateModalOpen) {
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
      document.body.style.height = "100vh"; // Prevents background movement
    } else {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      document.body.style.height = "";
    }

    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      document.body.style.height = "";
    };
  }, [isEditModalOpen, isCreateModalOpen]);

  const userFields = [
    { name: "firstName", placeholder: "First Name", type: "text" },
    { name: "lastName", placeholder: "Last Name", type: "text" },
    { name: "email", placeholder: "Email", type: "email" },
    { name: "address", placeholder: "Address", type: "text" },
    { name: "city", placeholder: "City", type: "text" },
    { name: "state", placeholder: "State", type: "text" },
    { name: "zipcode", placeholder: "Zip Code", type: "text" },
    { name: "phone", placeholder: "Phone", type: "tel" },
    { name: "notes", placeholder: "Notes", type: "text" },
    { name: "going", placeholder: "Attending", type: "boolean" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white flex flex-col items-center py-10 px-4">
      {/* RSVP Counts Section */}
      <div className="bg-gray-800 p-4 rounded-lg shadow-md text-center mb-6">
        <p className="text-lg font-semibold text-gray-300">
          👥 Total Users:{" "}
          <span className="text-blue-400">{rsvpCounts.Total}</span>
        </p>
        <p className="text-lg font-semibold text-gray-300">
          ✅ Going: <span className="text-green-400">{rsvpCounts.Going}</span>
        </p>
        <p className="text-lg font-semibold text-gray-300">
          ❌ Not Going:{" "}
          <span className="text-red-400">{rsvpCounts["Not Going"]}</span>
        </p>
        <p className="text-lg font-semibold text-gray-300">
          ❓ No Response:{" "}
          <span className="text-yellow-400">{rsvpCounts["No Response"]}</span>
        </p>
      </div>
      <h1 className="text-3xl font-extrabold mb-6 text-gray-200 tracking-wide">
        RSVP Dashboard
      </h1>

      {/* Search Bar */}
      <div className="relative w-full max-w-md">
        <input
          type="text"
          placeholder="Search by name..."
          className="w-full p-3 pl-10 bg-gray-700 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <span className="absolute left-3 top-3 text-gray-400">🔍</span>
      </div>

      {/* Create New Party Button */}
      <button
        onClick={openCreateModal}
        className="mt-6 bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-full shadow-lg flex items-center justify-center w-12 h-12"
      >
        ➕
      </button>

      {/* Party Groups */}
      <div className="mt-8 w-full max-w-2xl">
        {filteredGroups.length === 0 && (
          <p className="text-gray-400 text-center">No RSVP groups found.</p>
        )}
        {filteredGroups.map(([partyId, users]) => (
          <div
            key={String(partyId)}
            className="bg-gray-800 p-6 mt-4 rounded-lg shadow-lg backdrop-blur-md bg-opacity-70 transition-all hover:scale-102 hover:bg-opacity-90"
          >
            <h2 className="text-xl font-semibold text-blue-400">
              Party ID: {String(partyId)}
            </h2>
            <p className="text-gray-400">Members:</p>
            <ul className="mt-3 space-y-2">
              {(Array.isArray(users) ? users : []).map((user) => (
                <li
                  key={user.id}
                  className="flex justify-between items-center bg-gray-700 p-3 rounded-md"
                >
                  <span className="text-white">
                    {user.firstName} {user.lastName}
                  </span>
                </li>
              ))}
            </ul>
            <button
              className="mt-4 bg-green-500 hover:bg-green-600 transition-colors text-white p-3 rounded-lg font-semibold tracking-wide"
              onClick={() => openEditModal(String(partyId))}
            >
              ✏️ Edit Party
            </button>
          </div>
        ))}
      </div>

      {/* Edit Party Modal */}
      {isEditModalOpen && editingParty && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div
            className="bg-gray-800 p-6 rounded-lg shadow-xl w-full max-w-lg flex flex-col"
            style={{
              maxHeight: "80vh", // Limit modal height
              display: "flex",
            }}
          >
            <h2 className="text-xl font-bold mb-4 text-gray-100">Edit Party</h2>
            <div
              className="overflow-y-auto px-2 flex-grow"
              style={{ maxHeight: "60vh", paddingRight: "8px" }}
              onWheel={(e) => e.stopPropagation()} // Stops accidental page scrolling
              onTouchMove={(e) => e.stopPropagation()} // Ensures mobile scrolling
            >
              {editingParty.users.map((user, index) => (
                <div key={index} className="mb-4 flex flex-col gap-2">
                  {/* 🔹 Add Separator Line Between Users 🔹 */}
                  {index > 0 && (
                    <hr className="border-gray-600 my-4 opacity-50" />
                  )}
                  {userFields.map((field) => (
                    <div key={field.name} className="mb-2">
                      {field.name === "going" ? (
                        <select
                          className="bg-gray-700 text-white p-2 rounded-lg"
                          value={
                            user?.going === null ? "" : user.going.toString()
                          }
                          onChange={(e) =>
                            handleEditUserChange(
                              index,
                              "going",
                              e.target.value === "true"
                                ? true
                                : e.target.value === "false"
                                ? false
                                : null
                            )
                          }
                        >
                          <option value="">Not Decided</option>
                          <option value="true">Yes</option>
                          <option value="false">No</option>
                        </select>
                      ) : (
                        <input
                          type={field.type}
                          placeholder={field.placeholder}
                          className="w-full p-3 bg-gray-700 text-white border border-gray-600 rounded-lg"
                          value={String(user[field.name as keyof User]) || ""}
                          onChange={(e) =>
                            handleEditUserChange(
                              index,
                              field.name as keyof User,
                              e.target.value
                            )
                          }
                        />
                      )}
                    </div>
                  ))}
                  {/* 🗑️ Delete Button */}
                  <button
                    className={`bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold transition ${
                      editingParty.users.length === 1
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                    onClick={() => handleDeleteUser(index, user.id)}
                    disabled={editingParty.users.length === 1}
                  >
                    🗑️ Remove User
                  </button>
                </div>
              ))}

              {/* Add New User Button */}
              <button
                className="w-full bg-green-500 hover:bg-green-600 text-white p-2 rounded-lg font-semibold tracking-wide mb-4"
                onClick={addUserToEditingParty}
              >
                ➕ Add Another User
              </button>

              <div className="flex justify-between">
                <button
                  onClick={closeEditModal}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg font-semibold"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdateParty}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold"
                >
                  Update Party
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create Party Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div
            className="bg-gray-800 p-6 rounded-lg shadow-xl w-full max-w-lg flex flex-col"
            style={{
              maxHeight: "80vh", // Limit modal height
              display: "flex",
            }}
          >
            <h2 className="text-xl font-bold mb-4 text-gray-100">
              Create New Party
            </h2>

            {/* 🟢 Scrollable Content */}
            <div
              className="overflow-y-auto px-2 flex-grow"
              style={{ maxHeight: "60vh", paddingRight: "8px" }}
              onWheel={(e) => e.stopPropagation()} // Stops accidental page scrolling
              onTouchMove={(e) => e.stopPropagation()} // Ensures mobile scrolling
            >
              {newPartyUsers.map((user, index) => (
                <div key={index} className="mb-4">
                  {userFields.map((field) => (
                    <div key={field.name} className="mb-2">
                      {field.name === "going" ? (
                        // ✅ Render a dropdown (select) for the "going" field
                        <div className="flex items-center space-x-4">
                          <label className="text-white">
                            {field.placeholder}:
                          </label>
                          <select
                            className="bg-gray-700 text-white p-2 rounded-lg"
                            value={
                              user.going === null ? "" : user.going.toString()
                            } // Ensure correct value
                            onChange={(e) =>
                              handleUserChange(
                                index,
                                "going",
                                e.target.value === "true"
                                  ? true
                                  : e.target.value === "false"
                                  ? false
                                  : null,
                                true
                              )
                            }
                          >
                            <option value="">Not Decided</option>{" "}
                            {/* Represents `null` */}
                            <option value="true">Yes</option>{" "}
                            {/* Represents `true` */}
                            <option value="false">No</option>{" "}
                            {/* Represents `false` */}
                          </select>
                        </div>
                      ) : (
                        // ✅ Default text input for other fields
                        <input
                          type={field.type}
                          placeholder={field.placeholder}
                          className="w-full p-3 bg-gray-700 text-white border border-gray-600 rounded-lg"
                          value={String(user[field.name as keyof User]) || ""}
                          onChange={(e) =>
                            handleUserChange(
                              index,
                              field.name as keyof User,
                              e.target.value,
                              true
                            )
                          }
                        />
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>

            <button
              onClick={addNewUserField}
              className="w-full bg-green-500 hover:bg-green-600 text-white p-2 rounded-lg font-semibold tracking-wide mb-4"
            >
              ➕ Add Another User
            </button>
            <div className="flex justify-between">
              <button
                onClick={closeCreateModal}
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateParty}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold"
              >
                Create Party
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
