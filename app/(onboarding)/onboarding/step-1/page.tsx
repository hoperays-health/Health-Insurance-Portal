"use client";

import { useRouter } from "next/navigation";
import { useOnboardingStore } from "@/store";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  companyAccountSchema,
  CompanyAccountInput,
} from "@/lib/validations/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload } from "lucide-react";
import { useState } from "react";
import AuthLayout from "@/components/layouts/AuthLayout";

export default function OnboardingStep1() {
  const router = useRouter();
  const { formData, updateCompanyAccount, markStepComplete, nextStep } =
    useOnboardingStore();
  const [selectedFile, setSelectedFile] = useState<string | null>(
    formData.companyAccount?.logo || null,
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CompanyAccountInput>({
    resolver: zodResolver(companyAccountSchema),
    defaultValues: formData.companyAccount || {
      companyName: "",
      email: "",
      phone: "",
      address: "",
      insuranceType: "",
      serviceRegion: "",
      logo: "",
    },
  });
  const formatFileName = (fileName: string, maxLength = 20) => {
    if (!fileName) return "";

    if (fileName.length <= maxLength) return fileName;

    const ext = fileName.split(".").pop();
    const nameWithoutExt = fileName.substring(0, fileName.lastIndexOf("."));

    const truncated = nameWithoutExt.substring(0, maxLength - ext!.length - 3);

    return `${truncated}...${ext}`;
  };
  const onSubmit = async (data: CompanyAccountInput) => {
    updateCompanyAccount({ ...data, logo: selectedFile || "" });
    markStepComplete(1);
    nextStep();
    router.push("/onboarding/step-2");
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file.name);
    }
  };

  return (
    <AuthLayout showProgress>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Create Company Account
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Let&#39;s start by setting up your company profile
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
              Your company information will be reviewed by our team before
              activation. This typically takes 1-2 business days.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="companyName">Insurance name</Label>
            <Input
              id="companyName"
              placeholder="AAT Insurance"
              {...register("companyName")}
              className="mt-1"
            />
            {errors.companyName && (
              <p className="text-sm text-red-500 mt-1">
                {errors.companyName.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder=""
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
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                placeholder=""
                {...register("phone")}
                className="mt-1"
              />
              {errors.phone && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.phone.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <Label htmlFor="address">Company Address</Label>
            <Input
              id="address"
              placeholder=""
              {...register("address")}
              className="mt-1"
            />
            {errors.address && (
              <p className="text-sm text-red-500 mt-1">
                {errors.address.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="insuranceType">Insurance Type</Label>
            <select
              id="insuranceType"
              {...register("insuranceType")}
              className="mt-1 w-full h-10 px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-insurance-teal focus:border-transparent"
            >
              <option value="">Select insurance type</option>
              <option value="life">Life Insurance</option>
              <option value="health">Health Insurance</option>
              <option value="property">Property Insurance</option>
              <option value="auto">Auto Insurance</option>
            </select>
            {errors.insuranceType && (
              <p className="text-sm text-red-500 mt-1">
                {errors.insuranceType.message}
              </p>
            )}
          </div>
          <div>
            <Label htmlFor="serviceRegion">Primary Service Region</Label>
            <select
              id="serviceRegion"
              {...register("serviceRegion")}
              className="mt-1 w-full h-10 px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-insurance-teal focus:border-transparent"
            >
              <option value="">Select region</option>
              <option value="north">North Region</option>
              <option value="south">South Region</option>
              <option value="east">East Region</option>
              <option value="west">West Region</option>
              <option value="central">Central Region</option>
            </select>
            {errors.serviceRegion && (
              <p className="text-sm text-red-500 mt-1">
                {errors.serviceRegion.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="logo">Upload Logo</Label>
            <div className="mt-1">
              <div className="flex items-center gap-3  border border-gray-200 rounded-md pr-3">
                <label
                  htmlFor="logo"
                  className="flex items-center gap-2 px-4 py-3  rounded-l-md cursor-pointer  transition-colors text-sm bg-teal-900 text-white hover:bg-teal-800"
                >
                  <Upload className="w-4 h-4" />
                  Choose file
                </label>

                <span className="text-sm text-gray-500">
                  {selectedFile ? formatFileName(selectedFile) : "Logo.jpg"}
                </span>
              </div>
              <input
                id="logo"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
              <p className="text-xs text-gray-500 mt-1">1 file only, 1MB max</p>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-insurance-teal hover:bg-insurance-teal/90 mt-6"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Processing..." : "Proceed"}
          </Button>

          <p className="text-center text-sm text-gray-600">
            Already have an account?{" "}
            <a href="/sign-in" className="text-gray-900 font-medium underline">
              Sign In
            </a>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
}
