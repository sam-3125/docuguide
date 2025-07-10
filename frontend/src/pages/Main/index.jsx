import React from "react";
import PasswordModal, { usePasswordModal } from "@/components/Modals/Password";
import { FullScreenLoader } from "@/components/Preloader";
import Home from "./Home";
import DefaultChatContainer from "@/components/DefaultChat";
import { isMobile } from "react-device-detect";
import Sidebar, { SidebarMobileHeader } from "@/components/Sidebar";
import { userFromStorage } from "@/utils/request";
import useLogo from "@/hooks/useLogo";

export default function Main() {
  const { loading, requiresAuth, mode } = usePasswordModal();
  const { logo } = useLogo();

  if (loading) return <FullScreenLoader />;
  if (requiresAuth !== false)
    return <>{requiresAuth !== null && <PasswordModal mode={mode} />}</>;

  const user = userFromStorage();
  return (
    <div className="w-screen h-screen overflow-hidden bg-theme-bg-container flex flex-col">
      {/* Logo always visible at the top */}
      <div className="flex items-center justify-center py-4 bg-theme-bg-sidebar">
        <img
          src={logo}
          alt="Logo"
          className="rounded max-h-[32px] object-contain transition-opacity duration-500 opacity-100"
        />
      </div>
      <div className="flex flex-1">
        {!isMobile ? <Sidebar /> : <SidebarMobileHeader />}
        {!!user && user?.role !== "admin" ? <DefaultChatContainer /> : <Home />}
      </div>
    </div>
  );
}
