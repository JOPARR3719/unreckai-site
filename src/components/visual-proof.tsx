"use client";

import { useState } from "react";
import { Copy, Zap, ClipboardPaste } from "lucide-react";

type Source = "chatgpt" | "claude" | "gemini";

const sourceLabels: Record<Source, string> = {
  chatgpt: "ChatGPT to Slack",
  claude: "Claude to Slack",
  gemini: "Gemini to Slack",
};

const sourceColors: Record<Source, string> = {
  chatgpt: "bg-brand-chatgpt",
  claude: "bg-brand-claude",
  gemini: "bg-brand-gemini",
};

const sourceBadgeColors: Record<Source, string> = {
  chatgpt: "text-brand-chatgpt border-brand-chatgpt/30",
  claude: "text-brand-claude border-brand-claude/30",
  gemini: "text-brand-gemini border-brand-gemini/30",
};

function Artifact({ label, color = "bg-brand-accentAi" }: { label: string; color?: string }) {
  return (
    <span className={`inline-block text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded ${color}/20 text-brand-accentAi ml-2`}>
      {label}
    </span>
  );
}

function SlackToolbar() {
  return (
    <div className="flex items-center gap-3 px-4 py-2 border-b border-[#3f4347]/50">
      <button className="text-[#ababad] hover:text-white text-xs font-bold px-1">B</button>
      <button className="text-[#ababad] hover:text-white text-xs italic px-1">I</button>
      <button className="text-[#ababad] hover:text-white text-xs line-through px-1">S</button>
      <span className="w-px h-4 bg-[#3f4347]" />
      <button className="text-[#ababad] hover:text-white text-xs px-1">&lt;/&gt;</button>
      <span className="w-px h-4 bg-[#3f4347]" />
      <button className="text-[#ababad] hover:text-white text-[11px] px-1">&#8801;</button>
      <button className="text-[#ababad] hover:text-white text-[11px] px-1">1.</button>
    </div>
  );
}

function ChatGPTDirty() {
  return (
    <div className="space-y-3 text-[13px] leading-relaxed text-[#d1d2d3]">
      <p>
        <span className="bg-brand-accentAi/15 px-1 rounded">Great question!</span>
        <Artifact label="sycophantic opener" />
      </p>
      <p className="mt-2">
        Here are some effective strategies for improving remote work productivity:
      </p>

      <div className="bg-brand-accentAi/8 rounded p-2 border border-brand-accentAi/20">
        <p className="text-brand-accentAi text-[10px] font-semibold uppercase tracking-wider mb-1">Extra spacing artifact</p>
      </div>

      <p className="font-bold">1. Establish a Dedicated Workspace</p>
      <p>
        Having a designated work area helps create mental boundaries between work and personal life{" "}
        <span className="bg-brand-accentFormatting/15 px-0.5 rounded">&mdash;</span> it&rsquo;s essential for maintaining focus and professionalism during video calls.
      </p>

      <div className="bg-brand-accentAi/8 rounded p-2 border border-brand-accentAi/20">
        <p className="text-brand-accentAi text-[10px] font-semibold uppercase tracking-wider mb-1">Extra spacing artifact</p>
      </div>

      <p className="font-bold">2. Time-Block Your Schedule</p>
      <p>
        Using time-blocking techniques{" "}
        <span className="bg-brand-accentFormatting/15 px-0.5 rounded">&mdash;</span> such as the Pomodoro method{" "}
        <span className="bg-brand-accentFormatting/15 px-0.5 rounded">&mdash;</span> can significantly boost your output.
      </p>

      <p className="font-bold">Key tools to consider:</p>
      <ul className="space-y-1 ml-1">
        <li>&bull; &bull; Notion for project management
          <Artifact label="double bullet" />
        </li>
        <li>&bull; &bull; Slack for team communication</li>
        <li>&bull; &bull; Zoom for video conferencing</li>
      </ul>

      <p className="mt-3">
        <span className="bg-brand-accentAi/15 px-1 rounded">Let me know if you have any questions!</span>
        <Artifact label="chatbot closer" />
      </p>
    </div>
  );
}

function ClaudeDirty() {
  return (
    <div className="space-y-3 text-[13px] leading-relaxed text-[#d1d2d3]">
      <p>
        <span className="bg-brand-accentAi/15 px-1 rounded">That&rsquo;s a great question!</span>
        <Artifact label="sycophantic opener" />
      </p>
      <p className="mt-2">
        Here are some effective strategies for improving remote work productivity:
      </p>

      <p className="font-bold">1. Establish a Dedicated Workspace</p>
      <p>
        Having a designated work area helps create mental boundaries between work and personal life{" "}
        <span className="bg-brand-accentFormatting/15 px-0.5 rounded">&mdash;</span> it&rsquo;s essential for maintaining focus and professionalism during video calls.
      </p>

      <p className="font-bold">2. Time-Block Your Schedule</p>
      <p>
        Using time-blocking techniques{" "}
        <span className="bg-brand-accentFormatting/15 px-0.5 rounded">&mdash;</span> such as the Pomodoro method{" "}
        <span className="bg-brand-accentFormatting/15 px-0.5 rounded">&mdash;</span> can significantly boost your output.
      </p>

      <div className="bg-brand-accentAi/8 rounded p-2 border border-brand-accentAi/20">
        <p className="text-brand-accentAi text-[10px] font-semibold uppercase tracking-wider mb-1">Missing line breaks artifact</p>
        <p className="text-[12px] text-[#d1d2d3]/70">Bullets collapsed into one paragraph</p>
      </div>

      <p className="font-bold">Key tools to consider:</p>
      <p>&bull; Notion for project management &bull; Slack for team communication &bull; Zoom for video conferencing</p>

      <p className="mt-3">
        <span className="bg-brand-accentAi/15 px-1 rounded">I hope this helps! Feel free to ask if you need more details.</span>
        <Artifact label="chatbot closer" />
      </p>
    </div>
  );
}

function GeminiDirty() {
  return (
    <div className="space-y-3 text-[13px] leading-relaxed text-[#d1d2d3]">
      <p>
        Here are some effective strategies for improving remote work productivity:
      </p>

      <div className="bg-brand-accentAi/8 rounded p-2 border border-brand-accentAi/20">
        <p className="text-brand-accentAi text-[10px] font-semibold uppercase tracking-wider mb-1">Missing bold heading artifact</p>
      </div>

      <p>1. Establish a Dedicated Workspace</p>
      <p>
        Having a designated work area helps create mental boundaries between work and personal life — it&rsquo;s essential for maintaining focus.
      </p>

      <div className="bg-brand-accentAi/8 rounded p-2 border border-brand-accentAi/20">
        <p className="text-brand-accentAi text-[10px] font-semibold uppercase tracking-wider mb-1">Missing numbered list artifact</p>
      </div>

      <p>2. Time-Block Your Schedule</p>
      <p>
        Using time-blocking techniques — such as the Pomodoro method — can significantly boost your output.
      </p>

      <p className="font-bold">Key tools to consider:</p>

      <div className="bg-brand-accentAi/8 rounded p-2 border border-brand-accentAi/20">
        <p className="text-brand-accentAi text-[10px] font-semibold uppercase tracking-wider mb-1">Broken bullet artifact</p>
      </div>

      <ul className="space-y-1 ml-1">
        <li>- Notion for project management</li>
        <li className="text-[#d1d2d3]/50">Slack for team communication
          <Artifact label="missing list" />
        </li>
        <li>- Zoom for video conferencing</li>
      </ul>
    </div>
  );
}

function CleanPanel() {
  return (
    <div className="space-y-3 text-[13px] leading-relaxed text-[#d1d2d3]">
      <p>
        Here are some effective strategies for improving remote work productivity:
      </p>

      <p className="font-bold">1. Establish a Dedicated Workspace</p>
      <p>
        Having a designated work area helps create mental boundaries between work and personal life. It is essential for maintaining focus and professionalism during video calls.
      </p>

      <p className="font-bold">2. Time-Block Your Schedule</p>
      <p>
        Using time-blocking techniques, such as the Pomodoro method, can significantly boost your output.
      </p>

      <p className="font-bold">Key tools to consider:</p>
      <ul className="space-y-1 ml-4 list-disc">
        <li>Notion for project management</li>
        <li>Slack for team communication</li>
        <li>Zoom for video conferencing</li>
      </ul>
    </div>
  );
}

export function VisualProof() {
  const [source, setSource] = useState<Source>("chatgpt");

  const dirtyPanels: Record<Source, React.ReactNode> = {
    chatgpt: <ChatGPTDirty />,
    claude: <ClaudeDirty />,
    gemini: <GeminiDirty />,
  };

  return (
    <section id="visual-proof" className="py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="space-y-8 sm:space-y-12">
          {/* Header */}
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <p className="text-xs font-semibold tracking-widest uppercase text-brand-accentCleaned">
              Visual Proof
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-brand-textPrimary">
              See the difference.
            </h2>
            <p className="text-brand-textSecondary text-base sm:text-lg leading-relaxed">
              No raw markdown. No AI slop. Just clean, native formatting.
            </p>
          </div>

          {/* 3-step flow */}
          <div className="flex items-center justify-center gap-3 sm:gap-4 md:gap-8 text-sm">
            <div className="flex items-center gap-2 text-brand-textSecondary">
              <div className="p-2 rounded-lg bg-brand-itemBg border border-brand-borderSolid">
                <Copy size={16} className="text-brand-accentFormatting" />
              </div>
              <span className="hidden sm:inline">Copy from AI</span>
            </div>
            <div className="w-6 sm:w-8 h-px bg-brand-borderSolid" />
            <div className="flex items-center gap-2 text-brand-textSecondary">
              <div className="p-2 rounded-lg bg-brand-itemBg border border-brand-borderSolid">
                <Zap size={16} className="text-brand-accentCleaned" />
              </div>
              <span className="hidden sm:inline">UnreckAI Processes</span>
            </div>
            <div className="w-6 sm:w-8 h-px bg-brand-borderSolid" />
            <div className="flex items-center gap-2 text-brand-textSecondary">
              <div className="p-2 rounded-lg bg-brand-itemBg border border-brand-borderSolid">
                <ClipboardPaste size={16} className="text-brand-accentDocument" />
              </div>
              <span className="hidden sm:inline">Paste anywhere</span>
            </div>
          </div>

          {/* Source toggle */}
          <div className="flex justify-center">
            <div className="inline-flex bg-brand-cardBg rounded-full p-1 border border-brand-borderSolid flex-wrap justify-center gap-1 sm:gap-0 sm:flex-nowrap">
              {(Object.keys(sourceLabels) as Source[]).map((key) => (
                <button
                  key={key}
                  onClick={() => setSource(key)}
                  className={`px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${
                    source === key
                      ? "bg-brand-itemBg text-brand-textPrimary shadow-sm"
                      : "text-brand-textSecondary hover:text-brand-textPrimary"
                  }`}
                >
                  {sourceLabels[key]}
                </button>
              ))}
            </div>
          </div>

          {/* Side-by-side panels */}
          <div className="grid lg:grid-cols-2 gap-0 rounded-2xl overflow-hidden border border-brand-borderSolid">
            {/* Dirty panel */}
            <div className="bg-[#1a1d21] border-b lg:border-b-0 lg:border-r border-[#3f4347]/50">
              {/* Panel header */}
              <div className="flex items-center justify-between px-3 sm:px-4 py-3 border-b border-[#3f4347]/50">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[12px] sm:text-[13px] text-[#ababad] font-medium">
                    Paste to Slack
                  </span>
                  <span className={`text-[11px] px-2 py-0.5 rounded-full border ${sourceBadgeColors[source]}`}>
                    {source === "chatgpt" ? "ChatGPT" : source === "claude" ? "Claude" : "Gemini"}
                  </span>
                </div>
              </div>
              <SlackToolbar />
              <div className="p-3 sm:p-4 max-h-[360px] sm:max-h-[480px] overflow-y-auto slack-scroll">
                {dirtyPanels[source]}
              </div>
            </div>

            {/* Clean panel */}
            <div className="bg-[#1a1d21]">
              {/* Panel header */}
              <div className="flex items-center justify-between px-3 sm:px-4 py-3 border-b border-[#3f4347]/50">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[12px] sm:text-[13px] text-[#ababad] font-medium">
                    With UnreckAI
                  </span>
                  <span className="text-[11px] px-2 py-0.5 rounded-full border border-brand-accentCleaned/30 text-brand-accentCleaned">
                    UnreckAI
                  </span>
                </div>
              </div>
              <SlackToolbar />
              <div className="p-3 sm:p-4 max-h-[360px] sm:max-h-[480px] overflow-y-auto slack-scroll">
                <CleanPanel />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
