"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useOnboardingStore } from "@/store/onboarding-store";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Mail, ArrowLeft, Loader2 } from "lucide-react";
import AuthLayout from "@/app/(auth)/layout";

const OTP_LENGTH = 6;
const RESEND_COOLDOWN = 60; // seconds
const SIMULATED_OTP = "123456"; // simulated correct OTP

export default function VerifyOTPPage() {
  const router = useRouter();
  const { formData, resetOnboarding } = useOnboardingStore();

  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState("");
  const [resendTimer, setResendTimer] = useState(RESEND_COOLDOWN);
  const [canResend, setCanResend] = useState(false);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const email =
    formData.credentials?.email ||
    formData.companyAccount?.email ||
    "your email";

  // Countdown timer for resend
  useEffect(() => {
    if (resendTimer <= 0) {
      setCanResend(true);
      return;
    }

    const interval = setInterval(() => {
      setResendTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [resendTimer]);

  // Auto-focus first input on mount
  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleChange = (index: number, value: string) => {
    // Only allow digits
    if (value && !/^\d$/.test(value)) return;

    setError("");
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Backspace") {
      if (!otp[index] && index > 0) {
        // Move to previous input if current is empty
        const newOtp = [...otp];
        newOtp[index - 1] = "";
        setOtp(newOtp);
        inputRefs.current[index - 1]?.focus();
      } else {
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
      }
    }

    if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }

    if (e.key === "ArrowRight" && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, OTP_LENGTH);

    if (!pastedData) return;

    const newOtp = [...otp];
    for (let i = 0; i < pastedData.length; i++) {
      newOtp[i] = pastedData[i];
    }
    setOtp(newOtp);

    // Focus the next empty input or the last one
    const nextEmptyIndex = newOtp.findIndex((v) => !v);
    const focusIndex = nextEmptyIndex === -1 ? OTP_LENGTH - 1 : nextEmptyIndex;
    inputRefs.current[focusIndex]?.focus();
  };

  const handleVerify = useCallback(async () => {
    const otpString = otp.join("");

    if (otpString.length !== OTP_LENGTH) {
      setError("Please enter the complete 6-digit code");
      return;
    }

    setIsVerifying(true);
    setError("");

    // Simulate API call — 2 second delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    if (otpString === SIMULATED_OTP) {
      setIsVerified(true);

      // Wait a moment to show success, then redirect
      setTimeout(() => {
        resetOnboarding();
        router.push("/sign-in");
      }, 2500);
    } else {
      setError("Invalid verification code. Try 123456 for demo.");
      setOtp(Array(OTP_LENGTH).fill(""));
      inputRefs.current[0]?.focus();
    }

    setIsVerifying(false);
  }, [otp, resetOnboarding, router]);

  // Auto-submit when all digits filled
  useEffect(() => {
    const otpString = otp.join("");
    if (otpString.length === OTP_LENGTH && !isVerifying && !isVerified) {
      handleVerify();
    }
  }, [otp, isVerifying, isVerified, handleVerify]);

  const handleResend = async () => {
    if (!canResend) return;

    setCanResend(false);
    setResendTimer(RESEND_COOLDOWN);
    setOtp(Array(OTP_LENGTH).fill(""));
    setError("");
    inputRefs.current[0]?.focus();

    // Simulate resend
    console.log("📧 OTP resent to", email);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  // Success state
  if (isVerified) {
    return (
      <AuthLayout>
        <div className="flex flex-col items-center justify-center min-h-[400px] text-center space-y-6">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center animate-bounce">
            <CheckCircle2 className="w-10 h-10 text-green-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Email Verified!
            </h2>
            <p className="text-gray-500 mt-2">
              Your account has been successfully created.
            </p>
            <p className="text-gray-400 text-sm mt-1">
              Redirecting to login...
            </p>
          </div>
          <div className="flex items-center gap-2 text-insurance-teal">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span className="text-sm">Please wait</span>
          </div>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout>
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-8">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="w-16 h-16 bg-insurance-teal/10 rounded-full flex items-center justify-center mx-auto">
            <Mail className="w-8 h-8 text-insurance-teal" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">
            Verify Your Email
          </h2>
          <p className="text-sm text-gray-500 max-w-sm">
            We&apos;ve sent a 6-digit verification code to{" "}
            <span className="font-medium text-gray-700">{email}</span>
          </p>
          <p className="text-xs text-amber-600 bg-amber-50 px-3 py-1.5 rounded-full inline-block">
            Demo: Use code <span className="font-mono font-bold">123456</span>
          </p>
        </div>

        {/* OTP Input */}
        <div className="space-y-4 w-full max-w-sm">
          <div className="flex justify-center gap-3" onPaste={handlePaste}>
            {otp.map((digit, index) => (
              <input
                title="otp"
                key={index}
                ref={(el) => {
                  inputRefs.current[index] = el;
                }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className={`
                  w-12 h-14 text-center text-xl font-semibold rounded-xl border-2
                  transition-all duration-200 outline-none
                  ${
                    error
                      ? "border-red-400 bg-red-50 text-red-600 shake"
                      : digit
                        ? "border-insurance-teal bg-insurance-teal/5 text-gray-900"
                        : "border-gray-300 bg-white text-gray-900"
                  }
                  focus:border-insurance-teal focus:ring-4 focus:ring-insurance-teal/20
                `}
                disabled={isVerifying}
              />
            ))}
          </div>

          {/* Error message */}
          {error && (
            <p className="text-sm text-red-500 text-center animate-in fade-in">
              {error}
            </p>
          )}
        </div>

        {/* Verify Button */}
        <Button
          onClick={handleVerify}
          disabled={otp.join("").length !== OTP_LENGTH || isVerifying}
          className="w-full max-w-sm bg-insurance-teal hover:bg-insurance-teal/90 h-12 text-base"
        >
          {isVerifying ? (
            <span className="flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin" />
              Verifying...
            </span>
          ) : (
            "Verify Email"
          )}
        </Button>

        {/* Resend */}
        <div className="text-center space-y-2">
          <p className="text-sm text-gray-500">Didn&apos;t receive the code?</p>
          {canResend ? (
            <button
              onClick={handleResend}
              className="text-sm font-medium text-insurance-teal hover:text-insurance-teal/80 transition-colors underline"
            >
              Resend Code
            </button>
          ) : (
            <p className="text-sm text-gray-400">
              Resend in{" "}
              <span className="font-mono font-medium text-gray-600">
                {formatTime(resendTimer)}
              </span>
            </p>
          )}
        </div>

        {/* Back link */}
        <button
          onClick={() => router.push("/onboarding/step4")}
          className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to previous step
        </button>
      </div>
    </AuthLayout>
  );
}
