import { Suspense } from "react";

export const metadata = {
  title: "Register",
  description: "Register for LITUMUN 2026 — Secure your delegate spot now.",
};

function RegisterFallback() {
  return (
    <div className="pt-32 text-center">
      <div className="w-8 h-8 border-2 border-violet-200/20 border-t-violet-500 rounded-full animate-spin mx-auto" />
      <p className="text-gray-400 mt-4">Loading registration form...</p>
    </div>
  );
}

export default function RegisterLayout({ children }) {
  return <Suspense fallback={<RegisterFallback />}>{children}</Suspense>;
}
