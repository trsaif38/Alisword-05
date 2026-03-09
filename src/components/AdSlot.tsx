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
      
      let key = "28678501"; // Default to 468x60
      let height = 60;
      let width = 468;

      if (type === "banner") {
        key = "28678501";
        height = 60;
        width = 468;
      } else if (type === "sidebar") {
        key = "28678491"; // Native Banner
        height = 250;
        width = 300;
      } else if (type === "social-bar") {
        key = "28678508";
      }

      atOptionsScript.innerHTML = `
        atOptions = {
          'key' : '${key}',
          'format' : 'iframe',
          'height' : ${height},
          'width' : ${width},
          'params' : {}
        };
      `;
      
      const invokeScript = document.createElement("script");
      invokeScript.type = "text/javascript";
      invokeScript.src = `//www.topcreativeformat.com/${key}/invoke.js`;
      
      container.appendChild(atOptionsScript);
      container.appendChild(invokeScript);
    }
  }, [type]);

  if (type === "social-bar") return <div ref={adRef} />;

  return (
    <div 
      ref={adRef}
      className={cn(
        "flex items-center justify-center overflow-hidden bg-white/5 rounded-lg",
        type === "banner" && "w-full min-h-[60px] md:min-h-[90px] mb-4",
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
