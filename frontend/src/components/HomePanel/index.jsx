import React, { useRef } from "react";
import { useTranslation } from "react-i18next";
import {
  FileText,
  Brain,
  MagnifyingGlass, // <--- Change 'Search' to 'MagnifyingGlass' here
  PresentationChart,
  Shield,
  Lightning,
  ArrowRight,
  Star,
  Cpu,
  Database,
  Cloud,
  Upload,
  // Remove Search from here as it's replaced by MagnifyingGlass
  ChartLine,
  FileSearch,
  Robot,
  Sparkle,
  Lock,
  Globe,
  Users
} from "@phosphor-icons/react";
import { motion } from "framer-motion";
import { useNewWorkspaceModal } from "@/components/Modals/NewWorkspace";
import NewWorkspaceModal from "@/components/Modals/NewWorkspace";
import Workspace from "@/models/workspace";
import paths from "@/utils/paths";
import { useNavigate } from "react-router-dom";

// Animation variants
const containerStagger = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15
    }
  }
};

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const floatingAnimation = {
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

const pulseGlow = {
  animate: {
    scale: [1, 1.05, 1],
    opacity: [0.7, 1, 0.7],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

export default function HomePanel() {
  const { t } = useTranslation();
  const featuresRef = useRef(null);
  const navigate = useNavigate();
  const {
    showing: showingNewWsModal,
    showModal: showNewWsModal,
    hideModal: hideNewWsModal,
  } = useNewWorkspaceModal();

  const features = [
    {
      icon: <FileText size={28} className="text-blue-500" />,
      title: "Document Management",
      description: "Upload, organize, and manage all your documents in one place."
    },
    {
      icon: <Brain size={28} className="text-green-500" />,
      title: "AI‑Powered Analysis",
      description: "Intelligent document processing and insightful content extraction."
    },
    {
      icon: <MagnifyingGlass size={28} className="text-purple-500" />, // <--- Change 'Search' to 'MagnifyingGlass' here
      title: "Smart Search",
      description: "Find information instantly across all your documents."
    },
    {
      icon: <PresentationChart size={28} className="text-orange-500" />,
      title: "Visualization Tools",
      description: "Generate presentations and mind maps from your content."
    },
    {
      icon: <Shield size={28} className="text-indigo-500" />,
      title: "Patent Tools",
      description: "Comprehensive patent search and drafting capabilities."
    },
    {
      icon: <Lightning size={28} className="text-yellow-500" />,
      title: "Lightning Fast",
      description: "Optimized performance for quick document processing."
    }
  ];

  const detailedFeatures = [
    {
      icon: <Upload size={32} className="text-blue-500" />,
      title: "Advanced Document Upload",
      description: "Support for multiple file formats including PDF, DOCX, TXT, and more. Drag-and-drop interface with batch processing capabilities.",
      benefits: ["Multi-format support", "Batch processing", "Drag-and-drop", "Auto-organization"]
    },
    {
      icon: <Brain size={32} className="text-green-500" />,
      title: "AI-Powered Content Analysis",
      description: "Advanced natural language processing to extract key insights, summarize content, and identify important patterns in your documents.",
      benefits: ["Content summarization", "Key insight extraction", "Pattern recognition", "Smart categorization"]
    },
    {
      icon: <MagnifyingGlass size={32} className="text-purple-500" />, // <--- Change 'Search' to 'MagnifyingGlass' here
      title: "Intelligent Search & Discovery",
      description: "Semantic search capabilities that understand context and meaning, not just keywords. Find relevant information across your entire document library.",
      benefits: ["Semantic search", "Context understanding", "Cross-document search", "Smart suggestions"]
    },
    {
      icon: <ChartLine size={32} className="text-orange-500" />,
      title: "Data Visualization & Analytics",
      description: "Transform your document data into interactive charts, graphs, and visual representations. Create compelling presentations automatically.",
      benefits: ["Interactive charts", "Auto-presentations", "Data insights", "Visual storytelling"]
    },
    {
      icon: <FileSearch size={32} className="text-indigo-500" />,
      title: "Patent Research & Analysis",
      description: "Comprehensive patent search tools with prior art analysis, patent landscape mapping, and automated patent drafting assistance.",
      benefits: ["Prior art search", "Landscape mapping", "Drafting assistance", "Competitive analysis"]
    },
    {
      icon: <Robot size={32} className="text-yellow-500" />,
      title: "AI Assistant & Automation",
      description: "Intelligent automation for document workflows, automated tagging, and AI-powered recommendations for document organization.",
      benefits: ["Workflow automation", "Smart tagging", "AI recommendations", "Process optimization"]
    }
  ];

  const handleGetStarted = async () => {
    // Try to create a workspace named 'default'.
    let workspace;
    try {
      const res = await Workspace.new({ name: "default" });
      workspace = res.workspace;
      // If workspace already exists, backend should return the existing one or error.
      // If error, try to fetch all workspaces and find 'default'.
      if (!workspace) {
        const all = await Workspace.all?.();
        workspace = all?.find(w => w.name === "default");
      }
      if (workspace) {
        window.dispatchEvent(new Event("workspaceListShouldRefresh"));
        navigate(paths.workspace.chat(workspace.slug));
      } else {
        showNewWsModal();
      }
    } catch (e) {
      showNewWsModal();
    }
  };

  const handleLearnMore = () => {
    // Scroll to features section
    featuresRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  };

  return (
    <div className="h-full w-full overflow-y-auto scrollbar-hide bg-gradient-to-br from-[#f7f9ff] via-[#f4f7ff] to-white dark:from-theme-bg-container dark:via-theme-bg-primary dark:to-theme-bg-container relative">
      {/* Tech Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Tech Icons */}
        <motion.div
          className="absolute top-20 left-10 text-blue-400/20"
          {...floatingAnimation}
        >
          <Cpu size={40} />
        </motion.div>
        <motion.div
          className="absolute top-40 right-20 text-purple-400/20"
          {...floatingAnimation}
          animate={{ ...floatingAnimation.animate, y: [0, 15, 0] }}
        >
          <Database size={32} />
        </motion.div>
        <motion.div
          className="absolute bottom-40 left-20 text-green-400/20"
          {...floatingAnimation}
          animate={{ ...floatingAnimation.animate, y: [0, -15, 0] }}
        >
          <Cloud size={36} />
        </motion.div>

        {/* Animated Grid Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(59, 130, 246, 0.3) 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }} />
        </div>
      </div>

      {/* Decorative blobs with enhanced animations */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-purple-400 opacity-20 blur-3xl"
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute bottom-0 -right-40 h-[28rem] w-[28rem] rounded-full bg-blue-400 opacity-20 blur-3xl"
        animate={{
          scale: [1.1, 1, 1.1],
          rotate: [360, 180, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      <motion.section
        initial="hidden"
        animate="show"
        variants={containerStagger}
        className="w-full max-w-4xl mx-auto px-4 py-8 md:py-16 text-center flex flex-col items-center justify-start min-h-full"
        style={{
          marginLeft: 'calc(50% - 200px)',
          marginRight: 'auto',
          transform: 'translateX(-50%)'
        }}
      >
        {/* Hero */}
        <motion.div variants={fadeInUp} className="flex flex-col items-center w-full max-w-4xl pt-8 md:pt-16">
          <motion.div
            className="mb-6 relative"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.span
              className="inline-block rounded-full bg-gradient-to-r from-blue-500 via-purple-600 to-indigo-600 px-6 py-2 text-sm font-semibold uppercase tracking-wide text-white shadow-lg shadow-purple-500/30"
              animate={{
                boxShadow: [
                  "0 10px 25px rgba(147, 51, 234, 0.3)",
                  "0 15px 35px rgba(147, 51, 234, 0.5)",
                  "0 10px 25px rgba(147, 51, 234, 0.3)"
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {t("home.tagline", "Next-Gen Document Intelligence")}
            </motion.span>
          </motion.div>

          <motion.h1
            className="mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-4xl md:text-5xl lg:text-7xl font-extrabold leading-tight tracking-tight text-transparent"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            DocuGuide
          </motion.h1>

          <motion.p
            className="mx-auto mb-8 md:mb-10 max-w-2xl text-base md:text-lg lg:text-xl leading-relaxed text-theme-text-secondary px-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {t(
              "home.hero",
              "Transform documents into actionable insights with cutting-edge AI. Process, analyze, and visualize any document in real-time."
            )}
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            <motion.button
              onClick={handleGetStarted}
              className="w-full sm:w-auto flex h-12 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 px-6 md:px-8 text-base md:text-lg font-semibold text-white shadow-lg shadow-purple-500/20 transition-all hover:scale-105 hover:shadow-xl"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              {t("home.getStarted", "Get Started")}
              <ArrowRight size={20} />
            </motion.button>

            <motion.button
              onClick={handleLearnMore}
              className="w-full sm:w-auto h-12 rounded-2xl border border-theme-border bg-transparent px-6 md:px-8 text-base md:text-lg font-semibold text-theme-text-primary hover:bg-theme-bg-secondary transition-colors"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              {t("home.learnMore", "Learn More")}
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Features */}
        <motion.div
          variants={fadeInUp}
          className="mt-12 md:mt-20 grid w-full grid-cols-1 gap-4 md:gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl"
        >
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              variants={fadeInUp}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group"
            >
              <div className="h-full rounded-2xl md:rounded-3xl border border-theme-border/40 bg-theme-bg-secondary/60 backdrop-blur-md transition-all hover:border-transparent hover:bg-white/90 dark:hover:bg-theme-bg-primary/80 hover:shadow-xl">
                <div className="flex flex-col gap-3 md:gap-4 p-4 md:p-6">
                  <motion.div
                    className="flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-xl bg-theme-bg-primary group-hover:scale-110 transition-transform"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    {feature.icon}
                  </motion.div>
                  <h3 className="text-base md:text-lg font-semibold text-theme-text-primary">
                    {feature.title}
                  </h3>
                  <p className="text-xs md:text-sm leading-relaxed text-theme-text-secondary">
                    {feature.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats */}
        <motion.div variants={fadeInUp} className="mt-12 md:mt-24 grid w-full grid-cols-1 gap-4 md:gap-6 sm:grid-cols-3 max-w-4xl">
          <Stat number="10K+" label={t("home.stats.docs", "Documents Processed")} />
          <Stat number="99.9%" label={t("home.stats.acc", "Accuracy Rate")} />
          <Stat number="24/7" label={t("home.stats.ai", "AI Processing")} />
        </motion.div>

        {/* Testimonial */}
        <motion.div
          variants={fadeInUp}
          className="relative mt-12 md:mt-24 w-full max-w-3xl rounded-2xl md:rounded-3xl bg-theme-bg-secondary/60 p-6 md:p-10 shadow-xl backdrop-blur-md mx-auto mb-8 md:mb-16"
          whileHover={{ scale: 1.02 }}
        >
          <div className="mb-4 flex items-center justify-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: i * 0.1, duration: 0.3 }}
              >
                <Star size={20} className="md:w-6 md:h-6 fill-current text-yellow-500" />
              </motion.div>
            ))}
          </div>
          <blockquote className="text-lg md:text-xl italic text-theme-text-primary">
            {t(
              "home.testimonial",
              "\"DocuGuide has revolutionized our research workflow. The AI insights are incredibly accurate and the interface is intuitive.\""
            )}
          </blockquote>
          <cite className="mt-4 block text-xs md:text-sm font-medium not-italic text-theme-text-secondary">
            — Sarah Johnson, Research Director
          </cite>
        </motion.div>
      </motion.section>

      {/* Detailed Features Section */}
      <section ref={featuresRef} className="w-full max-w-6xl mx-auto px-4 py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-theme-text-primary mb-4">
            Powerful Features for Modern Workflows
          </h2>
          <p className="text-lg text-theme-text-secondary max-w-3xl mx-auto">
            Discover how DocuGuide transforms the way you work with documents through cutting-edge AI technology and intuitive design.
          </p>
        </motion.div>

        image.png        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          {detailedFeatures.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="group"
            >
              <div className="bg-theme-bg-secondary/60 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-theme-border/40 hover:border-theme-border/60 transition-all hover:shadow-xl">
                <div className="flex items-start gap-4 mb-4">
                  <div className="flex-shrink-0 p-3 rounded-xl bg-theme-bg-primary group-hover:scale-110 transition-transform">
                    {feature.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-theme-text-primary mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-theme-text-secondary leading-relaxed mb-4">
                      {feature.description}
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      {feature.benefits.map((benefit, benefitIdx) => (
                        <div key={benefitIdx} className="flex items-center gap-2 text-sm">
                          <Sparkle size={16} className="text-blue-500 flex-shrink-0" />
                          <span className="text-theme-text-secondary">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mt-16 md:mt-24"
        >
          <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-3xl p-8 md:p-12 border border-theme-border/40">
            <h3 className="text-2xl md:text-3xl font-bold text-theme-text-primary mb-4">
              Ready to Transform Your Document Workflow?
            </h3>
            <p className="text-theme-text-secondary mb-6 max-w-2xl mx-auto">
              Join thousands of professionals who are already using DocuGuide to streamline their document processes and unlock new insights.
            </p>
            <motion.button
              onClick={handleGetStarted}
              className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all hover:scale-105"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Your Free Trial
              <ArrowRight size={20} />
            </motion.button>
          </div>
        </motion.div>
      </section>
      {showingNewWsModal && <NewWorkspaceModal hideModal={hideNewWsModal} />}
    </div>
  );
}

// Helper component for stats
function Stat({ number, label }) {
  return (
    <motion.div
      whileInView={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.4 }}
      className="rounded-xl md:rounded-2xl border border-theme-border/40 bg-theme-bg-secondary/60 p-4 md:p-6 backdrop-blur-md text-center"
      whileHover={{ scale: 1.05, y: -5 }}
    >
      <motion.div
        className="mb-2 text-2xl md:text-4xl font-bold text-blue-500"
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        transition={{ duration: 0.5, type: "spring" }}
      >
        {number}
      </motion.div>
      <div className="text-xs md:text-sm text-theme-text-secondary">{label}</div>
    </motion.div>
  );
}
