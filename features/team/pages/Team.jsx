import React, { useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PageWrapper from "../../../shared/components/PageWrapper";
import { Card } from "../../../shared/ui";
import { Users, Bot, Layers, UserX } from "lucide-react";
import TabSlider from "../components/TabSlider";
import TeamList from "../components/TeamList";
import DetailPanel from "../components/DetailPanel";
import TeamFormModal, {
  FormField,
  FormInput,
  FormSelect,
  FormTextArea,
  FormCheckboxGroup,
} from "../components/TeamFormModal";
import { teamService } from "../services/teamService";
import {
  mockAgents,
  mockChatbots,
  mockGroups,
  mockSuspendedAgents,
} from "../data/mockData";

const TABS = [
  { id: "agents", label: "Agents", icon: Users },
  { id: "chatbots", label: "Chatbots", icon: Bot },
  { id: "groups", label: "Groups", icon: Layers },
  { id: "suspended", label: "Suspended", icon: UserX },
];

const dataMap = {
  agents: mockAgents,
  chatbots: mockChatbots,
  groups: mockGroups,
  suspended: mockSuspendedAgents,
};

const Team = () => {
  const [activeTab, setActiveTab] = useState("agents");
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState(null); // 'invite-agent' | 'create-group' | 'edit-members'
  const [formLoading, setFormLoading] = useState(false);

  // Agent invite form
  const [agentForm, setAgentForm] = useState({
    name: "",
    email: "",
    role: "Agent",
    groups: [],
  });

  // Group create form
  const [groupForm, setGroupForm] = useState({
    name: "",
    description: "",
  });

  // Edit members form
  const [editMembersGroup, setEditMembersGroup] = useState(null);
  const [memberForm, setMemberForm] = useState({ name: "", role: "Agent" });

  const groupOptions = useMemo(
    () => mockGroups.map((g) => ({ value: g.name, label: g.name })),
    [],
  );

  const tabs = useMemo(
    () =>
      TABS.map((tab) => ({
        ...tab,
        count: dataMap[tab.id].length,
      })),
    [],
  );

  const currentData = dataMap[activeTab];

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    setSelectedItem(null);
    setSearchQuery("");
  };

  const handleSelect = (item) => {
    setSelectedItem(selectedItem?.id === item.id ? null : item);
  };

  const handleActionClick = useCallback(() => {
    if (activeTab === "agents") {
      setModalType("invite-agent");
      setModalOpen(true);
    } else if (activeTab === "groups") {
      setModalType("create-group");
      setModalOpen(true);
    }
  }, [activeTab]);

  const handleCloseModal = useCallback(() => {
    setModalOpen(false);
    setModalType(null);
    setAgentForm({ name: "", email: "", role: "Agent", groups: [] });
    setGroupForm({ name: "", description: "" });
    setEditMembersGroup(null);
    setMemberForm({ name: "", role: "Agent" });
  }, []);

  const handleSubmitAgent = useCallback(async () => {
    setFormLoading(true);
    try {
      await teamService.inviteAgent(agentForm);
    } catch {
      // API not wired yet
    } finally {
      setFormLoading(false);
      handleCloseModal();
    }
  }, [agentForm, handleCloseModal]);

  const handleSubmitGroup = useCallback(async () => {
    setFormLoading(true);
    try {
      await teamService.createGroup(groupForm);
    } catch {
      // API not wired yet
    } finally {
      setFormLoading(false);
      handleCloseModal();
    }
  }, [groupForm, handleCloseModal]);

  const handleEditMembers = useCallback((group) => {
    setEditMembersGroup(group);
    setModalType("edit-members");
    setModalOpen(true);
  }, []);

  const handleAddMember = useCallback(async () => {
    if (!memberForm.name.trim()) return;
    setFormLoading(true);
    try {
      // API stub — will be wired later
      await teamService.createGroup({
        groupId: editMembersGroup?.id,
        action: "add-member",
        member: memberForm,
      });
    } catch {
      // API not wired yet
    } finally {
      setFormLoading(false);
      setMemberForm({ name: "", role: "Agent" });
    }
  }, [memberForm, editMembersGroup]);

  const handleRemoveMember = useCallback(
    async (memberName) => {
      try {
        await teamService.createGroup({
          groupId: editMembersGroup?.id,
          action: "remove-member",
          memberName,
        });
      } catch {
        // API not wired yet
      }
    },
    [editMembersGroup],
  );

  const handleUnsuspend = useCallback(async (agent) => {
    try {
      await teamService.unsuspendAgent(agent.id);
    } catch {
      // API not wired yet
    }
  }, []);

  const handleDeleteAgent = useCallback(async (agent) => {
    try {
      await teamService.deleteAgent(agent.id);
    } catch {
      // API not wired yet
    }
  }, []);

  const handleToggleStatus = useCallback(async (item) => {
    try {
      // API stub — toggle chatbot enabled/disabled
      await teamService.inviteAgent({ id: item.id, action: "toggle-status" });
    } catch {
      // API not wired yet
    }
  }, []);

  return (
    <PageWrapper title="Team">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="h-full w-full flex flex-col gap-4"
      >
        {/* Tab Slider */}
        <div className="shrink-0">
          <TabSlider
            tabs={tabs}
            activeTab={activeTab}
            onTabChange={handleTabChange}
          />
        </div>

        {/* Main Content */}
        <Card
          className="!p-0 flex-1 overflow-hidden"
          style={{
            background: "var(--titan-glass-bg)",
            backdropFilter: "blur(24px) saturate(180%)",
            WebkitBackdropFilter: "blur(24px) saturate(180%)",
          }}
        >
          <div className="flex h-full overflow-hidden">
            {/* Left — List */}
            <div
              className={`${
                selectedItem ? "w-full lg:w-[55%]" : "w-full"
              } transition-all duration-300 p-5 flex flex-col overflow-hidden`}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2 }}
                  className="flex-1 flex flex-col min-h-0"
                >
                  <TeamList
                    items={currentData}
                    type={activeTab}
                    selectedId={selectedItem?.id}
                    onSelect={handleSelect}
                    searchQuery={searchQuery}
                    onSearchChange={setSearchQuery}
                    onActionClick={handleActionClick}
                    onToggleStatus={handleToggleStatus}
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right — Detail Panel */}
            <AnimatePresence>
              {selectedItem && (
                <motion.div
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: "45%", opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="hidden lg:flex border-l border-[var(--titan-card-border)] overflow-hidden"
                  style={{ background: "var(--titan-glass-bg)" }}
                >
                  <div className="p-5 h-full w-full">
                    <DetailPanel
                      item={selectedItem}
                      type={activeTab}
                      onClose={() => setSelectedItem(null)}
                      onEditMembers={handleEditMembers}
                      onUnsuspend={handleUnsuspend}
                      onDeleteAgent={handleDeleteAgent}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </Card>
      </motion.div>

      {/* Invite Agent Modal */}
      <TeamFormModal
        isOpen={modalOpen && modalType === "invite-agent"}
        onClose={handleCloseModal}
        title="Invite Agent"
        onSubmit={handleSubmitAgent}
        loading={formLoading}
      >
        <FormField label="Full Name">
          <FormInput
            placeholder="e.g. Sarah Chen"
            value={agentForm.name}
            onChange={(e) =>
              setAgentForm((f) => ({ ...f, name: e.target.value }))
            }
            required
          />
        </FormField>
        <FormField label="Email">
          <FormInput
            type="email"
            placeholder="e.g. sarah@titan.io"
            value={agentForm.email}
            onChange={(e) =>
              setAgentForm((f) => ({ ...f, email: e.target.value }))
            }
            required
          />
        </FormField>
        <FormField label="Role">
          <FormSelect
            value={agentForm.role}
            onChange={(e) =>
              setAgentForm((f) => ({ ...f, role: e.target.value }))
            }
            options={[
              { value: "Agent", label: "Agent" },
              { value: "Senior Agent", label: "Senior Agent" },
              { value: "Lead Agent", label: "Lead Agent" },
            ]}
          />
        </FormField>
        <FormField label="Assign to Groups">
          <FormCheckboxGroup
            options={groupOptions}
            selected={agentForm.groups}
            onChange={(groups) => setAgentForm((f) => ({ ...f, groups }))}
          />
        </FormField>
      </TeamFormModal>

      {/* Create Group Modal */}
      <TeamFormModal
        isOpen={modalOpen && modalType === "create-group"}
        onClose={handleCloseModal}
        title="Create Group"
        onSubmit={handleSubmitGroup}
        loading={formLoading}
      >
        <FormField label="Group Name">
          <FormInput
            placeholder="e.g. VIP Support"
            value={groupForm.name}
            onChange={(e) =>
              setGroupForm((f) => ({ ...f, name: e.target.value }))
            }
            required
          />
        </FormField>
        <FormField label="Description">
          <FormTextArea
            placeholder="What does this group handle?"
            value={groupForm.description}
            onChange={(e) =>
              setGroupForm((f) => ({ ...f, description: e.target.value }))
            }
          />
        </FormField>
      </TeamFormModal>

      {/* Edit Group Members Modal */}
      <TeamFormModal
        isOpen={modalOpen && modalType === "edit-members"}
        onClose={handleCloseModal}
        title={`Edit Members — ${editMembersGroup?.name || ""}`}
        onSubmit={handleAddMember}
        loading={formLoading}
      >
        {/* Current members list */}
        {editMembersGroup?.members?.length > 0 && (
          <div className="space-y-1.5">
            <span className="block text-xs font-medium text-[var(--titan-text-muted)] uppercase tracking-wider">
              Current Members
            </span>
            <div className="space-y-1.5 max-h-40 overflow-y-auto">
              {editMembersGroup.members.map((m, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between px-3 py-2 rounded-xl bg-[var(--titan-glass-bg)] border border-[var(--titan-card-border)]"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-[var(--titan-primary)] flex items-center justify-center text-[10px] font-medium text-[var(--titan-bg)]">
                      {m.name?.[0]}
                    </div>
                    <span className="text-sm text-[var(--titan-text-secondary)]">
                      {m.name}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveMember(m.name)}
                    className="text-[10px] px-2 py-0.5 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Add new member */}
        <FormField label="Add Member">
          <FormInput
            placeholder="Member name"
            value={memberForm.name}
            onChange={(e) =>
              setMemberForm((f) => ({ ...f, name: e.target.value }))
            }
          />
        </FormField>
        <FormField label="Member Role">
          <FormSelect
            value={memberForm.role}
            onChange={(e) =>
              setMemberForm((f) => ({ ...f, role: e.target.value }))
            }
            options={[
              { value: "Agent", label: "Agent" },
              { value: "Senior Agent", label: "Senior Agent" },
              { value: "Lead Agent", label: "Lead Agent" },
              { value: "Chatbot", label: "Chatbot" },
            ]}
          />
        </FormField>
      </TeamFormModal>
    </PageWrapper>
  );
};

export default Team;
