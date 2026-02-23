"use client";

import { useRouter } from "next/navigation";
import { useOnboardingStore } from "@/store/onboarding-store";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { credentialsSchema, CredentialsInput } from "@/lib/validations/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Check, X, AlertCircle } from "lucide-react";
import { useState } from "react";
import AuthLayout from "@/components/layouts/AuthLayout";

export default function OnboardingStep4() {
  const router = useRouter();
  const { formData, updateCredentials, markStepComplete } =
    useOnboardingStore();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<CredentialsInput>({
    resolver: zodResolver(credentialsSchema),
    defaultValues: {
      email: formData.companyAccount?.email || "",
      password: "",
      confirmPassword: "",
    },
    mode: "onChange", // validates on every keystroke
  });

  const password = watch("password") || "";
  const confirmPassword = watch("confirmPassword") || "";

  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasMinLength = password.length >= 8;

  const hasStartedConfirm = confirmPassword.length > 0;
  const passwordsMatch = password === confirmPassword;

  const processForm = handleSubmit(async (data) => {
    if (!agreedToTerms) return;

    updateCredentials(data);
    markStepComplete(4);
    router.push("/onboarding/verify-otp");
  });

  return (
    <AuthLayout showProgress>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Create Password</h2>
          <p className="text-sm text-gray-500 mt-1">
            Set up a secure password for your account
          </p>
        </div>

        <form onSubmit={processForm} className="space-y-4">
          <div>
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="company@example.com"
              {...register("email")}
              className="mt-1"
            />
            {errors.email && (
              <p className="text-sm text-red-500 mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="password">Create Password</Label>
            <div className="relative mt-1">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                {...register("password")}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.password && (
              <p className="text-sm text-red-500 mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <div className="relative mt-1">
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="••••••••"
                {...register("confirmPassword")}
                className={
                  hasStartedConfirm
                    ? passwordsMatch
                      ? "border-green-500 focus-visible:ring-green-500/20"
                      : "border-red-500 focus-visible:ring-red-500/20"
                    : ""
                }
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {/* Real-time match feedback */}
            {hasStartedConfirm && (
              <div className="mt-1.5">
                {passwordsMatch ? (
                  <p className="text-sm text-green-600 flex items-center gap-1.5">
                    <Check size={14} />
                    Passwords match
                  </p>
                ) : (
                  <p className="text-sm text-red-500 flex items-center gap-1.5">
                    <AlertCircle size={14} />
                    Passwords do not match
                  </p>
                )}
              </div>
            )}

            {/* Only show zod error if it's different from our real-time check */}
            {errors.confirmPassword && !hasStartedConfirm && (
              <p className="text-sm text-red-500 mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Password strength indicators */}
          {password && (
            <div className="bg-gray-50 rounded-lg p-4 space-y-2">
              <p className="text-xs text-gray-600 font-medium mb-3">
                Password must contain:
              </p>
              <div className="space-y-2">
                {[
                  { check: hasMinLength, label: "At least 8 characters" },
                  { check: hasUpperCase, label: "One uppercase letter" },
                  { check: hasLowerCase, label: "One lowercase letter" },
                  { check: hasNumber, label: "One number" },
                ].map(({ check, label }) => (
                  <div key={label} className="flex items-center gap-2">
                    {check ? (
                      <Check size={16} className="text-green-600" />
                    ) : (
                      <X size={16} className="text-gray-400" />
                    )}
                    <span
                      className={`text-xs ${check ? "text-green-600" : "text-gray-500"}`}
                    >
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex items-start gap-2 pt-2">
            <input
              type="checkbox"
              id="terms"
              checked={agreedToTerms}
              onChange={(e) => setAgreedToTerms(e.target.checked)}
              className="mt-1 rounded border-gray-300 text-insurance-teal focus:ring-insurance-teal"
            />
            <label htmlFor="terms" className="text-sm text-gray-600">
              By checking this box I agree with{" "}
              <a href="#" className="underline">
                Privacy Policy
              </a>
              ,{" "}
              <a href="#" className="underline">
                Terms and Condition
              </a>
              ,{" "}
              <a href="#" className="underline">
                Data Policy
              </a>{" "}
              and{" "}
              <a href="#" className="underline">
                Usage Policy
              </a>
            </label>
          </div>

          <div className="flex gap-4 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/onboarding/step3")}
              className="flex-1"
            >
              Back
            </Button>

            <Button
              type="submit"
              className="flex-1 bg-insurance-teal hover:bg-insurance-teal/90"
              disabled={
                isSubmitting ||
                !agreedToTerms ||
                (hasStartedConfirm && !passwordsMatch)
              }
            >
              {isSubmitting ? "Processing..." : "Complete Registration"}
            </Button>
          </div>
        </form>
      </div>
    </AuthLayout>
  );
}
