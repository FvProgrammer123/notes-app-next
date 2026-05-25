"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCreateNote } from "@/hooks/useNotes";

export default function AddPage() {
  const [text, setText] = useState("");
  const router = useRouter();
  const { mutate: createNote } = useCreateNote();
  const addNote = async () => {
    if (!text.trim()) return;
    createNote(text, {
      onSuccess: () => router.push("/"),
    });
  };

  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6">
        {/* Title */}
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          ➕ Add New Note
        </h1>

        {/* Input */}
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter your note..."
          className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Save Button */}
        <button
          onClick={addNote}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg shadow transition"
        >
          Save Note
        </button>

        {/* Back Button */}
        <button
          onClick={() => router.push("/")}
          className="w-full mt-3 text-gray-500 hover:text-gray-800 text-sm"
        >
          ← Back to Notes
        </button>
      </div>
    </main>
  );
}
