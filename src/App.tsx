import React, { useState, useEffect } from "react";
import { Menu, LogIn, Download } from "lucide-react";
import { Sidebar } from "./components/Sidebar";
import { LoginModal } from "./components/LoginModal";
import { UserProfileModal } from "./components/UserProfileModal";
import { AdSlot } from "./components/AdSlot";
import { VideoDownloader } from "./components/VideoDownloader";
import { cn } from "./lib/utils";
import { auth, googleProvider, isFirebaseConfigured } from "./lib/firebase";
import { signInWithPopup, signOut, onAuthStateChanged, User } from "firebase/auth";

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  // Auth listener
  useEffect(() => {
    if (!auth) return;
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    if (!auth || !googleProvider) {
      alert("Firebase is not configured. Please set your Firebase environment variables in the Secrets panel.");
      return;
    }
    try {
      await signInWithPopup(auth, googleProvider);
      setIsLoginModalOpen(false);
    } catch (error: any) {
      console.error("Login failed", error);
      if (error.code === "auth/unauthorized-domain") {
        const currentDomain = window.location.hostname;
        alert(
          `Unauthorized Domain Error!\n\n` +
          `Please add "${currentDomain}" to your Firebase Authorized Domains list.\n\n` +
          `Steps:\n` +
          `1. Go to Firebase Console > Authentication > Settings > Authorized domains.\n` +
          `2. Click "Add domain" and paste: ${currentDomain}`
        );
      } else {
        alert("Login failed: " + error.message);
      }
    }
  };

  const handleLogout = async () => {
    if (!auth) return;
    try {
      await signOut(auth);
      setIsProfileModalOpen(false);
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gemini-bg text-gemini-text">
      <Sidebar
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
      />

      <main className="flex-1 flex flex-col relative min-w-0">
        {/* Header */}
        <header className="flex items-center justify-between p-4 bg-gemini-bg/80 backdrop-blur-md sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 hover:bg-white/5 rounded-lg lg:hidden"
            >
              <Menu size={24} />
            </button>
            <div 
              className="flex items-center gap-2 cursor-pointer group"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform">
                <Download size={20} className="text-white" />
              </div>
              <h1 className="text-lg font-bold tracking-tight text-white hidden sm:block">
                Alisword
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {!isFirebaseConfigured && (
              <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 text-[10px] font-medium">
                Auth not configured
              </div>
            )}
            
            {user ? (
              <div 
                className="flex items-center gap-3 cursor-pointer group"
                onClick={() => setIsProfileModalOpen(true)}
              >
                <div className="hidden sm:block text-right">
                  <p className="text-xs font-medium text-white group-hover:text-gemini-accent transition-colors">{user.displayName}</p>
                  <p className="text-[10px] text-white/40">View Profile</p>
                </div>
                <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-white/10 group-hover:border-gemini-accent transition-all">
                  <img 
                    src={user.photoURL || ""} 
                    alt="profile" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            ) : (
              <button
                onClick={() => setIsLoginModalOpen(true)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-black text-sm font-semibold hover:bg-white/90 transition-all active:scale-95 shadow-lg shadow-white/5"
              >
                <LogIn size={18} />
                <span>Login</span>
              </button>
            )}
          </div>
        </header>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col overflow-hidden relative">
          {/* Top Banner Ad Slot */}
          <div className="px-4 md:px-8 pt-2">
            <AdSlot id="top-banner-ad" type="banner" className="h-[60px] md:h-[90px]" />
          </div>
          
          <div className="flex-1 overflow-y-auto scrollbar-hide">
            <VideoDownloader />
          </div>
        </div>

        {/* Login Modal */}
        <LoginModal 
          isOpen={isLoginModalOpen} 
          onClose={() => setIsLoginModalOpen(false)} 
          onLogin={handleLogin} 
        />

        {/* User Profile Modal */}
        <UserProfileModal
          isOpen={isProfileModalOpen}
          onClose={() => setIsProfileModalOpen(false)}
          onLogout={handleLogout}
          user={user}
        />
      </main>
    </div>
  );
}
