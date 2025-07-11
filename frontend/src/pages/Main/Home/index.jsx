import React from "react";
import HomePanel from "@/components/HomePanel";
import QuickLinks from "./QuickLinks";
import ExploreFeatures from "./ExploreFeatures";
import Updates from "./Updates";
import Resources from "./Resources";
import Checklist from "./Checklist";
import { isMobile } from "react-device-detect";

function Billing() {
  return (
    <section className="w-full mb-8">
      <div className="w-full bg-white/60 rounded-2xl border border-theme-border/40 p-6 sm:p-10 flex flex-col items-center justify-center shadow-md">
        <h3 className="text-xl sm:text-2xl font-semibold mb-2">Billing</h3>
        <p className="text-base sm:text-lg text-theme-text-secondary mb-4">Manage your subscription, view invoices, and update payment methods here.</p>
        {/* Add your billing management UI here */}
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <div className="w-full min-h-screen flex flex-col">
      {/* Scrollable content area */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden">
        <div className="w-full flex flex-col">
          {/* Render HomePanel at the top */}
          <HomePanel />
          {/* Header Section - Fixed at top */}
          <header className="sticky top-0 z-20 bg-theme-bg-container/95 backdrop-blur shadow-md w-full py-4 mb-8">
            <div className="max-w-screen-xl mx-auto w-full px-4 sm:px-6 lg:px-8">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-blue-400 mb-2">
                Document Center
              </h2>
              <p className="text-base sm:text-lg text-center text-theme-text-secondary">
                Upload and manage your documents with ease. Our intelligent system helps you organize and process your files efficiently.
              </p>
            </div>
          </header>

          {/* Main Content Area - Centered and responsive */}
          <main className="w-full pb-8">
            <div className="max-w-screen-xl mx-auto w-full px-4 sm:px-6 lg:px-8">
              {/* Upload Documents Section */}
              <section className="w-full mb-8">
                <div className="w-full bg-white/60 rounded-2xl border border-theme-border/40 p-6 sm:p-10 flex flex-col items-center justify-center shadow-md">
                  <div className="w-full max-w-md mx-auto flex flex-col items-center justify-center text-center">
                    <span className="text-6xl mb-4">⬆️</span>
                    <h3 className="text-xl sm:text-2xl font-semibold mb-2">Upload Documents</h3>
                    <p className="text-base sm:text-lg text-theme-text-secondary mb-4">
                      Drag and drop files here, or click to browse your computer
                    </p>
                    <div className="flex gap-x-3 text-sm sm:text-base justify-center font-medium">
                      <span className="text-green-600">● PDF</span>
                      <span className="text-blue-600">● DOC</span>
                      <span className="text-gray-600">● TXT</span>
                    </div>
                  </div>
                </div>
              </section>
              {/* Other components with proper spacing */}
              <div className="space-y-8">
                <Checklist />
                <QuickLinks />
                <ExploreFeatures />
                <Updates />
                <Resources />
                <Billing />
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}