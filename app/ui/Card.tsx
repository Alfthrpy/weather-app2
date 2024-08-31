// components/Card.tsx
import React from "react";

interface dataResult {
  title: string | undefined;
  content: string | undefined;
  icon: string | undefined;
}

export default function Card({ title, content, icon }: dataResult) {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden max-w-sm">
      {/* Header with background image and title */}
      <div className="relative bg-purple-400 text-white px-4 py-6">
        <img
          src={icon}
          alt={title}
          className="absolute top-0 left-0 w-full h-full object-cover opacity-50"
        />
        <div className="relative">
          <h3 className="text-lg font-bold">{title}</h3>
        </div>
      </div>

      {/* Content area with weather details */}
      <div className="p-6 space-y-4">
        <p className="text-lg-gray-700">{content}</p>
      </div>
    </div>
  );
}
