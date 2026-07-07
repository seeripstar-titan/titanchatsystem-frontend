import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PageWrapper from "../../../shared/components/PageWrapper";
import SettingsSidebar from "../components/SettingsSidebar";
import InstallLiveChatView from "../components/views/InstallLiveChatView";
import {
  EmailHelpdeskView,
  FacebookMessengerView,
  AppleMessagesView,
  ChatPageView,
  CustomizationView,
  LanguageView,
  WidgetAvailabilityView,
  WelcomeScreenView,
  PreChatFormView,
  AskForEmailView,
  PostChatFormView,
  TicketFormView,
  EyeCatcherView,
  ChatButtonsView,
  QualityShowcaseView,
  TagsView,
  SalesTrackerView,
  ChatAssignmentView,
  TranscriptForwardingView,
  FileSharingView,
  InactivityTimeoutsView,
  TrustedDomainsView,
  BannedCustomersView,
  AccessRestrictionsView,
  CreditCardMaskingView,
  LoginSettingsView,
} from "../components/views/SettingsViews";

const viewMap = {
  "install-livechat": InstallLiveChatView,
  "email-helpdesk": EmailHelpdeskView,
  "facebook-messenger": FacebookMessengerView,
  "apple-messages": AppleMessagesView,
  "chat-page": ChatPageView,
  customization: CustomizationView,
  language: LanguageView,
  "widget-availability": WidgetAvailabilityView,
  "welcome-screen": WelcomeScreenView,
  "pre-chat-form": PreChatFormView,
  "ask-for-email": AskForEmailView,
  "post-chat-form": PostChatFormView,
  "ticket-form": TicketFormView,
  "eye-catcher": EyeCatcherView,
  "chat-buttons": ChatButtonsView,
  "quality-showcase": QualityShowcaseView,
  tags: TagsView,
  "sales-tracker": SalesTrackerView,
  "chat-assignment": ChatAssignmentView,
  "transcript-forwarding": TranscriptForwardingView,
  "file-sharing": FileSharingView,
  "inactivity-timeouts": InactivityTimeoutsView,
  "trusted-domains": TrustedDomainsView,
  "banned-customers": BannedCustomersView,
  "access-restrictions": AccessRestrictionsView,
  "credit-card-masking": CreditCardMaskingView,
  "login-settings": LoginSettingsView,
};

const Settings = () => {
  const [activeRoute, setActiveRoute] = useState("install-livechat");

  const ActiveView = viewMap[activeRoute] || InstallLiveChatView;

  return (
    <PageWrapper title="Settings">
      <div className="flex gap-4 h-full min-h-0">
        {/* Sidebar */}
        <div className="hidden lg:block shrink-0">
          <div
            className="h-full rounded-2xl border border-[var(--titan-card-border)] bg-[var(--titan-glass-bg)] backdrop-blur-xl overflow-hidden"
            style={{
              boxShadow:
                "0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.03)",
              WebkitBackdropFilter: "blur(28px) saturate(185%)",
              backdropFilter: "blur(28px) saturate(185%)",
            }}
          >
            <SettingsSidebar
              activeRoute={activeRoute}
              onNavigate={setActiveRoute}
            />
          </div>
        </div>

        {/* Mobile dropdown */}
        <div className="lg:hidden w-full mb-2">
          <select
            value={activeRoute}
            onChange={(e) => setActiveRoute(e.target.value)}
            className="w-full px-3 py-2 rounded-xl border border-[var(--titan-card-border)] bg-[var(--titan-glass-bg)] backdrop-blur-xl text-sm text-[var(--titan-primary)] outline-none cursor-pointer"
            style={{
              WebkitBackdropFilter: "blur(20px)",
              backdropFilter: "blur(20px)",
            }}
          >
            <optgroup label="Channels">
              <option value="install-livechat">Install LiveChat</option>
              <option value="email-helpdesk">Email by HelpDesk</option>
              <option value="facebook-messenger">Facebook Messenger</option>
              <option value="apple-messages">Apple Messages</option>
            </optgroup>
            <option value="chat-page">Chat page</option>
            <optgroup label="Website widget">
              <option value="customization">Customization</option>
              <option value="language">Language</option>
              <option value="widget-availability">Availability</option>
              <option value="welcome-screen">Welcome screen</option>
            </optgroup>
            <optgroup label="Forms">
              <option value="pre-chat-form">Pre-chat form</option>
              <option value="ask-for-email">Ask for email</option>
              <option value="post-chat-form">Post-chat form</option>
              <option value="ticket-form">Ticket form</option>
            </optgroup>
            <optgroup label="Engagement">
              <option value="eye-catcher">Eye-catcher</option>
              <option value="chat-buttons">Chat buttons</option>
              <option value="quality-showcase">Quality showcase</option>
            </optgroup>
            <option value="tags">Tags</option>
            <option value="sales-tracker">Sales tracker</option>
            <optgroup label="Chat settings">
              <option value="chat-assignment">Chat assignment</option>
              <option value="transcript-forwarding">
                Transcript forwarding
              </option>
              <option value="file-sharing">File sharing</option>
              <option value="inactivity-timeouts">Inactivity timeouts</option>
            </optgroup>
            <optgroup label="Security">
              <option value="trusted-domains">Trusted domains</option>
              <option value="banned-customers">Banned customers</option>
              <option value="access-restrictions">Access restrictions</option>
              <option value="credit-card-masking">Credit card masking</option>
              <option value="login-settings">Login settings</option>
            </optgroup>
          </select>
        </div>

        {/* Content area */}
        <div className="flex-1 min-w-0 overflow-y-auto custom-scrollbar pr-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeRoute}
              initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
              transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <ActiveView />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </PageWrapper>
  );
};

export default Settings;
