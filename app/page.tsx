"use client";

import { useRouter } from "next/navigation";
import { useNotes, useDeleteNote } from "@/hooks/useNotes";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/redux/slices/authSlice";
import { RootState } from "@/redux/store";

export default function Home() {
  const { data: notes = [] } = useNotes();
  const { mutate } = useDeleteNote();
  const router = useRouter();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  const addNotePage = () => {
    router.push("add");
  };

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    router.push("/login");
  };

  const handleLogin = () => {
    router.push("/login");
  };

  return (
    <main className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      {/* Header */}
      <div className="w-full max-w-2xl flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">📝 Notes App</h1>

        <div className="flex gap-2">
          {isAuthenticated ? (
            <>
              <button
                onClick={addNotePage}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow"
              >
                + Add Note
              </button>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg shadow"
              >
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={handleLogin}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow"
            >
              Login
            </button>
          )}
        </div>
      </div>

      {/* Notes List */}
      <div className="w-full max-w-2xl space-y-3">
        {notes.length === 0 ? (
          <p className="text-gray-500 text-center mt-10">
            No notes yet. Create your first note 🚀
          </p>
        ) : (
          notes.map((note) => (
            <div
              key={note.id}
              className="bg-white p-4 rounded-xl shadow flex justify-between items-center hover:shadow-md transition"
            >
              <span className="text-gray-800">{note.text}</span>

              <button
                onClick={() => mutate(note.id)}
                className="text-red-500 hover:text-red-700 font-medium"
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </main>
  );
}
