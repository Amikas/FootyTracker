"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, status } = useSession();

  const [mode, setMode] = useState<"register" | "edit">("register");
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    name: "",
    age: "",
    weightKg: "",
    heightCm: "",
    avatarUrl: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const userId = session?.user?.id;

  useEffect(() => {
    if (status === "loading") return;

    if (!userId) {
      router.push("/login");
      return;
    }

    setMode("edit");
    fetch(`/api/auth/profile?userId=${userId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setFormData({
            ...formData,
            username: data.username || "",
            name: data.name || "",
            age: data.age?.toString() || "",
            weightKg: data.weightKg?.toString() || "",
            heightCm: data.heightCm?.toString() || "",
            avatarUrl: data.avatarUrl || "",
            password: "", // never populate password field
          });
        }
      })
      .finally(() => setLoading(false));
  }, [userId, status]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!userId) return;

    const payload = {
      ...formData,
      age: formData.age ? parseInt(formData.age) : null,
      weightKg: formData.weightKg ? parseFloat(formData.weightKg) : null,
      heightCm: formData.heightCm ? parseFloat(formData.heightCm) : null,
      userId,
    };

    const res = await fetch(`/api/auth/profile`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      setSuccess("Profile updated!");
    } else {
      const err = await res.json();
      setError(err.message || "Something went wrong");
    }
  };

  if (status === "loading" || loading) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="max-w-md mx-auto mt-12 p-6 border rounded-xl shadow">
      <h1 className="text-2xl font-bold mb-4">Edit Your Profile</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="username"
          placeholder="Username"
          required
          disabled
          value={formData.username}
          className="w-full p-2 border rounded bg-gray-100 cursor-not-allowed"
        />
        <input
          name="name"
          placeholder="Full Name"
          required
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          name="age"
          placeholder="Age"
          type="number"
          value={formData.age}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          name="weightKg"
          placeholder="Weight (kg)"
          type="number"
          value={formData.weightKg}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          name="heightCm"
          placeholder="Height (cm)"
          type="number"
          value={formData.heightCm}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          name="avatarUrl"
          placeholder="Avatar URL"
          value={formData.avatarUrl}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        {error && <p className="text-red-600 text-sm">{error}</p>}
        {success && <p className="text-green-600 text-sm">{success}</p>}
        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded hover:bg-gray-800"
        >
          Update Profile
        </button>
        <button
          type="button"
          onClick={() => router.push("/")}
          className="w-full flex items-center justify-center gap-2 text-gray-800 border border-gray-300 py-2 rounded-lg shadow-sm hover:bg-gray-100"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Dashboard
        </button>
      </form>
    </div>
  );
}
