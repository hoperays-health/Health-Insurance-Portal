"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  forgotPasswordSchema,
  ForgotPasswordInput,
} from "@/lib/validations/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordInput>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordInput) => {
    // TODO: Implement forgot password logic
    console.log("Forgot password:", data);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Redirect to verify link page
    router.push("/verify-link");
  };

  return (
    <div className="space-y-6">
      <Link
        href="/login"
        className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
      >
        <ArrowLeft size={16} />
        Back to login
      </Link>

      <div>
        <h2 className="text-2xl font-bold text-gray-900">Forgot Password?</h2>
        <p className="text-sm text-gray-500 mt-1">
          No worries, we&#39;ll send you reset instructions
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            type="email"
            placeholder="Enter your email"
            {...register("email")}
            className="mt-1"
          />
          {errors.email && (
            <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
          )}
        </div>

        <Button
          type="submit"
          className="w-full bg-insurance-teal hover:bg-insurance-teal/90"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Sending..." : "Reset Password"}
        </Button>
      </form>
    </div>
  );
}
