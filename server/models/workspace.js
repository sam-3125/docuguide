const prisma = require("../utils/prisma");
const slugifyModule = require("slugify");
const { Document } = require("./documents");
const { WorkspaceUser } = require("./workspaceUsers");
const { ROLES } = require("../utils/middleware/multiUserProtected");
const { v4: uuidv4 } = require("uuid");
const { User } = require("./user");
const { PromptHistory } = require("./promptHistory");

/* ────────────────────────────────────────────────────────── */
/* -----------------------  HELPERS  ------------------------ */
/* ────────────────────────────────────────────────────────── */

function isNullOrNaN(value) {
  if (value === null) return true;
  return isNaN(value);
}

/**
 * @typedef {Object} Workspace
 * @property {number}   id
 * @property {string}   name
 * @property {string}   slug
 * @property {string}   openAiPrompt
 * @property {number}   openAiTemp
 * @property {number}   openAiHistory
 * @property {number}   similarityThreshold
 * @property {string}   chatProvider
 * @property {string}   chatModel
 * @property {number}   topN
 * @property {string}   chatMode
 * @property {string}   agentProvider
 * @property {string}   agentModel
 * @property {string}   queryRefusalResponse
 * @property {string}   vectorSearchMode
 */

const Workspace = {
  /* ────────────────────────────
       CONFIG & STATIC HELPERS
     ──────────────────────────── */

  defaultPrompt:
    "Given the following conversation, relevant context, and a follow up question, reply with an answer to the current question the user is asking. Return only your response to the question given the above information following the users instructions as needed.",

  // writable db fields for generic updates
  writable: [
    "name",
    // "slug",
    // "vectorTag",
    "openAiTemp",
    "openAiHistory",
    "lastUpdatedAt",
    "openAiPrompt",
    "similarityThreshold",
    "chatProvider",
    "chatModel",
    "topN",
    "chatMode",
    // "pfpFilename",
    "agentProvider",
    "agentModel",
    "queryRefusalResponse",
    "vectorSearchMode",
  ],

  validations: {
    name: (value) => {
      if (!value || typeof value !== "string") return "My Workspace";
      return String(value).slice(0, 255);
    },
    openAiTemp: (value) => {
      if (value === null || value === undefined) return null;
      const temp = parseFloat(value);
      if (isNullOrNaN(temp) || temp < 0) return null;
      return temp;
    },
    openAiHistory: (value) => {
      if (value === null || value === undefined) return 20;
      const history = parseInt(value);
      if (isNullOrNaN(history)) return 20;
      if (history < 0) return 0;
      return history;
    },
    similarityThreshold: (value) => {
      if (value === null || value === undefined) return 0.25;
      const threshold = parseFloat(value);
      if (isNullOrNaN(threshold)) return 0.25;
      if (threshold < 0) return 0.0;
      if (threshold > 1) return 1.0;
      return threshold;
    },
    topN: (value) => {
      if (value === null || value === undefined) return 4;
      const n = parseInt(value);
      if (isNullOrNaN(n)) return 4;
      if (n < 1) return 1;
      return n;
    },
    chatMode: (value) => {
      if (!value || !["chat", "query"].includes(value)) return "chat";
      return value;
    },
    chatProvider: (value) => {
      if (!value || typeof value !== "string" || value === "none") return null;
      return String(value);
    },
    chatModel: (value) => {
      if (!value || typeof value !== "string") return null;
      return String(value);
    },
    agentProvider: (value) => {
      if (!value || typeof value !== "string" || value === "none") return null;
      return String(value);
    },
    agentModel: (value) => {
      if (!value || typeof value !== "string") return null;
      return String(value);
    },
    queryRefusalResponse: (value) => {
      if (!value || typeof value !== "string") return null;
      return String(value);
    },
    openAiPrompt: (value) => {
      if (!value || typeof value !== "string") return null;
      return String(value);
    },
    vectorSearchMode: (value) => {
      if (
        !value ||
        typeof value !== "string" ||
        !["default", "rerank"].includes(value)
      )
        return "default";
      return value;
    },
  },

  /* ────────────────────────────
           UTILITY METHODS
     ──────────────────────────── */

  /**
   * Custom slugify that strips characters some vector-DBs dislike.
   */
  slugify: function (...args) {
    slugifyModule.extend({
      "+": " plus ",
      "!": " bang ",
      "@": " at ",
      "*": " splat ",
      ".": " dot ",
      ":": "",
      "~": "",
      "(": "",
      ")": "",
      "'": "",
      '"': "",
      "|": "",
    });
    return slugifyModule(...args);
  },

  /**
   * Apply per-field validation and return a clean update-object.
   */
  validateFields: function (updates = {}) {
    const validated = {};
    for (const [key, value] of Object.entries(updates)) {
      if (!this.writable.includes(key)) continue;
      validated[key] = this.validations[key]
        ? this.validations[key](value)
        : value;
    }
    return validated;
  },

  /* ────────────────────────────
               CRUD
     ──────────────────────────── */

  /**
   * Create a new workspace and (optionally) link the creator.
   */
  new: async function (name = null, creatorId = null, additionalFields = {}) {
    if (!name) return { workspace: null, message: "name cannot be null" };

    // generate unique slug
    let slug = this.slugify(name, { lower: true }) || uuidv4();
    if (await this.get({ slug })) {
      const nonce = Math.floor(10000000 + Math.random() * 90000000);
      slug = this.slugify(`${name}-${nonce}`, { lower: true });
    }

    try {
      const workspace = await prisma.workspaces.create({
        data: {
          name: this.validations.name(name),
          ...this.validateFields(additionalFields),
          slug,
        },
      });

      if (creatorId) await WorkspaceUser.create(creatorId, workspace.id);
      return { workspace, message: null };
    } catch (error) {
      console.error(error.message);
      return { workspace: null, message: error.message };
    }
  },

  /**
   * Validate and update workspace settings.
   */
  update: async function (id = null, updates = {}) {
    if (!id) throw new Error("No workspace id provided for update");
    const validated = this.validateFields(updates);
    if (Object.keys(validated).length === 0)
      return { workspace: { id }, message: "No valid fields to update!" };

    if (validated?.chatProvider === "default") {
      validated.chatProvider = null;
      validated.chatModel = null;
    }

    return this._update(id, validated);
  },

  /**
   * Unsafe update (no validation) – internal use.
   */
  _update: async function (id = null, data = {}) {
    if (!id) throw new Error("No workspace id provided for update");

    try {
      const workspace = await prisma.workspaces.update({
        where: { id },
        data,
      });
      return { workspace, message: null };
    } catch (error) {
      console.error(error.message);
      return { workspace: null, message: error.message };
    }
  },

  /* ────────────────────────────
       READ OPERATIONS (filtered)
     ──────────────────────────── */

  /**
   * Fetch a single workspace the user is related to.
   */
  getWithUser: async function (user = null, clause = {}) {
    try {
      const workspace = await prisma.workspaces.findFirst({
        where: {
          ...clause,
          workspace_users: { some: { user_id: user?.id } },
        },
        include: { workspace_users: true, documents: true },
      });

      if (!workspace) return null;

      return {
        ...workspace,
        documents: await Document.forWorkspace(workspace.id),
      };
    } catch (error) {
      console.error(error.message);
      return null;
    }
  },

  /**
   * Fetch multiple workspaces the user is related to.
   */
  whereWithUser: async function (user, clause = {}, limit = null, orderBy = null) {
    try {
      let workspaces = await prisma.workspaces.findMany({
        where: {
          ...clause,
          workspace_users: { some: { user_id: user.id } },
        },
        ...(limit   ? { take    : limit   } : {}),
        ...(orderBy ? { orderBy           } : {}),
        include: { workspace_users: true },
      });
      console.log('[whereWithUser] BEFORE FILTER user role:', user.role, 'workspaces:', workspaces.map(w => w.slug || w.id));
      // If the user is not an admin, filter out workspaces with any admin member
      if (user.role !== 'admin') {
        const userIds = workspaces.flatMap(ws => ws.workspace_users.map(wu => wu.user_id));
        // Get all users for these userIds
        const uniqueUserIds = [...new Set(userIds)];
        const users = await User.where({ id: { in: uniqueUserIds } });
        const userIdToRole = Object.fromEntries(users.map(u => [u.id, u.role]));
        workspaces = workspaces.filter(ws =>
          !ws.workspace_users.some(wu => userIdToRole[wu.user_id] === 'admin')
        );
      }
      console.log('[whereWithUser] AFTER FILTER user role:', user.role, 'workspaces:', workspaces.map(w => w.slug || w.id));
      // Remove workspace_users from result for compatibility
      workspaces = workspaces.map(ws => {
        const { workspace_users, ...rest } = ws;
        return rest;
      });
      console.log('[whereWithUser] FINAL RETURN user role:', user.role, 'workspaces:', workspaces.map(w => w.slug || w.id));
      return workspaces;
    } catch (error) {
      console.error(error.message);
      return [];
    }
  },

  /* ────────────────────────────
       UNFILTERED READ HELPERS
     ──────────────────────────── */

  get: async function (clause = {}) {
    try {
      return (
        (await prisma.workspaces.findFirst({
          where: clause,
          include: { documents: true },
        })) || null
      );
    } catch (error) {
      console.error(error.message);
      return null;
    }
  },

  delete: async function (clause = {}) {
    try {
      await prisma.workspaces.delete({ where: clause });
      return true;
    } catch (error) {
      console.error(error.message);
      return false;
    }
  },

  where: async function (clause = {}, limit = null, orderBy = null) {
    try {
      return await prisma.workspaces.findMany({
        where: clause,
        ...(limit   ? { take    : limit   } : {}),
        ...(orderBy ? { orderBy           } : {}),
      });
    } catch (error) {
      console.error(error.message);
      return [];
    }
  },

  /**
   * Same as `where` but also returns an array `userIds` for each workspace.
   */
  whereWithUsers: async function (clause = {}, limit = null, orderBy = null) {
    try {
      const workspaces = await this.where(clause, limit, orderBy);
      for (const ws of workspaces) {
        const userIds = (
          await WorkspaceUser.where({ workspace_id: Number(ws.id) })
        ).map((rel) => rel.user_id);
        ws.userIds = userIds;
      }
      return workspaces;
    } catch (error) {
      console.error(error.message);
      return [];
    }
  },

  /* ────────────────────────────
        USER <--> WORKSPACE
     ──────────────────────────── */

  workspaceUsers: async function (workspaceId) {
    try {
      const rels = await WorkspaceUser.where({ workspace_id: Number(workspaceId) });
      const users = await User.where({ id: { in: rels.map((r) => r.user_id) } });

      return users.map((u) => {
        const rel = rels.find((r) => r.user_id === u.id);
        return {
          userId: u.id,
          username: u.username,
          role: u.role,
          lastUpdatedAt: rel.lastUpdatedAt,
        };
      });
    } catch (error) {
      console.error(error.message);
      return [];
    }
  },

  updateUsers: async function (workspaceId, userIds = []) {
    try {
      await WorkspaceUser.delete({ workspace_id: Number(workspaceId) });
      await WorkspaceUser.createManyUsers(userIds, workspaceId);
      return { success: true, error: null };
    } catch (error) {
      console.error(error.message);
      return { success: false, error: error.message };
    }
  },

  /* ────────────────────────────
         PROMPT HISTORY ETC.
     ──────────────────────────── */

  trackChange: async function (prevData, newData, user) {
    try {
      await this._trackWorkspacePromptChange(prevData, newData, user);
    } catch (error) {
      console.error("Error tracking workspace change:", error.message);
    }
  },

  _trackWorkspacePromptChange: async function (prevData, newData, user = null) {
    if (
      newData?.openAiPrompt &&
      prevData?.openAiPrompt &&
      prevData.openAiPrompt !== this.defaultPrompt &&
      newData.openAiPrompt !== prevData.openAiPrompt
    ) {
      await PromptHistory.handlePromptChange(prevData, user);
    }

    const { Telemetry } = require("./telemetry");
    const { EventLogs } = require("./eventLogs");
    if (
      !newData?.openAiPrompt ||
      newData.openAiPrompt === this.defaultPrompt ||
      newData.openAiPrompt === prevData?.openAiPrompt
    )
      return;

    await Telemetry.sendTelemetry("workspace_prompt_changed");
    await EventLogs.logEvent(
      "workspace_prompt_changed",
      {
        workspaceName: prevData?.name,
        prevSystemPrompt: prevData?.openAiPrompt || this.defaultPrompt,
        newSystemPrompt: newData?.openAiPrompt,
      },
      user?.id
    );
  },

  /* ────────────────────────────
           LOW-LEVEL QUERIES
     ──────────────────────────── */

  _findMany: async function (prismaQuery = {}) {
    try {
      return await prisma.workspaces.findMany(prismaQuery);
    } catch (error) {
      console.error(error.message);
      return null;
    }
  },

  _findFirst: async function (prismaQuery = {}) {
    try {
      return await prisma.workspaces.findFirst(prismaQuery);
    } catch (error) {
      console.error(error.message);
      return null;
    }
  },

  promptHistory: async function ({ workspaceId }) {
    try {
      return await PromptHistory.forWorkspace(workspaceId);
    } catch (error) {
      console.error(error.message);
      return [];
    }
  },

  deleteAllPromptHistory: async function ({ workspaceId }) {
    try {
      return await PromptHistory.delete({ workspaceId });
    } catch (error) {
      console.error(error.message);
      return false;
    }
  },

  deletePromptHistory: async function ({ workspaceId, id }) {
    try {
      return await PromptHistory.delete({ id, workspaceId });
    } catch (error) {
      console.error(error.message);
      return false;
    }
  },
};

module.exports = { Workspace };
