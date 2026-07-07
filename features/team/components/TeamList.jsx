import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UserPlus, Plus, Search } from "lucide-react";
import TeamListItem from "./TeamListItem";

const actionLabels = {
  agents: { icon: UserPlus, label: "Invite Agent" },
  groups: { icon: Plus, label: "Create Group" },
};

const TeamList = ({
  items,
  type,
  selectedId,
  onSelect,
  searchQuery,
  onSearchChange,
  onActionClick,
  onToggleStatus,
}) => {
  const action = actionLabels[type] || null;

  const filtered = items.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="flex flex-col h-full">
      {/* Search + Action */}
      <div className="flex items-center gap-2 mb-4 shrink-0">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--titan-text-muted)]" />
          <input
            type="text"
            placeholder={`Search ${type}...`}
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-sm bg-[var(--titan-glass-bg)] border border-[var(--titan-card-border)] rounded-xl text-[var(--titan-primary)] placeholder:text-[var(--titan-text-muted)] outline-none focus:border-[var(--titan-border-hover)] transition-all backdrop-blur-md"
            style={{ boxShadow: "inset 0 1px 3px rgba(0,0,0,0.06)" }}
          />
        </div>
        {action && (
          <motion.button
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.03 }}
            onClick={onActionClick}
            className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-xl bg-[var(--titan-primary)] text-[var(--titan-bg)] shrink-0 hover:opacity-90 transition-all"
          >
            <action.icon className="w-4 h-4" />
            <span className="hidden lg:inline">{action.label}</span>
          </motion.button>
        )}
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden space-y-1 pr-1 custom-scrollbar">
        <AnimatePresence mode="popLayout">
          {filtered.length > 0 ? (
            filtered.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2, delay: index * 0.03 }}
              >
                <TeamListItem
                  item={item}
                  type={type}
                  isSelected={selectedId === item.id}
                  onClick={() => onSelect(item)}
                  onToggleStatus={onToggleStatus}
                />
              </motion.div>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-12 text-center"
            >
              <p className="text-sm text-[var(--titan-text-muted)]">
                {searchQuery
                  ? `No ${type} found matching "${searchQuery}"`
                  : `No ${type} yet`}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default TeamList;
