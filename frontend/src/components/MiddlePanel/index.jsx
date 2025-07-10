import React, { useState } from "react";
import { UploadSimple, FilePdf, PresentationChart, Brain, MagnifyingGlass, FileText, Microscope } from "@phosphor-icons/react";
import { useTranslation } from "react-i18next";
import DeepResearchPanel from "./DeepResearchPanel";

export default function MiddlePanel() {
  const [activeTab, setActiveTab] = useState('documents');
  const [visualizationSubTab, setVisualizationSubTab] = useState('ppt');
  const [patentSubTab, setPatentSubTab] = useState('search');
  const { t } = useTranslation();

  const renderContent = () => {
    switch (activeTab) {
      case 'documents':
        return (
          <div className="flex flex-col items-center justify-center h-full p-8">
            <div className="text-center max-w-2xl">
              {/* Animated Icon */}
              <div className="relative mb-8">
                <div className="text-8xl mb-4 animate-pulse">📄</div>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full opacity-20 blur-xl animate-pulse"></div>
              </div>
              
              <h2 className="text-3xl font-bold mb-6 text-theme-text-primary bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {t("documents.title", "Document Center")}
              </h2>
              
              <p className="text-lg text-theme-text-secondary mb-10 max-w-lg mx-auto leading-relaxed">
                {t("documents.description", "Upload and manage your documents with ease. Our intelligent system helps you organize and process your files efficiently.")}
              </p>
              
              {/* Enhanced Upload Component */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur-lg opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
                <div className="relative border-2 border-dashed border-theme-border rounded-2xl p-12 bg-gradient-to-br from-theme-bg-secondary to-theme-bg-primary hover:from-theme-bg-primary hover:to-theme-bg-secondary transition-all duration-300 cursor-pointer group-hover:shadow-2xl group-hover:scale-105 transform">
                  <div className="flex flex-col items-center">
                    <div className="relative mb-6">
                      <UploadSimple 
                        size={64} 
                        className="text-theme-text-secondary group-hover:text-blue-500 transition-all duration-300 group-hover:scale-110 transform" 
                      />
                      <div className="absolute inset-0 bg-blue-500 rounded-full opacity-0 group-hover:opacity-20 blur-md transition-opacity duration-300"></div>
                    </div>
                    
                    <h3 className="text-xl font-semibold text-theme-text-primary mb-3 group-hover:text-blue-600 transition-colors duration-300">
                      {t("upload.title", "Upload Documents")}
                    </h3>
                    
                    <p className="text-base text-theme-text-secondary text-center mb-4 leading-relaxed">
                      {t("upload.description", "Drag and drop files here, or click to browse your computer")}
                    </p>
                    
                    <div className="flex items-center gap-4 text-sm text-theme-text-tertiary">
                      <span className="flex items-center gap-1">
                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                        PDF
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                        DOC
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                        TXT
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Feature Highlights */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                <div className="text-center p-4 rounded-xl bg-theme-bg-secondary hover:bg-theme-bg-primary transition-all duration-300 group">
                  <div className="text-2xl mb-2">🔍</div>
                  <h4 className="font-semibold text-theme-text-primary mb-1">Smart Search</h4>
                  <p className="text-sm text-theme-text-secondary">Find documents instantly</p>
                </div>
                <div className="text-center p-4 rounded-xl bg-theme-bg-secondary hover:bg-theme-bg-primary transition-all duration-300 group">
                  <div className="text-2xl mb-2">📊</div>
                  <h4 className="font-semibold text-theme-text-primary mb-1">Analytics</h4>
                  <p className="text-sm text-theme-text-secondary">Track document insights</p>
                </div>
                <div className="text-center p-4 rounded-xl bg-theme-bg-secondary hover:bg-theme-bg-primary transition-all duration-300 group">
                  <div className="text-2xl mb-2">🔒</div>
                  <h4 className="font-semibold text-theme-text-primary mb-1">Secure</h4>
                  <p className="text-sm text-theme-text-secondary">Your data is protected</p>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'pdf-view':
        return (
          <div className="flex flex-col items-center justify-center h-full p-8">
            <div className="text-center max-w-2xl">
              {/* Animated Icon */}
              <div className="relative mb-8">
                <div className="text-8xl mb-4 animate-bounce">📋</div>
                <div className="absolute inset-0 bg-gradient-to-r from-red-400 to-orange-500 rounded-full opacity-20 blur-xl animate-pulse"></div>
              </div>
              
              <h2 className="text-3xl font-bold mb-6 text-theme-text-primary bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
                {t("pdf-view.title", "PDF Viewer")}
              </h2>
              
              <p className="text-lg text-theme-text-secondary mb-10 max-w-lg mx-auto leading-relaxed">
                {t("pdf-view.description", "Advanced PDF viewing and annotation tools are coming soon. Get ready for a powerful document viewing experience.")}
              </p>
              
              {/* Enhanced Placeholder */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-orange-600 rounded-2xl blur-lg opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
                <div className="relative border-2 border-dashed border-theme-border rounded-2xl p-12 bg-gradient-to-br from-theme-bg-secondary to-theme-bg-primary hover:from-theme-bg-primary hover:to-theme-bg-secondary transition-all duration-300 group-hover:shadow-2xl group-hover:scale-105 transform">
                  <div className="flex flex-col items-center">
                    <div className="relative mb-6">
                      <FilePdf 
                        size={64} 
                        className="text-theme-text-secondary group-hover:text-red-500 transition-all duration-300 group-hover:scale-110 transform" 
                      />
                      <div className="absolute inset-0 bg-red-500 rounded-full opacity-0 group-hover:opacity-20 blur-md transition-opacity duration-300"></div>
                    </div>
                    
                    <h3 className="text-xl font-semibold text-theme-text-primary mb-3 group-hover:text-red-600 transition-colors duration-300">
                      {t("pdf-view.coming-soon", "Coming Soon")}
                    </h3>
                    
                    <p className="text-base text-theme-text-secondary text-center mb-4 leading-relaxed">
                      {t("pdf-view.placeholder", "Advanced PDF viewing and annotation tools are in development")}
                    </p>
                    
                    <div className="flex items-center gap-4 text-sm text-theme-text-tertiary">
                      <span className="flex items-center gap-1">
                        <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                        Viewing
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></span>
                        Annotation
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></span>
                        Search
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Coming Features */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                <div className="text-center p-4 rounded-xl bg-theme-bg-secondary hover:bg-theme-bg-primary transition-all duration-300 group">
                  <div className="text-2xl mb-2">👁️</div>
                  <h4 className="font-semibold text-theme-text-primary mb-1">High-Quality Viewing</h4>
                  <p className="text-sm text-theme-text-secondary">Crystal clear PDF rendering</p>
                </div>
                <div className="text-center p-4 rounded-xl bg-theme-bg-secondary hover:bg-theme-bg-primary transition-all duration-300 group">
                  <div className="text-2xl mb-2">✏️</div>
                  <h4 className="font-semibold text-theme-text-primary mb-1">Annotations</h4>
                  <p className="text-sm text-theme-text-secondary">Add notes and highlights</p>
                </div>
                <div className="text-center p-4 rounded-xl bg-theme-bg-secondary hover:bg-theme-bg-primary transition-all duration-300 group">
                  <div className="text-2xl mb-2">🔍</div>
                  <h4 className="font-semibold text-theme-text-primary mb-1">Smart Search</h4>
                  <p className="text-sm text-theme-text-secondary">Find text within PDFs</p>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'visualization':
        return (
          <div className="flex flex-col items-center justify-center h-full p-8">
            <div className="text-center max-w-2xl">
              {/* Animated Icon */}
              <div className="relative mb-8">
                <div className="text-8xl mb-4 animate-pulse">📊</div>
                <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-teal-500 rounded-full opacity-20 blur-xl animate-pulse"></div>
              </div>
              
              <h2 className="text-3xl font-bold mb-6 text-theme-text-primary bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
                {t("visualization.title", "Visualization")}
              </h2>
              
              <p className="text-lg text-theme-text-secondary mb-10 max-w-lg mx-auto leading-relaxed">
                {t("visualization.description", "Create stunning presentations and mind maps to visualize your ideas and data effectively.")}
              </p>
              
              {/* Sub-tabs for Visualization */}
              <div className="flex justify-center mb-8">
                <div className="flex bg-theme-bg-secondary rounded-full p-1 shadow-lg border border-theme-border">
                  <button
                    onClick={() => setVisualizationSubTab('ppt')}
                    className={`flex items-center gap-2 px-6 py-3 font-medium rounded-full transition-all duration-300 ${
                      visualizationSubTab === 'ppt'
                        ? 'text-white bg-gradient-to-r from-green-500 to-teal-600 shadow-md'
                        : 'text-theme-text-secondary hover:text-theme-text-primary hover:bg-theme-bg-primary'
                    }`}
                  >
                    <PresentationChart size={18} />
                    PPT
                  </button>
                  
                  <button
                    onClick={() => setVisualizationSubTab('mindmap')}
                    className={`flex items-center gap-2 px-6 py-3 font-medium rounded-full transition-all duration-300 ${
                      visualizationSubTab === 'mindmap'
                        ? 'text-white bg-gradient-to-r from-green-500 to-teal-600 shadow-md'
                        : 'text-theme-text-secondary hover:text-theme-text-primary hover:bg-theme-bg-primary'
                    }`}
                  >
                    <Brain size={18} />
                    Mind Map
                  </button>
                </div>
              </div>
              
              {/* Content based on sub-tab */}
              {visualizationSubTab === 'ppt' ? (
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-teal-600 rounded-2xl blur-lg opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
                  <div className="relative border-2 border-dashed border-theme-border rounded-2xl p-12 bg-gradient-to-br from-theme-bg-secondary to-theme-bg-primary hover:from-theme-bg-primary hover:to-theme-bg-secondary transition-all duration-300 cursor-pointer group-hover:shadow-2xl group-hover:scale-105 transform">
                    <div className="flex flex-col items-center">
                      <div className="relative mb-6">
                        <PresentationChart 
                          size={64} 
                          className="text-theme-text-secondary group-hover:text-green-500 transition-all duration-300 group-hover:scale-110 transform" 
                        />
                        <div className="absolute inset-0 bg-green-500 rounded-full opacity-0 group-hover:opacity-20 blur-md transition-opacity duration-300"></div>
                      </div>
                      
                      <h3 className="text-xl font-semibold text-theme-text-primary mb-3 group-hover:text-green-600 transition-colors duration-300">
                        {t("visualization.ppt.title", "Presentation Creator")}
                      </h3>
                      
                      <p className="text-base text-theme-text-secondary text-center mb-4 leading-relaxed">
                        {t("visualization.ppt.description", "Create professional presentations with AI-powered templates and smart layouts")}
                      </p>
                      
                      <div className="flex items-center gap-4 text-sm text-theme-text-tertiary">
                        <span className="flex items-center gap-1">
                          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                          Templates
                        </span>
                        <span className="flex items-center gap-1">
                          <span className="w-2 h-2 bg-teal-500 rounded-full animate-pulse"></span>
                          AI Design
                        </span>
                        <span className="flex items-center gap-1">
                          <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                          Export
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-teal-600 rounded-2xl blur-lg opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
                  <div className="relative border-2 border-dashed border-theme-border rounded-2xl p-12 bg-gradient-to-br from-theme-bg-secondary to-theme-bg-primary hover:from-theme-bg-primary hover:to-theme-bg-secondary transition-all duration-300 cursor-pointer group-hover:shadow-2xl group-hover:scale-105 transform">
                    <div className="flex flex-col items-center">
                      <div className="relative mb-6">
                        <Brain 
                          size={64} 
                          className="text-theme-text-secondary group-hover:text-green-500 transition-all duration-300 group-hover:scale-110 transform" 
                        />
                        <div className="absolute inset-0 bg-green-500 rounded-full opacity-0 group-hover:opacity-20 blur-md transition-opacity duration-300"></div>
                      </div>
                      
                      <h3 className="text-xl font-semibold text-theme-text-primary mb-3 group-hover:text-green-600 transition-colors duration-300">
                        {t("visualization.mindmap.title", "Mind Map Creator")}
                      </h3>
                      
                      <p className="text-base text-theme-text-secondary text-center mb-4 leading-relaxed">
                        {t("visualization.mindmap.description", "Visualize ideas and concepts with interactive mind mapping tools")}
                      </p>
                      
                      <div className="flex items-center gap-4 text-sm text-theme-text-tertiary">
                        <span className="flex items-center gap-1">
                          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                          Interactive
                        </span>
                        <span className="flex items-center gap-1">
                          <span className="w-2 h-2 bg-teal-500 rounded-full animate-pulse"></span>
                          Collaboration
                        </span>
                        <span className="flex items-center gap-1">
                          <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                          Export
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Feature Highlights */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                <div className="text-center p-4 rounded-xl bg-theme-bg-secondary hover:bg-theme-bg-primary transition-all duration-300 group">
                  <div className="text-2xl mb-2">🎨</div>
                  <h4 className="font-semibold text-theme-text-primary mb-1">Smart Design</h4>
                  <p className="text-sm text-theme-text-secondary">AI-powered layouts</p>
                </div>
                <div className="text-center p-4 rounded-xl bg-theme-bg-secondary hover:bg-theme-bg-primary transition-all duration-300 group">
                  <div className="text-2xl mb-2">🤝</div>
                  <h4 className="font-semibold text-theme-text-primary mb-1">Collaboration</h4>
                  <p className="text-sm text-theme-text-secondary">Real-time teamwork</p>
                </div>
                <div className="text-center p-4 rounded-xl bg-theme-bg-secondary hover:bg-theme-bg-primary transition-all duration-300 group">
                  <div className="text-2xl mb-2">📱</div>
                  <h4 className="font-semibold text-theme-text-primary mb-1">Multi-Platform</h4>
                  <p className="text-sm text-theme-text-secondary">Works everywhere</p>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'patent':
        return (
          <div className="flex flex-col items-center justify-center h-full p-8">
            <div className="text-center max-w-2xl">
              {/* Animated Icon */}
              <div className="relative mb-8">
                <div className="text-8xl mb-4 animate-pulse">⚖️</div>
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-full opacity-20 blur-xl animate-pulse"></div>
              </div>
              
              <h2 className="text-3xl font-bold mb-6 text-theme-text-primary bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                {t("patent.title", "Patent Tools")}
              </h2>
              
              <p className="text-lg text-theme-text-secondary mb-10 max-w-lg mx-auto leading-relaxed">
                {t("patent.description", "Comprehensive patent search and drafting tools to protect your intellectual property.")}
              </p>
              
              {/* Sub-tabs for Patent */}
              <div className="flex justify-center mb-8">
                <div className="flex bg-theme-bg-secondary rounded-full p-1 shadow-lg border border-theme-border">
                  <button
                    onClick={() => setPatentSubTab('search')}
                    className={`flex items-center gap-2 px-6 py-3 font-medium rounded-full transition-all duration-300 ${
                      patentSubTab === 'search'
                        ? 'text-white bg-gradient-to-r from-indigo-500 to-purple-600 shadow-md'
                        : 'text-theme-text-secondary hover:text-theme-text-primary hover:bg-theme-bg-primary'
                    }`}
                  >
                    <MagnifyingGlass size={18} />
                    Patent Search
                  </button>
                  
                  <button
                    onClick={() => setPatentSubTab('draft')}
                    className={`flex items-center gap-2 px-6 py-3 font-medium rounded-full transition-all duration-300 ${
                      patentSubTab === 'draft'
                        ? 'text-white bg-gradient-to-r from-indigo-500 to-purple-600 shadow-md'
                        : 'text-theme-text-secondary hover:text-theme-text-primary hover:bg-theme-bg-primary'
                    }`}
                  >
                    <FileText size={18} />
                    Patent Draft
                  </button>
                </div>
              </div>
              
              {/* Content based on sub-tab */}
              {patentSubTab === 'search' ? (
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl blur-lg opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
                  <div className="relative border-2 border-dashed border-theme-border rounded-2xl p-12 bg-gradient-to-br from-theme-bg-secondary to-theme-bg-primary hover:from-theme-bg-primary hover:to-theme-bg-secondary transition-all duration-300 cursor-pointer group-hover:shadow-2xl group-hover:scale-105 transform">
                    <div className="flex flex-col items-center">
                      <div className="relative mb-6">
                        <MagnifyingGlass 
                          size={64} 
                          className="text-theme-text-secondary group-hover:text-indigo-500 transition-all duration-300 group-hover:scale-110 transform" 
                        />
                        <div className="absolute inset-0 bg-indigo-500 rounded-full opacity-0 group-hover:opacity-20 blur-md transition-opacity duration-300"></div>
                      </div>
                      
                      <h3 className="text-xl font-semibold text-theme-text-primary mb-3 group-hover:text-indigo-600 transition-colors duration-300">
                        {t("patent.search.title", "Patent Search")}
                      </h3>
                      
                      <p className="text-base text-theme-text-secondary text-center mb-4 leading-relaxed">
                        {t("patent.search.description", "Search global patent databases with advanced AI-powered analysis")}
                      </p>
                      
                      <div className="flex items-center gap-4 text-sm text-theme-text-tertiary">
                        <span className="flex items-center gap-1">
                          <span className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse"></span>
                          Global DB
                        </span>
                        <span className="flex items-center gap-1">
                          <span className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></span>
                          AI Analysis
                        </span>
                        <span className="flex items-center gap-1">
                          <span className="w-2 h-2 bg-violet-500 rounded-full animate-pulse"></span>
                          Reports
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl blur-lg opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
                  <div className="relative border-2 border-dashed border-theme-border rounded-2xl p-12 bg-gradient-to-br from-theme-bg-secondary to-theme-bg-primary hover:from-theme-bg-primary hover:to-theme-bg-secondary transition-all duration-300 cursor-pointer group-hover:shadow-2xl group-hover:scale-105 transform">
                    <div className="flex flex-col items-center">
                      <div className="relative mb-6">
                        <FileText 
                          size={64} 
                          className="text-theme-text-secondary group-hover:text-indigo-500 transition-all duration-300 group-hover:scale-110 transform" 
                        />
                        <div className="absolute inset-0 bg-indigo-500 rounded-full opacity-0 group-hover:opacity-20 blur-md transition-opacity duration-300"></div>
                      </div>
                      
                      <h3 className="text-xl font-semibold text-theme-text-primary mb-3 group-hover:text-indigo-600 transition-colors duration-300">
                        {t("patent.draft.title", "Patent Drafting")}
                      </h3>
                      
                      <p className="text-base text-theme-text-secondary text-center mb-4 leading-relaxed">
                        {t("patent.draft.description", "Create professional patent applications with AI assistance")}
                      </p>
                      
                      <div className="flex items-center gap-4 text-sm text-theme-text-tertiary">
                        <span className="flex items-center gap-1">
                          <span className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse"></span>
                          Templates
                        </span>
                        <span className="flex items-center gap-1">
                          <span className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></span>
                          AI Writing
                        </span>
                        <span className="flex items-center gap-1">
                          <span className="w-2 h-2 bg-violet-500 rounded-full animate-pulse"></span>
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
                  <div className="text-2xl mb-2">🌍</div>
                  <h4 className="font-semibold text-theme-text-primary mb-1">Global Search</h4>
                  <p className="text-sm text-theme-text-secondary">Worldwide databases</p>
                </div>
                <div className="text-center p-4 rounded-xl bg-theme-bg-secondary hover:bg-theme-bg-primary transition-all duration-300 group">
                  <div className="text-2xl mb-2">🤖</div>
                  <h4 className="font-semibold text-theme-text-primary mb-1">AI Powered</h4>
                  <p className="text-sm text-theme-text-secondary">Smart analysis</p>
                </div>
                <div className="text-center p-4 rounded-xl bg-theme-bg-secondary hover:bg-theme-bg-primary transition-all duration-300 group">
                  <div className="text-2xl mb-2">📋</div>
                  <h4 className="font-semibold text-theme-text-primary mb-1">Legal Compliance</h4>
                  <p className="text-sm text-theme-text-secondary">Standards compliant</p>
                </div>
              </div>
            </div>
          </div>
        );
      
      default:
        return null;
    case 'deep-research':
      return <DeepResearchPanel />;
    }
  };

  return (
    <div className="h-full flex flex-col bg-theme-bg-container">
      {/* Enhanced Tab Navigation - Top Center */}
      <div className="flex justify-center pt-4 pb-2">
        <div className="flex bg-theme-bg-secondary rounded-full p-1 shadow-lg border border-theme-border">
          <button
            onClick={() => setActiveTab('documents')}
            className={`flex items-center gap-2 px-4 py-3 font-medium rounded-full transition-all duration-300 ${
              activeTab === 'documents'
                ? 'text-white bg-gradient-to-r from-blue-500 to-purple-600 shadow-md'
                : 'text-theme-text-secondary hover:text-theme-text-primary hover:bg-theme-bg-primary'
            }`}
          >
            <UploadSimple size={16} />
            {t("documents.tab", "Documents")}
          </button>
          
          <button
            onClick={() => setActiveTab('pdf-view')}
            className={`flex items-center gap-2 px-4 py-3 font-medium rounded-full transition-all duration-300 ${
              activeTab === 'pdf-view'
                ? 'text-white bg-gradient-to-r from-red-500 to-orange-600 shadow-md'
                : 'text-theme-text-secondary hover:text-theme-text-primary hover:bg-theme-bg-primary'
            }`}
          >
            <FilePdf size={16} />
            {t("pdf-view.tab", "PDF View")}
          </button>
          
          <button
            onClick={() => setActiveTab('visualization')}
            className={`flex items-center gap-2 px-4 py-3 font-medium rounded-full transition-all duration-300 ${
              activeTab === 'visualization'
                ? 'text-white bg-gradient-to-r from-green-500 to-teal-600 shadow-md'
                : 'text-theme-text-secondary hover:text-theme-text-primary hover:bg-theme-bg-primary'
            }`}
          >
            <PresentationChart size={16} />
            {t("visualization.tab", "Visualization")}
          </button>
          
          <button
            onClick={() => setActiveTab('patent')}
            className={`flex items-center gap-2 px-4 py-3 font-medium rounded-full transition-all duration-300 ${
              activeTab === 'patent'
                ? 'text-white bg-gradient-to-r from-indigo-500 to-purple-600 shadow-md'
                : 'text-theme-text-secondary hover:text-theme-text-primary hover:bg-theme-bg-primary'
            }`}
          >
            <FileText size={16} />
            {t("patent.tab", "Patent")}
          </button>

          <button
            onClick={() => setActiveTab('deep-research')}
            className={`flex items-center gap-2 px-4 py-3 font-medium rounded-full transition-all duration-300 ${
              activeTab === 'deep-research'
                ? 'text-white bg-gradient-to-r from-cyan-500 to-blue-600 shadow-md'
                : 'text-theme-text-secondary hover:text-theme-text-primary hover:bg-theme-bg-primary'
            }`}
          >
            <Microscope size={16} />
            Deep Research
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-auto">
        {renderContent()}
      </div>
    </div>
  );
} 