"use client";

import { useState } from "react";

export default function VerifyEmail() {
  const [isResending, setIsResending] = useState(false);

  const handleResend = async () => {
    setIsResending(true);
    setTimeout(() => {
      setIsResending(false);
    }, 2000);
  };

  return (
    <div className="space-y-6 text-center">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Verify Link</h2>
      </div>

      <div className="flex justify-center py-8">
        <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center">
          <svg
            className="w-16 h-16 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-xl font-semibold text-gray-900">
          We have sent you an email
        </h3>
        <p className="text-sm text-gray-600">
          A verification link has been sent to your email.Please check your
          email
        </p>
      </div>

      <div className="pt-4">
        <p className="text-sm text-gray-600">
          Didn&#39;t receive the email yet?{" "}
          <button
            onClick={handleResend}
            disabled={isResending}
            className="font-semibold text-gray-900 underline hover:text-insurance-teal disabled:opacity-50"
          >
            {isResending ? "Sending..." : "Send Again"}
          </button>
        </p>
      </div>
    </div>
  );
}
