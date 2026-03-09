import React from "react";
import { Settings, History, DollarSign, Download, Gamepad2, Wallet, LayoutDashboard } from "lucide-react";
import { cn } from "@/src/lib/utils";
import { AdSlot } from "./AdSlot";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  activeView: string;
  setActiveView: (view: string) => void;
}

export function Sidebar({
  isOpen,
  setIsOpen,
  activeView,
  setActiveView,
}: SidebarProps) {
  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "games", label: "Game Center", icon: Gamepad2 },
    { id: "downloader", label: "Video Downloader", icon: Download },
    { id: "withdraw", label: "Withdraw", icon: Wallet },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-72 bg-gemini-sidebar transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full p-4">
          <div className="flex items-center gap-3 px-4 py-3 mb-6 rounded-full bg-white/5 text-sm font-medium">
            <DollarSign size={20} className="text-emerald-400" />
            Alisword Earning
          </div>

          <div className="flex-1 overflow-y-auto scrollbar-hide">
            <div className="text-xs font-medium text-white/40 px-4 mb-2 uppercase tracking-wider">
              Navigation
            </div>
            <div className="space-y-1">
              {navItems.map((item) => (
                <button 
                  key={item.id}
                  onClick={() => {
                    setActiveView(item.id);
                    setIsOpen(false);
                  }}
                  className={cn(
                    "flex items-center gap-3 w-full px-4 py-2.5 rounded-xl transition-all text-sm font-medium",
                    activeView === item.id 
                      ? "text-white bg-white/10 shadow-lg shadow-white/5" 
                      : "text-white/60 hover:text-white hover:bg-white/5"
                  )}
                >
                  <item.icon size={18} />
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-auto pt-4 border-t border-white/10 space-y-1">
            <button className="flex items-center gap-3 w-full px-4 py-2 rounded-lg text-white/70 hover:bg-white/5 transition-colors text-sm">
              <History size={18} />
              Activity
            </button>
            <button className="flex items-center gap-3 w-full px-4 py-2 rounded-lg text-white/70 hover:bg-white/5 transition-colors text-sm">
              <Settings size={18} />
              Settings
            </button>
            
            {/* Adsterra Sidebar Ad Slot */}
            <div className="pt-4">
              <AdSlot id="sidebar-ad-1" type="sidebar" />
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
