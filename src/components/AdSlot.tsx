import React, { useEffect, useRef } from "react";
import { cn } from "@/src/lib/utils";

interface AdSlotProps {
  id: string;
  type: "banner" | "sidebar" | "social-bar";
  className?: string;
}

export function AdSlot({ id, type, className }: AdSlotProps) {
  const adRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (adRef.current) {
      const container = adRef.current;
      container.innerHTML = ""; // Clear placeholder
      
      const atOptionsScript = document.createElement("script");
      atOptionsScript.type = "text/javascript";
      atOptionsScript.innerHTML = `
        atOptions = {
          'key' : '5624652',
          'format' : 'iframe',
          'height' : ${type === 'banner' ? 90 : 250},
          'width' : ${type === 'banner' ? 728 : 300},
          'params' : {}
        };
      `;
      
      const invokeScript = document.createElement("script");
      invokeScript.type = "text/javascript";
      // Using a common Adsterra domain, but this might vary per user
      invokeScript.src = "//www.topcreativeformat.com/5624652/invoke.js";
      
      container.appendChild(atOptionsScript);
      container.appendChild(invokeScript);
    }
  }, [type]);

  return (
    <div 
      ref={adRef}
      className={cn(
        "flex items-center justify-center overflow-hidden bg-white/5 rounded-lg",
        type === "banner" && "w-full min-h-[90px] mb-4",
        type === "sidebar" && "w-full min-h-[250px] mt-auto",
        className
      )}
    >
      <div className="text-[10px] text-white/10 uppercase tracking-widest font-bold">
        Ad Loading...
      </div>
    </div>
  );
}
