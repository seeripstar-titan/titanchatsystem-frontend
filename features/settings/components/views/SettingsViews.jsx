import React, { useState } from "react";
import {
  Mail,
  MessageCircle,
  Apple,
  Globe,
  Palette,
  Languages,
  Clock,
  Layout,
  FileInput,
  AtSign,
  FileOutput,
  Ticket,
  Eye,
  MousePointerClick,
  Award,
  Tags,
  DollarSign,
  UserCog,
  Forward,
  Paperclip,
  Timer,
  GlobeLock,
  Ban,
  KeyRound,
  CreditCard,
  LogIn,
  Plus,
  Trash2,
  Search,
} from "lucide-react";
import SettingsViewPlaceholder from "../SettingsViewPlaceholder";
import {
  SettingsCard,
  SettingsToggle,
  SettingsRow,
  SettingsSelect,
} from "../SettingsUI";

// ── Channels ──

export const EmailHelpdeskView = () => {
  const [enabled, setEnabled] = useState(false);
  return (
    <SettingsViewPlaceholder
      icon={Mail}
      title="Email by HelpDesk"
      description="Convert emails into support tickets"
    >
      <SettingsCard>
        <SettingsRow
          label="Enable HelpDesk integration"
          description="Automatically create tickets from incoming emails"
          accent="#7EAED4"
        >
          <SettingsToggle enabled={enabled} onChange={setEnabled} />
        </SettingsRow>
        <SettingsRow
          label="Forwarding address"
          description="Send emails to this address to create tickets"
        >
          <span className="text-[13px] font-mono text-[var(--titan-text-muted)]">
            support@titan.helpdesk.io
          </span>
        </SettingsRow>
      </SettingsCard>
    </SettingsViewPlaceholder>
  );
};

export const FacebookMessengerView = () => {
  const [enabled, setEnabled] = useState(true);
  return (
    <SettingsViewPlaceholder
      icon={MessageCircle}
      title="Facebook Messenger"
      description="Connect your Facebook page to receive messages"
    >
      <SettingsCard>
        <SettingsRow
          label="Facebook Messenger integration"
          description="Route Messenger conversations to your agents"
          accent="#7C8FD4"
        >
          <SettingsToggle enabled={enabled} onChange={setEnabled} />
        </SettingsRow>
        <SettingsRow label="Connected page" description="Titan Demo Page">
          <span className="text-[12px] font-medium px-2.5 py-1 rounded-full bg-[#6BAF8D18] text-[#6BAF8D]">
            Connected
          </span>
        </SettingsRow>
      </SettingsCard>
    </SettingsViewPlaceholder>
  );
};

export const AppleMessagesView = () => {
  const [enabled, setEnabled] = useState(false);
  return (
    <SettingsViewPlaceholder
      icon={Apple}
      title="Apple Messages for Business"
      description="Let customers reach you through Apple Messages"
    >
      <SettingsCard>
        <SettingsRow
          label="Apple Messages integration"
          description="Requires an Apple Business account"
          accent="#8B9BB5"
        >
          <SettingsToggle enabled={enabled} onChange={setEnabled} />
        </SettingsRow>
      </SettingsCard>
    </SettingsViewPlaceholder>
  );
};

// ── Chat page ──

export const ChatPageView = () => (
  <SettingsViewPlaceholder
    icon={Globe}
    title="Chat page"
    description="A standalone page where customers can chat with you"
  >
    <SettingsCard>
      <SettingsRow
        label="Chat page URL"
        description="Share this link with your customers"
      >
        <span className="text-[13px] font-mono text-[var(--titan-text-muted)]">
          chat.titan.io/demo
        </span>
      </SettingsRow>
      <SettingsRow
        label="Page title"
        description="Displayed in the browser tab"
      >
        <span className="text-[13px] text-[var(--titan-text-muted)]">
          Chat with us
        </span>
      </SettingsRow>
    </SettingsCard>
  </SettingsViewPlaceholder>
);

// ── Website widget ──

export const CustomizationView = () => {
  const [color, setColor] = useState("#7C8FD4");
  return (
    <SettingsViewPlaceholder
      icon={Palette}
      title="Customization"
      description="Adjust the widget appearance"
    >
      <SettingsCard>
        <SettingsRow
          label="Theme color"
          description="Primary color for the chat widget"
        >
          <div className="flex items-center gap-2">
            <div
              className="w-7 h-7 rounded-full border border-[var(--titan-card-border)]"
              style={{ backgroundColor: color }}
            />
            <span className="text-[13px] font-mono text-[var(--titan-text-muted)]">
              {color}
            </span>
          </div>
        </SettingsRow>
        <SettingsRow
          label="Widget position"
          description="Where the widget appears on the page"
        >
          <SettingsSelect
            value="bottom-right"
            onChange={() => {}}
            options={[
              { value: "bottom-right", label: "Bottom right" },
              { value: "bottom-left", label: "Bottom left" },
            ]}
          />
        </SettingsRow>
        <SettingsRow
          label="Widget shape"
          description="Rounded or square launcher button"
        >
          <SettingsSelect
            value="rounded"
            onChange={() => {}}
            options={[
              { value: "rounded", label: "Rounded" },
              { value: "square", label: "Square" },
            ]}
          />
        </SettingsRow>
      </SettingsCard>
    </SettingsViewPlaceholder>
  );
};

export const LanguageView = () => (
  <SettingsViewPlaceholder
    icon={Languages}
    title="Language"
    description="Set the default language for the chat widget"
  >
    <SettingsCard>
      <SettingsRow
        label="Widget language"
        description="Language used in default widget text"
      >
        <SettingsSelect
          value="en"
          onChange={() => {}}
          options={[
            { value: "en", label: "English" },
            { value: "es", label: "Spanish" },
            { value: "fr", label: "French" },
            { value: "de", label: "German" },
            { value: "pt", label: "Portuguese" },
            { value: "ja", label: "Japanese" },
          ]}
        />
      </SettingsRow>
    </SettingsCard>
  </SettingsViewPlaceholder>
);

export const WidgetAvailabilityView = () => {
  const [alwaysOn, setAlwaysOn] = useState(true);
  return (
    <SettingsViewPlaceholder
      icon={Clock}
      title="Availability"
      description="Control when the chat widget is shown to visitors"
    >
      <SettingsCard>
        <SettingsRow
          label="Always online"
          description="Show the widget even when no agents are available"
          accent="#6BAF8D"
        >
          <SettingsToggle enabled={alwaysOn} onChange={setAlwaysOn} />
        </SettingsRow>
      </SettingsCard>
    </SettingsViewPlaceholder>
  );
};

export const WelcomeScreenView = () => {
  const [enabled, setEnabled] = useState(true);
  return (
    <SettingsViewPlaceholder
      icon={Layout}
      title="Welcome screen"
      description="First thing visitors see when they open the widget"
    >
      <SettingsCard>
        <SettingsRow
          label="Show welcome screen"
          description="Display a greeting before the chat starts"
          accent="#D4A574"
        >
          <SettingsToggle enabled={enabled} onChange={setEnabled} />
        </SettingsRow>
        <SettingsRow
          label="Greeting message"
          description="The initial message shown to visitors"
        >
          <span className="text-[13px] text-[var(--titan-text-muted)]">
            Hi there! How can we help?
          </span>
        </SettingsRow>
      </SettingsCard>
    </SettingsViewPlaceholder>
  );
};

// ── Forms ──

export const PreChatFormView = () => {
  const [enabled, setEnabled] = useState(true);
  return (
    <SettingsViewPlaceholder
      icon={FileInput}
      title="Pre-chat form"
      description="Collect information before the chat begins"
    >
      <SettingsCard>
        <SettingsRow
          label="Enable pre-chat form"
          description="Ask visitors to fill out a form before chatting"
          accent="#7C8FD4"
        >
          <SettingsToggle enabled={enabled} onChange={setEnabled} />
        </SettingsRow>
        <SettingsRow
          label="Required fields"
          description="Name, email are collected by default"
        >
          <span className="text-[12px] font-medium px-2.5 py-1 rounded-full bg-[#7C8FD418] text-[#7C8FD4]">
            2 fields
          </span>
        </SettingsRow>
      </SettingsCard>
    </SettingsViewPlaceholder>
  );
};

export const AskForEmailView = () => {
  const [enabled, setEnabled] = useState(true);
  return (
    <SettingsViewPlaceholder
      icon={AtSign}
      title="Ask for email"
      description="Request email when no agents are available"
    >
      <SettingsCard>
        <SettingsRow
          label="Ask for email"
          description="Prompt visitors to leave their email for follow-up"
          accent="#D4A574"
        >
          <SettingsToggle enabled={enabled} onChange={setEnabled} />
        </SettingsRow>
      </SettingsCard>
    </SettingsViewPlaceholder>
  );
};

export const PostChatFormView = () => {
  const [enabled, setEnabled] = useState(false);
  return (
    <SettingsViewPlaceholder
      icon={FileOutput}
      title="Post-chat form"
      description="Collect feedback after the chat ends"
    >
      <SettingsCard>
        <SettingsRow
          label="Enable post-chat form"
          description="Show a survey after the conversation"
          accent="#6BAF8D"
        >
          <SettingsToggle enabled={enabled} onChange={setEnabled} />
        </SettingsRow>
      </SettingsCard>
    </SettingsViewPlaceholder>
  );
};

export const TicketFormView = () => {
  const [enabled, setEnabled] = useState(true);
  return (
    <SettingsViewPlaceholder
      icon={Ticket}
      title="Ticket form"
      description="Let visitors create support tickets"
    >
      <SettingsCard>
        <SettingsRow
          label="Enable ticket form"
          description="Show when all agents are offline"
          accent="#A07CC8"
        >
          <SettingsToggle enabled={enabled} onChange={setEnabled} />
        </SettingsRow>
      </SettingsCard>
    </SettingsViewPlaceholder>
  );
};

// ── Engagement ──

export const EyeCatcherView = () => {
  const [enabled, setEnabled] = useState(true);
  return (
    <SettingsViewPlaceholder
      icon={Eye}
      title="Eye-catcher"
      description="An attention-grabbing image above the chat widget"
    >
      <SettingsCard>
        <SettingsRow
          label="Show eye-catcher"
          description="Display a small graphic to attract visitor attention"
          accent="#D47C94"
        >
          <SettingsToggle enabled={enabled} onChange={setEnabled} />
        </SettingsRow>
      </SettingsCard>
    </SettingsViewPlaceholder>
  );
};

export const ChatButtonsView = () => (
  <SettingsViewPlaceholder
    icon={MousePointerClick}
    title="Chat buttons"
    description="Embed chat buttons on your website"
  >
    <SettingsCard>
      <SettingsRow
        label="Button style"
        description="Choose how the button appears"
      >
        <SettingsSelect
          value="floating"
          onChange={() => {}}
          options={[
            { value: "floating", label: "Floating" },
            { value: "inline", label: "Inline" },
            { value: "text-link", label: "Text link" },
          ]}
        />
      </SettingsRow>
    </SettingsCard>
  </SettingsViewPlaceholder>
);

export const QualityShowcaseView = () => {
  const [enabled, setEnabled] = useState(false);
  return (
    <SettingsViewPlaceholder
      icon={Award}
      title="Quality showcase"
      description="Display a quality badge on your website"
    >
      <SettingsCard>
        <SettingsRow
          label="Show quality badge"
          description="Display your chat rating on the widget"
          accent="#D4A574"
        >
          <SettingsToggle enabled={enabled} onChange={setEnabled} />
        </SettingsRow>
      </SettingsCard>
    </SettingsViewPlaceholder>
  );
};

// ── Tags ──

export const TagsView = () => (
  <SettingsViewPlaceholder
    icon={Tags}
    title="Tags"
    description="Manage tags used to categorize chats"
  >
    <SettingsCard>
      <div className="flex items-center justify-between mb-4">
        <p className="text-[14px] font-semibold text-[var(--titan-primary)]">
          Chat tags
        </p>
        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-medium border border-[var(--titan-card-border)] text-[var(--titan-text-muted)] hover:text-[var(--titan-primary)] hover:border-[var(--titan-border-hover)] transition-colors cursor-pointer">
          <Plus size={12} /> Add tag
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {[
          "Support",
          "Sales",
          "Billing",
          "Technical",
          "Feedback",
          "Bug Report",
          "Feature Request",
        ].map((tag) => (
          <span
            key={tag}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-medium border border-[var(--titan-card-border)] text-[var(--titan-primary)] bg-[var(--titan-glass-bg)]"
          >
            {tag}
            <Trash2
              size={10}
              className="text-[var(--titan-text-muted)] hover:text-[var(--titan-danger)] cursor-pointer transition-colors"
            />
          </span>
        ))}
      </div>
    </SettingsCard>
  </SettingsViewPlaceholder>
);

// ── Sales tracker ──

export const SalesTrackerView = () => {
  const [enabled, setEnabled] = useState(true);
  return (
    <SettingsViewPlaceholder
      icon={DollarSign}
      title="Sales tracker"
      description="Track sales and conversions from chat"
    >
      <SettingsCard>
        <SettingsRow
          label="Enable sales tracking"
          description="Attribute sales to chat conversations"
          accent="#6BAF8D"
        >
          <SettingsToggle enabled={enabled} onChange={setEnabled} />
        </SettingsRow>
        <SettingsRow
          label="Currency"
          description="Default currency for tracked sales"
        >
          <SettingsSelect
            value="USD"
            onChange={() => {}}
            options={[
              { value: "USD", label: "USD ($)" },
              { value: "EUR", label: "EUR (€)" },
              { value: "GBP", label: "GBP (£)" },
              { value: "INR", label: "INR (₹)" },
            ]}
          />
        </SettingsRow>
      </SettingsCard>
    </SettingsViewPlaceholder>
  );
};

// ── Chat settings ──

export const ChatAssignmentView = () => (
  <SettingsViewPlaceholder
    icon={UserCog}
    title="Chat assignment"
    description="Configure how chats are distributed to agents"
  >
    <SettingsCard>
      <SettingsRow
        label="Assignment method"
        description="How incoming chats are assigned"
      >
        <SettingsSelect
          value="auto"
          onChange={() => {}}
          options={[
            { value: "auto", label: "Auto (round-robin)" },
            { value: "manual", label: "Manual" },
            { value: "load-balanced", label: "Load balanced" },
          ]}
        />
      </SettingsRow>
      <SettingsRow
        label="Max concurrent chats"
        description="Maximum chats per agent at once"
      >
        <SettingsSelect
          value="5"
          onChange={() => {}}
          options={[
            { value: "3", label: "3 chats" },
            { value: "5", label: "5 chats" },
            { value: "10", label: "10 chats" },
            { value: "unlimited", label: "Unlimited" },
          ]}
        />
      </SettingsRow>
    </SettingsCard>
  </SettingsViewPlaceholder>
);

export const TranscriptForwardingView = () => {
  const [enabled, setEnabled] = useState(false);
  return (
    <SettingsViewPlaceholder
      icon={Forward}
      title="Transcript forwarding"
      description="Automatically send chat transcripts to an email"
    >
      <SettingsCard>
        <SettingsRow
          label="Forward transcripts"
          description="Email transcripts after each chat ends"
          accent="#7EAED4"
        >
          <SettingsToggle enabled={enabled} onChange={setEnabled} />
        </SettingsRow>
      </SettingsCard>
    </SettingsViewPlaceholder>
  );
};

export const FileSharingView = () => {
  const [enabled, setEnabled] = useState(true);
  return (
    <SettingsViewPlaceholder
      icon={Paperclip}
      title="File sharing"
      description="Allow file uploads in chat"
    >
      <SettingsCard>
        <SettingsRow
          label="Enable file sharing"
          description="Let agents and visitors share files in chat"
          accent="#D4A574"
        >
          <SettingsToggle enabled={enabled} onChange={setEnabled} />
        </SettingsRow>
        <SettingsRow
          label="Max file size"
          description="Maximum upload size per file"
        >
          <SettingsSelect
            value="10"
            onChange={() => {}}
            options={[
              { value: "5", label: "5 MB" },
              { value: "10", label: "10 MB" },
              { value: "25", label: "25 MB" },
              { value: "50", label: "50 MB" },
            ]}
          />
        </SettingsRow>
      </SettingsCard>
    </SettingsViewPlaceholder>
  );
};

export const InactivityTimeoutsView = () => (
  <SettingsViewPlaceholder
    icon={Timer}
    title="Inactivity timeouts"
    description="Automatically close idle chats"
  >
    <SettingsCard>
      <SettingsRow
        label="Visitor inactivity"
        description="Close chat when visitor is inactive"
      >
        <SettingsSelect
          value="10"
          onChange={() => {}}
          options={[
            { value: "5", label: "5 minutes" },
            { value: "10", label: "10 minutes" },
            { value: "30", label: "30 minutes" },
            { value: "never", label: "Never" },
          ]}
        />
      </SettingsRow>
      <SettingsRow
        label="Agent inactivity"
        description="Reassign chat when agent is inactive"
      >
        <SettingsSelect
          value="5"
          onChange={() => {}}
          options={[
            { value: "3", label: "3 minutes" },
            { value: "5", label: "5 minutes" },
            { value: "10", label: "10 minutes" },
            { value: "never", label: "Never" },
          ]}
        />
      </SettingsRow>
    </SettingsCard>
  </SettingsViewPlaceholder>
);

// ── Security ──

export const TrustedDomainsView = () => (
  <SettingsViewPlaceholder
    icon={GlobeLock}
    title="Trusted domains"
    description="Restrict which domains can embed the chat widget"
  >
    <SettingsCard>
      <div className="flex items-center justify-between mb-4">
        <p className="text-[14px] font-semibold text-[var(--titan-primary)]">
          Allowed domains
        </p>
        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-medium border border-[var(--titan-card-border)] text-[var(--titan-text-muted)] hover:text-[var(--titan-primary)] hover:border-[var(--titan-border-hover)] transition-colors cursor-pointer">
          <Plus size={12} /> Add domain
        </button>
      </div>
      <div className="flex flex-col gap-2">
        {["titan.io", "app.titan.io", "docs.titan.io"].map((domain) => (
          <div
            key={domain}
            className="flex items-center justify-between px-3 py-2 rounded-xl border border-[var(--titan-card-border)] bg-[var(--titan-glass-bg)]"
          >
            <span className="text-[13px] font-mono text-[var(--titan-primary)]">
              {domain}
            </span>
            <Trash2
              size={13}
              className="text-[var(--titan-text-muted)] hover:text-[var(--titan-danger)] cursor-pointer transition-colors"
            />
          </div>
        ))}
      </div>
    </SettingsCard>
  </SettingsViewPlaceholder>
);

export const BannedCustomersView = () => (
  <SettingsViewPlaceholder
    icon={Ban}
    title="Banned customers"
    description="Block visitors from using the chat"
  >
    <SettingsCard>
      <div className="flex items-center justify-between mb-4">
        <p className="text-[14px] font-semibold text-[var(--titan-primary)]">
          Banned IPs & visitors
        </p>
        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-medium border border-[var(--titan-card-border)] text-[var(--titan-text-muted)] hover:text-[var(--titan-primary)] hover:border-[var(--titan-border-hover)] transition-colors cursor-pointer">
          <Plus size={12} /> Ban visitor
        </button>
      </div>
      <p className="text-[13px] text-[var(--titan-text-muted)]">
        No banned customers yet.
      </p>
    </SettingsCard>
  </SettingsViewPlaceholder>
);

export const AccessRestrictionsView = () => {
  const [ipRestriction, setIpRestriction] = useState(false);
  return (
    <SettingsViewPlaceholder
      icon={KeyRound}
      title="Access restrictions"
      description="Control agent access to the dashboard"
    >
      <SettingsCard>
        <SettingsRow
          label="IP-based restrictions"
          description="Only allow agents to log in from specific IPs"
          accent="#D47C94"
        >
          <SettingsToggle enabled={ipRestriction} onChange={setIpRestriction} />
        </SettingsRow>
      </SettingsCard>
    </SettingsViewPlaceholder>
  );
};

export const CreditCardMaskingView = () => {
  const [enabled, setEnabled] = useState(true);
  return (
    <SettingsViewPlaceholder
      icon={CreditCard}
      title="Credit card masking"
      description="Automatically mask credit card numbers in chat"
    >
      <SettingsCard>
        <SettingsRow
          label="Auto-mask credit cards"
          description="Detect and mask card numbers in messages"
          accent="#6BAF8D"
        >
          <SettingsToggle enabled={enabled} onChange={setEnabled} />
        </SettingsRow>
      </SettingsCard>
    </SettingsViewPlaceholder>
  );
};

export const LoginSettingsView = () => (
  <SettingsViewPlaceholder
    icon={LogIn}
    title="Login settings"
    description="Configure authentication methods"
  >
    <SettingsCard>
      <SettingsRow
        label="Two-factor authentication"
        description="Require 2FA for all agents"
      >
        <SettingsSelect
          value="optional"
          onChange={() => {}}
          options={[
            { value: "disabled", label: "Disabled" },
            { value: "optional", label: "Optional" },
            { value: "required", label: "Required" },
          ]}
        />
      </SettingsRow>
      <SettingsRow
        label="SSO provider"
        description="Single sign-on integration"
      >
        <SettingsSelect
          value="none"
          onChange={() => {}}
          options={[
            { value: "none", label: "None" },
            { value: "google", label: "Google" },
            { value: "azure", label: "Azure AD" },
            { value: "okta", label: "Okta" },
          ]}
        />
      </SettingsRow>
    </SettingsCard>
  </SettingsViewPlaceholder>
);
