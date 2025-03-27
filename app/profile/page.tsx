'use client'

import { useEffect, useState } from 'react'

export default function ProfilePage() {
  const [form, setForm] = useState({
    name: '',
    age: '',
    weightKg: '',
    heightCm: '',
    avatarUrl: ''
  })

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProfile = async () => {
      const res = await fetch('/api/profile')
      const data = await res.json()
      if (data) {
        setForm({
          name: data.name || '',
          age: data.age?.toString() || '',
          weightKg: data.weightKg?.toString() || '',
          heightCm: data.heightCm?.toString() || '',
          avatarUrl: data.avatarUrl || ''
        })
      }
      setLoading(false)
    }

    fetchProfile()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await fetch('/api/profile', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...form,
        age: parseInt(form.age),
        weightKg: parseFloat(form.weightKg),
        heightCm: parseFloat(form.heightCm),
      }),
    })

    alert('Profile saved ✅')
    localStorage.setItem('isSignedIn', 'true') // ✅ Set login state
  }

  if (loading) return <div className="p-6 text-white">Loading profile...</div>

  return (
    <div className="max-w-xl mx-auto py-10 px-6 text-white">
      <h1 className="text-3xl font-bold mb-6">Your Profile</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="name" placeholder="Name" value={form.name} onChange={handleChange} className="w-full p-2 rounded bg-gray-800" />
        <input type="number" name="age" placeholder="Age" value={form.age} onChange={handleChange} className="w-full p-2 rounded bg-gray-800" />
        <input type="number" name="weightKg" placeholder="Weight (kg)" value={form.weightKg} onChange={handleChange} className="w-full p-2 rounded bg-gray-800" />
        <input type="number" name="heightCm" placeholder="Height (cm)" value={form.heightCm} onChange={handleChange} className="w-full p-2 rounded bg-gray-800" />
        <input type="text" name="avatarUrl" placeholder="Avatar URL (optional)" value={form.avatarUrl} onChange={handleChange} className="w-full p-2 rounded bg-gray-800" />
        <button type="submit" className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded">
          Save Profile
        </button>
      </form>
    </div>
  )
}
