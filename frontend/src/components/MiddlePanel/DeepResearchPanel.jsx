import React, { useState } from "react";
import { Microscope, MagnifyingGlass, FileText } from "@phosphor-icons/react";

export default function DeepResearchPanel() {
  const [subTab, setSubTab] = useState("search");
  return (
    <div className="flex flex-col items-center justify-center h-full p-8">
      <div className="text-center max-w-2xl">
        {/* Animated Icon */}
        <div className="relative mb-8">
          <Microscope size={64} className="mb-4 text-blue-500 animate-pulse" />
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full opacity-20 blur-xl animate-pulse"></div>
        </div>
        <h2 className="text-3xl font-bold mb-6 text-theme-text-primary bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
          Deep Research
        </h2>
        <p className="text-lg text-theme-text-secondary mb-10 max-w-lg mx-auto leading-relaxed">
          Advanced research tools and workflows for in-depth analysis and discovery.
        </p>
        {/* Sub-tabs for Deep Research */}
        <div className="flex justify-center mb-8">
          <div className="flex bg-theme-bg-secondary rounded-full p-1 shadow-lg border border-theme-border">
            <button
              onClick={() => setSubTab("search")}
              className={`flex items-center gap-2 px-6 py-3 font-medium rounded-full transition-all duration-300 ${
                subTab === "search"
                  ? "text-white bg-gradient-to-r from-cyan-500 to-blue-600 shadow-md"
                  : "text-theme-text-secondary hover:text-theme-text-primary hover:bg-theme-bg-primary"
              }`}
            >
              <MagnifyingGlass size={18} />
              Research Search
            </button>
            <button
              onClick={() => setSubTab("draft")}
              className={`flex items-center gap-2 px-6 py-3 font-medium rounded-full transition-all duration-300 ${
                subTab === "draft"
                  ? "text-white bg-gradient-to-r from-cyan-500 to-blue-600 shadow-md"
                  : "text-theme-text-secondary hover:text-theme-text-primary hover:bg-theme-bg-primary"
              }`}
            >
              <FileText size={18} />
              Research Draft
            </button>
          </div>
        </div>
        {/* Content based on sub-tab */}
        {subTab === "search" ? (
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl blur-lg opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
            <div className="relative border-2 border-dashed border-theme-border rounded-2xl p-12 bg-gradient-to-br from-theme-bg-secondary to-theme-bg-primary hover:from-theme-bg-primary hover:to-theme-bg-secondary transition-all duration-300 cursor-pointer group-hover:shadow-2xl group-hover:scale-105 transform">
              <div className="flex flex-col items-center">
                <div className="relative mb-6">
                  <MagnifyingGlass
                    size={64}
                    className="text-theme-text-secondary group-hover:text-cyan-500 transition-all duration-300 group-hover:scale-110 transform"
                  />
                  <div className="absolute inset-0 bg-cyan-500 rounded-full opacity-0 group-hover:opacity-20 blur-md transition-opacity duration-300"></div>
                </div>
                <h3 className="text-xl font-semibold text-theme-text-primary mb-3 group-hover:text-cyan-600 transition-colors duration-300">
                  Research Search
                </h3>
                <p className="text-base text-theme-text-secondary text-center mb-4 leading-relaxed">
                  Search across research databases and sources with advanced AI-powered analysis.
                </p>
                <div className="flex items-center gap-4 text-sm text-theme-text-tertiary">
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse"></span>
                    Global DB
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
                    AI Analysis
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse"></span>
                    Reports
                  </span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl blur-lg opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
            <div className="relative border-2 border-dashed border-theme-border rounded-2xl p-12 bg-gradient-to-br from-theme-bg-secondary to-theme-bg-primary hover:from-theme-bg-primary hover:to-theme-bg-secondary transition-all duration-300 cursor-pointer group-hover:shadow-2xl group-hover:scale-105 transform">
              <div className="flex flex-col items-center">
                <div className="relative mb-6">
                  <FileText
                    size={64}
                    className="text-theme-text-secondary group-hover:text-cyan-500 transition-all duration-300 group-hover:scale-110 transform"
                  />
                  <div className="absolute inset-0 bg-cyan-500 rounded-full opacity-0 group-hover:opacity-20 blur-md transition-opacity duration-300"></div>
                </div>
                <h3 className="text-xl font-semibold text-theme-text-primary mb-3 group-hover:text-cyan-600 transition-colors duration-300">
                  Research Draft
                </h3>
                <p className="text-base text-theme-text-secondary text-center mb-4 leading-relaxed">
                  Draft, organize, and collaborate on research documents with AI assistance.
                </p>
                <div className="flex items-center gap-4 text-sm text-theme-text-tertiary">
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse"></span>
                    Templates
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
                    AI Writing
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse"></span>
                    Review
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* Feature Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div className="text-center p-4 rounded-xl bg-theme-bg-secondary hover:bg-theme-bg-primary transition-all duration-300 group">
            <div className="text-2xl mb-2">🌐</div>
            <h4 className="font-semibold text-theme-text-primary mb-1">Global Research</h4>
            <p className="text-sm text-theme-text-secondary">Worldwide sources</p>
          </div>
          <div className="text-center p-4 rounded-xl bg-theme-bg-secondary hover:bg-theme-bg-primary transition-all duration-300 group">
            <div className="text-2xl mb-2">🤖</div>
            <h4 className="font-semibold text-theme-text-primary mb-1">AI Powered</h4>
            <p className="text-sm text-theme-text-secondary">Smart analysis</p>
          </div>
          <div className="text-center p-4 rounded-xl bg-theme-bg-secondary hover:bg-theme-bg-primary transition-all duration-300 group">
            <div className="text-2xl mb-2">📑</div>
            <h4 className="font-semibold text-theme-text-primary mb-1">Collaboration</h4>
            <p className="text-sm text-theme-text-secondary">Team workflows</p>
          </div>
        </div>
      </div>
    </div>
  );
} 