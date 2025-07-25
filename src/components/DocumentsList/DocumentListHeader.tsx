'use client'

import { signOut } from "next-auth/react"

const DocumentListHeader = () => {
  return (
    <div className="flex items-center justify-between bg-surface-raised py-4 px-6">
      <div className="text-2xl text-brand-primary font-bold">
        Paper-Trail
      </div>
      <div className="relative">
        <input
          className="appearance-none border-2 pl-10 border-gray-300 hover:border-gray-400 transition-colors rounded-md w-full py-2 
          px-3 text-text-light leading-tight focus:outline-none focus:ring-brand-primary focus:border-brand-primary focus:shadow-outline"
          id="username"
          type="text"
          placeholder="Search..."
        />
        <div className="absolute right-0 inset-y-0 flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="-ml-1 mr-3 h-5 w-5 text-surface-light"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>

        <div className="absolute left-0 inset-y-0 flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 ml-3 text-surface-light"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>
      <button
        className="cursor-pointer"
        onClick={() => signOut()}
      >
        Sign Out
      </button>
    </div>
  )
}

export default DocumentListHeader
