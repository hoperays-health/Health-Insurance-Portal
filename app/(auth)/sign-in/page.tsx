"use client";

// import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { SignInInput, signInSchema } from "@/lib/validations/auth";

export default function SignIn() {
  // const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInInput>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: SignInInput) => {
    console.log("Sign in data:", data);
    // Handle sign in logic here
    // router.push("/dashboard");
  };

  return (
    // <AuthLayout>
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Sign In</h2>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            type="email"
            placeholder=""
            {...register("email")}
            className="mt-1 px-2 py-3"
          />
          {errors.email && (
            <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="password">Enter Password</Label>
          <div className="relative mt-1">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="•••••••"
              {...register("password")}
              className="mt-1 px-2 py-3"
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

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="remember"
              className="rounded border-gray-300 text-insurance-teal focus:ring-insurance-teal"
            />
            <label htmlFor="remember" className="text-sm text-gray-600">
              Remember me
            </label>
          </div>
          <a
            href="/forgot-password"
            className="text-sm text-gray-600 hover:text-gray-900"
          >
            Forgot Password?
          </a>
        </div>

        <Button
          type="submit"
          className="w-full bg-insurance-teal hover:bg-insurance-teal/90"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Signing in..." : "Sign In"}
        </Button>

        <p className="text-center text-sm text-gray-600">
          {"Don't"} have an account?{" "}
          <a
            href="/onboarding/step-1"
            className="text-gray-900 font-medium underline"
          >
            Sign Up
          </a>
        </p>
      </form>
    </div>
    // </AuthLayout>
  );
}
