import React, { useState } from "react";
import { Wallet, ArrowRight, CheckCircle2, AlertCircle } from "lucide-react";
import { cn } from "@/src/lib/utils";

interface WithdrawProps {
  coins: number;
  onWithdraw: (amount: number, method: string) => void;
}

const METHODS = [
  { id: "bkash", name: "bKash", icon: "https://www.logo.wine/a/logo/BKash/BKash-Icon-Logo.wine.svg", color: "bg-[#D12053]" },
  { id: "nagad", name: "Nagad", icon: "https://download.logo.wine/logo/Nagad/Nagad-Logo.wine.png", color: "bg-[#F7941D]" },
  { id: "rocket", name: "Rocket", icon: "https://www.logo.wine/a/logo/Dutch-Bangla_Bank/Dutch-Bangla_Bank-Logo.wine.svg", color: "bg-[#8C3494]" }
];

export function Withdraw({ coins, onWithdraw }: WithdrawProps) {
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState("");
  const [account, setAccount] = useState("");
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const coinToBdt = 0.001; // 1000 coins = 1 BDT
  const minWithdraw = 100000; // 100 BDT

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numAmount = parseInt(amount);
    
    if (numAmount < minWithdraw) {
      alert(`Minimum withdrawal is ${minWithdraw} coins.`);
      return;
    }
    
    if (numAmount > coins) {
      alert("Insufficient coins.");
      return;
    }

    onWithdraw(numAmount, method);
    setStatus('success');
    setAmount("");
    setAccount("");
    
    setTimeout(() => setStatus('idle'), 5000);
  };

  if (status === 'success') {
    return (
      <div className="p-8 max-w-md mx-auto text-center">
        <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="text-emerald-500" size={40} />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Request Submitted!</h2>
        <p className="text-white/60 mb-8">Your withdrawal request has been received and is being processed. It usually takes 2-24 hours.</p>
        <button 
          onClick={() => setStatus('idle')}
          className="w-full py-3 rounded-xl bg-white text-black font-bold hover:bg-white/90 transition-all"
        >
          Back to Withdraw
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto">
      <div className="mb-12">
        <h2 className="text-4xl font-bold text-white mb-3 tracking-tight">Withdraw Funds</h2>
        <p className="text-white/40 text-lg">Convert your hard-earned coins into real money.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Balance Card */}
        <div className="lg:col-span-1">
          <div className="p-8 rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-700 shadow-xl shadow-blue-500/20">
            <Wallet className="text-white/60 mb-4" size={32} />
            <p className="text-white/60 text-sm uppercase tracking-widest mb-1">Available Balance</p>
            <h3 className="text-4xl font-bold text-white mb-6">{coins} <span className="text-xl font-normal opacity-60">Coins</span></h3>
            <div className="pt-6 border-t border-white/10">
              <p className="text-white/60 text-xs mb-1">Estimated Value</p>
              <p className="text-2xl font-bold text-white">৳ {(coins * coinToBdt).toFixed(2)}</p>
            </div>
          </div>

          <div className="mt-6 p-6 rounded-2xl bg-white/5 border border-white/10">
            <div className="flex items-start gap-3">
              <AlertCircle className="text-amber-400 shrink-0" size={20} />
              <div>
                <h4 className="text-white font-bold text-sm mb-1">Withdrawal Rules</h4>
                <ul className="text-white/40 text-xs space-y-2">
                  <li>• Minimum withdraw: {minWithdraw} coins (৳ 100)</li>
                  <li>• Processing time: 2-24 hours</li>
                  <li>• 1000 Coins = ৳ 1.00</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-6 p-8 rounded-3xl bg-white/5 border border-white/10">
            <div>
              <label className="block text-white/60 text-sm font-medium mb-3">Select Payment Method</label>
              <div className="grid grid-cols-3 gap-4">
                {METHODS.map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setMethod(m.id)}
                    className={cn(
                      "relative flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all",
                      method === m.id 
                        ? "border-blue-500 bg-blue-500/10" 
                        : "border-white/5 bg-white/5 hover:border-white/10"
                    )}
                  >
                    <div className={cn("w-10 h-10 rounded-full flex items-center justify-center overflow-hidden", m.color)}>
                      <img src={m.icon} alt={m.name} className="w-8 h-8 object-contain" />
                    </div>
                    <span className="text-xs font-bold text-white">{m.name}</span>
                    {method === m.id && (
                      <div className="absolute top-2 right-2 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                        <CheckCircle2 size={10} className="text-white" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-white/60 text-sm font-medium mb-2">Account Number</label>
                <input 
                  type="text" 
                  value={account}
                  onChange={(e) => setAccount(e.target.value)}
                  placeholder="e.g. 017XXXXXXXX"
                  required
                  className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>
              <div>
                <label className="block text-white/60 text-sm font-medium mb-2">Withdraw Amount (Coins)</label>
                <input 
                  type="number" 
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder={`Min ${minWithdraw} coins`}
                  required
                  className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-blue-500 transition-colors"
                />
                <p className="mt-2 text-white/30 text-xs">You will receive: ৳ {(parseInt(amount || "0") * coinToBdt).toFixed(2)}</p>
              </div>
            </div>

            <button 
              type="submit"
              disabled={!method || !amount || !account}
              className="w-full py-4 rounded-xl bg-white text-black font-bold hover:bg-white/90 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              Confirm Withdrawal
              <ArrowRight size={18} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
