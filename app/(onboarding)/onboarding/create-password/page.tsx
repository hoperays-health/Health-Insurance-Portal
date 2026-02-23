"use client";

import { useRouter } from "next/navigation";
import { useOnboardingStore } from "@/store";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { credentialsSchema, CredentialsInput } from "@/lib/validations/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Check, X } from "lucide-react";
import { useState } from "react";

export default function OnboardingStep3() {
  const router = useRouter();
  const {
    formData,
    updateCredentials,
    markStepComplete,
    nextStep,
    previousStep,
  } = useOnboardingStore();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<CredentialsInput>({
    resolver: zodResolver(credentialsSchema),
    defaultValues: formData.credentials || {
      email: formData.companyAccount?.email || "",
      password: "",
      confirmPassword: "",
    },
  });

  const password = watch("password");

  // Password strength indicators
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasMinLength = password?.length >= 8;

  const onSubmit = async (data: CredentialsInput) => {
    updateCredentials(data);
    markStepComplete(3);
    nextStep();
    router.push("/onboarding/step-4");
  };

  const handleBack = () => {
    previousStep();
    router.push("/onboarding/step-2");
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Create Password</h2>
        <p className="text-sm text-gray-500 mt-1">
          Set up a secure password for your account
        </p>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-md p-4">
        <p className="text-sm text-amber-800">
          We&#39;ll use personalisation to tailor our information to you and
          improve your experience. Our systems are designed to protect your
          information and keep you in control.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            type="email"
            placeholder="your@email.com"
            {...register("email")}
            className="mt-1"
            disabled
          />
          {errors.email && (
            <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="password">Password</Label>
          <div className="relative mt-1">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter password"
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

          {/* Password requirements */}
          {password && (
            <div className="mt-3 space-y-2">
              <p className="text-xs text-gray-600 font-medium">
                Password must contain:
              </p>
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs">
                  {hasMinLength ? (
                    <Check size={14} className="text-green-600" />
                  ) : (
                    <X size={14} className="text-gray-400" />
                  )}
                  <span
                    className={
                      hasMinLength ? "text-green-600" : "text-gray-500"
                    }
                  >
                    At least 8 characters
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  {hasUpperCase ? (
                    <Check size={14} className="text-green-600" />
                  ) : (
                    <X size={14} className="text-gray-400" />
                  )}
                  <span
                    className={
                      hasUpperCase ? "text-green-600" : "text-gray-500"
                    }
                  >
                    One uppercase letter
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  {hasLowerCase ? (
                    <Check size={14} className="text-green-600" />
                  ) : (
                    <X size={14} className="text-gray-400" />
                  )}
                  <span
                    className={
                      hasLowerCase ? "text-green-600" : "text-gray-500"
                    }
                  >
                    One lowercase letter
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  {hasNumber ? (
                    <Check size={14} className="text-green-600" />
                  ) : (
                    <X size={14} className="text-gray-400" />
                  )}
                  <span
                    className={hasNumber ? "text-green-600" : "text-gray-500"}
                  >
                    One number
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        <div>
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <div className="relative mt-1">
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Re-enter password"
              {...register("confirmPassword")}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-sm text-red-500 mt-1">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <div className="flex gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={handleBack}
            className="flex-1"
          >
            Back
          </Button>
          <Button
            type="submit"
            className="flex-1 bg-insurance-teal hover:bg-insurance-teal/90"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Processing..." : "Proceed"}
          </Button>
        </div>
      </form>
    </div>
  );
}
