import React from "react";
import { X, LogIn } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: () => void;
}

export function LoginModal({ isOpen, onClose, onLogin }: LoginModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-md bg-gemini-sidebar border border-white/10 rounded-3xl p-8 shadow-2xl overflow-hidden"
          >
            {/* Background Glow */}
            <div className="absolute -top-24 -left-24 w-48 h-48 bg-gemini-accent/20 blur-[100px] rounded-full" />
            <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-purple-500/20 blur-[100px] rounded-full" />

            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-white/40 hover:text-white hover:bg-white/5 rounded-full transition-colors"
            >
              <X size={20} />
            </button>

            <div className="text-center space-y-6 relative z-10">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/5 border border-white/10 mb-2">
                <LogIn size={32} className="text-gemini-accent" />
              </div>
              
              <div>
                <h2 className="text-2xl font-semibold text-white mb-2">Welcome to Alisword</h2>
                <p className="text-white/50 text-sm">
                  Sign in to save your favorite videos, sync across devices, and access advanced features.
                </p>
              </div>

              <div className="space-y-3 pt-4">
                <button
                  onClick={onLogin}
                  className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-white text-black rounded-2xl font-semibold hover:bg-white/90 transition-all active:scale-[0.98]"
                >
                  <img 
                    src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/button/google/ic-google.svg" 
                    alt="Google" 
                    className="w-5 h-5"
                  />
                  <span>Login with Google</span>
                </button>
                
                <p className="text-[11px] text-white/30 px-4">
                  By signing in, you agree to our Terms of Service and Privacy Policy.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
