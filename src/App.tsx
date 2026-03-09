import React, { useState, useEffect } from "react";
import { Menu, Download } from "lucide-react";
import { Sidebar } from "./components/Sidebar";
import { AdSlot } from "./components/AdSlot";
import { VideoDownloader } from "./components/VideoDownloader";

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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

  return (
    <div className="flex h-screen overflow-hidden bg-gemini-bg text-gemini-text">
      {/* Social Bar Ad */}
      <AdSlot id="social-bar-ad" type="social-bar" />
      
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
            <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/40 text-[10px] font-medium">
              Premium Video Downloader
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
            <VideoDownloader />
          </div>
        </div>
      </main>
    </div>
  );
}
