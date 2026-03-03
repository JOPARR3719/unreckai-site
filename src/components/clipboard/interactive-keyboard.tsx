"use client";

import { IPhoneFrame } from "../iphone-frame";
import { IosDashboard } from "./ios-dashboard";

export function InteractiveKeyboard() {
  return (
    <div className="flex justify-center">
      <IPhoneFrame>
        <IosDashboard />
      </IPhoneFrame>
    </div>
  );
}
