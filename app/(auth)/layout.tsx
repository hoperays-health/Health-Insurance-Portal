import Image from "next/image";
import logo from "@/public/images/logo.png";
export default function AuthRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main className="min-h-screen bg-white flex items-center justify-center p-2 gap-10">
        <div className="w-full mx-12 rounded-3xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[860px]">
            <div className="p-12 flex flex-col justify-between">
              <div>
                <div className="w-40 h-40  rounded-xl flex items-center justify-center">
                  <Image
                    src={logo}
                    alt="Logo"
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
              {/* Logo */}

              <div className="flex-1 flex items-center">
                <div className="w-full max-w-md">{children}</div>
              </div>
            </div>

            <div className="relative hidden lg:block rounded-md">
              <div className="absolute inset-0">
                <div className="h-full w-full bg-[url('/images/onboarding.jpg')] bg-cover bg-center" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
              </div>

              <div className="relative z-10 h-full flex flex-col justify-end p-12 text-white">
                <p className="text-lg leading-relaxed font-light max-w-md">
                  Life is unpredictable your healthcare shouldn&apos;t be. Get
                  affordable health insurance that covers hospital visits,
                  medications, emergencies, and specialist care when you need it
                </p>

                <div className="mt-8 flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-white/70" />
                  <span className="w-2 h-2 rounded-full bg-white/40" />
                  <span className="w-10 h-1.5 rounded-full bg-insurance-teal" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
