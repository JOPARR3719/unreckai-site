interface IPhoneFrameProps {
  children: React.ReactNode;
  className?: string;
}

export function IPhoneFrame({ children, className = "" }: IPhoneFrameProps) {
  return (
    <div className={`relative ${className}`} style={{ width: 310 }}>
      {/* Outer bezel */}
      <div
        className="rounded-[40px] border-[3px] border-[#2A2F36] bg-brand-bg overflow-hidden"
        style={{
          boxShadow:
            "0 20px 40px -12px rgba(0,0,0,0.5), inset 0 0 0 1px rgba(255,255,255,0.05)",
        }}
      >
        {/* Content area */}
        <div className="px-2 pt-3 pb-3">{children}</div>

        {/* Home indicator */}
        <div className="flex justify-center pb-2">
          <div className="w-[120px] h-[4px] bg-[#3A4550] rounded-full" />
        </div>
      </div>
    </div>
  );
}
