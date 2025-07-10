import React from "react";
import QuickLinks from "./QuickLinks";
import ExploreFeatures from "./ExploreFeatures";
import Updates from "./Updates";
import Resources from "./Resources";
import Checklist from "./Checklist";
import { isMobile } from "react-device-detect";

export default function Home() {
  return (
    // Outermost container for the Home component.
    // Ensure this div correctly fits within its parent (which is presumably next to the sidebar).
    // The `overflow-x-hidden` here is a crucial safeguard.
    <div
      style={{ height: isMobile ? "100%" : "calc(100% - 32px)" }}
      className="relative w-full h-full flex flex-col overflow-x-hidden md:mr-[8px] md:my-[16px] md:rounded-[16px] bg-theme-bg-container"
    >
      {/* This inner div ensures that the main content area (header + main) adapts correctly. */}
      {/* We are simplifying it a bit, removing items-center here as the inner wrappers handle centering. */}
      <div className="w-full min-h-screen flex flex-col">

        {/* Header Section */}
        <header className="sticky top-0 z-20 bg-theme-bg-container/95 backdrop-blur shadow-md w-full py-4 mb-8">
          {/* Inner div to control header content width and centering */}
          <div className="max-w-screen-xl mx-auto w-full px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-blue-400 mb-2">Document Center</h2>
            <p className="text-base sm:text-lg text-center text-theme-text-secondary">Upload and manage your documents with ease. Our intelligent system helps you organize and process your files efficiently.</p>
          </div>
        </header>

        {/* Main Content Area - flex-grow ensures it takes available vertical space */}
        <main className="w-full flex-grow flex flex-col gap-y-8 pb-8">
          {/* Main content wrapper for consistent max-width, centering, and internal padding. */}
          {/* This is the key div for all your main content blocks to sit within. */}
          <div className="max-w-screen-xl mx-auto w-full px-4 sm:px-6 lg:px-8">

            {/* Upload Documents Section */}
            <section className="w-full mb-8">
              <div className="w-full bg-white/60 rounded-2xl border border-theme-border/40 p-6 sm:p-10 flex flex-col items-center justify-center shadow-md">
                <div className="w-full max-w-md mx-auto flex flex-col items-center justify-center text-center">
                  <span className="text-6xl mb-4">⬆️</span>
                  <h3 className="text-xl sm:text-2xl font-semibold mb-2">Upload Documents</h3>
                  <p className="text-base sm:text-lg text-theme-text-secondary mb-4">Drag and drop files here, or click to browse your computer</p>
                  <div className="flex gap-x-3 text-sm sm:text-base justify-center font-medium">
                    <span className="text-green-600">● PDF</span>
                    <span className="text-blue-600">● DOC</span>
                    <span className="text-gray-600">● TXT</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Other components that should align with the main content block */}
            {/* These components MUST ensure their internal content respects the 'w-full' of their parent. */}
            <Checklist />
            <QuickLinks />
            <ExploreFeatures />
            <Updates />
            <Resources />
          </div>
        </main>
      </div>
    </div>
  );
}