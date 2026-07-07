import React, { useContext, useState } from "react";
import { User, Mail, Lock, Bell, BellOff, Shield } from "lucide-react";
import SettingsViewPlaceholder from "../SettingsViewPlaceholder";
import { SettingsCard, SettingsRow, SettingsToggle } from "../SettingsUI";
import { AuthContext } from "../../../../context/AuthContext";

const AccountProfileView = () => {
  const { user } = useContext(AuthContext);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [soundAlerts, setSoundAlerts] = useState(true);
  const [desktopNotifications, setDesktopNotifications] = useState(false);

  return (
    <SettingsViewPlaceholder
      icon={User}
      title="Account profile"
      description="Manage your personal account settings"
    >
      {/* Profile Information */}
      <SettingsCard>
        <SettingsRow
          icon={User}
          label="Display name"
          description="Your name visible to customers and team members"
        >
          <span className="text-[13px] text-[var(--titan-primary)] font-medium px-3 py-1.5 rounded-full border border-[var(--titan-input-border)] bg-[var(--titan-input-bg)]">
            {user?.name || "Agent"}
          </span>
        </SettingsRow>
        <SettingsRow
          icon={Mail}
          label="Email address"
          description="Your login email"
        >
          <span className="text-[13px] text-[var(--titan-text-muted)] px-3 py-1.5 rounded-full border border-[var(--titan-input-border)] bg-[var(--titan-input-bg)]">
            {user?.email || "—"}
          </span>
        </SettingsRow>
        <SettingsRow
          icon={Shield}
          label="Role"
          description="Your assigned system role"
        >
          <span className="text-[13px] text-[var(--titan-text-muted)] px-3 py-1.5 rounded-full border border-[var(--titan-input-border)] bg-[var(--titan-input-bg)] capitalize">
            {user?.role || "agent"}
          </span>
        </SettingsRow>
      </SettingsCard>

      {/* Password */}
      <SettingsCard>
        <SettingsRow
          icon={Lock}
          label="Change password"
          description="Update your account password"
        >
          <button className="px-4 py-1.5 text-[13px] font-medium rounded-full border border-[var(--titan-card-border)] bg-[var(--titan-glass-bg)] text-[var(--titan-primary)] hover:bg-[var(--titan-hover)] transition-colors cursor-pointer">
            Change
          </button>
        </SettingsRow>
      </SettingsCard>

      {/* Notification Preferences */}
      <SettingsCard>
        <SettingsRow
          icon={Mail}
          label="Email notifications"
          description="Receive email alerts for new chats and updates"
        >
          <SettingsToggle
            enabled={emailNotifications}
            onChange={setEmailNotifications}
          />
        </SettingsRow>
        <SettingsRow
          icon={Bell}
          label="Sound alerts"
          description="Play a sound when a new chat is assigned"
        >
          <SettingsToggle enabled={soundAlerts} onChange={setSoundAlerts} />
        </SettingsRow>
        <SettingsRow
          icon={BellOff}
          label="Desktop notifications"
          description="Show browser push notifications"
        >
          <SettingsToggle
            enabled={desktopNotifications}
            onChange={setDesktopNotifications}
          />
        </SettingsRow>
      </SettingsCard>
    </SettingsViewPlaceholder>
  );
};

export default AccountProfileView;
