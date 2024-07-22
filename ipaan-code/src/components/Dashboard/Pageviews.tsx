import React from 'react';
import { Card, CardHeader, CardTitle } from '@/components/ui/card'; // Assuming your card component path

function Tryviews() {
  return (
    <Card>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row h-[60px]">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6 text-center">
          <CardTitle>Dashboard</CardTitle>
        </div>
        <div className="flex gap-2">
          <button
            className={`px-4 py-2 rounded-md text-left 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            Summary
          </button>
          <button
            className={`px-4 py-2 rounded-md text-left  'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}

          >
            Per City
          </button>
          <button
            className={`px-4 py-2 rounded-md text-left 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}

          >
            Per ISP
          </button>
        </div>
      </CardHeader>
      {/* Content based on activeView (implementation omitted for brevity) */}
    </Card>
  );
}

export default Tryviews;