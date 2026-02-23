import { z } from "zod";

export const companyAccountSchema = z.object({
  companyName: z.string().min(2, "Company name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 characters"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  insuranceType: z.string().min(1, "Please select an insurance type"),
  serviceRegion: z.string().min(1, "Please select a service region"),
  logo: z.string().optional(),
});

export type CompanyAccountInput = z.infer<typeof companyAccountSchema>;

export const registerSchema = z
  .object({
    email: z.string().email("Invalid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number"),
    confirmPassword: z.string(),
    firstName: z
      .string()
      .min(2, "First name must be at least 2 characters")
      .optional(),
    lastName: z
      .string()
      .min(2, "Last name must be at least 2 characters")
      .optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type RegisterInput = z.infer<typeof registerSchema>;

export const bankDetailsSchema = z.object({
  accountNumber: z
    .string()
    .min(10, "Account number must be at least 10 digits"),
  bankName: z.string().min(1, "Please select a bank"),
  accountHolderName: z.string().min(2, "Account holder name is required"),
});

export type BankDetailsInput = z.infer<typeof bankDetailsSchema>;

export const credentialsSchema = z
  .object({
    email: z.string().email("Invalid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type CredentialsInput = z.infer<typeof credentialsSchema>;

export const signInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export type SignInInput = z.infer<typeof signInSchema>;

export const forgotPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
});

export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;

export const resetPasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number"),
  })
  .refine((data) => data.currentPassword !== data.newPassword, {
    message: "New password must be different from current password",
    path: ["newPassword"],
  });

export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_TYPES = ["application/pdf", "image/jpeg", "image/png"];

const fileSchema = z
  .any()
  .refine((file) => file instanceof File, "File is required")
  .refine((file) => file?.size <= MAX_FILE_SIZE, "Max file size is 5MB")
  .refine(
    (file) => ACCEPTED_TYPES.includes(file?.type),
    "Only PDF, JPG, PNG allowed",
  );

export const directorSchema = z.object({
  fullName: z.string().min(3, "Director name required"),
  role: z.string().min(2, "Role required"),
  idNumber: z.string().min(3, "ID number required"),
  idType: z.enum(["NIN", "Passport", "Driver's License"]),
  idDocument: fileSchema,
});

export const insuranceOnboardingSchema = z.object({
  rcNumber: z
    .string()
    .min(4, "RC number required")
    .regex(/^RC\d+$/, "RC number must start with 'RC'"),

  certificateOfIncorporation: fileSchema,
  cacStatusReport: fileSchema,

  regulatoryLicense: z.object({
    licenseNumber: z.string().min(3, "License number required"),
    licenseClass: z.enum([
      "Life",
      "General",
      "Composite",
      "Reinsurance",
      "Microinsurance",
    ]),
    expiryDate: z
      .string()
      .min(1, "Expiry date required")
      .refine(
        (date) => {
          const selected = new Date(date + "T00:00:00");
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          return selected > today;
        },
        {
          message: "License must not be expired",
        },
      ),
    document: fileSchema,
  }),

  tinCertificate: fileSchema,
  bankConfirmationLetter: fileSchema,

  directors: z.array(directorSchema).min(1),

  declaration: z.literal(true, {
    errorMap: () => ({
      message: "You must confirm compliance declaration",
    }),
  }),
});

export type InsuranceOnboardingInput = z.infer<
  typeof insuranceOnboardingSchema
>;
