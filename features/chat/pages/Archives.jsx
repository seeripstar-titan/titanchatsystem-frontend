import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PageWrapper from "../../../shared/components/PageWrapper";
import { UserCircle, Mail, Phone, MapPin, Calendar, Clock } from "lucide-react";
import Logger from "../../../services/logger/Logger";

const SERVER_URL = "http://34.69.100.253:8000";

const Archives = () => {
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchArchives = async () => {
      setLoading(true);
      const url = `${SERVER_URL}/api/v1/chat/archives`;
      Logger.info("Archives", "→ GET", url);
      const startTime = performance.now();
      try {
        const token = localStorage.getItem("token");
        const headers = { "Content-Type": "application/json" };
        if (token) headers["Authorization"] = `Bearer ${token}`;

        const res = await fetch(url, {
          headers,
        });
        if (!res.ok) throw new Error("Failed to fetch from backend");
        const data = await res.json();
        const duration = Math.round(performance.now() - startTime);
        Logger.api({
          method: "GET",
          url,
          status: res.status,
          duration,
          responseBody: data,
        });

        setChats(data?.length ? data : []);
      } catch (e) {
        const duration = Math.round(performance.now() - startTime);
        Logger.api({
          method: "GET",
          url,
          status: null,
          duration,
          error: e.message,
        });
        console.error("Failed to fetch archives from Cassandra:", e);
      } finally {
        setLoading(false);
      }
    };
    fetchArchives();
  }, []);

  return (
    <PageWrapper title="Archives">
      <div
        className="h-full w-full flex flex-col md:flex-row rounded-xl overflow-hidden text-[var(--titan-primary)] transition-colors bg-[var(--titan-glass-bg)] backdrop-blur-xl border border-[var(--titan-card-border)]"
        style={{ boxShadow: "var(--titan-glass-shadow)" }}
      >
        {/* Left Sidebar - Chat List */}
        <div className="w-full md:w-1/4 lg:w-[22%] 2xl:w-[20%] flex flex-col overflow-y-auto">
          <div
            className="p-4 font-bold text-[var(--titan-primary)] bg-[var(--titan-glass-bg)] border-b border-[var(--titan-card-border)]"
            style={{
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
            }}
          >
            Chat History
          </div>
          <div className="mx-3 h-px bg-[var(--titan-card-border)]" />
          {loading ? (
            <div className="p-4 flex flex-col gap-2">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="animate-pulse h-14 rounded-xl bg-[var(--titan-hover)]"
                />
              ))}
            </div>
          ) : (
            chats.map((chat, idx) => (
              <motion.button
                key={chat.id}
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.04, duration: 0.3 }}
                onClick={() => {
                  Logger.interaction({
                    action: "click",
                    target: "select-archived-chat",
                    component: "Archives",
                    meta: { chatId: chat.id, user: chat.user },
                  });
                  setSelectedChat(chat);
                }}
                className={`p-4 text-left transition rounded-lg mx-2 my-0.5 ${selectedChat?.id === chat.id ? "bg-[var(--titan-card-bg)] border border-[var(--titan-card-border)]" : "border border-transparent hover:bg-[var(--titan-hover)]"}`}
              >
                <div className="text-sm font-semibold text-[var(--titan-primary)]">
                  {chat.user || "Unknown User"}
                </div>
                <div className="text-xs text-[var(--titan-text-muted)] mt-1">
                  {chat.date}
                </div>
              </motion.button>
            ))
          )}
        </div>

        {/* Vertical Divider */}
        <div className="w-px bg-[var(--titan-card-border)] self-stretch my-3" />

        {/* Middle Panel - Chat Messages */}
        <div className="w-full md:w-2/4 lg:w-[56%] 2xl:w-[60%] flex flex-col relative">
          <AnimatePresence mode="wait">
            {selectedChat ? (
              <motion.div
                key={selectedChat.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col h-full"
              >
                <div className="p-4 font-semibold flex justify-between items-center z-10">
                  <span className="text-[var(--titan-primary)]">
                    Conversation
                  </span>
                  <span className="text-xs text-[var(--titan-text-muted)] font-normal">
                    {selectedChat.date}
                  </span>
                </div>
                <div className="mx-3 h-px bg-[var(--titan-card-border)]" />
                <div className="flex-1 p-6 overflow-y-auto flex flex-col gap-4">
                  {selectedChat.messages?.map((msg, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ delay: idx * 0.03, duration: 0.25 }}
                      className={`max-w-[75%] p-3 rounded-2xl text-sm shadow-sm ${msg.role === "user" ? "bg-[var(--titan-primary)] text-[var(--titan-bg)] self-end rounded-br-none" : "bg-[var(--titan-card-bg)] text-[var(--titan-primary)] self-start border border-[var(--titan-card-border)] rounded-bl-none"}`}
                    >
                      {msg.content}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex-1 flex items-center justify-center text-[var(--titan-text-muted)]"
              >
                Select a chat from the sidebar to view history.
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Vertical Divider */}
        <div className="w-px bg-[var(--titan-card-border)] self-stretch my-3" />

        {/* Right Panel - User Details */}
        <div className="w-full md:w-1/4 lg:w-[22%] 2xl:w-[20%] flex flex-col overflow-y-auto">
          <div
            className="p-4 font-bold text-[var(--titan-primary)] bg-[var(--titan-glass-bg)] border-b border-[var(--titan-card-border)]"
            style={{
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
            }}
          >
            User Details
          </div>
          <div className="mx-3 h-px bg-[var(--titan-card-border)]" />
          <AnimatePresence mode="wait">
            {selectedChat ? (
              <motion.div
                key={selectedChat.id}
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 15 }}
                transition={{ duration: 0.3 }}
                className="p-6 flex flex-col gap-6"
              >
                <div className="flex flex-col items-center gap-3 border-b border-[var(--titan-card-border)] pb-6">
                  <div className="w-16 h-16 bg-[var(--titan-primary)]/5 rounded-full flex items-center justify-center text-[var(--titan-text-muted)] border border-[var(--titan-card-border)] shadow-sm">
                    <UserCircle size={40} strokeWidth={1.5} />
                  </div>
                  <div className="text-center">
                    <h3 className="font-semibold text-lg text-[var(--titan-primary)]">
                      {selectedChat.user || "Unknown User"}
                    </h3>
                    <span className="text-xs text-[var(--titan-text-muted)] bg-[var(--titan-primary)]/5 px-2 py-1 rounded-full mt-1 inline-block">
                      Online Visitor
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-4">
                  {[
                    {
                      icon: Mail,
                      label: "Email",
                      value: selectedChat.email || "Not provided",
                    },
                    {
                      icon: Phone,
                      label: "Phone",
                      value: selectedChat.phone || "Not provided",
                    },
                    {
                      icon: Calendar,
                      label: "Chat Date",
                      value: selectedChat.date?.split(" ")[0] || "Unknown",
                    },
                    {
                      icon: Clock,
                      label: "Chat Time",
                      value: selectedChat.date?.split(" ")[1] || "Unknown",
                    },
                  ].map(({ icon: Icon, label, value }, idx) => (
                    <motion.div
                      key={label}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 + idx * 0.06 }}
                      className="flex items-start gap-3"
                    >
                      <Icon
                        className="text-[var(--titan-text-muted)] mt-0.5"
                        size={16}
                      />
                      <div>
                        <p className="text-xs text-[var(--titan-text-muted)] font-medium uppercase tracking-wider mb-0.5">
                          {label}
                        </p>
                        <p className="text-sm text-[var(--titan-primary)]">
                          {value}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="empty-details"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex-1 flex flex-col items-center justify-center text-[var(--titan-text-muted)] p-6 text-center"
              >
                <UserCircle
                  size={48}
                  strokeWidth={1}
                  className="mb-4 opacity-50"
                />
                <p className="text-sm">
                  Select a conversation to view user details.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </PageWrapper>
  );
};

export default Archives;
