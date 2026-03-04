"use client";

import { IosDashboard } from "./ios-dashboard";

export function InteractiveKeyboard() {
  return (
    <div className="flex justify-center">
      <div className="relative" style={{ width: 320 }}>
        <img src="/images/iphone-frame.png" alt="iPhone" className="w-full h-auto" />
        <div
          className="absolute inset-[4.5%] top-[3%] bottom-[3%] rounded-[32px] overflow-hidden"
          style={{ background: "#0d1114" }}
        >
          <div className="px-2 pt-3 pb-1 h-full overflow-hidden">
            <IosDashboard />
          </div>
        </div>
      </div>
    </div>
  );
}
