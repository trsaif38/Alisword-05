import React, { useState, useEffect } from "react";
import { Menu, Download, DollarSign } from "lucide-react";
import { Sidebar } from "./components/Sidebar";
import { AdSlot } from "./components/AdSlot";
import { VideoDownloader } from "./components/VideoDownloader";
import { GameCenter } from "./components/GameCenter";
import { Withdraw } from "./components/Withdraw";
import { Dashboard } from "./components/Dashboard";
import { Login } from "./components/Login";
import { UserStats, WithdrawalRequest } from "./types";

import { AuthProvider, useAuth } from "./lib/AuthContext";

function AppContent() {
  const { user, loading } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeView, setActiveView] = useState("dashboard");
  const [selectedGame, setSelectedGame] = useState<string | null>(null);
  const [stats, setStats] = useState<UserStats>(() => {
    const saved = localStorage.getItem("alisword_stats");
    return saved ? JSON.parse(saved) : {
      coins: 0,
      totalEarned: 0,
      withdrawals: []
    };
  });

  useEffect(() => {
    localStorage.setItem("alisword_stats", JSON.stringify(stats));
  }, [stats]);

  const handleEarn = (amount: number) => {
    setStats(prev => ({
      ...prev,
      coins: prev.coins + amount,
      totalEarned: prev.totalEarned + amount
    }));
  };

  const handleWithdraw = (amount: number, method: string) => {
    const newWithdrawal: WithdrawalRequest = {
      id: Math.random().toString(36).substr(2, 9),
      amount,
      method,
      status: 'pending',
      date: new Date().toLocaleDateString()
    };

    setStats(prev => ({
      ...prev,
      coins: prev.coins - amount,
      withdrawals: [newWithdrawal, ...prev.withdrawals]
    }));
  };

  useEffect(() => {
    // Add Popunder script
    const popunderScript = document.createElement("script");
    popunderScript.type = "text/javascript";
    popunderScript.src = "https://pl28778969.effectivegatecpm.com/00/61/a2/0061a2ff2bc5e734ccda1eb1056fcc75.js";
    document.body.appendChild(popunderScript);

    // Add Social Bar script
    const socialBarScript = document.createElement("script");
    socialBarScript.type = "text/javascript";
    socialBarScript.src = "https://pl28779007.effectivegatecpm.com/29/fb/13/29fb1384d7d92760c7f24263b14d90c3.js";
    document.body.appendChild(socialBarScript);
    
    return () => {
      document.body.removeChild(popunderScript);
      document.body.removeChild(socialBarScript);
    };
  }, []);

  const handleUpdateStats = (newStats: Partial<UserStats>) => {
    setStats(prev => ({ ...prev, ...newStats }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gemini-bg flex items-center justify-center">
        <div className="w-12 h-12 rounded-full border-4 border-emerald-500/20 border-t-emerald-500 animate-spin" />
      </div>
    );
  }

  if (!user) {
    return <Login />;
  }

  return (
    <div className="flex h-screen overflow-hidden bg-gemini-bg text-gemini-text">
      {/* Social Bar Ad */}
      <AdSlot id="social-bar-ad" type="social-bar" />
      
      <Sidebar
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
        activeView={activeView}
        setActiveView={(view) => {
          setActiveView(view);
          setSelectedGame(null); // Reset when navigating from sidebar
        }}
      />

      <main className="flex-1 flex flex-col relative min-w-0">
        {/* Header */}
        <header className="flex items-center justify-between p-4 bg-gemini-bg/80 backdrop-blur-md sticky top-0 z-30 border-b border-white/5">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 hover:bg-white/5 rounded-lg lg:hidden"
            >
              <Menu size={24} />
            </button>
            <div 
              onClick={() => setActiveView('dashboard')}
              className="flex items-center gap-2 cursor-pointer group"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/20 group-hover:scale-110 transition-transform">
                <DollarSign size={20} className="text-white" />
              </div>
              <h1 className="text-lg font-bold tracking-tight text-white hidden sm:block">
                Alisword <span className="text-emerald-400">Earning</span>
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20">
              <span className="text-amber-500 text-sm font-bold">{stats.coins}</span>
              <span className="text-amber-500/60 text-[10px] uppercase font-bold tracking-widest">Coins</span>
            </div>
            
            {/* User Profile Info */}
            <div className="hidden sm:flex items-center gap-3 pl-4 border-l border-white/10">
              <div className="text-right">
                <p className="text-xs font-bold text-white leading-none mb-1">{user.displayName}</p>
                <p className="text-[10px] text-white/40 leading-none">{user.email}</p>
              </div>
              <img 
                src={user.photoURL || `https://ui-avatars.com/api/?name=${user.displayName}`} 
                alt={user.displayName || 'User'} 
                className="w-8 h-8 rounded-full border border-white/10"
              />
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col overflow-hidden relative">
          {/* Top Banner Ad Slot */}
          <div className="px-4 md:px-8 pt-2">
            <AdSlot id="top-banner-ad" type="banner" className="h-[60px] md:h-[90px]" />
          </div>
          
          <div className="flex-1 overflow-y-auto scrollbar-hide">
            {activeView === 'dashboard' && (
              <Dashboard 
                stats={stats} 
                setActiveView={setActiveView} 
                onPlayGame={(id) => setSelectedGame(id)}
              />
            )}
            {activeView === 'games' && (
              <GameCenter 
                onEarn={handleEarn} 
                stats={stats} 
                onUpdateStats={handleUpdateStats} 
                initialGame={selectedGame}
              />
            )}
            {activeView === 'downloader' && <VideoDownloader />}
            {activeView === 'withdraw' && <Withdraw coins={stats.coins} onWithdraw={handleWithdraw} />}
          </div>
        </div>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
