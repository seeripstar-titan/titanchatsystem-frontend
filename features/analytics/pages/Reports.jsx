import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PageWrapper from "../../../shared/components/PageWrapper";
import ReportsSidebar from "../components/ReportsSidebar";

// Lazy-ish imports for all report views
import SavedViews from "../components/views/SavedViews";
import Last7DaysView from "../components/views/Last7DaysView";
import DashboardView from "../components/views/DashboardView";
import TotalChatsView from "../components/views/TotalChatsView";
import ChatEngagementView from "../components/views/ChatEngagementView";
import MissedChatsView from "../components/views/MissedChatsView";
import CampaignsView from "../components/views/CampaignsView";
import TagsUsageView from "../components/views/TagsUsageView";
import ChatSatisfactionView from "../components/views/ChatSatisfactionView";
import ChatAvailabilityView from "../components/views/ChatAvailabilityView";
import ChatFormsView from "../components/views/ChatFormsView";
import ChatDurationView from "../components/views/ChatDurationView";
import AgentPerformanceView from "../components/views/AgentPerformanceView";
import ChatResponseTimesView from "../components/views/ChatResponseTimesView";
import StaffingPredictionView from "../components/views/StaffingPredictionView";
import AgentActivityView from "../components/views/AgentActivityView";
import QueuedCustomersView from "../components/views/QueuedCustomersView";
import QueueAbandonmentView from "../components/views/QueueAbandonmentView";
import AchievedGoalsView from "../components/views/AchievedGoalsView";
import TrackedSalesView from "../components/views/TrackedSalesView";
import GenerateReportView from "../components/views/GenerateReportView";
import ScheduledReportsView from "../components/views/ScheduledReportsView";
import HelpdeskTicketsView from "../components/views/HelpdeskTicketsView";
import ReviewsView from "../components/views/ReviewsView";

const viewMap = {
  "saved-views": SavedViews,
  "last-7-days": Last7DaysView,
  dashboard: DashboardView,
  "total-chats": TotalChatsView,
  "chat-engagement": ChatEngagementView,
  "missed-chats": MissedChatsView,
  campaigns: CampaignsView,
  "tags-usage": TagsUsageView,
  "chat-satisfaction": ChatSatisfactionView,
  availability: ChatAvailabilityView,
  "chat-forms": ChatFormsView,
  "chat-duration": ChatDurationView,
  "agent-performance": AgentPerformanceView,
  "response-times": ChatResponseTimesView,
  "staffing-prediction": StaffingPredictionView,
  "agent-activity": AgentActivityView,
  "queued-customers": QueuedCustomersView,
  "queue-abandonment": QueueAbandonmentView,
  "achieved-goals": AchievedGoalsView,
  "tracked-sales": TrackedSalesView,
  "generate-report": GenerateReportView,
  "scheduled-reports": ScheduledReportsView,
  "helpdesk-tickets": HelpdeskTicketsView,
  reviews: ReviewsView,
};

const Reports = () => {
  const [activeRoute, setActiveRoute] = useState("dashboard");

  const ActiveView = viewMap[activeRoute] || DashboardView;

  return (
    <PageWrapper title="Reports">
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
            <ReportsSidebar
              activeRoute={activeRoute}
              onNavigate={setActiveRoute}
            />
          </div>
        </div>

        {/* Mobile dropdown for sidebar nav */}
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
            <option value="saved-views">My saved views</option>
            <optgroup label="Summary">
              <option value="last-7-days">Last 7 days</option>
              <option value="dashboard">Dashboard</option>
            </optgroup>
            <optgroup label="Chats">
              <option value="total-chats">Total chats</option>
              <option value="chat-engagement">Chat engagement</option>
              <option value="missed-chats">Missed chats</option>
              <option value="campaigns">Campaigns conversion</option>
              <option value="tags-usage">Tags usage</option>
              <option value="chat-satisfaction">Chat satisfaction</option>
              <option value="availability">Chat availability</option>
              <option value="chat-forms">Chat forms</option>
              <option value="chat-duration">Chat duration</option>
            </optgroup>
            <optgroup label="Agents">
              <option value="agent-performance">Agent performance</option>
              <option value="response-times">Chat response times</option>
              <option value="staffing-prediction">Staffing prediction</option>
              <option value="agent-activity">Agent activity</option>
            </optgroup>
            <optgroup label="Customers">
              <option value="queued-customers">Queued customers</option>
              <option value="queue-abandonment">Queue abandonment</option>
            </optgroup>
            <optgroup label="Ecommerce">
              <option value="achieved-goals">Achieved goals</option>
              <option value="tracked-sales">Tracked sales</option>
            </optgroup>
            <optgroup label="Export raw data">
              <option value="generate-report">Generate report</option>
              <option value="scheduled-reports">Scheduled reports</option>
            </optgroup>
            <option value="helpdesk-tickets">HelpDesk tickets</option>
            <option value="reviews">Reviews</option>
          </select>
        </div>

        {/* Content area */}
        <div className="flex-1 min-w-0 overflow-y-auto custom-scrollbar pr-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeRoute}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="h-full"
            >
              <ActiveView />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </PageWrapper>
  );
};

export default Reports;
