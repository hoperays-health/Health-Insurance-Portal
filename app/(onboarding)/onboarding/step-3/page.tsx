"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Trash2 } from "lucide-react";
import { Label } from "@/components/ui/label";
import AuthLayout from "@/components/layouts/AuthLayout";
import { Button } from "@/components/ui/button";
import {
  InsuranceOnboardingInput,
  insuranceOnboardingSchema,
} from "@/lib/validations/auth";
import { UploadField } from "@/components/ui/upload-field";
import { useRouter } from "next/navigation";
import { useOnboardingStore } from "@/store/onboarding-store";
import { useEffect } from "react";

export default function OnboardingDocumentsStep3() {
  const router = useRouter();
  const { markStepComplete, nextStep } = useOnboardingStore();

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<InsuranceOnboardingInput>({
    resolver: zodResolver(insuranceOnboardingSchema),
    defaultValues: {
      rcNumber: "",
      regulatoryLicense: {
        licenseNumber: "",
        licenseClass: undefined,
        expiryDate: "",
        document: undefined as unknown as File,
      },
      directors: [
        {
          fullName: "",
          role: "",
          idNumber: "",
          idType: "NIN",
          idDocument: undefined as unknown as File,
        },
      ],
      declaration: undefined as unknown as true,
      certificateOfIncorporation: undefined as unknown as File,
      cacStatusReport: undefined as unknown as File,
      tinCertificate: undefined as unknown as File,
      bankConfirmationLetter: undefined as unknown as File,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "directors",
  });

  useEffect(() => {
    register("certificateOfIncorporation");
    register("cacStatusReport");
    register("tinCertificate");
    register("bankConfirmationLetter");
    register("regulatoryLicense.document");
  }, [register]);

  const processForm = handleSubmit(
    async (data) => {
      console.log("✅ Submitted:", data);
      markStepComplete(3);
      nextStep();
      router.push("/onboarding/step-4");
    },
    (err) => {
      console.log("❌ Validation Errors:", err);
    },
  );

  return (
    <AuthLayout showProgress>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          Regulatory & Compliance Documents
        </h2>
        <p className="text-sm text-gray-500">
          Submit required documents for NAICOM and CAC verification.
        </p>
      </div>

      <form onSubmit={processForm} className="space-y-10">
        {/* LEGAL */}
        <div className="space-y-6">
          <h3 className="text-lg font-semibold">Legal Registration</h3>

          <div>
            <Label>RC Number *</Label>
            <input
              {...register("rcNumber")}
              placeholder="RC123456"
              className="w-full rounded-lg border px-3 py-2"
            />
            {errors.rcNumber && (
              <p className="text-red-500 text-sm">{errors.rcNumber.message}</p>
            )}
          </div>

          <UploadField
            label="Certificate of Incorporation"
            required
            accept=".pdf,.jpg,.jpeg,.png"
            error={errors.certificateOfIncorporation?.message}
            onFileChange={(file) =>
              setValue("certificateOfIncorporation", file, {
                shouldValidate: true,
              })
            }
          />

          <UploadField
            label="CAC Status Report"
            required
            accept=".pdf"
            error={errors.cacStatusReport?.message}
            onFileChange={(file) =>
              setValue("cacStatusReport", file, { shouldValidate: true })
            }
          />
        </div>

        {/* NAICOM */}
        <div className="space-y-6">
          <h3 className="text-lg font-semibold">NAICOM Authorization</h3>

          <div>
            <Label>License Number *</Label>
            <input
              {...register("regulatoryLicense.licenseNumber")}
              placeholder="License Number"
              className="w-full rounded-lg border px-3 py-2"
            />
            {errors.regulatoryLicense?.licenseNumber && (
              <p className="text-red-500 text-sm">
                {errors.regulatoryLicense.licenseNumber.message}
              </p>
            )}
          </div>

          <div>
            <Label>License Class *</Label>
            <select
              {...register("regulatoryLicense.licenseClass")}
              className="w-full rounded-lg border px-3 py-2"
            >
              <option value="">Select License Class</option>
              <option value="Life">Life</option>
              <option value="General">General</option>
              <option value="Composite">Composite</option>
              <option value="Reinsurance">Reinsurance</option>
              <option value="Microinsurance">Microinsurance</option>
            </select>
            {errors.regulatoryLicense?.licenseClass && (
              <p className="text-red-500 text-sm">
                {errors.regulatoryLicense.licenseClass.message}
              </p>
            )}
          </div>

          <div>
            <Label>License Expiry Date *</Label>
            <input
              type="date"
              {...register("regulatoryLicense.expiryDate")}
              className="w-full rounded-lg border px-3 py-2"
            />
            {errors.regulatoryLicense?.expiryDate && (
              <p className="text-red-500 text-sm">
                {errors.regulatoryLicense.expiryDate.message}
              </p>
            )}
          </div>

          <UploadField
            label="NAICOM License Document"
            required
            accept=".pdf"
            error={errors.regulatoryLicense?.document?.message}
            onFileChange={(file) =>
              setValue("regulatoryLicense.document", file, {
                shouldValidate: true,
              })
            }
          />
        </div>

        {/* TAX */}
        <UploadField
          label="TIN Certificate"
          required
          accept=".pdf"
          error={errors.tinCertificate?.message}
          onFileChange={(file) =>
            setValue("tinCertificate", file, { shouldValidate: true })
          }
        />

        <UploadField
          label="Bank Confirmation Letter"
          required
          accept=".pdf"
          error={errors.bankConfirmationLetter?.message}
          onFileChange={(file) =>
            setValue("bankConfirmationLetter", file, { shouldValidate: true })
          }
        />

        {/* DIRECTORS */}
        <div className="space-y-6">
          <h3 className="text-lg font-semibold">Directors KYC</h3>

          {fields.map((field, index) => (
            <div key={field.id} className="space-y-4 p-6 border rounded-xl">
              <div>
                <Label>Full Name *</Label>
                <input
                  {...register(`directors.${index}.fullName`)}
                  placeholder="Full Name"
                  className="w-full border px-3 py-2 rounded-lg"
                />
                {errors.directors?.[index]?.fullName && (
                  <p className="text-red-500 text-sm">
                    {errors.directors[index]?.fullName?.message}
                  </p>
                )}
              </div>

              <div>
                <Label>Role *</Label>
                <input
                  {...register(`directors.${index}.role`)}
                  placeholder="Role"
                  className="w-full border px-3 py-2 rounded-lg"
                />
                {errors.directors?.[index]?.role && (
                  <p className="text-red-500 text-sm">
                    {errors.directors[index]?.role?.message}
                  </p>
                )}
              </div>

              <div>
                <Label>ID Number *</Label>
                <input
                  {...register(`directors.${index}.idNumber`)}
                  placeholder="ID Number"
                  className="w-full border px-3 py-2 rounded-lg"
                />
                {errors.directors?.[index]?.idNumber && (
                  <p className="text-red-500 text-sm">
                    {errors.directors[index]?.idNumber?.message}
                  </p>
                )}
              </div>

              <div>
                <Label>ID Type *</Label>
                <select
                  {...register(`directors.${index}.idType`)}
                  className="w-full border px-3 py-2 rounded-lg"
                >
                  <option value="NIN">NIN</option>
                  <option value="Passport">Passport</option>
                  <option value="Driver's License">
                    Driver&apos;s License
                  </option>
                </select>
              </div>

              <UploadField
                label="ID Document"
                required
                accept=".pdf,.jpg,.png"
                error={errors.directors?.[index]?.idDocument?.message}
                onFileChange={(file) =>
                  setValue(`directors.${index}.idDocument`, file, {
                    shouldValidate: true,
                  })
                }
              />

              {fields.length > 1 && (
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => remove(index)}
                  className="text-red-500"
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Remove
                </Button>
              )}
            </div>
          ))}

          <Button
            type="button"
            variant="outline"
            onClick={() =>
              append({
                fullName: "",
                role: "",
                idNumber: "",
                idType: "NIN",
                idDocument: undefined as unknown as File,
              })
            }
            className="w-full border-dashed"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Director
          </Button>
        </div>

        {/* DECLARATION */}
        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            {...register("declaration")}
            className="mt-1"
          />
          <p className="text-sm">
            We confirm that all submitted documents are authentic and valid. We
            consent to verification with NAICOM, CAC, and FIRS.
          </p>
        </div>
        {errors.declaration && (
          <p className="text-red-500 text-sm">{errors.declaration.message}</p>
        )}

        <div className="flex gap-4 pt-6">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/onboarding/step2")}
            className="flex-1"
          >
            Back
          </Button>

          <Button
            type="submit"
            className="flex-1 bg-insurance-teal"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Continue"}
          </Button>
        </div>
      </form>
    </AuthLayout>
  );
}
