// store/onboardingStore.ts
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

export type OnboardingStep = 1 | 2 | 3 | 4;

export interface CompanyAccountData {
  companyName: string;
  email: string;
  phone: string;
  address: string;
  insuranceType: string;
  serviceRegion: string;
  logo?: string;
}

export interface BankDetailsData {
  accountNumber: string;
  bankName: string;
  accountHolderName: string;
}

export interface DocumentsData {
  certificateOfIncorporation: boolean;
  memorandumAndArticles: boolean;
  regulatoryLicenseNumber: string;
  regulatoryLicenseExpiry: string;
  regulatoryLicenseDocument: boolean;
  tinCertificate: boolean;
  bankConfirmationLetter: boolean;
  directorsCount: number;
}

export interface CredentialsData {
  email: string;
  password: string;
  confirmPassword: string;
}

interface OnboardingState {
  currentStep: OnboardingStep;
  completedSteps: OnboardingStep[];
  formData: {
    companyAccount?: CompanyAccountData;
    bankDetails?: BankDetailsData;
    documents?: DocumentsData;
    credentials?: CredentialsData;
  };

  setStep: (step: OnboardingStep) => void;
  nextStep: () => void;
  previousStep: () => void;
  markStepComplete: (step: OnboardingStep) => void;
  updateCompanyAccount: (data: Partial<CompanyAccountData>) => void;
  updateBankDetails: (data: Partial<BankDetailsData>) => void;
  updateDocuments: (data: Partial<DocumentsData>) => void;
  updateCredentials: (data: Partial<CredentialsData>) => void;
  resetOnboarding: () => void;
  isStepComplete: (step: OnboardingStep) => boolean;
  canProceed: () => boolean;
}

const initialState = {
  currentStep: 1 as OnboardingStep,
  completedSteps: [] as OnboardingStep[],
  formData: {},
};

export const useOnboardingStore = create<OnboardingState>()(
  devtools(
    persist(
      immer((set, get) => ({
        ...initialState,

        setStep: (step) => set({ currentStep: step }),

        nextStep: () =>
          set((state) => {
            const nextStep = Math.min(
              state.currentStep + 1,
              4,
            ) as OnboardingStep;
            state.currentStep = nextStep;
          }),

        previousStep: () =>
          set((state) => {
            const prevStep = Math.max(
              state.currentStep - 1,
              1,
            ) as OnboardingStep;
            state.currentStep = prevStep;
          }),

        markStepComplete: (step) =>
          set((state) => {
            if (!state.completedSteps.includes(step)) {
              state.completedSteps.push(step);
              state.completedSteps.sort();
            }
          }),

        updateCompanyAccount: (data) =>
          set((state) => {
            state.formData.companyAccount = {
              ...state.formData.companyAccount,
              ...data,
            } as CompanyAccountData;
          }),

        updateBankDetails: (data) =>
          set((state) => {
            state.formData.bankDetails = {
              ...state.formData.bankDetails,
              ...data,
            } as BankDetailsData;
          }),

        updateDocuments: (data) =>
          set((state) => {
            state.formData.documents = {
              ...state.formData.documents,
              ...data,
            } as DocumentsData;
          }),

        updateCredentials: (data) =>
          set((state) => {
            state.formData.credentials = {
              ...state.formData.credentials,
              ...data,
            } as CredentialsData;
          }),

        resetOnboarding: () => set(initialState),

        isStepComplete: (step) => {
          return get().completedSteps.includes(step);
        },

        canProceed: () => {
          const { currentStep, formData } = get();

          switch (currentStep) {
            case 1:
              return (
                !!formData.companyAccount?.companyName &&
                !!formData.companyAccount?.email &&
                !!formData.companyAccount?.phone &&
                !!formData.companyAccount?.address &&
                !!formData.companyAccount?.insuranceType &&
                !!formData.companyAccount?.serviceRegion
              );
            case 2:
              return (
                !!formData.bankDetails?.accountNumber &&
                !!formData.bankDetails?.bankName &&
                !!formData.bankDetails?.accountHolderName
              );
            case 3:
              return (
                !!formData.documents?.certificateOfIncorporation &&
                !!formData.documents?.regulatoryLicenseNumber &&
                !!formData.documents?.regulatoryLicenseExpiry &&
                !!formData.documents?.regulatoryLicenseDocument &&
                !!formData.documents?.tinCertificate &&
                !!formData.documents?.bankConfirmationLetter &&
                (formData.documents?.directorsCount ?? 0) >= 1
              );
            case 4:
              return (
                !!formData.credentials?.email &&
                !!formData.credentials?.password &&
                formData.credentials?.password ===
                  formData.credentials?.confirmPassword
              );
            default:
              return false;
          }
        },
      })),
      {
        name: "onboarding-storage",
        partialize: (state) => ({
          currentStep: state.currentStep,
          completedSteps: state.completedSteps,
          formData: state.formData,
        }),
      },
    ),
    { name: "OnboardingStore" },
  ),
);
