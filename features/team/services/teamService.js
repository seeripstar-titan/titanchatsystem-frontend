import api from "../../../services/api/client";
import { TEAM } from "../../../services/api/endpoints";

export const teamService = {
  inviteAgent: (data) => api(TEAM.INVITE_AGENT, { body: data }),
  suspendAgent: (agentId) => api(TEAM.SUSPEND_AGENT, { body: { agentId } }),
  unsuspendAgent: (agentId) => api(TEAM.UNSUSPEND_AGENT, { body: { agentId } }),
  deleteAgent: (agentId) => api(TEAM.DELETE_AGENT, { body: { agentId } }),
  createGroup: (data) => api(TEAM.CREATE_GROUP, { body: data }),
  deleteGroup: (groupId) => api(TEAM.DELETE_GROUP, { body: { groupId } }),
};
