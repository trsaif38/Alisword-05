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
      
      if (type === "banner") {
        const atOptionsScript = document.createElement("script");
        atOptionsScript.type = "text/javascript";
        atOptionsScript.innerHTML = `
          atOptions = {
            'key' : '23520793c31cbb3b263ccdd8b6c5c450',
            'format' : 'iframe',
            'height' : 60,
            'width' : 468,
            'params' : {}
          };
        `;
        const invokeScript = document.createElement("script");
        invokeScript.src = "https://www.highperformanceformat.com/23520793c31cbb3b263ccdd8b6c5c450/invoke.js";
        container.appendChild(atOptionsScript);
        container.appendChild(invokeScript);
      } else if (type === "sidebar") {
        // Native Banner
        const nativeScript = document.createElement("script");
        nativeScript.async = true;
        nativeScript.setAttribute("data-cfasync", "false");
        nativeScript.src = "https://pl28778990.effectivegatecpm.com/5d612d1fec70fa475ca1fb9fa8edffee/invoke.js";
        
        const nativeContainer = document.createElement("div");
        nativeContainer.id = "container-5d612d1fec70fa475ca1fb9fa8edffee";
        
        container.appendChild(nativeScript);
        container.appendChild(nativeContainer);
      }
    }
  }, [type]);

  if (type === "social-bar") return null;

  return (
    <div 
      ref={adRef}
      className={cn(
        "flex items-center justify-center overflow-hidden bg-white/5 rounded-lg",
        type === "banner" && "w-full min-h-[60px] mb-4",
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
