import React from "react";

export default function Loading() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-50 animate-pulse">
      {/* Outer container with fixed width */}
      <div className="flex w-[80%] max-w-6xl">
        
        {/* Left side - 40% */}
        <div className="flex justify-center items-center w-[40%]">
          <div className="w-64 h-64 rounded-full bg-gray-200" />
        </div>

        {/* Right side - 60% */}
        <div className="flex flex-col items-center w-[60%]">
          {/* Chapter buttons row */}
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            {Array.from({ length: 10 }).map((_, idx) => (
              <div
                key={idx}
                className="w-24 h-8 rounded-full bg-gray-200"
              />
            ))}
          </div>

          {/* Book / page area */}
          <div className="flex items-center gap-4">
            {/* Left arrow */}
            <div className="w-10 h-10 rounded-full bg-gray-200" />

            {/* Page content */}
            <div className="w-[300px] h-[400px] rounded-lg bg-gray-200" />

            {/* Right arrow */}
            <div className="w-10 h-10 rounded-full bg-gray-200" />
          </div>
        </div>
      </div>
    </div>
  );
}
