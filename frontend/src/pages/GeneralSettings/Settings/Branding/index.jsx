import Sidebar from "@/components/SettingsSidebar";
import { isMobile } from "react-device-detect";
import FooterCustomization from "../components/FooterCustomization";
import SupportEmail from "../components/SupportEmail";
import CustomLogo from "../components/CustomLogo";
import CustomMessages from "../components/CustomMessages";
import { useTranslation } from "react-i18next";
import CustomAppName from "../components/CustomAppName";
import CustomSiteSettings from "../components/CustomSiteSettings";
import { Link } from "react-router-dom";
import { ArrowUUpLeft } from "@phosphor-icons/react";

// Reusable BackButton component
function BackButton({ to, className = "" }) {
  return (
    <Link
      to={to}
      className={
        "absolute top-2 left-2 md:top-4 md:left-4 transition-all duration-300 p-2 rounded-full text-white bg-theme-sidebar-footer-icon hover:bg-theme-sidebar-footer-icon-hover z-10 " +
        className
      }
    >
      <ArrowUUpLeft className="h-5 w-5" weight="fill" />
    </Link>
  );
}

export default function BrandingSettings() {
  const { t } = useTranslation();

  return (
    <div className="w-screen h-screen overflow-hidden bg-theme-bg-container flex">
      <Sidebar />
      <div
        style={{ height: isMobile ? "100%" : "calc(100% - 32px)" }}
        className="relative md:ml-[2px] md:mr-[16px] md:my-[16px] md:rounded-[16px] bg-theme-bg-secondary w-full h-full overflow-y-scroll p-4 md:p-0"
      >
        {/* Back button at the top left */}
        <BackButton to="/" />
        <div className="flex flex-col w-full px-1 md:pl-6 md:pr-[86px] md:py-6 py-16">
          <div className="w-full flex flex-col gap-y-1 pb-6 border-white light:border-theme-sidebar-border border-b-2 border-opacity-10">
            <div className="items-center">
              <p className="text-lg leading-6 font-bold text-white">
                {t("customization.branding.title")}
              </p>
            </div>
            <p className="text-xs leading-[18px] font-base text-white text-opacity-60">
              {t("customization.branding.description")}
            </p>
          </div>
          <CustomAppName />
          <CustomLogo />
          <CustomMessages />
          <FooterCustomization />
          <SupportEmail />
          <CustomSiteSettings />
        </div>
      </div>
    </div>
  );
}
