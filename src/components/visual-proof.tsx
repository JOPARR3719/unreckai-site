"use client";

import { useState } from "react";
import { Files, ClipboardCopy } from "lucide-react";
import { ScatterSymbol } from "./scatter-symbol";

type Source = "chatgpt" | "claude" | "gemini";
type Destination = "slack" | "gmail";
type Tier = "free" | "pro";

const sourceNames: Record<Source, string> = {
  chatgpt: "ChatGPT",
  claude: "Claude",
  gemini: "Gemini",
};

const sourceIcons: Record<Source, { src: string; mono: boolean }> = {
  chatgpt: { src: "/images/openai.svg", mono: true },
  claude: { src: "/images/claude-color.svg", mono: false },
  gemini: { src: "/images/gemini-color.svg", mono: false },
};

const sourceBadgeColors: Record<Source, string> = {
  chatgpt: "text-brand-chatgpt border-brand-chatgpt/30",
  claude: "text-brand-claude border-brand-claude/30",
  gemini: "text-brand-gemini border-brand-gemini/30",
};

// Source-specific style configs — explicit class names for Tailwind JIT detection
const sourceStyles = {
  chatgpt: {
    textColor: "text-brand-chatgpt",
    artifactBg: "bg-brand-chatgpt/10",
    artifactBorder: "border-brand-chatgpt/20",
    slopBg: "bg-brand-chatgpt/20 text-brand-chatgpt",
    emDashBg: "bg-brand-chatgpt/20 text-brand-chatgpt",
    bulletBg: "bg-brand-chatgpt/10 text-brand-chatgpt",
  },
  claude: {
    textColor: "text-brand-claude",
    artifactBg: "bg-brand-claude/10",
    artifactBorder: "border-brand-claude/20",
    slopBg: "bg-brand-claude/20 text-brand-claude",
    emDashBg: "bg-brand-claude/20 text-brand-claude",
    bulletBg: "bg-brand-claude/10 text-brand-claude",
  },
  gemini: {
    textColor: "text-brand-gemini",
    artifactBg: "bg-brand-gemini/10",
    artifactBorder: "border-brand-gemini/20",
    slopBg: "bg-brand-gemini/20 text-brand-gemini",
    emDashBg: "bg-brand-gemini/20 text-brand-gemini",
    bulletBg: "bg-brand-gemini/10 text-brand-gemini",
  },
} as const;

/* ─── Slack Components ─── */

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

function ChatGPTDirtySlack() {
  const s = sourceStyles.chatgpt;
  return (
    <div className="text-[13px] leading-relaxed text-[#d1d2d3]">
      <p className="mb-4"><span className={`${s.slopBg} rounded px-1.5 py-0.5 inline-block font-medium`}>Great question!</span></p>

      <p className="mb-4">Here&rsquo;s a comprehensive guide to improving your remote work productivity:</p>

      <p className="font-bold mb-1">Key Strategies for Success</p>
      <div className={`h-5 w-full ${s.artifactBg} border ${s.artifactBorder} rounded flex items-center justify-center`}>
        <span className={`text-[10px] ${s.textColor} uppercase tracking-widest font-semibold`}>Extra Spacing Artifact</span>
      </div>
      <div className="mt-2 space-y-1 mb-4">
        <p><span className={`${s.textColor} font-bold`}>1.</span> Time Blocking <span className={`${s.emDashBg} rounded px-1`}>&mdash;</span> Dedicate specific hours to deep work <span className={`${s.emDashBg} rounded px-1`}>&mdash;</span> it&rsquo;s the most effective way to maintain focus</p>
        <p><span className={`${s.textColor} font-bold`}>2.</span> Environment Design <span className={`${s.emDashBg} rounded px-1`}>&mdash;</span> Create a dedicated workspace that&rsquo;s free from distractions</p>
        <p><span className={`${s.textColor} font-bold`}>3.</span> Communication Tools <span className={`${s.emDashBg} rounded px-1`}>&mdash;</span> Use platforms like [Slack](https://slack.com) and [Notion](https://notion.so) for async collaboration</p>
      </div>

      <p className="font-bold mb-1">Daily Routine Essentials</p>
      <div className={`h-5 w-full ${s.artifactBg} border ${s.artifactBorder} rounded flex items-center justify-center`}>
        <span className={`text-[10px] ${s.textColor} uppercase tracking-widest font-semibold`}>Extra Spacing Artifact</span>
      </div>
      <div className="mt-2 space-y-1 mb-4">
        <p><span className={`${s.bulletBg} font-bold px-1 rounded mr-1`}>&bull; &bull;</span> 🌅 Start with a morning review of yesterday&rsquo;s progress</p>
        <p><span className={`${s.bulletBg} font-bold px-1 rounded mr-1`}>&bull; &bull;</span> 💪 Tackle your hardest task during peak energy hours</p>
        <p><span className={`${s.bulletBg} font-bold px-1 rounded mr-1`}>&bull; &bull;</span> 📝 Document decisions in writing <span className={`${s.emDashBg} rounded px-1`}>&mdash;</span> don&rsquo;t rely on memory</p>
        <p><span className={`${s.bulletBg} font-bold px-1 rounded mr-1`}>&bull; &bull;</span> 🎯 End each day by setting tomorrow&rsquo;s priorities</p>
      </div>

      <p className="mb-4">For more resources, check out Cal Newport&rsquo;s book &ldquo;Deep Work&rdquo; at https://calnewport.com/books/deep-work/</p>

      <p><span className={`${s.slopBg} rounded px-1.5 py-0.5 inline-block font-medium`}>Let me know if you have any questions!</span></p>
    </div>
  );
}

function ClaudeDirtySlack() {
  const s = sourceStyles.claude;
  return (
    <div className="text-[13px] leading-relaxed text-[#d1d2d3]">
      <p className="mb-2"><span className={`${s.slopBg} rounded px-1.5 py-0.5 inline-block font-medium`}>Great question!</span></p>

      <p className="mb-0">Here&rsquo;s a comprehensive guide to improving your remote work productivity:</p>
      <p className="mb-0 mt-3 font-bold">Key Strategies for Success</p>
      <div className="space-y-0">
        <p>1. Time Blocking <span className={`${s.emDashBg} rounded px-1`}>&mdash;</span> Dedicate specific hours to deep work <span className={`${s.emDashBg} rounded px-1`}>&mdash;</span> it&rsquo;s the most effective way to maintain focus</p>
        <p>2. Environment Design <span className={`${s.emDashBg} rounded px-1`}>&mdash;</span> Create a dedicated workspace that&rsquo;s free from distractions</p>
        <p className="mb-0">3. Communication Tools <span className={`${s.emDashBg} rounded px-1`}>&mdash;</span> Use platforms like Slack and Notion for async collaboration</p>
      </div>

      <p className="mb-0 mt-3 font-bold">Daily Routine Essentials</p>
      <div className={`h-5 w-full ${s.artifactBg} border ${s.artifactBorder} rounded flex items-center justify-center mt-1`}>
        <span className={`text-[10px] ${s.textColor} uppercase tracking-widest font-semibold`}>Missing Line Breaks Artifact</span>
      </div>
      <p className="mb-4 mt-1 leading-relaxed">
        <span className={`${s.bulletBg} font-bold px-1 rounded mx-1`}>&bull;</span> 🌅 Start with a morning review of yesterday&rsquo;s progress{" "}
        <span className={`${s.bulletBg} font-bold px-1 rounded mx-1`}>&bull;</span> 💪 Tackle your hardest task during peak energy hours{" "}
        <span className={`${s.bulletBg} font-bold px-1 rounded mx-1`}>&bull;</span> 📝 Document decisions in writing <span className={`${s.emDashBg} rounded px-1`}>&mdash;</span> don&rsquo;t rely on memory{" "}
        <span className={`${s.bulletBg} font-bold px-1 rounded mx-1`}>&bull;</span> 🎯 End each day by setting tomorrow&rsquo;s priorities
      </p>

      <p className="mb-0 mt-3">For more resources, check out Cal Newport&rsquo;s book &ldquo;Deep Work&rdquo; at https://calnewport.com/books/deep-work/</p>
      <p className="mt-3"><span className={`${s.slopBg} rounded px-1.5 py-0.5 inline-block font-medium`}>Let me know if you have any questions!</span></p>
    </div>
  );
}

function GeminiDirtySlack() {
  const s = sourceStyles.gemini;
  return (
    <div className="text-[13px] leading-relaxed text-[#d1d2d3]">
      <p className="mb-4"><span className={`${s.slopBg} rounded px-1.5 py-0.5 inline-block font-medium`}>Great question!</span></p>

      <p className="mb-2">Here&rsquo;s a comprehensive guide to improving your remote work productivity:</p>

      <div className={`h-5 w-full ${s.artifactBg} border ${s.artifactBorder} rounded flex items-center justify-center`}>
        <span className={`text-[10px] ${s.textColor} uppercase tracking-widest font-semibold`}>Missing Bold Heading Artifact</span>
      </div>
      <p className="mb-1 mt-1">Key Strategies for Success</p>

      <div className={`h-5 w-full ${s.artifactBg} border ${s.artifactBorder} rounded flex items-center justify-center`}>
        <span className={`text-[10px] ${s.textColor} uppercase tracking-widest font-semibold`}>Missing Numbered List Artifact</span>
      </div>
      <div className="mt-1 space-y-1 mb-4">
        <p>Time Blocking <span className={`${s.emDashBg} rounded px-1`}>&mdash;</span> Dedicate specific hours to deep work <span className={`${s.emDashBg} rounded px-1`}>&mdash;</span> it&rsquo;s the most effective way to maintain focus</p>
        <p>Environment Design <span className={`${s.emDashBg} rounded px-1`}>&mdash;</span> Create a dedicated workspace that&rsquo;s free from distractions</p>
        <p>Communication Tools <span className={`${s.emDashBg} rounded px-1`}>&mdash;</span> Use platforms like Slack and Notion for async collaboration</p>
      </div>

      <div className={`h-5 w-full ${s.artifactBg} border ${s.artifactBorder} rounded flex items-center justify-center`}>
        <span className={`text-[10px] ${s.textColor} uppercase tracking-widest font-semibold`}>Missing Bold Heading Artifact</span>
      </div>
      <p className="mb-1 mt-1">Daily Routine Essentials</p>

      <div className={`h-5 w-full ${s.artifactBg} border ${s.artifactBorder} rounded flex items-center justify-center`}>
        <span className={`text-[10px] ${s.textColor} uppercase tracking-widest font-semibold`}>Broken Bullet Artifact</span>
      </div>
      <div className="mt-1 space-y-1 mb-4">
        <p><span className={`${s.bulletBg} font-bold px-1 rounded mr-1`}>&bull;</span> 🌅 Start with a morning review of yesterday&rsquo;s progress</p>
        <p><span className={`${s.bulletBg} font-bold px-1 rounded mr-1`}>&bull;</span> 💪 Tackle your hardest task during peak energy hours</p>
        <p><span className={`${s.bulletBg} font-bold px-1 rounded mr-1`}>&bull;</span> 📝 Document decisions in writing <span className={`${s.emDashBg} rounded px-1`}>&mdash;</span> don&rsquo;t rely on memory</p>
        <p><span className={`${s.bulletBg} font-bold px-1 rounded mr-1`}>&bull;</span> 🎯 End each day by setting tomorrow&rsquo;s priorities</p>
      </div>

      <p className="mb-4 mt-3">For more resources, check out Cal Newport&rsquo;s book &ldquo;Deep Work&rdquo; at https://calnewport.com/books/deep-work/</p>
      <p><span className={`${s.slopBg} rounded px-1.5 py-0.5 inline-block font-medium`}>Let me know if you have any questions!</span></p>
    </div>
  );
}

function FreeCleanSlack() {
  return (
    <div className="text-[13px] leading-relaxed text-[#d1d2d3]">
      <p className="mb-4">Here&rsquo;s a comprehensive guide to improving your remote work productivity:</p>

      <p className="mb-1">Key Strategies for Success</p>
      <div className="space-y-1 mb-4">
        <p>1. Time Blocking &mdash; Dedicate specific hours to deep work &mdash; it&rsquo;s the most effective way to maintain focus</p>
        <p>2. Environment Design &mdash; Create a dedicated workspace that&rsquo;s free from distractions</p>
        <p>3. Communication Tools &mdash; Use platforms like Slack (https://slack.com) and Notion (https://notion.so) for async collaboration</p>
      </div>

      <p className="mb-1">Daily Routine Essentials</p>
      <div className="space-y-1 mb-4">
        <p>&bull; 🌅 Start with a morning review of yesterday&rsquo;s progress</p>
        <p>&bull; 💪 Tackle your hardest task during peak energy hours</p>
        <p>&bull; 📝 Document decisions in writing &mdash; don&rsquo;t rely on memory</p>
        <p>&bull; 🎯 End each day by setting tomorrow&rsquo;s priorities</p>
      </div>

      <p>For more resources, check out Cal Newport&rsquo;s book &ldquo;Deep Work&rdquo; at https://calnewport.com/books/deep-work/</p>
    </div>
  );
}

function ProCleanSlack() {
  return (
    <div className="text-[14px] leading-relaxed text-[#d1d2d3]">
      <p className="mb-4">Here&rsquo;s a comprehensive guide to improving your remote work productivity:</p>

      <p className="font-bold mb-2">Key Strategies for Success</p>
      <ol className="list-decimal pl-5 mb-5 space-y-1">
        <li>Time Blocking. Dedicate specific hours to deep work. It&rsquo;s the most effective way to maintain focus</li>
        <li>Environment Design. Create a dedicated workspace that&rsquo;s free from distractions</li>
        <li>Communication Tools. Use platforms like <a href="#" className="text-[#1d9bd1] hover:underline">Slack</a> and <a href="#" className="text-[#1d9bd1] hover:underline">Notion</a> for async collaboration</li>
      </ol>

      <p className="font-bold mb-2">Daily Routine Essentials</p>
      <ul className="list-disc pl-5 mb-5 space-y-1">
        <li>🌅 Start with a morning review of yesterday&rsquo;s progress</li>
        <li>💪 Tackle your hardest task during peak energy hours</li>
        <li>📝 Document decisions in writing. Don&rsquo;t rely on memory</li>
        <li>🎯 End each day by setting tomorrow&rsquo;s priorities</li>
      </ul>

      <p className="mb-4">For more resources, check out Cal Newport&rsquo;s book &ldquo;Deep Work&rdquo; at <a href="#" className="text-[#1d9bd1] hover:underline">https://calnewport.com/books/deep-work/</a></p>
    </div>
  );
}

/* ─── Gmail Components ─── */

function GmailComposeChrome({ children, large }: { children: React.ReactNode; large?: boolean }) {
  return (
    <div className="p-3 sm:p-4 flex-1 bg-[#1a1d21] flex flex-col">
      <div className="flex-1 border border-[#3f4347] rounded-xl bg-[#0b0b0b] flex flex-col overflow-hidden">
        {/* Compose header */}
        <div className="bg-[#1f1f1f] px-4 py-2 flex justify-between items-center border-b border-[#3f4347]">
          <span className="text-sm font-medium text-[#e8eaed]">New Message</span>
          <div className="flex gap-3 text-[#9aa0a6]">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" /></svg>
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" /></svg>
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </div>
        </div>
        {/* To */}
        <div className="px-4 py-2.5 border-b border-[#3f4347] flex">
          <span className="text-[#9aa0a6] w-12 text-sm">To</span>
          <span className="text-[#e8eaed] text-sm">client@example.com</span>
        </div>
        {/* Subject */}
        <div className="px-4 py-2.5 border-b border-[#3f4347] flex">
          <span className="text-[#e8eaed] text-sm font-medium">Q3 Marketing Campaign Update</span>
        </div>
        {/* Content */}
        <div className={`p-4 ${large ? "text-[14px]" : "text-[13px]"} text-[#e8eaed] leading-relaxed flex-1`}>
          {children}
        </div>
        {/* Footer */}
        <div className="px-4 py-3 border-t border-[#3f4347] flex items-center bg-[#0b0b0b]">
          <button className="bg-[#8ab4f8] text-[#202124] px-5 py-1.5 rounded-full font-medium text-sm">Send</button>
          <div className="ml-4 flex gap-4 text-[#9aa0a6]">
            <span className="font-serif font-bold text-lg leading-none">A</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" /></svg>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function ChatGPTDirtyGmail() {
  const s = sourceStyles.chatgpt;
  return (
    <>
      <p className="mb-4"><span className={`${s.slopBg} rounded px-1.5 py-0.5 inline-block font-medium`}>Certainly! Here is a draft you can send to the client:</span></p>

      <p className="mb-4">Hi Sarah,</p>
      <p className="mb-4">I wanted to share a quick update on the Q3 Marketing Campaign before our sync tomorrow.</p>

      <p className="font-bold mb-1">Key Deliverables Status</p>
      <div className={`h-5 w-full ${s.artifactBg} border ${s.artifactBorder} rounded mb-2 flex items-center justify-center`}>
        <span className={`text-[10px] ${s.textColor} uppercase tracking-widest font-semibold`}>Extra Spacing Artifact</span>
      </div>
      <div className="space-y-1 mb-4">
        <p><span className={`${s.textColor} font-bold`}>1.</span> Social Media Assets <span className={`${s.emDashBg} rounded px-1`}>&mdash;</span> All graphics are approved and ready for launch</p>
        <p><span className={`${s.textColor} font-bold`}>2.</span> Email Sequences <span className={`${s.emDashBg} rounded px-1`}>&mdash;</span> Copywriting is 90% complete; pending final review</p>
        <p><span className={`${s.textColor} font-bold`}>3.</span> Landing Pages <span className={`${s.emDashBg} rounded px-1`}>&mdash;</span> Staging links are available at [Campaign Staging](https://staging.example.com)</p>
      </div>

      <p className="font-bold mb-1">Next Steps for Tomorrow</p>
      <div className={`h-5 w-full ${s.artifactBg} border ${s.artifactBorder} rounded mb-2 flex items-center justify-center`}>
        <span className={`text-[10px] ${s.textColor} uppercase tracking-widest font-semibold`}>Extra Spacing Artifact</span>
      </div>
      <p className="mb-1"><span className={`${s.bulletBg} font-bold px-1 rounded mr-1`}>&bull; &bull;</span> Review the updated budget allocations</p>
      <p className="mb-1"><span className={`${s.bulletBg} font-bold px-1 rounded mr-1`}>&bull; &bull;</span> Finalize the target audience segments</p>
      <p className="mb-4"><span className={`${s.bulletBg} font-bold px-1 rounded mr-1`}>&bull; &bull;</span> Sign off on the A/B testing strategy</p>

      <p className="mb-4">Looking forward to our chat!</p>
      <p className="mb-4">Best,<br />[Your Name]</p>

      <p><span className={`${s.slopBg} rounded px-1.5 py-0.5 inline-block font-medium`}>Let me know if you need any adjustments!</span></p>
    </>
  );
}

function ClaudeDirtyGmail() {
  const s = sourceStyles.claude;
  return (
    <>
      <p className="mb-2"><span className={`${s.slopBg} rounded px-1.5 py-0.5 inline-block font-medium`}>Here is the email draft for your client:</span></p>

      <p className="mb-0">Hi Sarah,</p>
      <p className="mb-0 mt-3">I wanted to share a quick update on the Q3 Marketing Campaign before our sync tomorrow.</p>
      <p className="mb-0 mt-3 font-bold">Key Deliverables Status</p>
      <p className="mb-0">1. Social Media Assets <span className={`${s.emDashBg} rounded px-1`}>&mdash;</span> All graphics are approved and ready for launch</p>
      <p className="mb-0">2. Email Sequences <span className={`${s.emDashBg} rounded px-1`}>&mdash;</span> Copywriting is 90% complete; pending final review</p>
      <p className="mb-0">3. Landing Pages <span className={`${s.emDashBg} rounded px-1`}>&mdash;</span> Staging links are available at [Campaign Staging](https://staging.example.com)</p>

      <p className="mb-0 mt-3 font-bold">Next Steps for Tomorrow</p>
      <div className={`h-5 w-full ${s.artifactBg} border ${s.artifactBorder} rounded mb-1 mt-1 flex items-center justify-center`}>
        <span className={`text-[10px] ${s.textColor} uppercase tracking-widest font-semibold`}>Missing Line Breaks Artifact</span>
      </div>
      <p className="mb-4 leading-relaxed">
        <span className={`${s.bulletBg} font-bold px-1 rounded mr-1`}>&bull;</span> Review the updated budget allocations{" "}
        <span className={`${s.bulletBg} font-bold px-1 rounded mx-1`}>&bull;</span> Finalize the target audience segments{" "}
        <span className={`${s.bulletBg} font-bold px-1 rounded mx-1`}>&bull;</span> Sign off on the A/B testing strategy
      </p>

      <p className="mb-0">Looking forward to our chat!</p>
      <p className="mb-0 mt-3">Best,<br />[Your Name]</p>

      <p className="mt-3"><span className={`${s.slopBg} rounded px-1.5 py-0.5 inline-block font-medium`}>I hope this helps!</span></p>
    </>
  );
}

function GeminiDirtyGmail() {
  const s = sourceStyles.gemini;
  return (
    <>
      <p className="mb-4"><span className={`${s.slopBg} rounded px-1.5 py-0.5 inline-block font-medium`}>Sure, here&rsquo;s a draft:</span></p>

      <p className="mb-4">Hi Sarah,</p>
      <p className="mb-2">I wanted to share a quick update on the Q3 Marketing Campaign before our sync tomorrow.</p>

      <div className={`h-5 w-full ${s.artifactBg} border ${s.artifactBorder} rounded mb-1 mt-1 flex items-center justify-center`}>
        <span className={`text-[10px] ${s.textColor} uppercase tracking-widest font-semibold`}>Missing Bold Heading Artifact</span>
      </div>
      <p className="mb-1">Key Deliverables Status</p>

      <div className={`h-5 w-full ${s.artifactBg} border ${s.artifactBorder} rounded mb-1 mt-1 flex items-center justify-center`}>
        <span className={`text-[10px] ${s.textColor} uppercase tracking-widest font-semibold`}>Missing Numbered List Artifact</span>
      </div>
      <p className="mb-1">Social Media Assets <span className={`${s.emDashBg} rounded px-1`}>&mdash;</span> All graphics are approved and ready for launch</p>
      <p className="mb-1">Email Sequences <span className={`${s.emDashBg} rounded px-1`}>&mdash;</span> Copywriting is 90% complete; pending final review</p>
      <p className="mb-4">Landing Pages <span className={`${s.emDashBg} rounded px-1`}>&mdash;</span> Staging links are available at Slack and Notion</p>

      <div className={`h-5 w-full ${s.artifactBg} border ${s.artifactBorder} rounded mb-1 mt-1 flex items-center justify-center`}>
        <span className={`text-[10px] ${s.textColor} uppercase tracking-widest font-semibold`}>Missing Bold Heading Artifact</span>
      </div>
      <p className="mb-1">Next Steps for Tomorrow</p>

      <div className={`h-5 w-full ${s.artifactBg} border ${s.artifactBorder} rounded mb-1 mt-1 flex items-center justify-center`}>
        <span className={`text-[10px] ${s.textColor} uppercase tracking-widest font-semibold`}>Broken Bullet Artifact</span>
      </div>
      <p className="mb-1"><span className={`${s.bulletBg} font-bold px-1 rounded mr-1`}>&bull;</span> Review the updated budget allocations</p>
      <p className="mb-1"><span className={`${s.bulletBg} font-bold px-1 rounded mr-1`}>&bull;</span> Finalize the target audience segments</p>
      <p className="mb-4"><span className={`${s.bulletBg} font-bold px-1 rounded mr-1`}>&bull;</span> Sign off on the A/B testing strategy</p>

      <p className="mb-4 mt-3">Looking forward to our chat!</p>
      <p className="mb-4">Best,<br />[Your Name]</p>
      <p><span className={`${s.slopBg} rounded px-1.5 py-0.5 inline-block font-medium`}>Let me know if you have any questions!</span></p>
    </>
  );
}

function FreeCleanGmail() {
  return (
    <>
      <p className="mb-4">Hi Sarah,</p>
      <p className="mb-4">I wanted to share a quick update on the Q3 Marketing Campaign before our sync tomorrow.</p>

      <p className="mb-1">Key Deliverables Status</p>
      <div className="space-y-1 mb-4">
        <p>1. Social Media Assets &mdash; All graphics are approved and ready for launch</p>
        <p>2. Email Sequences &mdash; Copywriting is 90% complete; pending final review</p>
        <p>3. Landing Pages &mdash; Staging links are available at Campaign Staging (https://staging.example.com)</p>
      </div>

      <p className="mb-1">Next Steps for Tomorrow</p>
      <div className="space-y-1 mb-4">
        <p>&bull; Review the updated budget allocations</p>
        <p>&bull; Finalize the target audience segments</p>
        <p>&bull; Sign off on the A/B testing strategy</p>
      </div>

      <p className="mb-4">Looking forward to our chat!</p>
      <p>Best,<br />[Your Name]</p>
    </>
  );
}

function ProCleanGmail() {
  return (
    <>
      <p className="mb-4">Hi Sarah,</p>
      <p className="mb-4">I wanted to share a quick update on the Q3 Marketing Campaign before our sync tomorrow.</p>

      <p className="font-bold mb-2">Key Deliverables Status</p>
      <ol className="list-decimal pl-5 mb-5 space-y-1">
        <li>Social Media Assets: All graphics are approved and ready for launch</li>
        <li>Email Sequences: Copywriting is 90% complete; pending final review</li>
        <li>Landing Pages: Staging links are available at <a href="#" className="text-[#8ab4f8] hover:underline">Campaign Staging</a></li>
      </ol>

      <p className="font-bold mb-2">Next Steps for Tomorrow</p>
      <ul className="list-disc pl-5 mb-5 space-y-1">
        <li>Review the updated budget allocations</li>
        <li>Finalize the target audience segments</li>
        <li>Sign off on the A/B testing strategy</li>
      </ul>

      <p className="mb-4">Looking forward to our chat!</p>
      <p>Best,<br />[Your Name]</p>
    </>
  );
}

/* ─── Main Component ─── */

export function VisualProof() {
  const [source, setSource] = useState<Source>("chatgpt");
  const [dest, setDest] = useState<Destination>("slack");
  const [tier, setTier] = useState<Tier>("pro");

  const destName = dest === "slack" ? "Slack" : "Gmail";

  const slackDirtyPanels: Record<Source, React.ReactNode> = {
    chatgpt: <ChatGPTDirtySlack />,
    claude: <ClaudeDirtySlack />,
    gemini: <GeminiDirtySlack />,
  };

  const gmailDirtyPanels: Record<Source, React.ReactNode> = {
    chatgpt: <ChatGPTDirtyGmail />,
    claude: <ClaudeDirtyGmail />,
    gemini: <GeminiDirtyGmail />,
  };

  return (
    <section id="visual-proof" className="py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="glow-card">
        <div className="glow-card-inner dot-tr pt-5 sm:pt-7 md:pt-9 px-6 sm:px-10 md:px-12 pb-6 sm:pb-10 md:pb-12">
        <div className="space-y-8 sm:space-y-12">
          {/* Header */}
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <p className="text-xs font-semibold tracking-widest uppercase text-brand-accentDocument">
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
          <div className="grid grid-cols-[1fr_auto_auto_auto_1fr] items-center gap-0 text-sm max-w-3xl mx-auto w-full">
            <div className="flex items-center gap-2.5 text-brand-textSecondary justify-self-end">
              <div className="p-2.5 rounded-lg bg-brand-itemBg border border-white/[0.06]">
                <Files size={20} className="text-brand-accentFormatting" />
              </div>
              <span className="hidden sm:inline whitespace-nowrap">Copy from AI</span>
            </div>
            <div className="w-12 sm:w-20 md:w-28 h-px bg-brand-border mx-3 sm:mx-4" />
            <div className="flex items-center gap-2.5 text-brand-textSecondary">
              <div className="p-2.5 rounded-lg bg-brand-itemBg border border-white/[0.06]">
                <ScatterSymbol size={20} />
              </div>
              <span className="hidden sm:inline whitespace-nowrap">UnreckAI Processes</span>
            </div>
            <div className="w-12 sm:w-20 md:w-28 h-px bg-brand-border mx-3 sm:mx-4" />
            <div className="flex items-center gap-2.5 text-brand-textSecondary justify-self-start">
              <div className="p-2.5 rounded-lg bg-brand-itemBg border border-white/[0.06]">
                <ClipboardCopy size={20} className="text-brand-accentCleaned" />
              </div>
              <span className="hidden sm:inline whitespace-nowrap">Paste anywhere</span>
            </div>
          </div>

          {/* Destination + Source toggles */}
          <div className="relative w-full flex flex-col items-center gap-3">
            {/* Destination toggle — pinned left on desktop */}
            <div className="sm:absolute sm:left-0 sm:top-1/2 sm:-translate-y-1/2 inline-flex bg-brand-cardBg rounded-full p-1.5 border border-white/[0.06] gap-2.5">
              {(["slack", "gmail"] as Destination[]).map((d) => (
                <button
                  key={d}
                  onClick={() => setDest(d)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                    dest === d
                      ? "text-white shadow-sm glow-border-active"
                      : "text-white/80 hover:text-white border border-white/[0.12]"
                  }`}
                >
                  <img
                    src={d === "slack" ? "/images/slack.png" : "/images/google-color.svg"}
                    alt=""
                    className="w-4 h-4 shrink-0 object-contain"
                  />
                  {d === "slack" ? "Slack" : "Gmail"}
                </button>
              ))}
            </div>

            {/* Source toggle — true center */}
            <div className="inline-flex bg-brand-cardBg rounded-full p-1.5 border border-white/[0.06] gap-2.5 flex-wrap justify-center sm:flex-nowrap">
              {(Object.keys(sourceNames) as Source[]).map((key) => (
                <button
                  key={key}
                  onClick={() => setSource(key)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                    source === key
                      ? "text-white shadow-sm glow-border-active"
                      : "text-white/80 hover:text-white border border-white/[0.12]"
                  }`}
                >
                  <img src={sourceIcons[key].src} alt="" className={`w-4 h-4 shrink-0 object-contain ${sourceIcons[key].mono ? "brightness-0 invert" : ""}`} />
                  {sourceNames[key]} to {destName}
                </button>
              ))}
            </div>
          </div>

          {/* Side-by-side panels */}
          <div className="grid lg:grid-cols-2 gap-4 sm:gap-6">
            {/* Dirty panel */}
            <div className="bg-[#1a1d21] rounded-2xl overflow-hidden border border-brand-borderSolid">
              {/* Panel header */}
              <div className="flex items-center justify-between px-3 sm:px-4 py-3 border-b border-[#3f4347]/50">
                <div className="flex items-center gap-2 flex-wrap">
                  <div className={`w-2 h-2 rounded-full ${source === "chatgpt" ? "bg-brand-chatgpt" : source === "claude" ? "bg-brand-claude" : "bg-brand-gemini"} transition-colors`} />
                  <span className="text-[12px] sm:text-[13px] text-[#ababad] font-medium">
                    Paste to {destName}
                  </span>
                  <span className={`flex items-center gap-2.5 text-[11px] px-2 py-0.5 rounded-full border ${sourceBadgeColors[source]} transition-colors`}>
                    <img src={sourceIcons[source].src} alt="" className={`w-3.5 h-3.5 shrink-0 object-contain ${sourceIcons[source].mono ? "brightness-0 invert" : ""}`} />
                    {sourceNames[source]}
                  </span>
                </div>
              </div>
              {dest === "slack" ? (
                <>
                  <SlackToolbar />
                  <div className="p-3 sm:p-4">
                    {slackDirtyPanels[source]}
                  </div>
                </>
              ) : (
                <GmailComposeChrome>
                  {gmailDirtyPanels[source]}
                </GmailComposeChrome>
              )}
            </div>

            {/* Clean panel — gradient border */}
            <div className="rounded-2xl p-[1.5px] h-fit" style={{ background: "linear-gradient(135deg, rgba(59, 232, 176, 0.5), rgba(155, 143, 255, 0.5))" }}>
            <div className="bg-[#1a1d21] rounded-[calc(1rem-1.5px)] overflow-hidden relative h-full">
              <div className="absolute inset-0 bg-brand-accentCleaned/[0.03] pointer-events-none" />
              {/* Panel header */}
              <div className="flex items-center justify-between px-3 sm:px-4 py-3 border-b border-[#3f4347]/50 relative z-10">
                <div className="flex items-center gap-2 flex-wrap">
                  <div className="w-2 h-2 rounded-full bg-brand-accentCleaned" />
                  <span className="text-[12px] sm:text-[13px] text-brand-textPrimary font-medium">
                    Paste to {destName}
                  </span>
                  <span className="text-[11px] px-2 py-0.5 rounded-full border border-brand-accentCleaned/30 text-brand-accentCleaned">
                    UnreckAI
                  </span>
                </div>
                {/* Free / Pro toggle */}
                <div className="flex bg-[#222529] rounded-full p-0.5 border border-[#3f4347] relative z-10">
                  <button
                    onClick={() => setTier("free")}
                    className={`px-2.5 py-1 rounded-full text-[11px] font-medium transition-all ${
                      tier === "free"
                        ? "bg-brand-itemBg text-brand-textPrimary shadow-sm"
                        : "text-brand-textSecondary hover:text-brand-textPrimary"
                    }`}
                  >
                    Free
                  </button>
                  <button
                    onClick={() => setTier("pro")}
                    className={`px-2.5 py-1 rounded-full text-[11px] font-medium transition-all ${
                      tier === "pro"
                        ? "bg-brand-accentCleaned/15 text-brand-accentCleaned shadow-sm"
                        : "text-brand-textSecondary hover:text-brand-textPrimary"
                    }`}
                  >
                    Pro
                  </button>
                </div>
              </div>
              {dest === "slack" ? (
                <>
                  <SlackToolbar />
                  <div className="p-3 sm:p-4 relative z-10">
                    {tier === "pro" ? <ProCleanSlack /> : <FreeCleanSlack />}
                  </div>
                </>
              ) : (
                <div className="relative z-10">
                  <GmailComposeChrome large={tier === "pro"}>
                    {tier === "pro" ? <ProCleanGmail /> : <FreeCleanGmail />}
                  </GmailComposeChrome>
                </div>
              )}
            </div>
            </div>
          </div>
        </div>
        </div>
        </div>
      </div>
    </section>
  );
}
