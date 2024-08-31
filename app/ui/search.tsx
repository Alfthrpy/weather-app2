'use client'

import { useState, FormEvent } from 'react';
import { useSearchParams,usePathname,useRouter } from 'next/navigation';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';



interface SearchProps {
  onSearch: (query: string) => void;
}

export default function Search({ onSearch }: SearchProps) {
  const [inputValue, setInputValue] = useState<string>('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onSearch(inputValue.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-8 flex max-w-md mx-auto gap-x-4">
      <input
        id="location"
        name="location"
        type="text"
        required
        placeholder="Enter city"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className="flex-auto rounded-md border border-gray-300 bg-white px-3.5 py-2 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
      />
      <button
        type="submit"
        className="rounded-md bg-indigo-500 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        Search
      </button>
    </form>
  );
}
