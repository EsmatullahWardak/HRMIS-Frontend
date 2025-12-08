"use client";

import { useState } from "react";

export default function ResourcesPage() {
  const [activeTab, setActiveTab] = useState<"documents" | "videos">(
    "documents"
  );

  return (
    <div className='min-h-screen bg-white p-6'>
      {/* Search Bar */}
      <div className='mb-4'>
        <div className='relative'>
          <input
            type='text'
            placeholder='Search resources...'
            className='w-full bg-gray-100 text-gray-800 rounded-lg px-4 py-2 pl-10 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500'
          />
          <span className='absolute left-3 top-2.5 text-gray-400'>🔍</span>
        </div>
      </div>

      {/* Tabs */}
      <div className='flex mb-6'>
        <button
          onClick={() => setActiveTab("documents")}
          className={`flex-1 py-3 text-center font-semibold rounded-l-lg border ${
            activeTab === "documents"
              ? "bg-light-gray-600 text-bla border-gray-600"
              : "bg-gray-100 text-gray-600 border-gray-300 hover:bg-gray-200"
          }`}
        >
          Documents
        </button>
        <button
          onClick={() => setActiveTab("videos")}
          className={`flex-1 py-3 text-center font-semibold rounded-r-lg border ${
            activeTab === "videos"
              ? "bg-light-gray-600 text-black border-gray-600"
              : "bg-gray-100 text-gray-600 border-gray-300 hover:bg-gray-200"
          }`}
        >
          Videos
        </button>
      </div>

      {/* Content */}
      <div className='text-center text-gray-500 py-8'>
        {activeTab === "documents" ? (
          <p>No documents found.</p>
        ) : (
          <p>No videos found.</p>
        )}
      </div>
    </div>
  );
}
