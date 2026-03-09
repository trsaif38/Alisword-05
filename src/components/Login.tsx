import React from "react";
import { useAuth } from "../lib/AuthContext";
import { DollarSign, LogIn } from "lucide-react";

export function Login() {
  const { login, isConfigured } = useAuth();

  return (
    <div className="min-h-screen bg-gemini-bg flex flex-col items-center justify-center p-6 text-center">
      {!isConfigured && (
        <div className="mb-8 p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-500 max-w-md">
          <p className="text-sm font-bold mb-1">Firebase Not Configured</p>
          <p className="text-xs opacity-80">Please add your Firebase credentials in the AI Studio Settings to enable Google Login.</p>
        </div>
      )}

      <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-600 flex items-center justify-center shadow-2xl shadow-emerald-500/20 mb-8">
        <DollarSign size={40} className="text-white" />
      </div>
      
      <h1 className="text-4xl font-bold text-white mb-4 tracking-tight">
        Alisword <span className="text-emerald-400">Earning</span>
      </h1>
      <p className="text-white/40 text-lg mb-12 max-w-md">
        Welcome! Please login with your Google account to start earning coins and withdraw rewards.
      </p>

      <button 
        onClick={() => login()}
        className="flex items-center gap-4 px-8 py-4 rounded-2xl bg-white text-black font-bold text-lg hover:scale-105 transition-all shadow-xl active:scale-95"
      >
        <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-6 h-6" />
        Login with Google
      </button>

      <p className="mt-12 text-white/20 text-xs uppercase tracking-[0.2em]">
        Secure Login powered by Firebase
      </p>
    </div>
  );
}
