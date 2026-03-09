import React from "react";
import { Settings, History, DollarSign, Download } from "lucide-react";
import { cn } from "@/src/lib/utils";
import { AdSlot } from "./AdSlot";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export function Sidebar({
  isOpen,
  setIsOpen,
}: SidebarProps) {
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
            <Download size={20} className="text-blue-400" />
            Alisword
          </div>

          <div className="flex-1 overflow-y-auto scrollbar-hide">
            <div className="text-xs font-medium text-white/40 px-4 mb-2 uppercase tracking-wider">
              Navigation
            </div>
            <div className="space-y-1">
              <button className="flex items-center gap-3 w-full px-4 py-2 rounded-lg text-white bg-white/10 transition-colors text-sm">
                <Download size={16} />
                Downloader
              </button>
            </div>
          </div>

          <div className="mt-auto pt-4 border-t border-white/10 space-y-1">
            <button className="flex items-center gap-3 w-full px-4 py-2 rounded-lg text-white/70 hover:bg-white/5 transition-colors text-sm">
              <History size={18} />
              Activity
            </button>
            <button className="flex items-center gap-3 w-full px-4 py-2 rounded-lg text-emerald-400 hover:bg-emerald-400/5 transition-colors text-sm font-medium">
              <DollarSign size={18} />
              Revenue Dashboard
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
