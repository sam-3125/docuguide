import React, { useState, useEffect } from "react";
import { BookOpen, MagnifyingGlass, Sparkle, Tag, ClipboardText, ArrowRight, X } from "@phosphor-icons/react";
import { useTranslation } from "react-i18next";

export default function ResearchPaperPanel() {
  const { t } = useTranslation();
  const [selectedPaper, setSelectedPaper] = useState(null); // For viewing details of a single paper

  // State for My Papers
  const [papers, setPapers] = useState([]);
  const [isLoadingPapers, setIsLoadingPapers] = useState(false);
  const [papersError, setPapersError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // State for Insights/Citations (when viewing a single paper)
  const [insights, setInsights] = useState([]);
  const [citations, setCitations] = useState('');
  const [isLoadingInsights, setIsLoadingInsights] = useState(false);
  const [insightsError, setInsightsError] = useState('');
  const [isLoadingCitations, setIsLoadingCitations] = useState(false);
  const [citationsError, setCitationsError] = useState('');

  // --- API Calls ---

  // Fetch all papers when component mounts or search term changes
  useEffect(() => {
    const fetchPapers = async () => {
      setIsLoadingPapers(true);
      setPapersError('');
      try {
        const queryParams = new URLSearchParams();
        if (searchTerm) {
          queryParams.append('q', searchTerm);
        }

        // --- ACTUAL API CALL FOR FETCHING PAPERS ---
        const response = await fetch(`/api/research-papers?${queryParams.toString()}`);

        if (!response.ok) {
          const errorText = await response.text(); // Get raw text for more detail
          throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
        }
        const data = await response.json();
        setPapers(data.papers || []); // Ensure it's an array even if empty
      } catch (error) {
        console.error("Error fetching papers:", error);
        setPapersError(`Failed to load papers: ${error.message}. Please ensure the backend is running.`);
        setPapers([]); // Clear papers on error
      } finally {
        setIsLoadingPapers(false);
      }
    };
    fetchPapers();
  }, [searchTerm]); // Re-fetch when search term changes

  // Fetch insights for a specific paper
  const fetchPaperInsights = async (paperId) => {
    setIsLoadingInsights(true);
    setInsightsError('');
    try {
      // --- ACTUAL API CALL FOR FETCHING INSIGHTS ---
      const response = await fetch(`/api/research-papers/${paperId}/insights`);

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }
      const data = await response.json();
      setInsights(data.keyFindings || data.insights || []); // Assuming backend might send 'keyFindings' or 'insights'
    } catch (error) {
      console.error("Error fetching insights:", error);
      setInsightsError(`Failed to load insights: ${error.message}.`);
      setInsights([]);
    } finally {
      setIsLoadingInsights(false);
    }
  };

  // Fetch citations for a specific paper
  const fetchPaperCitations = async (paperId) => {
    setIsLoadingCitations(true);
    setCitationsError('');
    try {
      // --- ACTUAL API CALL FOR FETCHING CITATIONS ---
      const response = await fetch(`/api/research-papers/${paperId}/citations?format=APA`); // Request APA format

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }
      const data = await response.json();
      setCitations(data.citationText || "No citation available.");
    } catch (error) {
      console.error("Error fetching citations:", error);
      setCitationsError(`Failed to load citations: ${error.message}.`);
      setCitations("");
    } finally {
      setIsLoadingCitations(false);
    }
  };

  // View paper details handler
  const handleViewPaperDetails = async (paper) => {
    setSelectedPaper(paper);
    // You might want to fetch full paper details here if the initial `/api/research-papers`
    // doesn't return all necessary fields like abstract, keywords, fileUrl.
    // For now, we'll use what's available and fetch insights/citations.
    // Example:
    // try {
    //   const response = await fetch(`/api/research-papers/${paper.id}`);
    //   const fullPaperDetails = await response.json();
    //   setSelectedPaper(fullPaperDetails);
    // } catch (error) {
    //   console.error("Error fetching full paper details:", error);
    //   // Handle error, maybe show a message
    // }

    fetchPaperInsights(paper.id);
    fetchPaperCitations(paper.id);
  };

  const handleClosePaperDetails = () => {
    setSelectedPaper(null);
    setInsights([]); // Clear insights when closing
    setCitations(''); // Clear citations when closing
  };

  const renderMyPapersContent = () => (
    <div className="p-8 bg-theme-bg-secondary rounded-xl shadow-lg border border-theme-border w-full max-w-4xl mx-auto">
      <h3 className="text-2xl font-semibold text-theme-text-primary mb-6 text-center">
        {t("researchPaper.myPapers.title", "Search My Research Papers")}
      </h3>

      <div className="relative max-w-lg mx-auto mb-6">
        <input
          type="text"
          placeholder={t("researchPaper.myPapers.searchPlaceholder", "Search by title, author, or keywords...")}
          className="w-full p-3 pl-10 rounded-full bg-theme-bg-primary border border-theme-border text-theme-text-primary focus:outline-none focus:ring-2 focus:ring-teal-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <MagnifyingGlass size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-theme-text-secondary" />
      </div>

      {isLoadingPapers && (
        <div className="text-center text-theme-text-secondary py-8 flex flex-col items-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-teal-500 mb-4"></div>
          {t("researchPaper.myPapers.loading", "Loading papers...")}
        </div>
      )}

      {papersError && (
        <div className="text-center text-red-500 py-8">
          {papersError}
        </div>
      )}

      {!isLoadingPapers && !papersError && papers.length === 0 && (
        <div className="text-center text-theme-text-secondary py-8">
          {searchTerm
            ? t("researchPaper.myPapers.noMatches", "No papers match your search criteria.")
            : t("researchPaper.myPapers.noPapersInitial", "No papers found. Please upload papers using your designated method or check your connection.")
          }
        </div>
      )}

      {!isLoadingPapers && !papersError && papers.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {papers.map(paper => (
            <div
              key={paper.id}
              className="bg-theme-bg-primary p-5 rounded-lg border border-theme-border shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-200 cursor-pointer flex flex-col justify-between"
              onClick={() => handleViewPaperDetails(paper)}
            >
              <div>
                <h4 className="font-bold text-theme-text-primary text-lg mb-2 line-clamp-2">{paper.title}</h4>
                <p className="text-theme-text-secondary text-sm mb-1">
                  <span className="font-medium">{t("researchPaper.myPapers.author", "Author")}:</span> {paper.author || 'N/A'}
                </p>
                <p className="text-theme-text-secondary text-sm mb-3">
                  <span className="font-medium">{t("researchPaper.myPapers.year", "Year")}:</span> {paper.year || 'N/A'}
                </p>
                {paper.filename && (
                  <p className="text-theme-text-secondary text-xs italic">
                    {t("researchPaper.myPapers.filename", "File")}: {paper.filename}
                  </p>
                )}
              </div>
              <button className="mt-4 self-end flex items-center text-teal-400 hover:text-teal-500 transition-colors duration-200">
                {t("researchPaper.myPapers.viewDetails", "View Details")} <ArrowRight size={16} className="ml-1" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderPaperDetails = () => (
    <div className="fixed inset-0 bg-theme-bg-overlay bg-opacity-75 flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-theme-bg-secondary rounded-xl shadow-2xl border border-theme-border p-8 relative max-w-4xl w-full max-h-[90vh] overflow-y-auto transform scale-95 animate-scaleIn">
        <button
          onClick={handleClosePaperDetails}
          className="absolute top-4 right-4 text-theme-text-secondary hover:text-red-500 transition-colors duration-200"
        >
          <X size={24} />
        </button>

        <h3 className="text-3xl font-bold text-theme-text-primary mb-4 pr-10">{selectedPaper.title}</h3>
        <p className="text-theme-text-secondary text-lg mb-2">
          <span className="font-semibold">{t("researchPaper.details.author", "Author")}:</span> {selectedPaper.author || 'N/A'}
        </p>
        <p className="text-theme-text-secondary text-lg mb-4">
          <span className="font-semibold">{t("researchPaper.details.year", "Year")}:</span> {selectedPaper.year || 'N/A'}
        </p>
        {selectedPaper.abstract && (
          <div className="mb-6">
            <h4 className="text-xl font-semibold text-theme-text-primary mb-2">
              {t("researchPaper.details.abstract", "Abstract")}
            </h4>
            <p className="text-theme-text-secondary leading-relaxed">{selectedPaper.abstract}</p>
          </div>
        )}
        {selectedPaper.keywords && selectedPaper.keywords.length > 0 && (
            <div className="mb-6">
                <h4 className="text-xl font-semibold text-theme-text-primary mb-2">
                    {t("researchPaper.details.keywords", "Keywords")}
                </h4>
                <div className="flex flex-wrap gap-2">
                    {selectedPaper.keywords.map((keyword, index) => (
                        <span key={index} className="bg-teal-500/20 text-teal-300 text-sm px-3 py-1 rounded-full flex items-center">
                            <Tag size={16} className="mr-1" /> {keyword}
                        </span>
                    ))}
                </div>
            </div>
        )}

        <div className="mb-6">
          <h4 className="text-xl font-semibold text-theme-text-primary mb-2">
            {t("researchPaper.details.citations", "Citations")}
          </h4>
          {isLoadingCitations ? (
            <div className="text-theme-text-secondary flex items-center">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-teal-500 mr-2"></div>
              Loading citations...
            </div>
          ) : citationsError ? (
            <p className="text-red-500">{citationsError}</p>
          ) : (
            <div className="bg-theme-bg-primary p-4 rounded-lg border border-theme-border flex items-center justify-between">
                <p className="text-theme-text-secondary italic flex-1 break-words pr-2">{citations}</p>
                {citations && ( // Only show copy button if citation text exists
                    <button
                        onClick={() => navigator.clipboard.writeText(citations)}
                        className="p-2 bg-teal-500/20 text-teal-300 rounded-md hover:bg-teal-500/30 transition-colors duration-200"
                        title="Copy citation"
                    >
                        <ClipboardText size={20} />
                    </button>
                )}
            </div>
          )}
        </div>

        <div>
          <h4 className="text-xl font-semibold text-theme-text-primary mb-2">
            {t("researchPaper.details.insights", "Key Insights")}
          </h4>
          {isLoadingInsights ? (
            <div className="text-theme-text-secondary flex items-center">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-teal-500 mr-2"></div>
              Loading insights...
            </div>
          ) : insightsError ? (
            <p className="text-red-500">{insightsError}</p>
          ) : insights.length > 0 ? (
            <ul className="list-disc list-inside text-theme-text-secondary space-y-2">
              {insights.map((insight, index) => (
                <li key={index} className="flex items-start">
                    <Sparkle size={18} className="text-yellow-400 mr-2 flex-shrink-0 mt-0.5" />
                    <span>{insight}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-theme-text-secondary">
              {t("researchPaper.details.noInsights", "No key insights extracted yet.")}
            </p>
          )}
        </div>

        {selectedPaper.fileUrl && (
          <div className="mt-8 text-center">
            <a
              href={selectedPaper.fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-teal-600 text-white rounded-full font-bold hover:bg-teal-700 transition-colors duration-300 shadow-lg"
            >
              {t("researchPaper.details.viewFullPaper", "View Full Paper")}
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
        <div className="relative mb-8">
          <div className="text-8xl mb-4 animate-pulse">📚</div>
          <div className="absolute inset-0 bg-gradient-to-r from-teal-400 to-cyan-500 rounded-full opacity-20 blur-xl animate-pulse"></div>
        </div>
        <h2 className="text-4xl font-extrabold mb-6 text-theme-text-primary bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
          {t("researchPaper.title", "Research Paper Management")}
        </h2>
        <p className="text-xl text-theme-text-secondary mb-10 max-w-2xl mx-auto leading-relaxed">
          {t("researchPaper.description", "Search and extract insights from your research papers with intelligent tools.")}
        </p>

        {/* Render the core content directly */}
        {renderMyPapersContent()}

        {/* Paper Details Modal/Overlay */}
        {selectedPaper && renderPaperDetails()}

        {/* Feature Highlights (remain unchanged) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div className="text-center p-4 rounded-xl bg-theme-bg-secondary hover:bg-theme-bg-primary transition-all duration-300 group">
            <div className="text-2xl mb-2">🧠</div>
            <h4 className="font-semibold text-theme-text-primary mb-1">AI Insights</h4>
            <p className="text-sm text-theme-text-secondary">Extract key findings automatically</p>
          </div>
          <div className="text-center p-4 rounded-xl bg-theme-bg-secondary hover:bg-theme-bg-primary transition-all duration-300 group">
            <div className="text-2xl mb-2">🔍</div>
            <h4 className="font-semibold text-theme-text-primary mb-1">Smart Search</h4>
            <p className="text-sm text-theme-text-secondary">Find relevant papers quickly</p>
          </div>
          <div className="text-center p-4 rounded-xl bg-theme-bg-secondary hover:bg-theme-bg-primary transition-all duration-300 group">
            <div className="text-2xl mb-2">🔗</div>
            <h4 className="font-semibold text-theme-text-primary mb-1">Citation Generator</h4>
            <p className="text-sm text-theme-text-secondary">Generate citations in various formats</p>
          </div>
        </div>
      </div>
    </div>
  );
}