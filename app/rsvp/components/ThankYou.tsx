"use client";

export default function ThankYou() {
  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full text-center">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">
          Thank You for Submitting!
        </h1>
        <p className="text-gray-600 mb-6">
          You can always update your RSVP by entering your name again.
        </p>
        <p className="text-sm text-gray-500">
          Redirecting you back to the search page...
        </p>
      </div>
    </div>
  );
}
