"use client";

import { useState } from "react";

export default function ResourcesPage() {
  const [activeTab, setActiveTab] = useState<"documents" | "videos">(
    "documents"
  );

  return (
    <div className='min-h-screen bg-card p-6'>
      {/* Search Bar */}
      <div className='mb-4'>
        <div className='relative'>
          <input
            type='text'
            placeholder='Search resources...'
            className='w-full bg-muted text-foreground rounded-lg px-4 py-2 pl-10 border border-border focus:outline-none focus:ring-2 focus:ring-ring'
          />
          <span className='absolute left-3 top-2.5 text-muted-foreground'>🔍</span>
        </div>
      </div>

      {/* Tabs */}
      <div className='flex mb-6'>
        <button
          onClick={() => setActiveTab("documents")}
          className={`flex-1 py-3 text-center font-semibold rounded-l-lg border ${
            activeTab === "documents"
              ? "bg-card text-foreground border-border"
              : "bg-muted text-muted-foreground border-border hover:bg-muted"
          }`}
        >
          Documents
        </button>
        <button
          onClick={() => setActiveTab("videos")}
          className={`flex-1 py-3 text-center font-semibold rounded-r-lg border ${
            activeTab === "videos"
              ? "bg-card text-foreground border-border"
              : "bg-muted text-muted-foreground border-border hover:bg-muted"
          }`}
        >
          Videos
        </button>
      </div>

      {/* Content */}
      <div className='flex flex-col items-center justify-center py-16'>
        <div className='bg-background rounded-lg shadow-md p-8 text-center max-w-md'>
          <p className='text-6xl mb-4'>🚧</p>
          <h2 className='text-2xl font-semibold text-foreground mb-2'>
            Coming Soon
          </h2>
          <p className='text-muted-foreground'>
            {activeTab === "documents"
              ? "Documents section is under development."
              : "Videos section is under development."}
          </p>
        </div>
      </div>
    </div>
  );
}
