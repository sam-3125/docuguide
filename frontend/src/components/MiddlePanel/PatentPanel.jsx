import React, { useState } from "react";
import { MagnifyingGlass, FileText, Sparkle, BookOpen, X } from "@phosphor-icons/react";
import { useTranslation } from "react-i18next";

export default function PatentPanel() {
  const { t } = useTranslation();
  const [patentSubTab, setPatentSubTab] = useState('search');

  // State for Patent Search
  const [patentSearchTerm, setPatentSearchTerm] = useState('');
  const [patentSearchResults, setPatentSearchResults] = useState([]);
  const [isSearchingPatent, setIsSearchingPatent] = useState(false);
  const [patentSearchError, setPatentSearchError] = useState('');

  // State for Patent Draft
  const [patentDraftContent, setPatentDraftContent] = useState('');
  const [aiGeneratedDraft, setAiGeneratedDraft] = useState('');
  const [isGeneratingDraft, setIsGeneratingDraft] = useState(false);
  const [aiDraftError, setAiDraftError] = useState('');

  // State for viewing single patent details
  const [selectedPatent, setSelectedPatent] = useState(null);

  // --- API Calls ---

  const handlePatentSearch = async () => {
    if (!patentSearchTerm.trim()) {
      setPatentSearchError("Please enter a search term.");
      setPatentSearchResults([]);
      return;
    }

    setIsSearchingPatent(true);
    setPatentSearchResults([]);
    setPatentSearchError('');

    try {
      // Real API call for patent search
      const response = await fetch('/api/patents/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: patentSearchTerm, pagination: { page: 1, limit: 10 } })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setPatentSearchResults(data.results || []); // Assuming the API returns a 'results' array

    } catch (error) {
      console.error("Error searching patents:", error);
      setPatentSearchError(`Patent search failed: ${error.message}`);
      setPatentSearchResults([]);
    } finally {
      setIsSearchingPatent(false);
    }
  };

  const handleGenerateAiDraft = async () => {
    if (!patentDraftContent.trim()) {
      setAiDraftError("Please provide some content for the AI to draft.");
      setAiGeneratedDraft('');
      return;
    }

    setIsGeneratingDraft(true);
    setAiGeneratedDraft('');
    setAiDraftError('');

    try {
      // Real API call for AI patent draft generation
      const response = await fetch('/api/patents/draft/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ inventionSummary: patentDraftContent })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      // Assuming the API returns a 'generatedContent' field
      setAiGeneratedDraft(data.generatedContent || "AI could not generate a draft based on the provided content.");

    } catch (error) {
      console.error("Error generating AI draft:", error);
      setAiDraftError(`AI draft generation failed: ${error.message}`);
      setAiGeneratedDraft('');
    } finally {
      setIsGeneratingDraft(false);
    }
  };

  const handleViewPatentDetails = (patent) => {
    setSelectedPatent(patent);
  };

  const handleClosePatentDetails = () => {
    setSelectedPatent(null);
  };


  const renderPatentDetails = () => (
    <div className="fixed inset-0 bg-theme-bg-overlay bg-opacity-75 flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-theme-bg-secondary rounded-xl shadow-2xl border border-theme-border p-8 relative max-w-4xl w-full max-h-[90vh] overflow-y-auto transform scale-95 animate-scaleIn">
        <button
          onClick={handleClosePatentDetails}
          className="absolute top-4 right-4 text-theme-text-secondary hover:text-red-500 transition-colors duration-200"
        >
          <X size={24} />
        </button>

        <h3 className="text-3xl font-bold text-theme-text-primary mb-4 pr-10">{selectedPatent.title}</h3>
        <p className="text-theme-text-secondary text-lg mb-2">
          <span className="font-semibold">Inventor:</span> {selectedPatent.inventor}
        </p>
        <p className="text-theme-text-secondary text-lg mb-4">
          <span className="font-semibold">Patent ID:</span> {selectedPatent.patentId}
        </p>
        <p className="text-theme-text-secondary text-lg mb-4">
          <span className="font-semibold">Date:</span> {selectedPatent.date}
        </p>
        {selectedPatent.abstract && (
          <div className="mb-6">
            <h4 className="text-xl font-semibold text-theme-text-primary mb-2">Abstract</h4>
            <p className="text-theme-text-secondary leading-relaxed">{selectedPatent.abstract}</p>
          </div>
        )}
        {selectedPatent.claims && (
          <div className="mb-6">
            <h4 className="text-xl font-semibold text-theme-text-primary mb-2">Claims</h4>
            <p className="text-theme-text-secondary leading-relaxed whitespace-pre-wrap">{selectedPatent.claims}</p>
          </div>
        )}
        {selectedPatent.fullPatentUrl && (
          <div className="mt-8 text-center">
            <a
              href={selectedPatent.fullPatentUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white rounded-full font-bold hover:bg-indigo-700 transition-colors duration-300 shadow-lg"
            >
              View Full Patent
              <BookOpen size={20} className="ml-2" />
            </a>
          </div>
        )}
      </div>
    </div>
  );


  return (
    <div className="flex flex-col items-center justify-center h-full p-8 overflow-y-auto">
      <div className="text-center max-w-4xl w-full">
        {/* Animated Icon */}
        <div className="relative mb-8">
          <div className="text-8xl mb-4 animate-pulse">⚖️</div>
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-full opacity-20 blur-xl animate-pulse"></div>
        </div>
        
        <h2 className="text-4xl font-extrabold mb-6 text-theme-text-primary bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          {t("patent.title", "Patent Tools")}
        </h2>
        
        <p className="text-xl text-theme-text-secondary mb-10 max-w-2xl mx-auto leading-relaxed">
          {t("patent.description", "Comprehensive patent search and drafting tools to protect your intellectual property.")}
        </p>
        
        {/* Sub-tabs for Patent */}
        <div className="flex justify-center mb-8">
          <div className="flex bg-theme-bg-secondary rounded-full p-1 shadow-lg border border-theme-border">
            <button
              onClick={() => { setPatentSubTab('search'); setSelectedPatent(null); }}
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
              onClick={() => { setPatentSubTab('draft'); setSelectedPatent(null); }}
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
          <div className="relative group bg-theme-bg-secondary rounded-2xl p-8 shadow-lg border border-theme-border">
            <div className="flex flex-col items-center">
              <MagnifyingGlass size={48} className="text-theme-text-secondary group-hover:text-indigo-500 transition-colors duration-300" />
              <h3 className="text-xl font-semibold text-theme-text-primary mt-4 mb-2">
                {t("patent.search.title", "Patent Search")}
              </h3>
              <p className="text-base text-theme-text-secondary text-center mb-4 leading-relaxed">
                {t("patent.search.description", "Search global patent databases with advanced AI-powered analysis")}
              </p>
              <div className="w-full relative max-w-md mb-6">
                <input
                  type="text"
                  placeholder={t("patent.search.placeholder", "Enter patent keywords or ID...")}
                  className="w-full p-3 pl-10 rounded-full bg-theme-bg-tertiary border border-theme-border text-theme-text-primary focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={patentSearchTerm}
                  onChange={(e) => setPatentSearchTerm(e.target.value)}
                  onKeyPress={(e) => { if (e.key === 'Enter') handlePatentSearch(); }}
                />
                <MagnifyingGlass size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-theme-text-secondary" />
              </div>
              <button
                onClick={handlePatentSearch}
                disabled={isSearchingPatent}
                className="px-8 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-full font-medium shadow-lg hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[180px]"
              >
                {isSearchingPatent ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Searching...
                  </>
                ) : (
                  t("patent.search.button", "Search Patents")
                )}
              </button>

              {patentSearchError && <p className="mt-4 text-red-500 text-center">{patentSearchError}</p>}

              {patentSearchResults.length > 0 && (
                <div className="mt-8 w-full">
                  <h4 className="text-xl font-semibold text-theme-text-primary mb-4 text-left">Search Results:</h4>
                  <div className="grid grid-cols-1 gap-4">
                    {patentSearchResults.map(patent => (
                      <div
                        key={patent.id || patent.patentId} // Use ID or patentId as key
                        className="bg-theme-bg-primary p-4 rounded-lg border border-theme-border shadow-sm hover:shadow-md hover:scale-[1.01] transition-all duration-200 cursor-pointer text-left"
                        onClick={() => handleViewPatentDetails(patent)}
                      >
                        <h5 className="font-bold text-theme-text-primary text-lg mb-1 line-clamp-2">{patent.title}</h5>
                        <p className="text-theme-text-secondary text-sm mb-1"><strong>Inventor:</strong> {patent.inventor}</p>
                        <p className="text-theme-text-secondary text-sm mb-2"><strong>Patent ID:</strong> {patent.patentId}</p>
                        <p className="text-theme-text-secondary text-sm mt-2 line-clamp-2">{patent.abstract}</p>
                        <span className="text-indigo-400 hover:underline text-sm mt-2 block">
                            View Details
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
               {patentSearchTerm && patentSearchResults.length === 0 && !isSearchingPatent && !patentSearchError && (
                  <p className="text-theme-text-secondary mt-8">No patents found matching your criteria.</p>
                )}
            </div>
          </div>
        ) : (
          <div className="relative group bg-theme-bg-secondary rounded-2xl p-8 shadow-lg border border-theme-border">
            <div className="flex flex-col items-center">
              <FileText size={48} className="text-theme-text-secondary group-hover:text-purple-500 transition-colors duration-300" />
              <h3 className="text-xl font-semibold text-theme-text-primary mt-4 mb-2">
                {t("patent.draft.title", "Patent Drafting")}
              </h3>
              <p className="text-base text-theme-text-secondary text-center mb-4 leading-relaxed">
                {t("patent.draft.description", "Create professional patent applications with AI assistance")}
              </p>
              <textarea
                className="w-full h-48 p-4 rounded-lg bg-theme-bg-tertiary border border-theme-border text-theme-text-primary focus:outline-none focus:ring-2 focus:ring-purple-500 resize-y"
                placeholder={t("patent.draft.placeholder", "Start drafting your patent application here, or provide key concepts for AI generation...")}
                value={patentDraftContent}
                onChange={(e) => setPatentDraftContent(e.target.value)}
              ></textarea>
              <button
                onClick={handleGenerateAiDraft}
                disabled={isGeneratingDraft || !patentDraftContent.trim()}
                className="mt-6 px-8 py-3 bg-gradient-to-r from-purple-500 to-fuchsia-600 text-white rounded-full font-medium shadow-lg hover:from-purple-600 hover:to-fuchsia-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[200px]"
              >
                {isGeneratingDraft ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkle size={20} className="mr-2" />
                    {t("patent.draft.button", "Generate with AI")}
                  </>
                )}
              </button>

              {aiDraftError && <p className="mt-4 text-red-500 text-center">{aiDraftError}</p>}

              {aiGeneratedDraft && (
                <div className="mt-8 w-full bg-theme-bg-primary p-5 rounded-lg border border-theme-border text-left">
                  <h4 className="text-xl font-semibold text-theme-text-primary mb-3">AI-Generated Draft:</h4>
                  <pre className="text-theme-text-secondary whitespace-pre-wrap font-mono text-sm">{aiGeneratedDraft}</pre>
                  <button
                    className="mt-4 px-4 py-2 bg-indigo-500 text-white rounded-full text-sm hover:bg-indigo-600 transition-colors duration-200"
                    onClick={() => navigator.clipboard.writeText(aiGeneratedDraft)}
                  >
                    Copy to Clipboard
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
        
        {/* Patent Details Modal/Overlay */}
        {selectedPatent && renderPatentDetails()}

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
}