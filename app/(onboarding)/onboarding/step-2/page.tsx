"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useOnboardingStore } from "@/store";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { bankDetailsSchema, BankDetailsInput } from "@/lib/validations/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChevronLeft, Loader2, CheckCircle, XCircle } from "lucide-react";
import AuthLayout from "@/components/layouts/AuthLayout";
export default function OnboardingStep2() {
  const router = useRouter();
  const {
    formData,
    updateBankDetails,
    markStepComplete,
    nextStep,
    previousStep,
  } = useOnboardingStore();

  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [verificationMessage, setVerificationMessage] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<BankDetailsInput>({
    resolver: zodResolver(bankDetailsSchema),
    defaultValues: formData.bankDetails || {
      accountNumber: "",
      bankName: "",
      accountHolderName: "",
    },
  });

  const accountNumber = watch("accountNumber");
  const bankName = watch("bankName");
  // const accountHolderName = watch("accountHolderName");

  React.useEffect(() => {
    const verifyAccount = async () => {
      if (!accountNumber || !bankName || accountNumber.length < 10) {
        return;
      }

      setVerificationStatus("idle");
      setVerificationMessage("");
      setValue("accountHolderName", "");

      setIsVerifying(true);

      try {
        const response = await fetch("/api/verify-bank-account", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            accountNumber,
            bankCode: bankName,
          }),
        });

        const data = await response.json();

        if (response.ok && data.success) {
          setValue("accountHolderName", data.accountName);
          setVerificationStatus("success");
          setVerificationMessage("Account verified successfully");
        } else {
          setVerificationStatus("error");
          setVerificationMessage(
            data.message || "Could not verify account details",
          );
        }
      } catch (error) {
        console.error("Bank verification error:", error);
        setVerificationStatus("error");
        setVerificationMessage("Failed to verify account. Please try again.");
      } finally {
        setIsVerifying(false);
      }
    };

    const timeoutId = setTimeout(() => {
      verifyAccount();
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [accountNumber, bankName, setValue]);

  const onSubmit = async (data: BankDetailsInput) => {
    if (verificationStatus !== "success") {
      setVerificationMessage("Please verify your account details first");
      return;
    }

    updateBankDetails(data);
    markStepComplete(2);
    nextStep();
    router.push("/onboarding/step-3");
  };

  const handleBack = () => {
    previousStep();
    router.push("/onboarding/step-1");
  };

  return (
    <AuthLayout showProgress>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Bank Details</h2>
          <p className="text-sm text-gray-500 mt-1">
            Enter your bank account information for payments
          </p>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-md p-4">
          <div className="flex gap-2">
            <svg
              className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
            <p className="text-sm text-amber-800">
              Bank details are encrypted and used only for settlement payments.
              We never share this information with third parties.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="accountNumber">Account number</Label>
            <Input
              id="accountNumber"
              placeholder="0222229922"
              {...register("accountNumber")}
              className="mt-1"
              maxLength={10}
            />
            {errors.accountNumber && (
              <p className="text-sm text-red-500 mt-1">
                {errors.accountNumber.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="bankName">Choose Bank</Label>
            <select
              id="bankName"
              {...register("bankName")}
              className="mt-1 w-full h-10 px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-insurance-teal focus:border-transparent"
            >
              <option value="">Select a bank</option>
              <option value="044">Access Bank</option>
              <option value="063">Access Bank (Diamond)</option>
              <option value="050">Ecobank Nigeria</option>
              <option value="070">Fidelity Bank</option>
              <option value="011">First Bank of Nigeria</option>
              <option value="214">First City Monument Bank</option>
              <option value="058">Guaranty Trust Bank</option>
              <option value="030">Heritage Bank</option>
              <option value="301">Jaiz Bank</option>
              <option value="082">Keystone Bank</option>
              <option value="526">Parallex Bank</option>
              <option value="076">Polaris Bank</option>
              <option value="101">Providus Bank</option>
              <option value="221">Stanbic IBTC Bank</option>
              <option value="068">Standard Chartered Bank</option>
              <option value="232">Sterling Bank</option>
              <option value="100">Suntrust Bank</option>
              <option value="032">Union Bank of Nigeria</option>
              <option value="033">United Bank For Africa</option>
              <option value="215">Unity Bank</option>
              <option value="035">Wema Bank</option>
              <option value="057">Zenith Bank</option>
            </select>
            {errors.bankName && (
              <p className="text-sm text-red-500 mt-1">
                {errors.bankName.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="accountHolderName">Account name</Label>
            <div className="relative">
              <Input
                id="accountHolderName"
                placeholder="Enter account number and select bank to verify"
                {...register("accountHolderName")}
                className="mt-1 bg-gray-50 text-gray-700 cursor-not-allowed pr-10"
                disabled
                readOnly
              />
              {/* Verification status indicator */}
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center">
                {isVerifying && (
                  <Loader2 className="w-5 h-5 text-insurance-teal animate-spin" />
                )}
                {verificationStatus === "success" && (
                  <CheckCircle className="w-5 h-5 text-green-600" />
                )}
                {verificationStatus === "error" && (
                  <XCircle className="w-5 h-5 text-red-600" />
                )}
              </div>
            </div>

            {/* Verification message */}
            {verificationMessage && (
              <p
                className={`text-sm mt-1 ${
                  verificationStatus === "success"
                    ? "text-green-600"
                    : "text-red-500"
                }`}
              >
                {verificationMessage}
              </p>
            )}

            {/* Helper text */}
            {!accountNumber && !bankName && (
              <p className="text-xs text-gray-500 mt-1">
                Account name will be fetched automatically after entering
                account number and selecting bank
              </p>
            )}

            {errors.accountHolderName && (
              <p className="text-sm text-red-500 mt-1">
                {errors.accountHolderName.message}
              </p>
            )}
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleBack}
              className="flex items-center gap-2"
            >
              <ChevronLeft className="w-4 h-4" />
              Back
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-insurance-teal hover:bg-insurance-teal/90"
              disabled={isSubmitting || verificationStatus !== "success"}
            >
              {isSubmitting ? "Processing..." : "Proceed"}
            </Button>
          </div>
        </form>
      </div>
    </AuthLayout>
  );
}
