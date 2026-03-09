import React from "react";
import { X, LogOut, Mail, User as UserIcon, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { User } from "firebase/auth";

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
  user: User | null;
}

export function UserProfileModal({ isOpen, onClose, onLogout, user }: UserProfileModalProps) {
  if (!user) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
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
            className="relative w-full max-w-sm bg-gemini-sidebar border border-white/10 rounded-[2.5rem] p-8 shadow-2xl overflow-hidden"
          >
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-gemini-accent/10 to-transparent" />
            
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 text-white/40 hover:text-white hover:bg-white/5 rounded-full transition-colors z-20"
            >
              <X size={20} />
            </button>

            <div className="relative z-10 flex flex-col items-center text-center">
              {/* Profile Image */}
              <div className="relative mb-6">
                <div className="w-24 h-24 rounded-full p-1 bg-gradient-to-tr from-gemini-accent to-purple-500 shadow-xl shadow-gemini-accent/20">
                  <div className="w-full h-full rounded-full overflow-hidden border-2 border-gemini-sidebar">
                    <img 
                      src={user.photoURL || ""} 
                      alt="profile" 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>
                <div className="absolute bottom-0 right-0 w-7 h-7 bg-green-500 border-4 border-gemini-sidebar rounded-full" />
              </div>

              {/* User Info */}
              <div className="space-y-1 mb-8">
                <h2 className="text-2xl font-bold text-white">{user.displayName}</h2>
                <div className="flex items-center justify-center gap-2 text-white/50 text-sm">
                  <Mail size={14} />
                  <span>{user.email}</span>
                </div>
              </div>

              {/* Stats/Badges (Visual only) */}
              <div className="grid grid-cols-2 gap-3 w-full mb-8">
                <div className="p-3 bg-white/5 rounded-2xl border border-white/5">
                  <p className="text-[10px] text-white/40 uppercase tracking-wider mb-1">Status</p>
                  <div className="flex items-center gap-1.5 justify-center text-xs font-medium text-gemini-accent">
                    <ShieldCheck size={12} />
                    <span>Verified</span>
                  </div>
                </div>
                <div className="p-3 bg-white/5 rounded-2xl border border-white/5">
                  <p className="text-[10px] text-white/40 uppercase tracking-wider mb-1">Member Since</p>
                  <p className="text-xs font-medium text-white">Mar 2024</p>
                </div>
              </div>

              {/* Actions */}
              <div className="w-full space-y-3">
                <button
                  onClick={onLogout}
                  className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-red-500/10 text-red-500 rounded-2xl font-semibold hover:bg-red-500 hover:text-white transition-all active:scale-[0.98]"
                >
                  <LogOut size={18} />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
