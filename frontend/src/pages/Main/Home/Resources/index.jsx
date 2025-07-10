import paths from "@/utils/paths";
import { ArrowCircleUpRight } from "@phosphor-icons/react";
import { useTranslation } from "react-i18next";
import { KEYBOARD_SHORTCUTS_HELP_EVENT } from "@/utils/keyboardShortcuts";

export default function Resources() {
  const { t } = useTranslation();
  const showKeyboardShortcuts = () => {
    window.dispatchEvent(
      new CustomEvent(KEYBOARD_SHORTCUTS_HELP_EVENT, { detail: { show: true } })
    );
  };

  return (
    <div className="mt-12 sm:mt-16 md:mt-20 py-8 sm:py-12 md:py-16">
      <h1 className="text-theme-home-text uppercase text-sm font-semibold mb-4">
        {t("main-page.resources.title")}
      </h1>
      <div className="flex flex-col sm:flex-row gap-y-2 gap-x-6 w-full p-2 sm:p-4 md:p-6">
        <a
          target="_blank"
          rel="noopener noreferrer "
          href={paths.docs()}
          className="text-theme-home-text text-sm flex items-center gap-x-2 hover:opacity-70"
        >
          {t("main-page.resources.links.docs")}
          <ArrowCircleUpRight weight="fill" size={16} />
        </a>
        <a
          href={paths.github()}
          target="_blank"
          rel="noopener noreferrer"
          className="text-theme-home-text text-sm flex items-center gap-x-2 hover:opacity-70"
        >
          {t("main-page.resources.links.star")}
          <ArrowCircleUpRight weight="fill" size={16} />
        </a>
        <button
          onClick={showKeyboardShortcuts}
          className="text-theme-home-text text-sm flex items-center gap-x-2 hover:opacity-70"
        >
          {t("main-page.resources.keyboardShortcuts")}
          <ArrowCircleUpRight weight="fill" size={16} />
        </button>
      </div>
    </div>
  );
}
