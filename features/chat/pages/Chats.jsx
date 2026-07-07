import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import PageWrapper from "../../../shared/components/PageWrapper";
import { GlassPanel } from "../../../shared/ui";
import { MessageCircle, User, Check, Send, X } from "lucide-react";
import Logger from "../../../services/logger/Logger";

const WS_BASE = "ws://34.69.100.253:8000/ws";
const DEFAULT_TENANT_ID = "bef48066-ba25-44f0-bf4f-9939f38e4320";

const generateConvId = () =>
  `conv-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

const AnimItem = ({ item, isExiting, onExited, children }) => {
  const el = useRef(null);

  useEffect(() => {
    if (!isExiting) {
      gsap.fromTo(
        el.current,
        { opacity: 0, x: -20, height: 0, overflow: "hidden" },
        {
          opacity: 1,
          x: 0,
          height: "auto",
          duration: 0.4,
          ease: "power3.out",
          clearProps: "all",
        },
      );
    }
  }, [isExiting]);

  useEffect(() => {
    if (isExiting) {
      gsap.set(el.current, { overflow: "hidden" });
      gsap.to(el.current, {
        opacity: 0,
        x: 20,
        height: 0,
        marginTop: 0,
        marginBottom: 0,
        paddingTop: 0,
        paddingBottom: 0,
        duration: 0.3,
        ease: "power3.in",
        onComplete: onExited,
      });
    }
  }, [isExiting, onExited]);

  return (
    <div ref={el} className="will-change-transform">
      {children}
    </div>
  );
};

const TransitionList = ({ items, keyFn, children }) => {
  const [renderedList, setRenderedList] = useState(() =>
    items.map((item) => ({ ...item, _key: keyFn(item) })),
  );

  useEffect(() => {
    setRenderedList((currentList) => {
      const newKeys = items.map(keyFn);
      const currentKeys = currentList.map((item) => item._key);

      let nextList = [...currentList];
      let changed = false;

      // Mark exiting items
      nextList = nextList.map((item) => {
        if (!newKeys.includes(item._key) && !item._exiting) {
          changed = true;
          return { ...item, _exiting: true };
        }
        return item;
      });

      // Add new items
      items.forEach((newItem) => {
        const k = keyFn(newItem);
        if (!currentKeys.includes(k)) {
          nextList.push({ ...newItem, _key: k, _exiting: false });
          changed = true;
        }
      });

      // Also update existing items with fresh data
      nextList = nextList.map((item) => {
        if (item._exiting) return item;
        const matchingNew = items.find((i) => keyFn(i) === item._key);
        if (matchingNew) {
          // Check if data changed to trigger a re-render
          return { ...matchingNew, _key: item._key, _exiting: false };
        }
        return item;
      });

      return changed || nextList.length !== currentList.length
        ? nextList
        : currentList;
    });
  }, [items, keyFn]);

  const handleExited = (key) => {
    setRenderedList((current) => current.filter((item) => item._key !== key));
  };

  return (
    <>
      {renderedList.map((item) => (
        <AnimItem
          key={item._key}
          item={item}
          isExiting={item._exiting}
          onExited={() => handleExited(item._key)}
        >
          {children(item)}
        </AnimItem>
      ))}
    </>
  );
};

const Chats = () => {
  const [queue, setQueue] = useState([]);
  const [activeSessions, setActiveSessions] = useState({});
  const [currentSessionId, setCurrentSessionId] = useState(null);
  const [messageInput, setMessageInput] = useState("");
  const [agentName, setAgentName] = useState("Agent");
  const [tenantId, setTenantId] = useState(DEFAULT_TENANT_ID);

  const messagesEndRef = useRef(null);
  const agentWsRef = useRef(null);
  const mainWsRef = useRef(null);

  useEffect(() => {
    const storedTenant = localStorage.getItem("tenantId") || DEFAULT_TENANT_ID;
    const storedAgent = localStorage.getItem("agentName") || "Agent";
    setTenantId(storedTenant);
    setAgentName(storedAgent);

    // Main agent WebSocket for queue updates
    const connectMainWs = () => {
      const agentSessionId = `agent-${storedAgent}-${Date.now()}`;
      const ws = new WebSocket(`${WS_BASE}/${agentSessionId}`);
      mainWsRef.current = ws;

      ws.onopen = () => {
        Logger.ws({
          event: "open",
          url: `${WS_BASE}/${agentSessionId}`,
          data: { type: "main-agent" },
        });
        console.log("Main agent WebSocket connected");
        ws.send(
          JSON.stringify({
            type: "agent_connect",
            agent_name: storedAgent,
            tenant_id: storedTenant,
          }),
        );
      };

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);

          if (data.type === "queue_update") {
            setQueue(data.queue || []);
          } else if (data.type === "new_chat_request") {
            setQueue((prev) => {
              if (prev.find((q) => q.id === data.conversation_id)) return prev;
              return [
                ...prev,
                {
                  id: data.conversation_id,
                  user_name:
                    data.user_name ||
                    `User-${data.conversation_id.slice(0, 5)}`,
                  message_count: data.message_count || 0,
                  status: "waiting",
                },
              ];
            });
          } else if (data.type === "chat_removed") {
            setQueue((prev) =>
              prev.filter((q) => q.id !== data.conversation_id),
            );
          }
        } catch (e) {
          console.error("Main WS parse error:", e);
        }
      };

      ws.onerror = (err) => {
        Logger.ws({
          event: "error",
          url: `${WS_BASE}/${agentSessionId}`,
          data: { error: "Main agent WS error" },
        });
        console.warn("Main agent WS error:", err);
      };

      ws.onclose = () => {
        Logger.ws({
          event: "close",
          url: `${WS_BASE}/${agentSessionId}`,
          data: { reconnecting: true },
        });
        console.log("Main agent WS closed, reconnecting in 5s...");
        setTimeout(connectMainWs, 5000);
      };
    };

    connectMainWs();

    return () => {
      if (mainWsRef.current) mainWsRef.current.close();
      if (agentWsRef.current) agentWsRef.current.close();
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeSessions, currentSessionId]);

  const acceptChat = (convId) => {
    Logger.interaction({
      action: "click",
      target: "accept-chat",
      component: "Chats",
      meta: { convId },
    });
    Logger.info("Chats", "Accepting chat", { convId });
    const convInfo = queue.find((c) => c.id === convId) || {
      id: convId,
      title: "Chat Session",
    };

    // Close previous conversation WebSocket
    if (agentWsRef.current) {
      agentWsRef.current.close();
    }

    setCurrentSessionId(convId);
    setActiveSessions((prev) => ({
      ...prev,
      [convId]: { ...convInfo, messages: [] },
    }));

    // Connect per-conversation WebSocket
    const ws = new WebSocket(`${WS_BASE}/${convId}`);
    agentWsRef.current = ws;

    ws.onopen = () => {
      Logger.ws({
        event: "open",
        url: `${WS_BASE}/${convId}`,
        data: { type: "agent-conv" },
      });
      console.log("Agent WebSocket connected for", convId);
      ws.send(JSON.stringify({ type: "agent_join", agent_name: agentName }));
    };

    ws.onmessage = (event) => {
      try {
        const parsed = JSON.parse(event.data);

        if (
          parsed.type === "conversation_ended" ||
          parsed.type === "agent_left"
        ) {
          setActiveSessions((prev) => {
            const updated = { ...prev };
            delete updated[convId];
            return updated;
          });
          setQueue((prev) => prev.filter((q) => q.id !== convId));
          if (currentSessionId === convId) {
            setCurrentSessionId(null);
          }
          if (agentWsRef.current) {
            agentWsRef.current.close();
            agentWsRef.current = null;
          }
          return;
        }

        // Server sends chat history on connect
        if (parsed.type === "history") {
          const pastMessages = (parsed.messages || []).map((m) => ({
            text: m.content || m.message,
            sender:
              m.role?.toLowerCase() === "user"
                ? "user"
                : m.role?.toLowerCase() === "agent"
                  ? "agent"
                  : "system",
            timestamp: m.created_at || m.timestamp,
          }));
          setActiveSessions((prev) => ({
            ...prev,
            [convId]: { ...prev[convId], messages: pastMessages },
          }));
          return;
        }

        if (parsed.type === "message") {
          setActiveSessions((prev) => {
            const session = prev[convId];
            if (!session) return prev;
            let sender = "system";
            if (parsed.role === "user") sender = "user";
            if (parsed.role === "agent") sender = "agent";

            return {
              ...prev,
              [convId]: {
                ...session,
                messages: [
                  ...session.messages,
                  {
                    text: parsed.content || parsed.message,
                    sender,
                    timestamp: parsed.timestamp || new Date().toISOString(),
                  },
                ],
              },
            };
          });
        }
      } catch (e) {
        console.error("WebSocket message parse error:", e);
      }
    };

    ws.onerror = (err) => {
      console.warn("Agent WebSocket error:", err);
    };

    ws.onclose = () => {
      console.log("Agent WebSocket closed for", convId);
    };
  };

  const endChat = (sessionId) => {
    Logger.interaction({
      action: "click",
      target: "end-chat",
      component: "Chats",
      meta: { sessionId },
    });
    Logger.info("Chats", "Ending chat", { sessionId });
    // Send close via WebSocket before closing
    if (
      agentWsRef.current &&
      agentWsRef.current.readyState === WebSocket.OPEN &&
      currentSessionId === sessionId
    ) {
      agentWsRef.current.send(
        JSON.stringify({ type: "agent_close", conversation_id: sessionId }),
      );
      agentWsRef.current.close();
      agentWsRef.current = null;
    }

    setActiveSessions((prev) => {
      const updated = { ...prev };
      delete updated[sessionId];
      return updated;
    });

    setQueue((prev) => prev.filter((q) => q.id !== sessionId));

    if (currentSessionId === sessionId) {
      setCurrentSessionId(null);
    }
  };

  const sendMessage = (e) => {
    e.preventDefault();
    if (!messageInput.trim() || !currentSessionId) return;

    const text = messageInput;
    Logger.interaction({
      action: "submit",
      target: "send-message",
      component: "Chats",
      meta: { sessionId: currentSessionId, length: text.length },
    });
    setMessageInput("");

    // Optimistically add to local state
    setActiveSessions((prev) => {
      const session = prev[currentSessionId];
      if (!session) return prev;
      return {
        ...prev,
        [currentSessionId]: {
          ...session,
          messages: [...session.messages, { text, sender: "agent" }],
        },
      };
    });

    // Send via WebSocket
    if (
      agentWsRef.current &&
      agentWsRef.current.readyState === WebSocket.OPEN
    ) {
      agentWsRef.current.send(
        JSON.stringify({
          type: "message",
          message: text,
          role: "agent",
          agent_name: agentName,
        }),
      );
    } else {
      console.error("WebSocket not connected");
    }
  };

  const activeSessionDetails = currentSessionId
    ? activeSessions[currentSessionId]
    : null;

  return (
    <PageWrapper title="Live Chats">
      <div className="h-full w-full flex flex-col lg:flex-row gap-4 lg:gap-6 mt-4">
        {/* Left Side: Queues and Active Sessions List */}
        <div className="w-full lg:w-1/3 xl:w-[30%] 2xl:w-[28%] flex flex-col gap-4 lg:gap-6">
          {/* Active Chats Menu */}
          <GlassPanel className="max-h-[50%] overflow-y-auto">
            <h3 className="text-[var(--titan-primary)]/90 font-medium mb-3 flex items-center gap-2">
              <MessageCircle
                size={18}
                className="text-[var(--titan-secondary)]"
              />{" "}
              Active Sessions
            </h3>
            {Object.keys(activeSessions).length === 0 ? (
              <p className="text-[var(--titan-primary)]/40 text-sm">
                No active sessions.
              </p>
            ) : (
              <div className="flex flex-col gap-2">
                <TransitionList
                  items={Object.values(activeSessions)}
                  keyFn={(sess) => sess.id}
                >
                  {(sess) => (
                    <button
                      onClick={() => setCurrentSessionId(sess.id)}
                      className={`w-full text-left p-3 flex flex-col gap-2 rounded-lg border backdrop-blur-md transition-all duration-300 ${
                        currentSessionId === sess.id
                          ? "border-[var(--titan-card-border)] bg-[var(--titan-card-bg)] text-[var(--titan-primary)]"
                          : "border-[var(--titan-card-border)] bg-[var(--titan-glass-bg)] text-[var(--titan-primary)]/80"
                      }`}
                      style={{ boxShadow: "var(--titan-glass-shadow)" }}
                    >
                      <div className="flex items-start gap-2">
                        <MessageCircle
                          size={16}
                          className={
                            currentSessionId === sess.id
                              ? "text-[var(--titan-primary)] mt-0.5"
                              : "text-[var(--titan-text-muted)] mt-0.5"
                          }
                        />
                        <div className="flex-1">
                          <div className="font-semibold text-sm">
                            {sess.user_name ||
                              sess.name ||
                              `User-${sess.id.slice(0, 5)}`}
                          </div>
                          <div className="text-xs opacity-70 truncate">
                            {sess.message_count || sess.messages?.length || 0}{" "}
                            messages
                          </div>
                        </div>
                      </div>
                    </button>
                  )}
                </TransitionList>
              </div>
            )}
          </GlassPanel>

          {/* Pending Queue */}
          <GlassPanel className="flex-1 overflow-y-auto">
            <h3 className="text-[var(--titan-primary)]/90 font-medium mb-3 flex items-center justify-between">
              <span>Pending Queue</span>
              {queue.length > 0 && (
                <span className="bg-[var(--titan-primary)] text-[var(--titan-bg)] text-xs font-bold px-2 py-0.5 rounded-full">
                  {queue.length}
                </span>
              )}
            </h3>
            {queue.length === 0 ? (
              <p className="text-[var(--titan-primary)]/40 text-sm">
                No users waiting in queue.
              </p>
            ) : (
              <div className="flex flex-col gap-3">
                <TransitionList items={queue} keyFn={(item) => item.id}>
                  {(item) => (
                    <div
                      className={`p-3 border rounded-lg text-[var(--titan-primary)] backdrop-blur-md flex flex-col gap-2 transition-all duration-300 ${
                        activeSessions[item.id]
                          ? "border-[var(--titan-card-border)] bg-[var(--titan-card-bg)]"
                          : "border-[var(--titan-card-border)] bg-[var(--titan-glass-bg)]"
                      }`}
                      style={{ boxShadow: "var(--titan-glass-shadow)" }}
                    >
                      <div className="flex items-start gap-2">
                        <User
                          size={16}
                          className="text-[var(--titan-text-muted)] mt-0.5"
                        />
                        <div className="flex-1 text-[var(--titan-primary)]">
                          <div className="text-sm font-medium">
                            {item.user_name ||
                              item.name ||
                              `User-${item.id.slice(0, 5)}`}
                          </div>
                          <div className="text-[var(--titan-text-muted)] text-xs">
                            {item.message_count || 0} messages •{" "}
                            {activeSessions[item.id] ? "Active" : item.status}
                          </div>
                        </div>
                      </div>
                      {activeSessions[item.id] ? (
                        <button
                          disabled
                          className="mt-2 w-full py-1.5 flex items-center justify-center gap-2 bg-[var(--titan-primary)] text-[var(--titan-bg)] border border-[var(--titan-card-border)] shadow-sm font-medium text-sm rounded-xl transition-all duration-300 opacity-70 cursor-default"
                        >
                          <Check size={16} /> Accepted
                        </button>
                      ) : (
                        <button
                          onClick={() => acceptChat(item.id)}
                          className="mt-2 w-full py-1.5 flex items-center justify-center gap-2 bg-[var(--titan-hover)] text-[var(--titan-primary)] border border-[var(--titan-card-border)] shadow-sm font-medium text-sm rounded-xl transition-all duration-300"
                        >
                          <Check size={16} /> Accept
                        </button>
                      )}
                    </div>
                  )}
                </TransitionList>
              </div>
            )}
          </GlassPanel>
        </div>

        {/* Right Side: Active Chat View */}
        <GlassPanel
          padding="p-0"
          className="flex-1 flex flex-col items-stretch justify-stretch"
        >
          {activeSessionDetails ? (
            <>
              <div
                className="p-4 border-b border-[var(--titan-card-border)] bg-[var(--titan-glass-bg)] flex justify-between items-center"
                style={{
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                }}
              >
                <div>
                  <h3 className="text-[var(--titan-primary)] font-medium">
                    {activeSessionDetails.user_name ||
                      activeSessionDetails.name ||
                      `User-${currentSessionId.slice(0, 5)}`}
                  </h3>
                  <p className="text-[var(--titan-text-muted)] text-xs">
                    Status: Active
                  </p>
                </div>
                <button
                  onClick={() => endChat(currentSessionId)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[var(--titan-danger)]/10 text-[var(--titan-danger)] border border-[var(--titan-danger)]/20 transition-all text-sm font-medium"
                >
                  <X size={16} /> End Chat
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
                {activeSessionDetails.messages.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex flex-col ${
                      msg.sender === "user"
                        ? "items-start"
                        : msg.sender === "system"
                          ? "items-center"
                          : "items-end"
                    }`}
                  >
                    {msg.sender === "system" ? (
                      <span className="text-xs text-[var(--titan-primary)]/40 bg-[var(--titan-secondary)]/5 px-2 py-1 rounded-full text-center">
                        {msg.text}
                      </span>
                    ) : (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.25, delay: i * 0.02 }}
                        className={`px-4 py-2 rounded-2xl max-w-[70%] text-sm ${
                          msg.sender === "agent" || msg.sender === "assistant"
                            ? "bg-[var(--titan-primary)] text-[var(--titan-bg)] border border-[var(--titan-card-border)] shadow-sm rounded-br-none font-medium"
                            : "bg-[var(--titan-secondary)] text-[var(--titan-primary)] border border-[var(--titan-card-border)] shadow-sm rounded-bl-none font-medium"
                        }`}
                      >
                        {msg.text}
                      </motion.div>
                    )}
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              <form
                onSubmit={sendMessage}
                className="p-4 bg-[var(--titan-glass-bg)] border-t border-[var(--titan-card-border)] flex gap-2 shrink-0"
              >
                <input
                  type="text"
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  placeholder={`Reply to ${activeSessionDetails.user_name || activeSessionDetails.name || `User-${currentSessionId.slice(0, 5)}`}...`}
                  className="flex-1 bg-[var(--titan-input-bg)] text-[var(--titan-primary)] border border-[var(--titan-input-border)] placeholder-[var(--titan-text-muted)] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[var(--titan-primary)]/30 focus:ring-2 focus:ring-[var(--titan-primary)]/20 transition-all"
                />
                <button
                  type="submit"
                  disabled={!messageInput.trim()}
                  className="bg-[var(--titan-primary)] text-[var(--titan-bg)] p-2.5 rounded-xl flex items-center justify-center disabled:opacity-40 transition-all"
                >
                  <Send size={18} />
                </button>
              </form>
            </>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-[var(--titan-primary)]/40">
              <MessageCircle size={48} className="mb-4 opacity-50" />
              <p>Select an active session or accept a new chat</p>
              <p className="text-sm">
                from the pending queue to start messaging.
              </p>
            </div>
          )}
        </GlassPanel>
      </div>
    </PageWrapper>
  );
};

export default Chats;
