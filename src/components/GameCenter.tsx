import React, { useState, useEffect } from "react";
import { Gamepad2, Trophy, ArrowRight, Wallet, History, Gift, Play } from "lucide-react";
import { cn } from "@/src/lib/utils";
import { Game } from "@/src/types";

interface GameCenterProps {
  onEarn: (amount: number) => void;
}

const GAMES: Game[] = [
  {
    id: "clicker",
    title: "Coin Clicker",
    description: "Click the coin to earn rewards. Simple and fast!",
    reward: 5,
    icon: "Gamepad2",
    color: "from-amber-400 to-orange-600"
  },
  {
    id: "memory",
    title: "Memory Match",
    description: "Find matching pairs to earn coins. Sharpen your mind!",
    reward: 20,
    icon: "Trophy",
    color: "from-blue-400 to-indigo-600"
  },
  {
    id: "spin",
    title: "Daily Spin",
    description: "Spin the wheel and win up to 100 coins!",
    reward: 50,
    icon: "Gift",
    color: "from-purple-400 to-pink-600"
  },
  {
    id: "math",
    title: "Math Master",
    description: "Solve simple math problems to earn coins.",
    reward: 10,
    icon: "Trophy",
    color: "from-emerald-400 to-teal-600"
  }
];

export function GameCenter({ onEarn }: GameCenterProps) {
  const [activeGame, setActiveGame] = useState<string | null>(null);
  const [gameCoins, setGameCoins] = useState(0);
  const [sessionTotal, setSessionTotal] = useState(0);
  const [clickCount, setClickCount] = useState(0);
  const [showAdBreak, setShowAdBreak] = useState(false);

  // Memory Game State
  const [cards, setCards] = useState<{id: number, val: string, flipped: boolean, matched: boolean}[]>([]);
  const [flipped, setFlipped] = useState<number[]>([]);

  // Math Game State
  const [mathProblem, setMathProblem] = useState({ q: "", a: 0 });
  const [mathInput, setMathInput] = useState("");
  const [mathTimer, setMathTimer] = useState(10);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (activeGame === "math" && !showAdBreak) {
      interval = setInterval(() => {
        setMathTimer((prev) => {
          if (prev <= 1) {
            handleEarn(-10);
            generateMath();
            return 10;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [activeGame, showAdBreak]);

  const incrementClicks = () => {
    setClickCount(prev => {
      const next = prev + 1;
      if (next >= 5) {
        setShowAdBreak(true);
        return 0;
      }
      return next;
    });
  };

  const handlePlay = (gameId: string) => {
    setActiveGame(gameId);
    setGameCoins(0);
    
    if (gameId === "memory") {
      const symbols = ["🍎", "🍌", "🍇", "🍓", "🍒", "🍍"];
      const deck = [...symbols, ...symbols]
        .sort(() => Math.random() - 0.5)
        .map((val, id) => ({ id, val, flipped: false, matched: false }));
      setCards(deck);
      setFlipped([]);
    }

    if (gameId === "math") {
      generateMath();
    }
  };

  const generateMath = () => {
    const a = Math.floor(Math.random() * 9000) + 1000;
    const b = Math.floor(Math.random() * 9000) + 1000;
    const isAddition = Math.random() > 0.5;
    
    if (isAddition) {
      setMathProblem({ q: `${a} + ${b} = ?`, a: a + b });
    } else {
      setMathProblem({ q: `${a} - ${b} = ?`, a: a - b });
    }
    setMathInput("");
    setMathTimer(10);
  };

  const handleEarn = (amount: number) => {
    setGameCoins(prev => prev + amount);
    setSessionTotal(prev => {
      const newTotal = prev + amount;
      if (newTotal >= 500) {
        setShowAdBreak(true);
        return 0; // Reset session counter
      }
      return newTotal;
    });
    onEarn(amount);
  };

  // Memory Logic
  const handleCardClick = (id: number) => {
    if (flipped.length === 2 || cards[id].flipped || cards[id].matched) return;
    
    incrementClicks();

    const newCards = [...cards];
    newCards[id].flipped = true;
    setCards(newCards);

    const newFlipped = [...flipped, id];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      const [first, second] = newFlipped;
      if (cards[first].val === cards[second].val) {
        setTimeout(() => {
          const matchedCards = [...cards];
          matchedCards[first].matched = true;
          matchedCards[second].matched = true;
          setCards(matchedCards);
          setFlipped([]);
          handleEarn(20);
          
          if (matchedCards.every(c => c.matched)) {
            alert("Level Complete! +50 Bonus Coins");
            handleEarn(50);
            handlePlay("memory"); // Restart
          }
        }, 500);
      } else {
        handleEarn(-20);
        setTimeout(() => {
          const resetCards = [...cards];
          resetCards[first].flipped = false;
          resetCards[second].flipped = false;
          setCards(resetCards);
          setFlipped([]);
        }, 1000);
      }
    }
  };

  // Math Logic
  const checkMath = (e: React.FormEvent) => {
    e.preventDefault();
    incrementClicks();
    if (parseInt(mathInput) === mathProblem.a) {
      handleEarn(10);
      generateMath();
    } else {
      handleEarn(-10);
      alert("Wrong answer! -10 Coins");
      generateMath();
    }
  };

  // Spin Logic
  const handleSpin = () => {
    incrementClicks();
    const rewards = [10, 20, 50, 100, 0, 5];
    const win = rewards[Math.floor(Math.random() * rewards.length)];
    alert(`You won ${win} coins!`);
    if (win > 0) handleEarn(win);
  };

  if (showAdBreak) {
    return (
      <div className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center p-6 text-center">
        <div className="w-24 h-24 rounded-full bg-amber-500/20 flex items-center justify-center mb-6 animate-pulse">
          <Gift className="text-amber-500" size={48} />
        </div>
        <h2 className="text-3xl font-bold text-white mb-2">Bonus Ad Break!</h2>
        <p className="text-white/60 mb-8 max-w-md">You've earned a lot of coins! Click below to watch a short ad and continue earning.</p>
        <button 
          onClick={() => setShowAdBreak(false)}
          className="px-12 py-4 rounded-2xl bg-white text-black font-bold text-lg hover:scale-105 transition-transform"
        >
          Continue Earning
        </button>
        <p className="mt-4 text-white/20 text-xs uppercase tracking-widest">Ad will trigger on click</p>
      </div>
    );
  }

  if (activeGame === "clicker") {
    return (
      <div className="p-6 max-w-2xl mx-auto text-center">
        <button 
          onClick={() => setActiveGame(null)}
          className="mb-8 text-white/40 hover:text-white flex items-center gap-2"
        >
          <ArrowRight className="rotate-180" size={16} /> Back to Games
        </button>
        <h2 className="text-3xl font-bold text-white mb-2">Coin Clicker</h2>
        <p className="text-white/60 mb-12">Click the golden coin to earn 5 coins per click!</p>
        
        <div className="relative inline-block group">
          <div className="absolute inset-0 bg-amber-500/20 blur-3xl rounded-full group-hover:bg-amber-500/40 transition-all" />
          <button 
            onClick={() => {
              handleEarn(5);
              incrementClicks();
            }}
            className="relative w-48 h-48 rounded-full bg-gradient-to-tr from-amber-400 to-orange-600 flex items-center justify-center shadow-2xl shadow-amber-500/40 active:scale-90 transition-transform border-8 border-white/10"
          >
            <span className="text-6xl">💰</span>
          </button>
        </div>
        
        <div className="mt-12 p-6 rounded-2xl bg-white/5 border border-white/10">
          <p className="text-white/40 text-sm uppercase tracking-widest mb-1">Session Earnings</p>
          <p className="text-4xl font-bold text-amber-400">{gameCoins} Coins</p>
        </div>
      </div>
    );
  }

  if (activeGame === "memory") {
    return (
      <div className="p-6 max-w-2xl mx-auto text-center">
        <button 
          onClick={() => setActiveGame(null)}
          className="mb-8 text-white/40 hover:text-white flex items-center gap-2"
        >
          <ArrowRight className="rotate-180" size={16} /> Back to Games
        </button>
        <h2 className="text-3xl font-bold text-white mb-8">Memory Match</h2>
        
        <div className="grid grid-cols-4 gap-4 mb-12">
          {cards.map((card) => (
            <button
              key={card.id}
              onClick={() => handleCardClick(card.id)}
              className={cn(
                "aspect-square rounded-xl flex items-center justify-center text-3xl transition-all duration-300 transform",
                card.flipped || card.matched ? "bg-white/10 rotate-0" : "bg-blue-600 rotate-180"
              )}
            >
              {(card.flipped || card.matched) ? card.val : "?"}
            </button>
          ))}
        </div>
        
        <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
          <p className="text-white/40 text-sm uppercase tracking-widest mb-1">Session Earnings</p>
          <p className="text-4xl font-bold text-blue-400">{gameCoins} Coins</p>
        </div>
      </div>
    );
  }

  if (activeGame === "math") {
    return (
      <div className="p-6 max-w-2xl mx-auto text-center">
        <button 
          onClick={() => setActiveGame(null)}
          className="mb-8 text-white/40 hover:text-white flex items-center gap-2"
        >
          <ArrowRight className="rotate-180" size={16} /> Back to Games
        </button>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-white">Math Master</h2>
          <div className={cn(
            "px-4 py-2 rounded-xl font-bold text-xl border",
            mathTimer <= 3 ? "bg-red-500/20 border-red-500 text-red-500 animate-pulse" : "bg-white/5 border-white/10 text-white"
          )}>
            {mathTimer}s
          </div>
        </div>
        <p className="text-white/60 mb-12">Solve the problem in 10 seconds to earn 10 coins!</p>
        
        <div className="p-12 rounded-3xl bg-white/5 border border-white/10 mb-8">
          <p className="text-5xl md:text-6xl font-bold text-white mb-8">{mathProblem.q}</p>
          <form onSubmit={checkMath} className="flex flex-col sm:flex-row gap-4">
            <input 
              type="number"
              value={mathInput}
              onChange={(e) => setMathInput(e.target.value)}
              placeholder="Result"
              autoFocus
              className="flex-1 px-6 py-4 rounded-xl bg-white/10 border border-white/10 text-white text-2xl focus:outline-none focus:border-emerald-500"
            />
            <button type="submit" className="px-8 py-4 rounded-xl bg-emerald-500 text-black font-bold text-xl">Check</button>
          </form>
        </div>
        
        <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
          <p className="text-white/40 text-sm uppercase tracking-widest mb-1">Session Earnings</p>
          <p className="text-4xl font-bold text-emerald-400">{gameCoins} Coins</p>
        </div>
      </div>
    );
  }

  if (activeGame === "spin") {
    return (
      <div className="p-6 max-w-2xl mx-auto text-center">
        <button 
          onClick={() => setActiveGame(null)}
          className="mb-8 text-white/40 hover:text-white flex items-center gap-2"
        >
          <ArrowRight className="rotate-180" size={16} /> Back to Games
        </button>
        <h2 className="text-3xl font-bold text-white mb-2">Daily Spin</h2>
        <p className="text-white/60 mb-12">Spin the lucky wheel for big rewards!</p>
        
        <div className="relative w-64 h-64 mx-auto mb-12">
          <div className="absolute inset-0 rounded-full border-8 border-white/10 animate-spin-slow" />
          <button 
            onClick={handleSpin}
            className="absolute inset-4 rounded-full bg-gradient-to-tr from-purple-500 to-pink-600 flex items-center justify-center text-white font-bold text-2xl shadow-2xl shadow-purple-500/40 active:scale-95 transition-transform"
          >
            SPIN
          </button>
        </div>
        
        <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
          <p className="text-white/40 text-sm uppercase tracking-widest mb-1">Session Earnings</p>
          <p className="text-4xl font-bold text-purple-400">{gameCoins} Coins</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto">
      <div className="mb-12">
        <h2 className="text-4xl font-bold text-white mb-3 tracking-tight">Game Center</h2>
        <p className="text-white/40 text-lg">Play games and earn coins instantly. No limits!</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {GAMES.map((game) => (
          <div 
            key={game.id}
            className="group relative overflow-hidden rounded-3xl bg-white/5 border border-white/10 p-8 hover:bg-white/[0.08] transition-all hover:-translate-y-1"
          >
            <div className={cn(
              "w-16 h-16 rounded-2xl bg-gradient-to-tr flex items-center justify-center mb-6 shadow-lg",
              game.color
            )}>
              {game.icon === "Gamepad2" && <Gamepad2 className="text-white" size={32} />}
              {game.icon === "Trophy" && <Trophy className="text-white" size={32} />}
              {game.icon === "Gift" && <Gift className="text-white" size={32} />}
            </div>
            
            <h3 className="text-2xl font-bold text-white mb-2">{game.title}</h3>
            <p className="text-white/50 mb-8 line-clamp-2">{game.description}</p>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 text-amber-400 text-sm font-bold">
                <span>+{game.reward} Coins</span>
              </div>
              <button 
                onClick={() => handlePlay(game.id)}
                className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-white text-black font-bold hover:bg-white/90 transition-all active:scale-95"
              >
                <Play size={16} fill="currentColor" />
                Play Now
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Stats Section */}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-8 rounded-3xl bg-gradient-to-br from-blue-600/20 to-indigo-600/20 border border-blue-500/20">
          <Trophy className="text-blue-400 mb-4" size={32} />
          <h4 className="text-white font-bold text-xl mb-1">Top Earners</h4>
          <p className="text-white/40 text-sm">See who's leading the leaderboard this week.</p>
        </div>
        <div className="p-8 rounded-3xl bg-gradient-to-br from-emerald-600/20 to-teal-600/20 border border-emerald-500/20">
          <Wallet className="text-emerald-400 mb-4" size={32} />
          <h4 className="text-white font-bold text-xl mb-1">Fast Withdraw</h4>
          <p className="text-white/40 text-sm">Convert your coins to real cash in minutes.</p>
        </div>
        <div className="p-8 rounded-3xl bg-gradient-to-br from-purple-600/20 to-pink-600/20 border border-purple-500/20">
          <History className="text-purple-400 mb-4" size={32} />
          <h4 className="text-white font-bold text-xl mb-1">Daily Bonus</h4>
          <p className="text-white/40 text-sm">Login every day to claim your free reward.</p>
        </div>
      </div>
    </div>
  );
}
