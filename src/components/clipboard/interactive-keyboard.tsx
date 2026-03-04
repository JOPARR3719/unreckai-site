"use client";

import { IosDashboard } from "./ios-dashboard";

export function InteractiveKeyboard() {
  return (
    <div className="flex justify-center">
      <div className="relative" style={{ width: 330 }}>
        {/* Background fill — slightly larger than content, bleeds under the frame PNG */}
        <div
          className="absolute inset-[3%] top-[1.5%] bottom-[1.5%] rounded-[40px]"
          style={{ background: "var(--color-brand-bgSurface)" }}
        />
        {/* Frame PNG sits on top */}
        <img
          src="/images/iphone-frame.png"
          alt="iPhone"
          className="relative z-10 w-full h-auto pointer-events-none"
        />
        {/* Content area — clipped to screen region */}
        <div
          className="absolute z-20 inset-[4.5%] top-[3%] bottom-[3%] rounded-[32px] overflow-hidden"
        >
          <div className="px-2 pt-3 pb-1 h-full overflow-hidden">
            <IosDashboard />
          </div>
        </div>
      </div>
    </div>
  );
}
