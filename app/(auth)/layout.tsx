"use client";

import { useOnboardingStore } from "@/store";
import { cn } from "@/lib/utils";
import Image from "next/image";
import logo from "@/public/images/logo.png";

interface AuthLayoutProps {
  children: React.ReactNode;
  showProgress?: boolean;
}

export default function AuthLayout({
  children,
  showProgress = false,
}: AuthLayoutProps) {
  const currentStep = useOnboardingStore((state) => state.currentStep);
  const completedSteps = useOnboardingStore((state) => state.completedSteps);

  const steps = [
    { number: 1, title: "Company Account" },
    { number: 2, title: "Bank Details" },
    { number: 3, title: "Documents" },
    { number: 4, title: "Create Password" },
  ];

  return (
    <main className="min-h-screen bg-white flex items-center justify-center p-2 gap-10">
      <div className="w-full mx-12 rounded-3xl overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[860px]">
          <div className="p-12 flex flex-col justify-between">
            <div>
              <div className="w-40 h-40  rounded-xl flex items-center justify-center">
                <Image
                  src={logo}
                  alt="Logo"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
            {/* Logo */}

            {/* Progress Bar */}
            {showProgress && (
              <div className="mt-10 mb-6">
                <div className="flex items-center justify-between relative">
                  {steps.map((step, index) => (
                    <div key={step.number} className="flex-1 flex items-center">
                      <div className="flex flex-col items-center relative z-10">
                        <div
                          className={cn(
                            "w-9 h-9 rounded-full border-2 flex items-center justify-center text-sm font-medium transition-all",
                            currentStep === step.number
                              ? "border-insurance-teal text-insurance-teal bg-white ring-4 ring-insurance-teal/20"
                              : completedSteps.includes(
                                    step.number as 1 | 2 | 3 | 4,
                                  )
                                ? "bg-insurance-teal border-insurance-teal text-white"
                                : "border-gray-300 text-gray-400 bg-white",
                          )}
                        >
                          {completedSteps.includes(
                            step.number as 1 | 2 | 3 | 4,
                          ) ? (
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          ) : (
                            step.number
                          )}
                        </div>

                        <p className="text-[10px] mt-2 text-gray-500">
                          STEP {step.number} OF 4
                        </p>

                        <p className="text-xs text-gray-600">{step.title}</p>
                      </div>

                      {index < steps.length - 1 && (
                        <div
                          className={cn(
                            "flex-1 h-[2px] mx-2",
                            completedSteps.includes(step.number as 1 | 2 | 3)
                              ? "bg-insurance-teal"
                              : "bg-gray-300",
                          )}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex-1 flex items-center">
              <div className="w-full max-w-md">{children}</div>
            </div>
          </div>

          <div className="relative hidden lg:block rounded-md">
            <div className="absolute inset-0">
              <div className="h-full w-full bg-[url('/images/onboarding.jpg')] bg-cover bg-center" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
            </div>

            <div className="relative z-10 h-full flex flex-col justify-end p-12 text-white">
              <p className="text-lg leading-relaxed font-light max-w-md">
                Life is unpredictable your healthcare shouldn&apos;t be. Get
                affordable health insurance that covers hospital visits,
                medications, emergencies, and specialist care when you need it
              </p>

              <div className="mt-8 flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-white/70" />
                <span className="w-2 h-2 rounded-full bg-white/40" />
                <span className="w-10 h-1.5 rounded-full bg-insurance-teal" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
