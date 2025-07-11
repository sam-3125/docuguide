import React from "react";
import { useTranslation } from "react-i18next";
import { 
  FileText, 
  Brain, 
  MagnifyingGlass, 
  PresentationChart, 
  Shield, 
  Lightning,
  ArrowRight,
  Star
} from "@phosphor-icons/react";

export default function HomePanel() {
  const { t } = useTranslation();

  const features = [
    {
      icon: <FileText size={24} className="text-blue-500" />,
      title: "Document Management",
      description: "Upload, organize, and manage all your documents in one place"
    },
    {
      icon: <Brain size={24} className="text-green-500" />,
      title: "AI-Powered Analysis",
      description: "Intelligent document processing and content extraction"
    },
    {
      icon: <MagnifyingGlass size={24} className="text-purple-500" />,
      title: "Smart Search",
      description: "Find information instantly across all your documents"
    },
    {
      icon: <PresentationChart size={24} className="text-orange-500" />,
      title: "Visualization Tools",
      description: "Create presentations and mind maps from your content"
    },
    {
      icon: <Shield size={24} className="text-indigo-500" />,
      title: "Patent Tools",
      description: "Comprehensive patent search and drafting capabilities"
    },
    {
      icon: <Lightning size={24} className="text-yellow-500" />,
      title: "Lightning Fast",
      description: "Optimized performance for quick document processing"
    }
  ];

  return (
    <div className="h-full flex flex-col bg-theme-bg-container">
      {/* Hero Section */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="text-center max-w-4xl">
          {/* Logo and Title */}
          <div className="mb-8">
            <div className="text-8xl mb-6 animate-pulse">📚</div>
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              DocuGuide
            </h1>
            <p className="text-xl text-theme-text-secondary mb-6 max-w-2xl mx-auto leading-relaxed">
              Your intelligent document companion. Transform how you work with documents through AI-powered insights, 
              smart organization, and powerful visualization tools.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex justify-center gap-4 mb-12">
            <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105">
              Get Started
              <ArrowRight size={20} />
            </button>
            <button className="flex items-center gap-2 px-6 py-3 border border-theme-border text-theme-text-primary rounded-lg font-semibold hover:bg-theme-bg-secondary transition-all duration-300">
              Learn More
            </button>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="p-6 rounded-xl bg-theme-bg-secondary hover:bg-theme-bg-primary transition-all duration-300 group hover:shadow-lg hover:scale-105"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded-lg bg-theme-bg-primary group-hover:bg-theme-bg-secondary transition-colors duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="font-semibold text-theme-text-primary">{feature.title}</h3>
                </div>
                <p className="text-sm text-theme-text-secondary leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="text-center p-4">
              <div className="text-3xl font-bold text-blue-500 mb-2">10K+</div>
              <div className="text-sm text-theme-text-secondary">Documents Processed</div>
            </div>
            <div className="text-center p-4">
              <div className="text-3xl font-bold text-green-500 mb-2">99.9%</div>
              <div className="text-sm text-theme-text-secondary">Accuracy Rate</div>
            </div>
            <div className="text-center p-4">
              <div className="text-3xl font-bold text-purple-500 mb-2">24/7</div>
              <div className="text-sm text-theme-text-secondary">AI Processing</div>
            </div>
          </div>

          {/* Testimonials */}
          <div className="bg-theme-bg-secondary rounded-2xl p-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={20} className="text-yellow-500 fill-current" />
              ))}
            </div>
            <blockquote className="text-lg text-theme-text-primary italic mb-4">
              "DocuGuide has revolutionized how we handle documents. The AI insights are incredibly accurate and the interface is intuitive."
            </blockquote>
            <div className="text-sm text-theme-text-secondary">
              — Sarah Johnson, Research Director
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 