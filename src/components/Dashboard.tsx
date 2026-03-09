import React from "react";
import { Wallet, Trophy, TrendingUp, Users, ArrowUpRight, Clock, Gamepad2, Gift, Play } from "lucide-react";
import { UserStats } from "@/src/types";
import { GAMES } from "./GameCenter";
import { cn } from "@/src/lib/utils";

interface DashboardProps {
  stats: UserStats;
  setActiveView: (view: string) => void;
  onPlayGame?: (gameId: string) => void;
}

export function Dashboard({ stats, setActiveView, onPlayGame }: DashboardProps) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    const url = window.location.origin;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">Welcome Back!</h2>
        <p className="text-white/40">Track your earnings and play games to earn more.</p>
      </div>

      {/* Stats Grid - Smaller and one line on large screens */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center shrink-0">
            <Wallet className="text-amber-500" size={20} />
          </div>
          <div>
            <p className="text-white/40 text-[10px] uppercase tracking-widest">Balance</p>
            <h3 className="text-lg font-bold text-white">{stats.coins}</h3>
          </div>
        </div>
        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center shrink-0">
            <TrendingUp className="text-emerald-500" size={20} />
          </div>
          <div>
            <p className="text-white/40 text-[10px] uppercase tracking-widest">Earned</p>
            <h3 className="text-lg font-bold text-white">{stats.totalEarned}</h3>
          </div>
        </div>
        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center shrink-0">
            <Trophy className="text-blue-500" size={20} />
          </div>
          <div>
            <p className="text-white/40 text-[10px] uppercase tracking-widest">Rank</p>
            <h3 className="text-lg font-bold text-white">Bronze</h3>
          </div>
        </div>
        <button 
          onClick={handleCopy}
          className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-4 hover:bg-white/10 transition-all text-left relative group"
        >
          <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center shrink-0">
            <Users className="text-purple-500" size={20} />
          </div>
          <div>
            <p className="text-white/40 text-[10px] uppercase tracking-widest">Invites</p>
            <h3 className="text-lg font-bold text-white">0</h3>
          </div>
          <div className={cn(
            "absolute -top-8 left-1/2 -translate-x-1/2 px-3 py-1 bg-emerald-500 text-white text-[10px] font-bold rounded-full transition-opacity pointer-events-none",
            copied ? "opacity-100" : "opacity-0"
          )}>
            Link Copied!
          </div>
        </button>
      </div>

      {/* Games Section on Home Page */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h4 className="text-2xl font-bold text-white">Available Games</h4>
          <button 
            onClick={() => setActiveView('games')}
            className="text-emerald-400 text-sm hover:underline flex items-center gap-1"
          >
            View All <ArrowUpRight size={14} />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {GAMES.map((game) => (
            <div 
              key={game.id}
              className="group relative overflow-hidden rounded-2xl bg-white/5 border border-white/10 p-5 hover:bg-white/[0.08] transition-all"
            >
              <div className={cn(
                "w-12 h-12 rounded-xl bg-gradient-to-tr flex items-center justify-center mb-4 shadow-lg",
                game.color
              )}>
                {game.icon === "Gamepad2" && <Gamepad2 className="text-white" size={24} />}
                {game.icon === "Trophy" && <Trophy className="text-white" size={24} />}
                {game.icon === "Gift" && <Gift className="text-white" size={24} />}
              </div>
              
              <h3 className="text-lg font-bold text-white mb-1">{game.title}</h3>
              <p className="text-white/40 text-xs mb-4 line-clamp-1">{game.description}</p>
              
              <button 
                onClick={() => {
                  if (onPlayGame) onPlayGame(game.id);
                  setActiveView('games');
                }}
                className="w-full flex items-center justify-center gap-2 py-2 rounded-xl bg-white text-black font-bold text-sm hover:bg-white/90 transition-all"
              >
                <Play size={14} fill="currentColor" />
                Play
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-xl font-bold text-white">Recent Activity</h4>
            <button className="text-blue-400 text-sm hover:underline">View All</button>
          </div>
          
          <div className="space-y-3">
            {stats.withdrawals.length > 0 ? (
              stats.withdrawals.map((w) => (
                <div key={w.id} className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/10">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                      <ArrowUpRight className="text-white/60" size={18} />
                    </div>
                    <div>
                      <p className="text-white font-medium">Withdrawal to {w.method}</p>
                      <p className="text-white/40 text-xs">{w.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-white font-bold">-{w.amount} Coins</p>
                    <p className={cn(
                      "text-[10px] uppercase font-bold tracking-widest",
                      w.status === 'completed' ? "text-emerald-400" : "text-amber-400"
                    )}>{w.status}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-12 text-center rounded-3xl border-2 border-dashed border-white/5">
                <Clock className="text-white/10 mx-auto mb-4" size={48} />
                <p className="text-white/20">No recent activity found.</p>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-6">
          <h4 className="text-xl font-bold text-white">Quick Actions</h4>
          <div className="space-y-3">
            <button 
              onClick={() => setActiveView('withdraw')}
              className="w-full flex items-center justify-between p-5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold hover:scale-[1.02] transition-all shadow-lg shadow-emerald-500/20"
            >
              Withdraw Coins
              <Wallet size={20} />
            </button>
          </div>

          <div className="p-6 rounded-3xl bg-amber-500/10 border border-amber-500/20">
            <h5 className="text-amber-500 font-bold mb-2">Daily Bonus</h5>
            <p className="text-white/60 text-sm mb-4">Claim your daily 50 coins bonus now!</p>
            <button className="w-full py-2.5 rounded-xl bg-amber-500 text-black font-bold text-sm hover:bg-amber-400 transition-colors">
              Claim Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

