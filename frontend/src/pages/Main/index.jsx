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

  if (loading) return <FullScreenLoader />;
  if (requiresAuth !== false)
    return <>{requiresAuth !== null && <PasswordModal mode={mode} />}</>;

  const user = userFromStorage();
  const [showSidebar, setShowSidebar] = useState(true);

  return (
    <div className="w-screen h-screen overflow-hidden bg-theme-bg-container flex">
      {/* Sidebar */}
      {!isMobile ? (
        <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
      ) : (
        <SidebarMobileHeader />
      )}
      {/* Main content with dynamic left margin */}
      <div
        className={`transition-all duration-300 flex-1 h-full overflow-y-auto ${!isMobile ? (showSidebar ? 'ml-[260px]' : 'ml-[64px]') : ''}`}
      >
        {!!user && user?.role !== "admin" ? <DefaultChatContainer /> : <Home />}
      </div>
    </div>
  );
}
