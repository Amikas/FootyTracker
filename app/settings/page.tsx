"use client";

import React from 'react';
import { Construction } from 'lucide-react';

export default function ComingSoonPage() {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-xl shadow-xl p-8 text-center max-w-sm">
        <Construction className="mx-auto mb-6 w-16 h-16 text-gray-400 drop-shadow-lg" />
        <h1 className="text-3xl font-bold text-gray-100">Coming Soon...</h1>
      </div>
    </div>
  );
}
