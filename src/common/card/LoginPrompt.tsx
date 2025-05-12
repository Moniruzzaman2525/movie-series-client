"use client"

import type React from "react"
import { X } from "lucide-react"
import Link from "next/link"

interface LoginPromptProps {
    setShowLoginModal: React.Dispatch<React.SetStateAction<boolean>>
    action: "like" | "comment"
}

const LoginPrompt: React.FC<LoginPromptProps> = ({ setShowLoginModal, action }) => {
    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 max-w-md w-full mx-4">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold dark:text-white">Login Required</h2>
                    <button
                        onClick={() => setShowLoginModal(false)}
                        className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <div className="mb-6">
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                        You need to be logged in to {action === "like" ? "like movies" : "leave comments"}.
                    </p>

                    <div className="flex flex-col space-y-3">
                        <Link
                            href="/login"
                            className="w-full py-2 bg-red-500 text-white rounded-lg text-center font-medium hover:bg-red-600 transition"
                        >
                            Log In
                        </Link>

                        <Link
                            href="/signup"
                            className="w-full py-2 border border-gray-300 dark:border-gray-700 rounded-lg text-center font-medium text-gray-800 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                        >
                            Sign Up
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginPrompt
