"use client";

import { useState, useCallback } from "react";
import { ClipboardHeader } from "./clipboard-header";
import { ClipboardTabs, type ClipboardTabId } from "./clipboard-tabs";
import { ClipboardContent } from "./clipboard-content";
import { ClipboardExcluded } from "./clipboard-excluded";
import { ClipboardSettings } from "./clipboard-settings";
import { ClipboardFooter } from "./clipboard-footer";

export function InteractiveClipboard() {
  // Tab state
  const [activeTab, setActiveTab] = useState<ClipboardTabId>("clipboard");

  // Clipboard tab drill state
  const [clipboardView, setClipboardView] = useState<"overview" | "drill">("overview");
  const [clipboardDrillCat, setClipboardDrillCat] = useState<string | null>(null);
  const [compareType, setCompareType] = useState<string | null>(null);
  const [previewIndex, setPreviewIndex] = useState(0);

  // Excluded tab drill state
  const [excludedView, setExcludedView] = useState<"overview" | "drill">("overview");
  const [excludedDrillSection, setExcludedDrillSection] = useState<string | null>(null);

  // Settings tab drill state
  const [settingsView, setSettingsView] = useState<"overview" | "drill">("overview");
  const [settingsDrillSection, setSettingsDrillSection] = useState<string | null>(null);

  // Tab switching resets drill state for the tab being left
  const handleTabChange = useCallback((tab: ClipboardTabId) => {
    // Reset current tab state
    if (activeTab === "clipboard") {
      setClipboardView("overview");
      setClipboardDrillCat(null);
      setCompareType(null);
      setPreviewIndex(0);
    } else if (activeTab === "excluded") {
      setExcludedView("overview");
      setExcludedDrillSection(null);
    } else if (activeTab === "settings") {
      setSettingsView("overview");
      setSettingsDrillSection(null);
    }
    setActiveTab(tab);
  }, [activeTab]);

  // Clipboard handlers
  const handleClipboardDrill = useCallback((categoryId: string) => {
    setClipboardDrillCat(categoryId);
    setClipboardView("drill");
    setCompareType(null);
    setPreviewIndex(0);
  }, []);

  const handleClipboardBack = useCallback(() => {
    setClipboardView("overview");
    setClipboardDrillCat(null);
    setCompareType(null);
    setPreviewIndex(0);
  }, []);

  const handleToggleCompare = useCallback((type: string) => {
    setCompareType((prev) => {
      if (prev === type) return null;
      setPreviewIndex(0);
      return type;
    });
  }, []);

  // Excluded handlers
  const handleExcludedDrill = useCallback((sectionId: string) => {
    setExcludedDrillSection(sectionId);
    setExcludedView("drill");
  }, []);

  const handleExcludedBack = useCallback(() => {
    setExcludedView("overview");
    setExcludedDrillSection(null);
  }, []);

  // Settings handlers
  const handleSettingsDrill = useCallback((sectionId: string) => {
    setSettingsDrillSection(sectionId);
    setSettingsView("drill");
  }, []);

  const handleSettingsBack = useCallback(() => {
    setSettingsView("overview");
    setSettingsDrillSection(null);
  }, []);

  return (
    <div
      className="w-[360px] max-w-full rounded-2xl p-[0.7px]"
      style={{
        background:
          "linear-gradient(135deg, rgba(59, 232, 176, 0.3), rgba(155, 143, 255, 0.3))",
      }}
    >
    <div
      className="rounded-[calc(1rem-0.7px)] overflow-hidden"
      style={{
        backgroundColor: "var(--color-brand-panelBg)",
        boxShadow:
          "0 25px 60px -12px rgba(0, 0, 0, 0.6), 0 0 40px rgba(59, 232, 176, 0.04), 0 0 80px rgba(155, 143, 255, 0.03)",
      }}
    >
      <ClipboardHeader />
      <ClipboardTabs activeTab={activeTab} onTabChange={handleTabChange} />

      {/* Scrollable content */}
      <div
        className="overflow-y-auto overflow-x-hidden slack-scroll pt-4"
        style={{ minHeight: 280, maxHeight: 480 }}
      >
        {activeTab === "clipboard" && (
          <ClipboardContent
            view={clipboardView}
            drillCategoryId={clipboardDrillCat}
            compareType={compareType}
            previewIndex={previewIndex}
            onDrill={handleClipboardDrill}
            onBack={handleClipboardBack}
            onToggleCompare={handleToggleCompare}
            onSetPreviewIndex={setPreviewIndex}
          />
        )}
        {activeTab === "excluded" && (
          <ClipboardExcluded
            view={excludedView}
            drillSectionId={excludedDrillSection}
            onDrill={handleExcludedDrill}
            onBack={handleExcludedBack}
          />
        )}
        {activeTab === "settings" && (
          <ClipboardSettings
            view={settingsView}
            drillSectionId={settingsDrillSection}
            onDrill={handleSettingsDrill}
            onBack={handleSettingsBack}
          />
        )}
      </div>

      <ClipboardFooter />
    </div>
    </div>
  );
}
