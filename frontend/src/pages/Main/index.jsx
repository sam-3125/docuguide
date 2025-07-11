import React, { useState } from "react";
import PasswordModal, { usePasswordModal } from "@/components/Modals/Password";
import { FullScreenLoader } from "@/components/Preloader";
import Home from "./Home";
import DefaultChatContainer from "@/components/DefaultChat";
import { isMobile } from "react-device-detect";
import Sidebar, { SidebarMobileHeader } from "@/components/Sidebar";
import { userFromStorage } from "@/utils/request";

export default function Main() {
  const { loading, requiresAuth, mode } = usePasswordModal();
  const user = userFromStorage();
  const [showSidebar, setShowSidebar] = useState(true);

  return (
    <div className="w-screen h-screen bg-theme-bg-container flex">
      {/* Loader overlay */}
      {loading && <FullScreenLoader />}
      {/* Password modal overlay */}
      {!loading && requiresAuth !== false && requiresAuth !== null && <PasswordModal mode={mode} />}
      {/* Sidebar */}
      {!isMobile ? (
        <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
      ) : (
        <SidebarMobileHeader />
      )}
      {/* Main content area with proper responsive behavior */}
      <div
        className={`transition-all duration-300 flex-1 h-full main-content-area ${
          !isMobile ? (showSidebar ? 'ml-[260px]' : 'ml-[64px]') : ''
        }`}
      >
        {!!user && user?.role !== "admin" ? (
          <DefaultChatContainer />
        ) : (
          <Home />
        )}
      </div>
    </div>
  );
}
