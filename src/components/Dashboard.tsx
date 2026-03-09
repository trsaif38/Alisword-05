import React from "react";
import { Wallet, Trophy, TrendingUp, Users, ArrowUpRight, Clock } from "lucide-react";
import { UserStats } from "@/src/types";

interface DashboardProps {
  stats: UserStats;
  setActiveView: (view: string) => void;
}

export function Dashboard({ stats, setActiveView }: DashboardProps) {
  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto">
      <div className="mb-12">
        <h2 className="text-4xl font-bold text-white mb-3 tracking-tight">Welcome Back!</h2>
        <p className="text-white/40 text-lg">Track your earnings and play games to earn more.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <div className="p-6 rounded-3xl bg-white/5 border border-white/10">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center mb-4">
            <Wallet className="text-amber-500" size={20} />
          </div>
          <p className="text-white/40 text-xs uppercase tracking-widest mb-1">Current Balance</p>
          <h3 className="text-2xl font-bold text-white">{stats.coins} Coins</h3>
        </div>
        <div className="p-6 rounded-3xl bg-white/5 border border-white/10">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center mb-4">
            <TrendingUp className="text-emerald-500" size={20} />
          </div>
          <p className="text-white/40 text-xs uppercase tracking-widest mb-1">Total Earned</p>
          <h3 className="text-2xl font-bold text-white">{stats.totalEarned} Coins</h3>
        </div>
        <div className="p-6 rounded-3xl bg-white/5 border border-white/10">
          <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center mb-4">
            <Trophy className="text-blue-500" size={20} />
          </div>
          <p className="text-white/40 text-xs uppercase tracking-widest mb-1">Rank</p>
          <h3 className="text-2xl font-bold text-white">Bronze</h3>
        </div>
        <div className="p-6 rounded-3xl bg-white/5 border border-white/10">
          <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center mb-4">
            <Users className="text-purple-500" size={20} />
          </div>
          <p className="text-white/40 text-xs uppercase tracking-widest mb-1">Referrals</p>
          <h3 className="text-2xl font-bold text-white">0 Users</h3>
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
              onClick={() => setActiveView('games')}
              className="w-full flex items-center justify-between p-5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold hover:scale-[1.02] transition-all shadow-lg shadow-blue-500/20"
            >
              Play Games
              <ArrowUpRight size={20} />
            </button>
            <button 
              onClick={() => setActiveView('withdraw')}
              className="w-full flex items-center justify-between p-5 rounded-2xl bg-white/5 border border-white/10 text-white font-bold hover:bg-white/10 transition-all"
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

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}
