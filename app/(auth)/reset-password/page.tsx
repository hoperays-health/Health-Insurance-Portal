"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  resetPasswordSchema,
  ResetPasswordInput,
} from "@/lib/validations/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

export default function ResetPassword() {
  const router = useRouter();
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordInput>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
    },
  });

  const onSubmit = async (data: ResetPasswordInput) => {
    console.log("Reset password data:", data);
    router.push("/sign-in");
  };

  return (
    // <AuthLayout>
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Reset Password</h2>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label htmlFor="currentPassword">Current Password</Label>
          <div className="relative mt-1">
            <Input
              id="currentPassword"
              type={showCurrentPassword ? "text" : "password"}
              placeholder="•••••••"
              {...register("currentPassword")}
            />
            <button
              type="button"
              onClick={() => setShowCurrentPassword(!showCurrentPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {showCurrentPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {errors.currentPassword && (
            <p className="text-sm text-red-500 mt-1">
              {errors.currentPassword.message}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="newPassword">New Password</Label>
          <div className="relative mt-1">
            <Input
              id="newPassword"
              type={showNewPassword ? "text" : "password"}
              placeholder="•••••••"
              {...register("newPassword")}
            />
            <button
              type="button"
              onClick={() => setShowNewPassword(!showNewPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {errors.newPassword && (
            <p className="text-sm text-red-500 mt-1">
              {errors.newPassword.message}
            </p>
          )}
        </div>

        <Button
          type="submit"
          className="w-full bg-insurance-teal hover:bg-insurance-teal/90"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Resetting..." : "Reset"}
        </Button>
      </form>
    </div>
  );
}
