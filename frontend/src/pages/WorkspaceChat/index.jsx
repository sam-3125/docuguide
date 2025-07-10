import React, { useEffect, useState } from "react";
import { default as WorkspaceChatContainer } from "@/components/WorkspaceChat";
import Sidebar from "@/components/Sidebar";
import MiddlePanel from "@/components/MiddlePanel";
import HomePanel from "@/components/HomePanel";
import { useParams } from "react-router-dom";
import Workspace from "@/models/workspace";
import PasswordModal, { usePasswordModal } from "@/components/Modals/Password";
import { isMobile } from "react-device-detect";
import { FullScreenLoader } from "@/components/Preloader";
import { ArrowsIn, ArrowsOut } from "@phosphor-icons/react";
import UserButton from "@/components/UserMenu/UserButton";
import { ManageWorkspaceProvider } from "@/components/Modals/ManageWorkspace";

// Layout modes
const LAYOUT_MODES = {
  DEFAULT: 'default',    // Chat on right, space in middle
  FULLSCREEN: 'fullscreen', // Current layout (chat full width)
  MINIMIZED: 'minimized'  // Collapsed sidebar
};

export default function WorkspaceChat() {
  const { loading, requiresAuth, mode } = usePasswordModal();

  if (loading) return <FullScreenLoader />;
  if (requiresAuth !== false) {
    return <>{requiresAuth !== null && <PasswordModal mode={mode} />}</>;
  }

  return (
    <ManageWorkspaceProvider>
      <ShowWorkspaceChat />
    </ManageWorkspaceProvider>
  );
}

function ShowWorkspaceChat() {
  const { slug } = useParams();
  const [workspace, setWorkspace] = useState(null);
  const [loading, setLoading] = useState(true);
  const [layoutMode, setLayoutMode] = useState(LAYOUT_MODES.DEFAULT);
  const [chatWidth, setChatWidth] = useState(400);
  const [isResizing, setIsResizing] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    async function getWorkspace() {
      if (!slug) return;
      const _workspace = await Workspace.bySlug(slug);
      if (!_workspace) {
        setLoading(false);
        return;
      }
      const suggestedMessages = await Workspace.getSuggestedMessages(slug);
      const pfpUrl = await Workspace.fetchPfp(slug);
      setWorkspace({
        ..._workspace,
        suggestedMessages,
        pfpUrl,
      });
      setLoading(false);
    }
    getWorkspace();
  }, [slug]);

  const getLayoutClasses = () => {
    switch (layoutMode) {
      case LAYOUT_MODES.DEFAULT:
        return {
          sidebar: "w-[320px]",
          chat: "w-[400px]",
          middle: "flex-1"
        };
      case LAYOUT_MODES.FULLSCREEN:
        return {
          sidebar: "w-[320px]",
          chat: "flex-1",
          middle: "hidden"
        };
      case LAYOUT_MODES.MINIMIZED:
        return {
          sidebar: "w-[80px]",
          chat: "w-[400px]",
          middle: "flex-1"
        };
      default:
        return {
          sidebar: "w-[320px]",
          chat: "w-[400px]",
          middle: "flex-1"
        };
    }
  };

  const layoutClasses = getLayoutClasses();

  // Resize handlers
  const handleMouseDown = (e) => {
    e.preventDefault();
    setIsResizing(true);
  };

  const handleMouseMove = (e) => {
    if (!isResizing) return;

    const newWidth = window.innerWidth - e.clientX;
    const minWidth = window.innerWidth * 0.35;
    const maxWidth = window.innerWidth * 0.75;

    if (newWidth >= minWidth && newWidth <= maxWidth) {
      setChatWidth(newWidth);
    }
  };

  const handleMouseUp = () => {
    setIsResizing(false);
  };

  useEffect(() => {
    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none';

      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        document.body.style.cursor = '';
        document.body.style.userSelect = '';
      };
    }
  }, [isResizing]);

  // Get chat width based on layout mode
  const getChatWidth = () => {
    if (layoutMode === LAYOUT_MODES.FULLSCREEN) {
      return 'flex-1';
    }
    return `${chatWidth}px`;
  };

  return (
    <>
      <div className="w-screen h-screen overflow-hidden bg-theme-bg-container flex items-stretch">
        {/* Sidebar */}
        <div
          style={{
            width: layoutMode === LAYOUT_MODES.MINIMIZED ? '80px' : layoutMode === LAYOUT_MODES.DEFAULT ? '320px' : '320px',
            minWidth: layoutMode === LAYOUT_MODES.MINIMIZED ? '80px' : layoutMode === LAYOUT_MODES.DEFAULT ? '280px' : '280px',
            maxWidth: layoutMode === LAYOUT_MODES.MINIMIZED ? '80px' : '350px',
            transition: 'all 0.3s ease'
          }}
          className="flex-shrink-0 h-full"
        >
          {!isMobile && (
            <Sidebar
              layoutMode={layoutMode}
              onLayoutModeChange={setLayoutMode}
              activeSection={activeSection}
              onActiveSectionChange={setActiveSection}
            />
          )}
        </div>

        {/* Main Content Area */}
        <div
          className={`${activeSection === 'home' ? 'flex-1 h-full overflow-y-auto' : (layoutMode === LAYOUT_MODES.FULLSCREEN ? 'hidden' : 'flex-1 h-full')}`}
        >
          {activeSection === 'home' && <HomePanel key={`home-${Date.now()}`} />}
          {activeSection === 'chat' && <MiddlePanel workspace={workspace} />}
          {activeSection === 'workspace' && <MiddlePanel workspace={workspace} />}
        </div>

        {/* Chat Container - Only show when not on home page */}
        {activeSection !== 'home' && (
          <div
            style={{
              width: getChatWidth(),
              minWidth: layoutMode === LAYOUT_MODES.FULLSCREEN ? 'auto' : `${window.innerWidth * 0.25}px`,
              maxWidth: layoutMode === LAYOUT_MODES.FULLSCREEN ? 'none' : `${window.innerWidth * 0.75}px`
            }}
            className={`transition-all duration-300 flex-shrink-0 relative h-full ${layoutMode === LAYOUT_MODES.FULLSCREEN ? 'flex-1' : ''}`}
          >
            <div className="h-full p-4">
              <WorkspaceChatContainer loading={loading} workspace={workspace} />
            </div>

            {/* Layout Controls */}
            <div className="absolute top-4 right-4 flex gap-2 z-10">
              {/* Expand/Collapse Chat */}
              <button
                onClick={() => setLayoutMode(layoutMode === LAYOUT_MODES.FULLSCREEN ? LAYOUT_MODES.DEFAULT : LAYOUT_MODES.FULLSCREEN)}
                className="p-2 rounded-lg bg-theme-bg-secondary hover:bg-theme-bg-primary transition-colors duration-200"
                title={layoutMode === LAYOUT_MODES.FULLSCREEN ? "Collapse Chat" : "Expand Chat"}
              >
                {layoutMode === LAYOUT_MODES.FULLSCREEN ? (
                  <ArrowsIn size={20} className="text-theme-text-primary" />
                ) : (
                  <ArrowsOut size={20} className="text-theme-text-primary" />
                )}
              </button>
            </div>

            {/* Resize Handle - Only show when not in fullscreen mode */}
            {layoutMode !== LAYOUT_MODES.FULLSCREEN && (
              <div
                className={`absolute left-0 top-0 bottom-0 w-1 transition-colors duration-200 z-20 ${
                  isResizing ? 'bg-blue-500' : 'bg-transparent hover:bg-blue-400'
                }`}
                onMouseDown={handleMouseDown}
                style={{ cursor: 'col-resize' }}
              />
            )}
          </div>
        )}
      </div>

      {/* User Button - Only show when chat is expanded */}
      {layoutMode === LAYOUT_MODES.FULLSCREEN && !isMobile && (
        <div className="absolute top-3 right-4 md:top-9 md:right-10 w-fit h-fit z-40">
          <UserButton />
        </div>
      )}
    </>
  );
}
