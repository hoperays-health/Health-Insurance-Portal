// User types
export interface User {
  data: any;
  id: string;
  email: string;
  name: string;
  companyName: string;
  role: "admin" | "user" | "viewer";
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Policy {
  id: string;
  policyNumber: string;
  type: "life" | "health" | "auto" | "home" | "business";
  status: "active" | "pending" | "expired" | "cancelled";
  premium: number;
  coverage: number;
  startDate: string;
  endDate: string;
  holder: {
    name: string;
    email: string;
    phone: string;
  };
  beneficiaries?: string[];
}

export interface Claim {
  id: string;
  claimNumber: string;
  policyId: string;
  policyNumber: string;
  type: string;
  status: "submitted" | "under_review" | "approved" | "rejected" | "paid";
  amount: number;
  submittedDate: string;
  processedDate?: string;
  description: string;
  documents?: Document[];
}

export interface Document {
  id: string;
  name: string;
  type: string;
  size: number;
  url: string;
  uploadedAt: string;
}

export interface DashboardStats {
  totalPolicies: number;
  activePolicies: number;
  pendingClaims: number;
  totalRevenue: number;
  revenueChange: number;
  policiesChange: number;
  claimsChange: number;
}

export interface ChartDataPoint {
  date: string;
  value: number;
  label?: string;
}

export interface RevenueData {
  monthly: ChartDataPoint[];
  quarterly: ChartDataPoint[];
  yearly: ChartDataPoint[];
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
}

export interface ApiError {
  message: string;
  code?: string;
  field?: string;
}

export type UploadFile = {
  file: File;
  fileName: string;
  fileSize: number;
  fileType: string;
};

export type RegulatoryLicense = {
  licenseNumber: string;
  expiryDate: string;
  document: UploadFile;
};

export type DirectorKYC = {
  fullName: string;
  idNumber: string;
  idDocument: UploadFile;
};

export type InsuranceOnboardingDocuments = {
  certificateOfIncorporation: UploadFile;
  memorandumAndArticles?: UploadFile;

  regulatoryLicense: RegulatoryLicense;

  tinCertificate: UploadFile;
  bankConfirmationLetter: UploadFile;

  directors: DirectorKYC[];
};
