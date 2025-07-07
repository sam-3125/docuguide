import React, { useEffect, useRef, useState } from "react";
import { Plus, List, SignOut, House, ChatCircle, Folder } from "@phosphor-icons/react";
import { SidebarSimple } from "@phosphor-icons/react";
import NewWorkspaceModal, {
  useNewWorkspaceModal,
} from "../Modals/NewWorkspace";
import ActiveWorkspaces from "./ActiveWorkspaces";
import useLogo from "@/hooks/useLogo";
import useUser from "@/hooks/useUser";
import Footer from "../Footer";
import SettingsButton from "../SettingsButton";
import usePfp from "@/hooks/usePfp";
import { userFromStorage } from "@/utils/request";
import { Link } from "react-router-dom";
import paths from "@/utils/paths";
import { useTranslation } from "react-i18next";
import { useSidebarToggle, ToggleSidebarButton } from "./SidebarToggle";
import { AUTH_TIMESTAMP, AUTH_TOKEN, AUTH_USER } from "@/utils/constants";

export default function Sidebar({ layoutMode = 'default', onLayoutModeChange, activeSection, onActiveSectionChange }) {
  const { user } = useUser();
  const { logo } = useLogo();
  const sidebarRef = useRef(null);
  const { showSidebar, setShowSidebar, canToggleSidebar } = useSidebarToggle();
  const {
    showing: showingNewWsModal,
    showModal: showNewWsModal,
    hideModal: hideNewWsModal,
  } = useNewWorkspaceModal();
  const { t } = useTranslation();
  const [workspaceExpanded, setWorkspaceExpanded] = useState(false);

  const isMinimized = layoutMode === 'minimized';

  const toggleMinimize = () => {
    const newMode = isMinimized ? 'default' : 'minimized';
    onLayoutModeChange?.(newMode);
  };

  return (
    <>
      <div
        style={{
          width: isMinimized ? '80px' : '100%',
          minWidth: isMinimized ? '80px' : 'auto',
          maxWidth: isMinimized ? '80px' : 'none',
          transition: 'all 0.3s ease'
        }}
        className="h-full"
      >
        {!isMinimized && (
          <div className="flex shrink-0 w-full justify-center my-[18px] px-4">
            <div 
              style={{
                width: '250px',
                minWidth: '250px'
              }}
              className="flex justify-between"
            >
              <Link to={paths.home()} aria-label="Home">
                <img
                  src={logo}
                  alt="Logo"
                  className="rounded max-h-[24px] object-contain transition-opacity duration-500 opacity-100"
                />
              </Link>
              {canToggleSidebar && (
                <ToggleSidebarButton
                  showSidebar={showSidebar}
                  setShowSidebar={setShowSidebar}
                />
              )}
            </div>
          </div>
        )}
        
        {/* Minimized controls - only show when minimized */}
        {isMinimized && (
          <div className="flex justify-center my-[18px] px-2">
            <button
              onClick={toggleMinimize}
              className="p-2 rounded transition-colors duration-200 hover:bg-theme-bg-primary"
              title="Expand Sidebar"
            >
              <SidebarSimple 
                size={20} 
                className="text-theme-text-primary"
                weight="fill"
              />
            </button>
          </div>
        )}
        {!isMinimized && (
          <div
            ref={sidebarRef}
            style={{
              width: 'auto',
              minWidth: '280px',
              maxWidth: '350px'
            }}
            className="relative m-[16px] rounded-[16px] bg-theme-bg-sidebar border-[2px] border-theme-sidebar-border light:border-none p-[10px] h-[calc(100%-76px)]"
          >
            <div className="flex flex-col h-full overflow-x-hidden">
              <div 
                style={{
                  minWidth: '260px'
                }}
                className="flex-grow flex flex-col"
              >
                <div className="relative h-[calc(100%-60px)] flex flex-col w-full justify-between pt-[10px] overflow-y-scroll no-scroll">
                  <div className="flex flex-col gap-y-2 pb-[60px] overflow-y-scroll no-scroll">
                    {/* Navigation Sections */}
                    <div className="flex flex-col gap-y-1 mb-4">
                      {/* Home Section */}
                      <button
                        onClick={() => onActiveSectionChange('home')}
                        className={`flex items-center gap-x-3 py-[8px] px-[12px] rounded-[6px] transition-all duration-200 ${
                          activeSection === 'home'
                            ? 'bg-theme-sidebar-item-selected text-white'
                            : 'text-theme-text-secondary hover:bg-theme-sidebar-item-hover hover:text-white'
                        }`}
                      >
                        <House size={20} weight={activeSection === 'home' ? 'fill' : 'regular'} />
                        {!isMinimized && (
                          <span className="text-sm font-medium">Home</span>
                        )}
                      </button>

                      {/* Chat Section */}
                      <button
                        onClick={() => onActiveSectionChange('chat')}
                        className={`flex items-center gap-x-3 py-[8px] px-[12px] rounded-[6px] transition-all duration-200 ${
                          activeSection === 'chat'
                            ? 'bg-theme-sidebar-item-selected text-white'
                            : 'text-theme-text-secondary hover:bg-theme-sidebar-item-hover hover:text-white'
                        }`}
                      >
                        <ChatCircle size={20} weight={activeSection === 'chat' ? 'fill' : 'regular'} />
                        {!isMinimized && (
                          <span className="text-sm font-medium">Chat</span>
                        )}
                      </button>

                      {/* Workspace Section */}
                      <div className="flex flex-col">
                        <button
                          onClick={() => {
                            if (activeSection === 'workspace') {
                              setWorkspaceExpanded(!workspaceExpanded);
                            } else {
                              onActiveSectionChange('workspace');
                              setWorkspaceExpanded(true);
                            }
                          }}
                          className={`flex items-center gap-x-3 py-[8px] px-[12px] rounded-[6px] transition-all duration-200 ${
                            activeSection === 'workspace'
                              ? 'bg-theme-sidebar-item-selected text-white'
                              : 'text-theme-text-secondary hover:bg-theme-sidebar-item-hover hover:text-white'
                          }`}
                        >
                          <Folder 
                            size={20} 
                            weight={activeSection === 'workspace' ? 'fill' : 'regular'} 
                            className={`transition-transform duration-300 ${workspaceExpanded ? 'rotate-90' : ''}`}
                          />
                          {!isMinimized && (
                            <span className="text-sm font-medium">Workspace</span>
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Workspace Content - Only show when workspace section is active and expanded */}
                    {activeSection === 'workspace' && workspaceExpanded && (
                      <div className={`overflow-hidden transition-all duration-300 ${workspaceExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                        <div className="flex gap-x-2 items-center justify-between">
                          {user && (
                            <button
                              onClick={showNewWsModal}
                              className="light:bg-[#C2E7FE] light:hover:bg-[#7CD4FD] flex flex-grow w-[75%] h-[44px] gap-x-2 py-[5px] px-2.5 mb-2 bg-white rounded-[8px] text-sidebar justify-center items-center hover:bg-opacity-80 transition-all duration-300"
                            >
                              <Plus size={18} weight="bold" />
                              <p className="text-sidebar text-sm font-semibold">
                                {t("new-workspace.title")}
                              </p>
                            </button>
                          )}
                        </div>
                        <ActiveWorkspaces isMinimized={false} />
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Footer for normal mode */}
                <div className="absolute bottom-0 left-0 right-0 pt-4 pb-3 px-3 rounded-b-[16px] bg-theme-bg-sidebar bg-opacity-80 backdrop-filter backdrop-blur-md z-1">
                  <div className="flex items-center justify-between gap-x-2">
                    <div className="flex items-center gap-x-2">
                      <UserDisplay />
                      <span className="text-white text-sm truncate max-w-[80px]">{user.username}</span>
                    </div>
                    <div className="flex items-center gap-x-2">
                      <SettingsButton />
                      <button
                        onClick={() => {
                          window.localStorage.removeItem(AUTH_USER);
                          window.localStorage.removeItem(AUTH_TOKEN);
                          window.localStorage.removeItem(AUTH_TIMESTAMP);
                          window.location.replace(paths.home());
                        }}
                        className="transition-all duration-300 p-2 rounded-full bg-theme-sidebar-footer-icon hover:bg-theme-sidebar-footer-icon-hover"
                        aria-label="Sign out"
                      >
                        <SignOut
                          className="h-5 w-5"
                          weight="fill"
                          color="var(--theme-sidebar-footer-icon-fill)"
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Minimized sidebar content */}
        {isMinimized && (
          <div
            style={{
              width: '64px',
              minWidth: '64px',
              maxWidth: '64px'
            }}
            className="relative m-[8px] rounded-[16px] bg-theme-bg-sidebar border-[2px] border-theme-sidebar-border light:border-none p-[4px] h-[calc(100%-76px)]"
          >
            <div className="flex flex-col h-full overflow-x-hidden">
              <div 
                style={{
                  width: '56px',
                  minWidth: '56px',
                  maxWidth: '56px'
                }}
                className="flex-grow flex flex-col"
              >
                <div className="relative h-[calc(100%-60px)] flex flex-col w-full justify-between pt-[10px] overflow-y-scroll no-scroll">
                  <div className="flex flex-col gap-y-2 pb-[60px] overflow-y-scroll no-scroll">
                    {/* Navigation Sections - Minimized */}
                    <div className="flex flex-col gap-y-1 mb-4">
                      {/* Home Section */}
                      <button
                        onClick={() => onActiveSectionChange('home')}
                        className={`flex items-center justify-center py-[8px] px-[12px] rounded-[6px] transition-all duration-200 ${
                          activeSection === 'home'
                            ? 'bg-theme-sidebar-item-selected text-white'
                            : 'text-theme-text-secondary hover:bg-theme-sidebar-item-hover hover:text-white'
                        }`}
                      >
                        <House size={20} weight={activeSection === 'home' ? 'fill' : 'regular'} />
                      </button>

                      {/* Chat Section */}
                      <button
                        onClick={() => onActiveSectionChange('chat')}
                        className={`flex items-center justify-center py-[8px] px-[12px] rounded-[6px] transition-all duration-200 ${
                          activeSection === 'chat'
                            ? 'bg-theme-sidebar-item-selected text-white'
                            : 'text-theme-text-secondary hover:bg-theme-sidebar-item-hover hover:text-white'
                        }`}
                      >
                        <ChatCircle size={20} weight={activeSection === 'chat' ? 'fill' : 'regular'} />
                      </button>

                      {/* Workspace Section */}
                      <button
                        onClick={() => {
                          if (activeSection === 'workspace') {
                            setWorkspaceExpanded(!workspaceExpanded);
                          } else {
                            onActiveSectionChange('workspace');
                            setWorkspaceExpanded(true);
                          }
                        }}
                        className={`flex items-center justify-center py-[8px] px-[12px] rounded-[6px] transition-all duration-200 ${
                          activeSection === 'workspace'
                            ? 'bg-theme-sidebar-item-selected text-white'
                            : 'text-theme-text-secondary hover:bg-theme-sidebar-item-hover hover:text-white'
                        }`}
                      >
                        <Folder 
                          size={20} 
                          weight={activeSection === 'workspace' ? 'fill' : 'regular'} 
                          className={`transition-transform duration-300 ${workspaceExpanded ? 'rotate-90' : ''}`}
                        />
                      </button>
                    </div>

                    {/* Workspace Content - Only show when workspace section is active and expanded */}
                    {activeSection === 'workspace' && workspaceExpanded && (
                      <div className={`overflow-hidden transition-all duration-300 ${workspaceExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                        <div className="flex justify-center">
                          {user && (
                            <button
                              onClick={showNewWsModal}
                              className="light:bg-[#C2E7FE] light:hover:bg-[#7CD4FD] flex w-[48px] h-[32px] justify-center mb-2 bg-white rounded-[8px] text-sidebar justify-center items-center hover:bg-opacity-80 transition-all duration-300"
                            >
                              <Plus size={16} weight="bold" />
                            </button>
                          )}
                        </div>
                        <div className="overflow-hidden">
                          <ActiveWorkspaces isMinimized={true} />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Footer for minimized mode */}
                <div className="absolute bottom-0 left-0 right-0 pt-4 pb-3 px-2 rounded-b-[16px] bg-theme-bg-sidebar bg-opacity-80 backdrop-filter backdrop-blur-md z-1">
                  <div className="flex items-center justify-center flex-col gap-y-2">
                    <UserDisplay />
                    <SettingsButton />
                    <button
                      onClick={() => {
                        window.localStorage.removeItem(AUTH_USER);
                        window.localStorage.removeItem(AUTH_TOKEN);
                        window.localStorage.removeItem(AUTH_TIMESTAMP);
                        window.location.replace(paths.home());
                      }}
                      className="transition-all duration-300 p-2 rounded-full bg-theme-sidebar-footer-icon hover:bg-theme-sidebar-footer-icon-hover"
                      aria-label="Sign out"
                    >
                      <SignOut
                        className="h-5 w-5"
                        weight="fill"
                        color="var(--theme-sidebar-footer-icon-fill)"
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {showingNewWsModal && <NewWorkspaceModal hideModal={hideNewWsModal} />}
      </div>
    </>
  );
}

export function SidebarMobileHeader() {
  const { logo } = useLogo();
  const sidebarRef = useRef(null);
  const [showSidebar, setShowSidebar] = useState(false);
  const [showBgOverlay, setShowBgOverlay] = useState(false);
  const {
    showing: showingNewWsModal,
    showModal: showNewWsModal,
    hideModal: hideNewWsModal,
  } = useNewWorkspaceModal();
  const { user } = useUser();
  const { t } = useTranslation();

  useEffect(() => {
    // Darkens the rest of the screen
    // when sidebar is open.
    function handleBg() {
      if (showSidebar) {
        setTimeout(() => {
          setShowBgOverlay(true);
        }, 300);
      } else {
        setShowBgOverlay(false);
      }
    }
    handleBg();
  }, [showSidebar]);

  return (
    <>
      <div
        aria-label="Show sidebar"
        className="fixed top-0 left-0 right-0 z-10 flex justify-between items-center px-4 py-2 bg-theme-bg-sidebar light:bg-white text-slate-200 shadow-lg h-16"
      >
        <button
          onClick={() => setShowSidebar(true)}
          className="rounded-md p-2 flex items-center justify-center text-theme-text-secondary"
        >
          <List className="h-6 w-6" />
        </button>
        <div className="flex items-center justify-center flex-grow">
          <img
            src={logo}
            alt="Logo"
            className="block mx-auto h-6 w-auto"
            style={{ maxHeight: "40px", objectFit: "contain" }}
          />
        </div>
        <div className="w-12"></div>
      </div>
      <div
        style={{
          transform: showSidebar ? `translateX(0vw)` : `translateX(-100vw)`,
        }}
        className={`z-99 fixed top-0 left-0 transition-all duration-500 w-[100vw] h-[100vh]`}
      >
        <div
          className={`${
            showBgOverlay
              ? "transition-all opacity-1"
              : "transition-none opacity-0"
          }  duration-500 fixed top-0 left-0 bg-theme-bg-secondary bg-opacity-75 w-screen h-screen`}
          onClick={() => setShowSidebar(false)}
        />
        <div
          ref={sidebarRef}
          className="relative h-[100vh] fixed top-0 left-0  rounded-r-[26px] bg-theme-bg-sidebar w-[80%] p-[18px] "
        >
          <div className="w-full h-full flex flex-col overflow-x-hidden items-between">
            {/* Header Information */}
            <div className="flex w-full items-center justify-between gap-x-4">
              <div className="flex shrink-1 w-fit items-center justify-start">
                <img
                  src={logo}
                  alt="Logo"
                  className="rounded w-full max-h-[40px]"
                  style={{ objectFit: "contain" }}
                />
              </div>
              {user && (
                <div className="flex gap-x-2 items-center text-slate-500 shink-0">
                  <SettingsButton />
                </div>
              )}
            </div>

            {/* Primary Body */}
            <div className="h-full flex flex-col w-full justify-between pt-4 ">
              <div className="h-auto md:sidebar-items">
                <div className=" flex flex-col gap-y-4 overflow-y-scroll no-scroll pb-[60px]">
                  <div className="flex gap-x-2 items-center justify-between">
                    {user && (
                      <button
                        onClick={showNewWsModal}
                        className="flex flex-grow w-[75%] h-[44px] gap-x-2 py-[5px] px-4 bg-white rounded-lg text-sidebar justify-center items-center hover:bg-opacity-80 transition-all duration-300"
                      >
                        <Plus className="h-5 w-5" />
                        <p className="text-sidebar text-sm font-semibold">
                          {t("new-workspace.title")}
                        </p>
                      </button>
                    )}
                  </div>
                  <ActiveWorkspaces />
                </div>
              </div>
              <div className="z-99 absolute bottom-0 left-0 right-0 pt-2 pb-6 px-3 rounded-br-[26px] bg-theme-bg-sidebar bg-opacity-80 backdrop-filter backdrop-blur-md">
                <div className="flex items-center justify-between gap-x-2">
                  <div className="flex items-center gap-x-2">
                    <UserDisplay />
                    <span className="text-white text-sm truncate max-w-[80px]">{user.username}</span>
                  </div>
                  <div className="flex items-center gap-x-2">
                    <SettingsButton />
                    <button
                      onClick={() => {
                        window.localStorage.removeItem(AUTH_USER);
                        window.localStorage.removeItem(AUTH_TOKEN);
                        window.localStorage.removeItem(AUTH_TIMESTAMP);
                        window.location.replace(paths.home());
                      }}
                      className="transition-all duration-300 p-2 rounded-full bg-theme-sidebar-footer-icon hover:bg-theme-sidebar-footer-icon-hover"
                      aria-label="Sign out"
                    >
                      <SignOut
                        className="h-5 w-5"
                        weight="fill"
                        color="var(--theme-sidebar-footer-icon-fill)"
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {showingNewWsModal && <NewWorkspaceModal hideModal={hideNewWsModal} />}
      </div>
    </>
  );
}

function UserDisplay() {
  const { pfp } = usePfp();
  const user = userFromStorage();

  if (pfp) {
    return (
      <div className="w-[24px] h-[24px] rounded-full flex-shrink-0 overflow-hidden transition-all duration-300 bg-gray-100">
        <img
          src={pfp}
          alt="User profile picture"
          className="w-full h-full object-cover"
        />
      </div>
    );
  }

  return (
    <div className="w-[24px] h-[24px] rounded-full flex items-center justify-center bg-theme-sidebar-footer-icon text-white text-xs font-semibold">
      {user?.username?.slice(0, 2) || "AA"}
    </div>
  );
}
