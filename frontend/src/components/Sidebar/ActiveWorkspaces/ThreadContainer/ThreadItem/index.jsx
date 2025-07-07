import Workspace from "@/models/workspace";
import paths from "@/utils/paths";
import showToast from "@/utils/toast";
import {
  ArrowCounterClockwise,
  DotsThree,
  PencilSimple,
  Trash,
  X,
} from "@phosphor-icons/react";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

const THREAD_CALLOUT_DETAIL_WIDTH = 26;
export default function ThreadItem({
  idx,
  activeIdx,
  isActive,
  workspace,
  thread,
  onRemove,
  toggleMarkForDeletion,
  hasNext,
  ctrlPressed = false,
}) {
  const { slug, threadSlug = null } = useParams();
  const optionsContainer = useRef(null);
  const [showOptions, setShowOptions] = useState(false);
  const linkTo = !thread.slug
    ? paths.workspace.chat(slug)
    : paths.workspace.thread(slug, thread.slug);

  return (
    <div
      className="w-full relative flex h-[38px] items-center border-none rounded-lg"
      role="listitem"
    >
      {/* Curved line Element and leader if required */}
      <div
        style={{ width: THREAD_CALLOUT_DETAIL_WIDTH / 2 }}
        className={`${
          isActive
            ? "border-l-2 border-b-2 border-white light:border-theme-sidebar-border z-[2]"
            : "border-l border-b border-[#6F6F71] light:border-theme-sidebar-border z-[1]"
        } h-[50%] absolute top-0 left-3 rounded-bl-lg`}
      ></div>
      {/* Downstroke border for next item */}
      {hasNext && (
        <div
          style={{ width: THREAD_CALLOUT_DETAIL_WIDTH / 2 }}
          className={`${
            idx <= activeIdx && !isActive
              ? "border-l-2 border-white light:border-theme-sidebar-border z-[2]"
              : "border-l border-[#6F6F71] light:border-theme-sidebar-border z-[1]"
          } h-[100%] absolute top-0 left-3`}
        ></div>
      )}

      {/* Curved line inline placeholder for spacing - not visible */}
      <div
        style={{ width: THREAD_CALLOUT_DETAIL_WIDTH + 8 }}
        className="h-full"
      />
      <div
        className={`flex w-full items-center justify-between pr-2 group relative ${isActive ? "bg-[var(--theme-sidebar-thread-selected)] border border-solid border-transparent light:border-blue-400" : "hover:bg-theme-sidebar-subitem-hover"} rounded-[4px]`}
      >
        {thread.deleted ? (
          <div className="w-full flex justify-between">
            <div className="w-full pl-2 py-1">
              <p
                className={`text-left text-sm text-slate-400/50 light:text-slate-500 italic`}
              >
                deleted thread
              </p>
            </div>
            {ctrlPressed && (
              <button
                type="button"
                className="border-none"
                onClick={() => toggleMarkForDeletion(thread.id)}
              >
                <ArrowCounterClockwise
                  className="text-zinc-300 hover:text-white light:text-theme-text-secondary hover:light:text-theme-text-primary"
                  size={18}
                />
              </button>
            )}
          </div>
        ) : (
          <a
            href={
              window.location.pathname === linkTo || ctrlPressed ? "#" : linkTo
            }
            className="w-full pl-2 py-1 overflow-hidden"
            aria-current={isActive ? "page" : ""}
          >
            <p
              className={`text-left text-sm truncate max-w-[150px] ${
                isActive ? "font-medium text-white" : "text-theme-text-primary"
              }`}
            >
              {thread.name}
            </p>
          </a>
        )}
        {!!thread.slug && !thread.deleted && (
          <div ref={optionsContainer} className="flex items-center">
            <div className="flex items-center w-fit group-hover:visible md:invisible gap-x-1">
              <button
                type="button"
                className="border-none p-1 rounded hover:bg-slate-500/20"
                onClick={() => renameThread(thread)}
                aria-label="Rename thread"
              >
                <PencilSimple
                  className="text-slate-300 light:text-theme-text-secondary hover:text-white hover:light:text-theme-text-primary"
                  size={16}
                />
              </button>
              <button
                type="button"
                className="border-none p-1 rounded hover:bg-red-500/20"
                onClick={() => handleDelete(thread)}
                aria-label="Delete thread"
              >
                <Trash
                  className="text-slate-300 light:text-theme-text-secondary hover:text-red-400 hover:light:text-red-400"
                  size={16}
                />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

async function renameThread(thread) {
  const name = window
    .prompt("What would you like to rename this thread to?")
    ?.trim();
  if (!name || name.length === 0) {
    return;
  }

  const { message } = await Workspace.threads.update(
    workspace.slug,
    thread.slug,
    { name }
  );
  if (!!message) {
    showToast(`Thread could not be updated! ${message}`, "error", {
      clear: true,
    });
    return;
  }

  thread.name = name;
}

async function handleDelete(thread) {
  if (
    !window.confirm(
      "Are you sure you want to delete this thread? All of its chats will be deleted. You cannot undo this."
    )
  )
    return;
  const success = await Workspace.threads.delete(workspace.slug, thread.slug);
  if (!success) {
    showToast("Thread could not be deleted!", "error", { clear: true });
    return;
  }
  if (success) {
    showToast("Thread deleted successfully!", "success", { clear: true });
    onRemove(thread.id);
    // Redirect if deleting the active thread
    if (currentThreadSlug === thread.slug) {
      window.location.href = paths.workspace.chat(workspace.slug);
    }
    return;
  }
}
